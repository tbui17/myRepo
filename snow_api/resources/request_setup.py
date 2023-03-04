import logging
from typing import Any
import requests

from resources.data_types import FieldResp
from .common_utils import regex_email
from .pages.table_enumerators import TableEnums as tbl
from .common_utils import get_configs
from pydantic import BaseModel, Field
from requests import Response

configs = get_configs()
base_url = configs["base_url"]
default_params_post = configs["default_params_post"]
email_api = configs["email_api"]


class GeneralApiWorker(BaseModel):
    url: str | None = None
    params: dict | None = None
    data: dict | None = None
    headers: dict = Field(
        default_factory=lambda: dict(configs["headers"])
    )  # duplicate, see post init
    cookies: dict = Field(default_factory=lambda: dict(configs["cookies"]))  # duplicate
    settings: dict | None = None
    extensions: Any = None
    cache: dict | None = {}

    class Config:
        arbitrary_types_allowed: bool = True

    def validate_response(self, response: requests.Response):
        if response.ok is not True:
            raise Exception(
                f"{response.status_code} {response.reason}: {response.text}"
            )
        if not response.json():
            raise Exception("Response json returned was empty.")

    def get_resp_data(self, resp: requests.Response):
        self.validate_response(resp)
        ticket_details = resp.json()["results"]
        return ticket_details

    def req(self, **kwargs) -> Response:
        resp: Response = requests.request(**kwargs)
        self.validate_response(resp)
        return resp
        

    def get_entry_info(self, json_response: dict):
        return (json_response)["result"]


class TableApiWorker(GeneralApiWorker):

    table_name: str = tbl.TASK
    data: dict | None = None
    params: dict = Field(default_factory=lambda: dict(default_params_post))
    base_url: str = base_url
    url: str = f"{base_url}/api/now/table/{table_name}?"

    def get_by_number(self, number: str, **kwargs) -> dict[str, FieldResp]:
        try:
            cached_id: str = self.cache[number]
            cached: bool = True
        except Exception:
            cached: bool = False
        if cached:
            self.url: str = f"{base_url}/api/now/table/{self.table_name}/{cached_id}?"
            self.params: dict = dict(default_params_post)
            self.params["number"] = number
        else:
            self.url: str = f"{base_url}/api/now/table/{self.table_name}?"
            self.params: dict = dict(default_params_post)
            self.params["number"] = number
        resp: requests.Response = requests.get(
            url=self.url, params=self.params, cookies=self.cookies, headers=self.headers
        )
        self.validate_response(resp)
        json_info: dict = resp.json()
        if cached:
            entry_info: dict = json_info["result"]
            self.cache[number] = entry_info["sys_id"]["value"]
        else:
            entry_info: dict = json_info["result"][0]
            self.cache[number] = entry_info["sys_id"]["value"]
        return entry_info

    def post_task(self, sys_id, body, **kwargs) -> dict[str, FieldResp]:
        self.params = dict(default_params_post)
        self.url = f"{base_url}/api/now/table/{self.table_name}/{sys_id}?"
        resp: requests.Response = requests.post(
            url=self.url,
            params=self.params,
            cookies=self.cookies,
            headers=self.headers,
            json=body,
        )
        self.validate_response(resp)
        json_info: dict = resp.json()
        return self.get_entry_info(json_info)

    def patch_task(self, sys_id, body, **kwargs) -> dict[str, FieldResp]:
        self.params = dict(default_params_post)
        self.url = f"{base_url}/api/now/table/{self.table_name}/{sys_id}?"
        resp: requests.Response = requests.patch(
            url=self.url,
            params=self.params,
            cookies=self.cookies,
            headers=self.headers,
            json=body,
        )
        self.validate_response(resp)
        json_info: Any = resp.json()
        return self.get_entry_info(json_info)

    def gpost_task(self, number, body, **kwargs) -> dict[str, FieldResp]:
        entry_info: dict[str, FieldResp] = self.get_by_number(number)
        sys_id: str = entry_info["sys_id"]["value"]
        return self.post_task(sys_id, body)

    def attach_kb(
        self, kb_number: str, task_number: str, **kwargs
    ) -> dict[str, FieldResp]:
        self.params = dict(default_params_post)
        body: dict[str, str] = {"kb_knowledge": kb_number, "task": task_number}
        resp: Response = requests.post(
            url=f"{base_url}/api/now/table/{tbl.M2M_KB_TASK}?",
            params=self.params,
            cookies=self.cookies,
            headers=self.headers,
            json=body,
        )
        self.validate_response(resp)
        json_info = resp.json()
        return self.get_entry_info(json_info)

    def send_mail(
        self, number: str, message: str, **kwargs
    ) -> dict[str, FieldResp] | None:
        self.params = dict(default_params_post)
        entry: dict[str, FieldResp] = self.get_by_number(number)
        regex_results: tuple | None = regex_email(entry["description"]["value"])
        if not regex_results:
            logging.warning(msg="No emails were found in the body.", exc_info=True)
            return
        else:
            to, cc = regex_results
        self.url = f"{base_url}{email_api}"
        body:dict[str,str] = {
            "number": entry["number"]["value"],
            "to": to,
            "cc": cc,
            "subject": f"{entry['number']['value']} - {entry['short_description']['value']}",
            "message": f"{message}",
        }
        resp: Response = requests.post(
            url=self.url,
            params=None,
            cookies=self.cookies,
            headers=self.headers,
            json=body,
        )
        self.validate_response(resp)
        json_info = resp.json()
        return self.get_entry_info(json_info)
