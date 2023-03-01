from resources import funct
from resources.playwright_get_cookies import get_auth_and_cookies
from resources.request_setup import *
import requests
from small_scripts import general as ge

cond_breakpoints = True

def test_show_three_return_is_three():
    assert funct.show_three() == 3

def test_1():
    h1 = task_get(params={"number":"INC0010018"}, **get_auth_and_cookies())
    resp = requests.get(**h1.__dict__)

def test_2():
    ge.write_ticket('abc','def')