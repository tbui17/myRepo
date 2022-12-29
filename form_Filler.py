from datetime import timedelta, datetime
import pyautogui, time
from dataclasses import dataclass


class date_input():
    def __init__(self) -> None:
        self.dayToChange = '12/29/2022'
        self.coordinates_first_field = (2380, 765)
        self.coordinates_finalize_box = (2780, 865)
        self.dictInputs = {
            "Today's Date" : self.dayToChange,
            'Day After Date': self.dateDayAfter(),
            'Time In':"08:00 PM",
            'Time Out':"04:30 AM",
            'Lunch Time In':'12:00 AM',
            'Lunch Time Out':'12:30 AM',
        }

    def dateDayAfter(self):
        day = self.dayToChange
        dtObject_day = datetime.strptime(day, '%m/%d/%Y')
        dtObject_dayAfter = dtObject_day + timedelta(days=1)
        return(
            datetime.strftime(dtObject_dayAfter, '%m/%d/%Y')
        )
    
    def formInput(self):
        pyautogui.moveTo(self.coordinates_first_field)
        pyautogui.click()
        time.sleep(0.05)
        for k, v in self.dictInputs.items():
            print("Writing form '%s'..." %(k))
            with pyautogui.hold('ctrl'):
                pyautogui.press('a')
            time.sleep(0.05)
            pyautogui.press('backspace')
            time.sleep(0.05)
            pyautogui.write(v)
            pyautogui.sleep(0.05)
            pyautogui.press('tab')
            pyautogui.sleep(0.05)
            print("Finished writing form '%s'" %(k))
        print("Checkmarking finalize box")
        pyautogui.click(self.coordinates_finalize_box)
        print("Finished with all inputs.")
        


dateInputObj = date_input()
dateInputObj.formInput()