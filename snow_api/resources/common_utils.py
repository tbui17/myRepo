import json
from pathlib import Path
import re
from re import Pattern
from typing import LiteralString, Any

def get_configs()-> Any:
    file: Path = Path(__file__).parent / "configs.json"
    with open(file, 'r') as f:
        configs: Any = json.load(f)
        return configs

def regex_email(data:str) -> tuple[str, LiteralString] | None:
    configs: dict = get_configs()
    filters:list = configs['filters']
    for filter in filters:
        data.replace(filter, "")
    regexsyntax: Pattern[str] = re.compile(
        r"""
        [a-zA-Z0-9_.]+ #username
        @ #@ symbol
        [a-zA-Z0-9_.]+ #domain name
        """,
        re.VERBOSE,
    )
    regexresults: list = regexsyntax.findall(data)
    if regexresults:
        CCList: LiteralString = ",".join(regexresults)
        Sender: str = regexresults[0]
        return (Sender, CCList)
    else:
        return None


