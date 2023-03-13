from playwright.sync_api import APIRequestContext
from resources.workers import TaskWorker
from resources.workers import CsWorker
from resources.playwright_functions import get_pw_request_api
from resources.table_enumerators import (
    TableEnums as tbe,
    StateEnums as st,
    TaskEnums as ta,
    CsEnums as cse,
    ResolutionCodeEnums as rc,
)
from worker_driver import WorkerDriver



def main():
    ...
    # pwsession: APIRequestContext = get_pw_request_api()
    # wd: WorkerDriver = WorkerDriver(session=pwsession)
    # print(wd.sysuser.get_user_by_email('admin@example.com'))
    # worker: TaskApiWorker = TaskApiWorker()
    # worker.get_by_number('CS0001013')
    # general.one_step(number='CS0001013',message='Ensure that your internet connection is stable.', state=st.RESOLVED, kb="KB0000014")


if __name__ == "__main__":
    main()
