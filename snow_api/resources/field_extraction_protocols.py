# from abc import ABC, abstractmethod
# import logging
# from typing import cast
# import inspect

# from resources.table_enumerators import SysUserEnums

# class FieldExtractionProtocol(ABC):
    
#     @abstractmethod
#     def get_value(self, input:dict) -> dict:
#         ...

# class FirstValue:
#     def get_value(self, input:dict) -> dict:
#         return input

# class DisplayValue:
#     def get_value(self, input:dict) -> dict:
#         return {k:v.display_value for (k,v) in input.items()}

# class SystemValue:
#     def get_value(self, input:dict) -> dict:
#         return {k:v.value for (k,v) in input.items()}