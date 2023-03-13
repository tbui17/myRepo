from typing import Self
from configs import uconfigs as cfg
from resources.table_enumerators import (
    CsEnums as cse,
    ResolutionCodeEnums as rce,
    StateEnums as se,
    SysUserEnums as sue
)
from resources.workers import CsWorker, IncWorker, SysUserWorker, TaskWorker
from attrs import define, field


from playwright.sync_api import APIRequestContext


@define
class Initializer:
    """
    Summary: Attribute declaration and class initializer function

    Description:

    Declares the attributes for mixins that inherit from this class so that they have type checking and autocompletes.
    Provide a class initializer method to generate the associated attributes.

    """

    cache: dict
    se:APIRequestContext
    task: TaskWorker
    cs: CsWorker
    inc: IncWorker
    suser: SysUserWorker

    @classmethod
    def from_pw(cls, session: APIRequestContext) -> Self:
        return cls(
            cache={},
            se = session,
            task=TaskWorker(session=session),
            cs=CsWorker(session=session),
            inc=IncWorker(session=session),
            suser=SysUserWorker(session=session),
        )
    def unpack_workers(self)-> tuple[dict,APIRequestContext,TaskWorker,CsWorker,IncWorker,SysUserWorker]:
        return self.cache,self.se,self.task,self.cs,self.inc,self.suser


class CsMixin(Initializer):
    def awaiting_info(
        self, number: str, message: str, mail: bool = True, kb: str | None = None
    ) -> dict:
        """Writes message in work note and puts ticket state in awaiting info. If mail=true, will mail message to the user."""
        response: dict = self.cs.method_by_number(
            number=number,
            method="PATCH",
            data={
                cse.WORK_NOTES: "Sent mail\n" + message,
                cse.STATE: se.AWAITING_INFO,
            },
        )
        if mail:
            self.cs.send_mail(number, message)
        if kb:
            self.cs.attach_kb(kb_number=kb, cs_number=number)

        return response

    def resolve(
        self, number: str, message: str, kb: str | None = None, mail: bool = True
    ) -> dict:
        """
        Similar to awaiting_info but adds the following:
        sets state to resolve
        adds resolution code
        adds kb (optional)
        adds close note.
        """
        response: dict = self.cs.method_by_number(
            number=number,
            method="PATCH",
            data={
                cse.WORK_NOTES: "Sent mail\n" + message,
                cse.STATE: se.RESOLVED,
                cse.RESOLUTION_CODE: rce.SOLVED_SUPPORT,
                cse.CLOSE_NOTES: message,
            },
        )
        if kb:
            self.cs.attach_kb(kb_number=kb, cs_number=number)
        if mail:
            self.cs.send_mail(number, message)
        return response

    def already_done(self, number_list: list) -> list:
        """
        Mass function. Sets state to resolved. If no one is assigned, assigns the default in configs.
        This was not made an async operation because all the requests are sent to one server. This would cause server instability if it was all sent at once.
        """
        responses: list = []
        body: dict = {cse.STATE: se.RESOLVED}
        for number in number_list:
            resp: dict = self.cs.get_by_number(number)
            finalbody: dict = (
                body
                if resp[cse.ASSIGNED_TO]
                else body | {cse.ASSIGNED_TO: cfg.assigned_to_default}
            )
            response: dict = self.cs.method_by_number(
                number, method="PATCH", data=finalbody
            )
            responses.append(response)
        return responses
    
    


class SysUserMixins(Initializer):
    ...