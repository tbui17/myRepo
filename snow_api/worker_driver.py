"""

How to use:

Summary:
Create session object and provide to WorkerDriver initializer class method. Store reusable functions in Mixins for use with WorkerDriver.
Execute those scripts here.

Description:
Can natively use with playwright's APIRequestContext object. 
For other objects related to this type (ex: Requests.Session) they will need a custom designed interface to remap types, arguments, etc.
See playwright's APIRequestContext documentation to help design the interface.

"""

from attr import define
from configs import uconfigs as cfg
from resources.table_enumerators import (
    CsEnums as cse,
    ResolutionCodeEnums as rce,
    StateEnums as se,
)
from resources.playwright_functions import get_pw_request_api
from resources.workers import CsWorker, IncWorker, SysUserWorker, TaskWorker
from worker_driver_mixins import CsMixin, SysUserMixins
import resources.SearchProtocols as sch
from pprint import pprint


from playwright.sync_api import APIRequestContext, APIResponse


@define
class WorkerDriver(CsMixin, SysUserMixins):
    """
    Empty shell that encapsulates inherited mixins that provide the high level scripting to carry out tasks.
    It is meant to be used with a mixin that provides the class method initializer which will create the associated workers to carry out high level functions provided by other mixins.
    """

    ...


def main():
    pwcontext: APIRequestContext = get_pw_request_api()
    w: WorkerDriver = WorkerDriver.from_pw(pwcontext)
    resp = w.cs.method_by_number(
        "CS0001013", method="PATCH", data={cse.CLOSE_NOTES: "abdsfwertwer"}
    )
    pprint(resp)


if __name__ == "__main__":
    main()
