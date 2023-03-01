import json
from pathlib import Path
import re

def get_configs():
    file = Path(__file__).parent / "configs.json"
    with open(file, 'r') as f:
        configs = json.load(f)
        return configs

def config_cookie_and_header():
    config1 = get_configs()
    config2 = {
        'headers': config1['headers'],
        'cookies': config1['cookies']
    }
    return config2

def regex_email(data:str):
    configs = get_configs()
    filters:list = configs['filters']
    for filter in filters:
        data.replace(filter, "")
    regexsyntax = re.compile(
        r"""
        [a-zA-Z0-9_.]+ #username
        @ #@ symbol
        [a-zA-Z0-9_.]+ #domain name
        """,
        re.VERBOSE,
    )
    regexresults = regexsyntax.findall(data)
    CCList = ",".join(regexresults)
    Sender = regexresults[0]
    return (Sender, CCList)

