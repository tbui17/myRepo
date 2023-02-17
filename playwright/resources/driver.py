"""
Imports and settings for setup of webdriver. Use the following to get started.

# w = webdriver.Chrome(driver_path, options=options)
# w.get("https://www.google.com")
"""
from .res_imports import *


class window():
    
    def __init__(self) -> None:
        _options = []
        _options.append(r"user-data-dir=C:\Users\PCS\AppData\Local\Google\Chrome\User Data")
        _options.append('profile-directory=Default')
        
        
        
        
# def wexist(self, page: str):
#         attemptNumber = 0
#         elementres = None
#         sleeptime = 0
#         while attemptNumber <=5 and elementres is None:
#             try:
#                 attemptNumber+=1
#                 sleep(sleeptime)
#                 sleeptime+=1
                
#             except BaseException as error:
#                 print(f"Failed. Error: {error}")
#                 print(f"sleeptime: {sleeptime} attemptNumber: {attemptNumber}")
#         if elementres is None:
#             raise Exception('5 attempts tried, element could not be found.')
#         return elementres
    
# def w_click(self, element):
#     element.click()

# def find_element(self):
#     elementres = self.driver.execute_script(f"return {self.name}")


# driver_path = r"C:\Users\PCS\Documents\Python_Projects\General\seleniumjupyter\chromedriver.exe"
# options = webdriver.ChromeOptions()
# options.add_argument(r"user-data-dir=C:\Users\PCS\AppData\Local\Google\Chrome\User Data")
# options.add_argument('profile-directory=Default')
# w = driver(driver_path, options=options)
# w = webdriver.Chrome(driver_path, options=options)
# w.get("https://www.google.com")