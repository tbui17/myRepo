from resources import funct
from resources.playwright_get_cookies import get_auth_and_cookies
from resources.request_setup import *
import requests
from small_scripts import general as ge

cond_breakpoints = True

def test_get_auth_and_cookies():
    res = get_auth_and_cookies()
    assert res is not None
