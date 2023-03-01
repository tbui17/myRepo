from resources.request_setup import *
from resources.pages import task_fields as fi
from resources.pages.table_enumerators import TableEnums as te, cs_enums as ce

from resources.common_utils import get_configs, config_cookie_and_header


configs = get_configs()
config2 = config_cookie_and_header()


def ticket_action(number, message, kb):
    gpatcher = TableApi()
    gpatcher.json={}
    res = gpatcher.gpatch_task(number)
    gpatcher.get_by_task_number(number)
    gpatcher.send_mail(number, message)
    gpatcher.attach_kb(kb, number)
    print(res)