from resources.request_setup import TableApiWorker
from resources.playwright_get_cookies import get_auth_and_cookies
from small_scripts import general
from resources.pages.table_enumerators import (
    TableEnums as tbl,
    state_enums as st,
    task_enums as ta,
    cs_enums as ce,
    resolution_code_enums as rc,
)


def main():
    get_auth_and_cookies()
    general.one_step(number='CS0001013',message='Ensure that your internet connection is stable.', state=st.RESOLVED, kb="KB0000014")
    

if __name__ == "__main__":
    main()
