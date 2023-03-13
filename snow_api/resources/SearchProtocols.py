from abc import ABC, abstractmethod
import logging
from typing import cast
import inspect

from resources.table_enumerators import SysUserEnums

class SearchProtocol(ABC):
    
    @abstractmethod
    def make_user_param(self, data_input) -> dict:
        ...

class ByMail(SearchProtocol):
    
    def make_user_param(self, data_input):
        return {SysUserEnums.EMAIL:data_input}
    
    
    
class ByUserName(SearchProtocol):
    def make_user_param(self, data_input):
        return {SysUserEnums.USER_NAME:data_input}

class ByCustom(SearchProtocol):
    def make_user_param(self, data_input):
        return data_input