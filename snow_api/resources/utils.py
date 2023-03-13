import json
from pathlib import Path
import re
from re import Pattern
from typing import LiteralString, Any
import configs.uconfigs as cfg
import yaml
import pyperclip


def regex_email(data_input: str) -> tuple[str, LiteralString] | None:
    filters: list = cfg.filters
    for filter in filters:
        data_input.replace(filter, "")
    regexsyntax: Pattern[str] = re.compile(
        r"""
        [a-zA-Z0-9_.]+ #username
        @ #@ symbol
        [a-zA-Z0-9_.]+ #domain name
        """,
        re.VERBOSE,
    )
    regexresults: list = regexsyntax.findall(data_input)
    if not regexresults:
        return None
    CCList: LiteralString = ",".join(regexresults)
    Sender: str = regexresults[0]
    return (Sender, CCList)

def dict_to_yaml(data_input:dict)->str:
    return yaml.dump(data_input)

def copy_dict_yaml(data_input:dict)->None:
    pyperclip.copy(yaml.dump(data_input))
    
def filter_fields(table_entry:dict,field_names:list) ->dict:
    """Return a subset of the original fields in a dict."""
    return {k:v for k,v in table_entry.items() if k in field_names}