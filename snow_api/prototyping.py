from resources.playwright_get_cookies import get_auth_and_cookies
import requests

import re
from resources.pages import task_fields as fi

from resources.common_utils import get_configs

configs = get_configs()

dic1 = get_auth_and_cookies()
headers_default = configs['headers']
cookies_default = configs['cookies']
tableName = "incident"
tableName3 = "m2m_kb_task"
test_work_note = """
        sdfsodfijiowefj
        awefojioawefjawio
        w3r23rj23093rj
        mdsd
        wopewijijk!wjioJ
        aw
        """
number = 'INC0010018'

resp = requests.get(
    url=f"https://dev40853.service-now.com/api/now/table/{tableName}?",
    headers=headers_default,
    params={"number": number},
    cookies=cookies_default
)
respjson = resp.json()
respresult = respjson['result']

if resp.ok is not True:
    raise Exception(f"{resp.status_code} {resp.reason}: {resp.text}")

resp_json: dict = resp.json()
result: list = resp_json["result"]
first_ticket: dict = result[0]
tick_number: str = first_ticket["number"]
sys_id: str = first_ticket["sys_id"]


resp2 = requests.patch(
    url=f"https://dev40853.service-now.com/api/now/table/{tableName}/{sys_id}?",
    headers=headers_default,
    params={
        "sysparm_display_value": "all",
        "sysparm_input_display_value": "true",
    },
    json={
        f"{fi.work_notes}": "tawefiowaejoijdsfl",
    },
    cookies = cookies_default,
)

resp3 = requests.post(
    url=f"https://dev40853.service-now.com/api/x_980299_a1/asdflow",
    headers=headers_default,
    json={
        "number": 'INC0010018',
        "to": "admin@example.com",
        "cc": 'admin@example.com',
        "subject": "INC0010018 - This message",
        "message": test_work_note
    },
    cookies = cookies_default,
)

####
#kb_knowledge attach


resp5 = requests.post(
    url=f"https://dev40853.service-now.com/api/now/table/{tableName3}?",
    headers=headers_default,
    params={
        "sysparm_display_value": "all",
        "sysparm_input_display_value": "true",
    },
    json={
        "task":"CS0001001",
        "kb_knowledge":f"KB0000011"
    },
    cookies = cookies_default,
)

####




print("Successfully made changes")
