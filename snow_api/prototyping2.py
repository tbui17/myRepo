# from dataclasses import dataclass

# @dataclass(kw_only=True)
# class Parent:
#     param1: str
#     param2: str
#     param4: str | None = None

# @dataclass(kw_only=True)
# class Child(Parent):
#     param3: str = 'abd'
#     param2: str = "default_value"
#     param5: str

# a1 = Child(param1 = 'strd', param5='bbrre4')
# print(a1.__dict__)