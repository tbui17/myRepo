from typing import Literal
from resources.data_types import FieldResp
from resources.request_setup import TableApiWorker
from resources.pages import task_fields as fi
from resources.pages.table_enumerators import (
    TableEnums as tbl,
    state_enums as st,
    task_enums as ta,
    cs_enums as ce,
    resolution_code_enums as rc,
)

from resources.common_utils import get_configs


configs = get_configs()
user_default = configs["assigned_to_default"]
assign_default = configs["assignment_group_default"]


def validate_assigned(res: dict, body: dict):

    if res["assigned_to"] is None:
        body["assigned_to"] = user_default
        body["assignment_group"] = assign_default
    return True


def ticket_action(
    api_worker: TableApiWorker | None, number: str, body: dict, val_assigned=False
) -> dict[str, FieldResp]:
    """_summary_
        val_assigned redundant for now
    Args:
        api_worker (TableApiWorker): _description_
        number (str): _description_
        body (dict): _description_
        val_assigned (bool, optional): _description_. Defaults to False.

    Returns:
        _type_: _description_
    """

    if api_worker:
        worker: TableApiWorker = api_worker
    else:
        worker = TableApiWorker()

    res: dict = worker.get_by_number(number)
    sys_id: str = res["sys_id"]["value"]
    if val_assigned:
        validate_assigned(res, body)
    res2: dict[str, FieldResp] = worker.patch_task(sys_id, body)
    return res2


def one_step(
    number: str,
    message: str,
    state: str,
    kb: str | None = None,
    mail: bool = True,
) -> Literal[True]:
    """!!!CHECK STATE, KB, MAIL. Note that mail is true by default."""
    # Create worker
    csworker: TableApiWorker = TableApiWorker(table_name=tbl.SN_CUSTOMERSERVICE_CASE)

    # conditional body creation
    body: dict = {ce.WORK_NOTES: message}
    match state.title():
        case st.RESOLVED:
            body.update(
                {
                    ce.CLOSE_NOTES: message,
                    ce.RESOLUTION_CODE: "1",  # the first option
                    ce.STATE: st.RESOLVED,
                }
            )
        case st.AWAITING_INFO:
            body.update({ce.STATE: st.AWAITING_INFO})
        case st.OPEN | st.NEW | st.CLOSED | st.CANCELLED:
            ...
        case _:
            raise Exception("Invalid state.")

    ticket_action(csworker, number, body)
    if mail:
        csworker.send_mail(number, message)
    if kb:
        csworker.attach_kb(kb, number)

    return True
