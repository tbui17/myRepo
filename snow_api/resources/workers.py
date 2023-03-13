import logging
from typing import Any, cast
from configs import uconfigs as cfg
from resources.ApiResponseHandlingProtocols import GetDict, GetDictOrList, GetList
from resources.SearchProtocols import SearchProtocol
from resources.api_setup import TableApi, base_url, default_params


from dataclasses import dataclass
from resources.utils import regex_email, dict_to_yaml, copy_dict_yaml
from resources.pages.dev_cs_fields2 import ASSIGNMENT_GROUP

from resources.table_enumerators import (
    SysUserEnums as sue,
    TableEnums as tbe,
    TaskEnums as te,
)


@dataclass(kw_only=True)
class TaskWorker(TableApi):

    table_name: str = tbe.TASK

    def check_cache(self, number) -> str | None:
        """Check if sysid is in the cache.
        Do not cache other ticket information because tickets are prone to changes at any time. Only the sysid of the ticket is guaranteed to be constant.
        """
        if cached_id := self.cache.get(number):
            logging.debug(
                f"Found sys_id in cache for {number} with value of {self.cache[number]}"
            )
            return cached_id

    def get_by_number(self, number: str, *args, **kwargs) -> dict:
        """
        This gets a ticket by the number and returns a single dict containing all the relevant information.
        If the sysid for the number is already in the cache, will use the sysid instead.
        """

        # if sysid already known will use that instead for faster search.
        if cached_id := self.check_cache(number):
            url: str = f"{base_url}{tbe.TABLEENDPOINTURL}{self.table_name}/{cached_id}"
            return self.single_req(method="GET", url=url)

        # prep get request and send
        url: str = f"{base_url}{tbe.TABLEENDPOINTURL}{self.table_name}"
        param: dict = default_params | {"number": number}
        results: dict = self.single_req(
            method="GET", url=url, params=param, *args, **kwargs
        )
        
        return results

    def method_by_id(self, method: str, id: str, data: dict, *args, **kwargs) -> dict:
        """method_by_id Use a specified HTTP method. Case insensitive. Accepts all kwargs a session.request would need"""

        url1: str = f"{base_url}{tbe.TABLEENDPOINTURL}{self.table_name}/{id}"
        
        return self.single_req(
            method=method.upper(), url=url1, data=data, *args, **kwargs
        )

    def method_by_number(
        self, number: str, method: str, data: dict, *args, **kwargs
    ) -> dict:
        """method_by_number
        GETS a task record by number, gets its ID, then uses method_by_id with the specified method.
        Checks cache for sysid first to avoid making extra get requests.
        Use a specified HTTP method.
        Case insensitive.
        Accepts all kwargs a session.request would need
        """
        sysid: str = self.check_cache(number) or self.get_by_number(number)["sys_id"]
        
        return self.method_by_id(method=method, data=data, id=sysid, *args, **kwargs)

    def create_ticket(self, body: dict | None = None) -> dict:
        """If no body provided, will create a new ticket with defaults"""
        if body is None:
            finalbody: dict[str, str] = cfg.default_new_post_body
        res: dict | list = self.req(
            method="POST",
            url=self.create_table_url(),
            handle_protocol=GetDict(),
            body=finalbody,
        )
        return cast(dict, res)

    def send_mail(
        self, number: str, message: str, *args, **kwargs
    ) -> dict | list | None:
        """send_mail Gets description of ticket and calls email regex on it.
        Uses info to identify who to send the mail to and sends sends specified message to target.
        """

        entry: dict = self.get_by_number(number)  # type: ignore
        if regex_results := regex_email(entry["description"]):
            to, cc = regex_results
        else:
            logging.warning(
                msg="No emails were found in the body. Mail was not sent.",
                exc_info=True,
            )
            return

        body: dict[str, str] = {
            "number": number,
            "to": to,
            "cc": cc,
            "subject": f"{number} - {entry['short_description']}",
            "message": f"{message}",
        }
        return self.req(  # type: ignore
            method="POST",
            url=cfg.base_url + cfg.email_api,
            data=body,
            handle_protocol=GetDictOrList(),
            *args,
            **kwargs,
        )

    def create_table_url(self) -> str:
        """Uses own table_name value."""
        return f"{base_url}{tbe.TABLEENDPOINTURL}{self.table_name}"

    def create_table_url_with_id(self, id: str) -> str:
        return self.create_table_url() + id
    
    def filter_fields(self,table_entry:dict,field_names:list) ->dict:
        """Return a subset of the original fields in a table entry."""
        return {k:v for k,v in table_entry.items() if k in field_names}


@dataclass
class TicketWorker(TaskWorker):
    # Not sure if ABCs can be used mid inheritance chain, leaving it now for now but this is intended to be an ABC and not instantiated.

    def attach_kb(self, kb_number: str, cs_number: str, *args, **kwargs) -> dict:
        """Sends a single post request to m2m_kb_task which accepts numbers instead of sys ids."""

        body: dict[str, str] = {"kb_knowledge": kb_number, "task": cs_number}
        m2m_kb_url: str = f"{base_url}{tbe.TABLEENDPOINTURL}{tbe.M2M_KB_TASK}"
        return cast(
            dict,
            self.req(
                method="POST",
                handle_protocol=GetDictOrList(),
                url=m2m_kb_url,
                data=body,
                *args,
                **kwargs,
            ),
        )


@dataclass(kw_only=True)
class IncWorker(TicketWorker):
    table_name: str = tbe.INCIDENT


@dataclass(kw_only=True)
class CsWorker(TicketWorker):
    table_name: str = tbe.SN_CUSTOMERSERVICE_CASE


@dataclass(kw_only=True)
class SysUserWorker(TableApi):
    def get_user(self, strategy: SearchProtocol, search_protocol_input: Any) -> dict:
        param: dict = dict(**default_params, **strategy.make_user_param(search_protocol_input))
        res: dict | list = self.req(
            method="get",
            url=f"{base_url}{tbe.TABLEENDPOINTURL}{tbe.SYS_USER}",
            params=param,
            handle_protocol=GetDict(),
        )
        return cast(dict, res)
    
    def create_user_string(
        self, result:dict
    ) -> str:
        relevant_fields: list = [
            sue.USER_NAME,
            sue.NAME,
            sue.PHONE,
            sue.EMAIL,
            sue.LOCATION,
        ]
        user_string: dict = {k: v for (k, v) in result.items() if k in relevant_fields}
        return dict_to_yaml(user_string)
    
    def location_fields(
        self, result:dict
    ) -> str:
        relevant_fields=[sue.STREET,sue.ZIP,sue.CITY,sue.STATE]
        user_string: dict = {k: v for (k, v) in result.items() if k in relevant_fields}
        return dict_to_yaml(user_string)