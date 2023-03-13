"""Plan to move workers out of this file at a later time."""

from typing import Any, cast

from .table_enumerators import (
    ResponseEnums as rpe,
    display_value_enums as dve,
    TableEnums as tbe
)
from dataclasses import dataclass, field
from configs import uconfigs as cfg
from playwright.sync_api import APIRequestContext, APIResponse, FilePayload, Request
import logging
from pydantic import BaseModel

logging.basicConfig(level="INFO")
from .ApiResponseHandlingProtocols import (
    ApiResponseHandlingProtocol,
    GetDict,
    GetList,
    GetDictOrList,
)

base_url: str = cfg.base_url
default_params: dict = cfg.default_params_post
email_api: str = cfg.email_api


class RequestArgs(BaseModel):
    """APIRequestContext.fetch

    Sends HTTP(S) request and returns its response. The method will populate request cookies from the context and
    update context cookies from the response. The method will automatically follow redirects. JSON objects can be
    passed directly to the request.

    **Usage**

    ```python
    data = {
        \"title\": \"Book Title\",
        \"body\": \"John Doe\",
    }
    api_request_context.fetch(\"https://example.com/api/createBook\", method=\"post\", data=data)
    ```

    The common way to send file(s) in the body of a request is to encode it as form fields with `multipart/form-data`
    encoding. You can achieve that with Playwright API like this:

    ```python
    api_request_context.fetch(
      \"https://example.com/api/uploadScrip'\",
      method=\"post\",
      multipart={
        \"fileField\": {
          \"name\": \"f.js\",
          \"mimeType\": \"text/javascript\",
          \"buffer\": b\"console.log(2022);\",
        },
      })
    ```

    Parameters
    ----------
    url_or_request : Union[Request, str]
        Target URL or Request to get all parameters from.
    params : Union[dict[str, Union[bool, float, str]], None]
        Query parameters to be sent with the URL.
    method : Union[str, None]
        If set changes the fetch method (e.g. [PUT](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/PUT) or
        [POST](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST)). If not specified, GET method is used.
    headers : Union[dict[str, str], None]
        Allows to set HTTP headers.
    data : Union[Any, bytes, str, None]
        Allows to set post data of the request. If the data parameter is an object, it will be serialized to json string
        and `content-type` header will be set to `application/json` if not explicitly set. Otherwise the `content-type`
        header will be set to `application/octet-stream` if not explicitly set.
    form : Union[dict[str, Union[bool, float, str]], None]
        Provides an object that will be serialized as html form using `application/x-www-form-urlencoded` encoding and sent
        as this request body. If this parameter is specified `content-type` header will be set to
        `application/x-www-form-urlencoded` unless explicitly provided.
    multipart : Union[dict[str, Union[bool, bytes, float, str, {name: str, mimeType: str, buffer: bytes}]], None]
        Provides an object that will be serialized as html form using `multipart/form-data` encoding and sent as this
        request body. If this parameter is specified `content-type` header will be set to `multipart/form-data` unless
        explicitly provided. File values can be passed either as
        [`fs.ReadStream`](https://nodejs.org/api/fs.html#fs_class_fs_readstream) or as file-like object containing file
        name, mime-type and its content.
    timeout : Union[float, None]
        Request timeout in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout.
    fail_on_status_code : Union[bool, None]
        Whether to throw on response codes other than 2xx and 3xx. By default response object is returned for all status
        codes.
    ignore_https_errors : Union[bool, None]
        Whether to ignore HTTPS errors when sending network requests. Defaults to `false`.
    max_redirects : Union[int, None]
        Maximum number of request redirects that will be followed automatically. An error will be thrown if the number is
        exceeded. Defaults to `20`. Pass `0` to not follow redirects.

    Returns
    -------
    APIResponse
    """

    url_or_request: str | Request
    method: str | None = None
    params: dict[str, str | float | bool] | None = None
    headers: dict[str, str] | None = None
    data: Any | str | bytes | None = None
    form: dict[str, str | float | bool] | None = None
    multipart: dict[str, bytes | bool | float | str | FilePayload] | None = None
    timeout: float | None = None
    fail_on_status_code: bool | None = None
    ignore_https_errors: bool | None = None
    max_redirects: int | None = None

    class Config:
        arbitrary_types_allowed: bool = True


@dataclass(kw_only=True)
class GeneralApi:
    session: APIRequestContext
    cache: dict = field(default_factory=lambda: {})
    _domain: str = base_url


@dataclass(kw_only=True)
class TableApi(GeneralApi):
    def req(
        self,
        method: str,
        url: str,
        handle_protocol: ApiResponseHandlingProtocol = GetDictOrList(),
        params=default_params,
        data: dict | None = None,
        display_value: dve = dve.TRUE,
        *args,
        **kwargs,
    ) -> dict | list:
        """Uses playwright request.fetch internally and adds additional data sorting features.

        Args:
            All APIRequestContext args as listed in original documentation.
            handle_protocol: Protocol to use for extracting information out of response.
            display_value: When retrieving from table, whether to display internal system value or user-friendly value. true = user-friendly, false = real system value, all = both; if selecting all, the value for each field will turn into a dict that looks like {"display_value":"str","value:"str"}} and data retrieval will have to be adjusted accordingly.
        """
        params["sysparm_display_value"] = display_value
        response: APIResponse = self.session.fetch(
            url_or_request=url,
            method=method,
            params=params,
            fail_on_status_code=True,
            data=data,
            *args,
            **kwargs,
        )
        return handle_protocol.handle(response)

    def single_req(
        self,
        method: str,
        url: str,
        params=default_params,
        *args,
        **kwargs,
    ) -> dict:
        """
        ***Kept for compatibility. Req can already handle single reqs with handler strategy. Avoid using if possible.***
        
        This is a wrapper around req that sets handle_strategy to GetDict() and casts the results to dict.

        Use if expecting a list and need to get the first result.
        """
        res = self.req(
            url=url, method=method, handle_protocol=GetDict(), params=params, **kwargs
        )
        return cast(dict, res)
    
    def create_table_url(self, table_name) -> str:
        return f"{base_url}{tbe.TABLEENDPOINTURL}{table_name}"

    def create_table_url_with_id(self, id: str, table_name:str) -> str:
        return self.create_table_url(table_name=table_name) + id
    
    
