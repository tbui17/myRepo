from ctypes import Union
from dataclasses import dataclass, field
from typing import Any, Literal, Union
import requests
from .common_utils import regex_email
from .pages.table_enumerators import TableEnums as te
from .common_utils import get_configs

configs = get_configs()
base_url = configs["base_url"]
default_params_post = configs["default_params_post"]
email_api = configs['email_api']


# class Client():
#     def __init__(self, data=None, session:requests.Session=None, settings=None) -> None:
#         self.data = data
#         self.session = session
#         self.settings = settings
    
    
#     def validate_response(response: requests.Response):
#         if response.ok is not True:
#             raise Exception(
#                 f"{response.status_code} {response.reason}: {response.text}"
#             )
    
#     def attach_kb(self):
#         self.session.post(self.data.get)
#         resp = requests.patch(url=f"{base_url}/api/now/table/{te.M2M_KB_TASK}?", params=self.params, cookies=self.cookies, headers=self.headers, json=self.json)
#         self.validate_response(resp)
#         json_info = resp.json()
#         return get_entry_info(json_info)
    
    
    
@dataclass(kw_only=True)
class GeneralApi:
    url: str | None = None
    params: dict | None = None
    json: dict | None =  None
    headers: dict = field(default_factory=lambda:dict(configs["headers"]))
    cookies: dict = field(default_factory=lambda:dict(configs["cookies"]))
    settings: dict | None = None
    cache: Any = None
    session: requests.Session = requests.Session()

    def validate_response(self, response: requests.Response):
        if response.ok is not True:
            raise Exception(
                f"{response.status_code} {response.reason}: {response.text}"
            )

    def get_resp_data(self, resp: requests.Response):
        self.validate_response(resp)
        ticket_details = resp.json()["results"]
        return ticket_details

    def get(self, **kwargs):
        resp = requests.get(**kwargs)
        self.validate_response(resp)

    def patch(self, **kwargs):
        resp = requests.patch(**kwargs)
        self.validate_response(resp)

    def post(self, **kwargs):
        resp = requests.post(**kwargs)
        self.validate_response(resp)
    
    
    def get_entry_info(self, json_response: dict):
        result = (json_response)['result']
        try:
            return result[0]
        except Exception:
            return result

@dataclass(kw_only=True)
class TableApi(GeneralApi):
    table_name: str = te.TASK
    json: dict | None = None
    params: dict = field(default_factory=lambda:dict(default_params_post))
    base_url: str = base_url
    url: str = f"{base_url}/api/now/table/{table_name}?"
    sys_id: Union[str, None] = None

    def get_by_task_number(self, number:str) -> dict:
        self.params = dict(default_params_post)
        self.params['number'] = number
        resp = requests.get(url=self.url, params=self.params, cookies=self.cookies, headers=self.headers)
        self.validate_response(resp)
        json_info = resp.json()
        return self.get_entry_info(json_info)

    def post_task(self):
        self.params = dict(default_params_post)
        self.url = f"{base_url}/api/now/table/{self.table_name}/{self.sys_id}?"
        resp = requests.post(url=self.url, params=self.params, cookies=self.cookies, headers=self.headers, json=self.json)
        self.validate_response(resp)
        json_info = resp.json()
        return self.get_entry_info(json_info)

    def patch_task(self):
        self.params=dict(default_params_post)
        self.url = f"{base_url}/api/now/table/{self.table_name}/{self.sys_id}?"
        resp = requests.patch(url=self.url, params=self.params, cookies=self.cookies, headers=self.headers, json=self.json)
        self.validate_response(resp)
        json_info = resp.json()
        return self.get_entry_info(json_info)
    
    def gpatch_task(self, number):
        entry_info = self.get_by_task_number(number)
        self.sys_id = entry_info['sys_id']['value']
        return self.patch_task()
    
    def attach_kb(self, kb_number:str, task_number:str):
        self.params=dict(default_params_post)
        self.json = {"kb_knowledge":kb_number, 'task':task_number}
        resp = requests.post(url=f"{base_url}/api/now/table/{te.M2M_KB_TASK}?", params=self.params, cookies=self.cookies, headers=self.headers, json=self.json)
        self.validate_response(resp)
        json_info = resp.json()
        return self.get_entry_info(json_info)
    
    def send_mail(self, number:str, message:str):
        self.params=dict(default_params_post)
        entry:dict[str,dict[str,str]] = self.get_by_task_number(number)
        to, cc = regex_email(entry['description']['value'])
        self.url=f"{base_url}{email_api}"
        self.json={
            "number": entry['number']['value'],
            "to": to,
            "cc": cc,
            "subject": f"{entry['number']['value']} - {entry['short_description']['value']}",
            "message": f"{message}"
        }
        resp = requests.post(url=self.url, params=None, cookies=self.cookies, headers=self.headers, json=self.json)
        self.validate_response(resp)
        json_info = resp.json()
        return self.get_entry_info(json_info)
        
        
    