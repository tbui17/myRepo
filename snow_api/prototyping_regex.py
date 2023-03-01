# import re
# from resources.playwright_get_cookies import get_auth_and_cookies
# import requests
# from resources.pages import task_fields as fi

# def regexmethod(data):
#     regexsyntax = re.compile(
#         r"""
#         [a-zA-Z0-9_.]+ #username
#         @ #@ symbol
#         [a-zA-Z0-9_.]+ #domain name
#         """,
#         re.VERBOSE,
#     )
#     regexresults = regexsyntax.findall(data)
#     CCList = ",".join(regexresults)
#     Sender = regexresults[0]
#     return (Sender, CCList)

# headers_default, cookies_default = get_auth_and_cookies()
# tableName = "sn_customerservice_case"
# tableName2 = "kb_knowledge"
# tableName3 = "m2m_kb_task"
# test_work_note = """
#         sdfsodfijiowefj
#         awefojioawefjawio
#         w3r23rj23093rj
#         mdsd
#         wopewijijk!wjioJ
#         aw
#         """
# number = 'CS0001001'

# resp = requests.get(
#     url=f"https://dev40853.service-now.com/api/now/table/{tableName}?",
#     headers=headers_default,
#     params={"number": number},
#     cookies=cookies_default
# )
# respjson = resp.json()
# respresult = respjson['result']

# if resp.ok is not True:
#     raise Exception(f"{resp.status_code} {resp.reason}: {resp.text}")

# resp_json: dict = resp.json()
# result: list = resp_json["result"]
# first_ticket: dict = result[0]
# tick_number: str = first_ticket["number"]
# sys_id: str = first_ticket["sys_id"]
# desc:str = first_ticket['description']
# regex_result = regexmethod(desc)
# print(regex_result)