from abc import ABC, abstractmethod
from logger1 import logger as log1
from typing import cast
from urllib3 import util
from playwright.sync_api import APIResponse, Response


class ApiResponseHandlingProtocol(ABC):
    def get_result(self, response: APIResponse | Response) -> list | dict:
        try:
            return response.json()["result"]
        except TypeError as e:
            log1.error(e)
            raise

    @abstractmethod
    def handle(self, response: APIResponse | Response) -> dict | list:
        ...


class GetDict(ApiResponseHandlingProtocol):
    """Can pass in list or dictionary to handle. Will immediately return dictionary if it's a dictionary or get the first result of the list if it's a list, assuming it's a dictionary."""

    def handle(self, response: APIResponse | Response) -> dict|None:
        json_results: list | dict = self.get_result(response)
        if type(json_results) == list:
            try:
                result: dict = json_results[0]
                return cast(dict,result)
            except IndexError:
                res: util.Url = util.parse_url(response.url)
                log1.info(f"Entry was not found. Returning None.\nQuery: {res.query}\nEndpoint: {res.path}",)
                log1.debug('',stack_info=True)
                return None
        return cast(dict, json_results)


class GetList(ApiResponseHandlingProtocol):
    """Will immediately return result casted as a list assuming it's a list. Otherwise raises type error."""

    def handle(self, response: APIResponse | Response) -> list:
        json_results: list | dict = self.get_result(response)
        if type(json_results) == list:
            return cast(list,json_results)
        raise TypeError(f"Result was not a list. {json_results}")


class GetDictOrList(ApiResponseHandlingProtocol):
    """Will immediately return result."""

    def handle(self, response: APIResponse | Response) -> dict | list:
        return self.get_result(response)
