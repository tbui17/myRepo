from datetime import timedelta, datetime
import pyautogui, time, mouseinfo, pyperclip
from dataclasses import dataclass
    

class dateInput():
    def __init__(self, userInput) -> None:
        self.dayToChange = userInput
        # self.coordinates_first_field = (2380,765) #DEBUG
        # self.coordinates_finalize_box = (2780,865) #DEBUG
        self.coordinates_first_field = (541,718) #DEBUG
        self.coordinates_finalize_box = (1057,811) #DEBUG
        self.dictInputs = {
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
        pyautogui.PAUSE = 0.05
        pyautogui.moveTo(self.coordinates_first_field[0], self.coordinates_first_field[1])
        pyautogui.click()
        time.sleep(0.1)
        for k, v in self.dictInputs.items():
            print("Writing form '%s' with value '%s'..." %(k, v))
            
            #CLEAR FORM
            
            with pyautogui.hold('ctrl'):
                pyautogui.press('a')
            pyautogui.press('backspace')
            
            
            #WRITE
            
            pyautogui.write(v)
            time.sleep(0.1)
            
            
            #TAB OVER
            
            pyautogui.press('tab')
            # pyautogui.press('enter') #DEBUG2
            time.sleep(0.3)
            
            
            print("Finished writing form '%s'" %(k))
        pyautogui.click(self.coordinates_finalize_box[0], self.coordinates_finalize_box[1])
        print("Checkmarked finalize box")
        print("Finished with all inputs.")
    
    @staticmethod
    def userInput():
        while True:
            print("Type in the date you wish to change (MM/DD/YYYY) or type exit to stop.")
            userInput = input()
            if userInput == "exit":
                print("Program exited.")
                exit()
            try:
                if len(userInput) != 10: #Cannot catch strings of len = 10 like "1234567890" or "abcdefghij"
                    print("Not a valid date format. Please try again.")
                    raise Exception
            except:
                print("Error at userInput()")
            else:
                break
        return userInput

    def userInputSecond(self):
        #take user input or exit
        while True:
            print("Type in a number representing the next day in the week to change (Sunday = 1, Saturday = 7) or type exit.")
            userInput2 = input()
            if userInput2 == "exit":
                print("Program exited.")
                exit()
            #test user input
            try:
                userInput2 = int(userInput2)
                if userInput2 not in range (1, 8):
                    raise Exception("n")
                break
            except:
                print("Must specify a number from 1-7")
        #convert user input
        dayToBeChanged = self.dateDayDelta(userInput2)
        return dayToBeChanged
    
    
    def dateDayDelta(self, userInput2):
        day = self.dayToChange
        dtObject_day = datetime.strptime(day, '%m/%d/%Y')
        dtObject_Monday = dtObject_day - timedelta(days = dtObject_day.weekday())
        if userInput2 > 1 :
            dtObject_Day_To_Be_Changed = dtObject_Monday + timedelta(days=userInput2-2)
        else:
            dtObject_Day_To_Be_Changed = dtObject_Monday + timedelta(days=6)
        return(
            datetime.strftime(dtObject_Day_To_Be_Changed, '%m/%d/%Y')
        )

prev_data = None
firstAttempt = True
quickMode = True
while True:
    if firstAttempt == True:
        userInput = dateInput.userInput()
        firstAttempt = False
    elif quickMode == True:
        print("Quick Mode is ON.")
        userInput = dateInputObj.userInputSecond()
    else:
        userInput = dateInput.userInput()
    dateInputObj = dateInput(userInput)
    dateInputObj.formInput()
    prev_data = userInput
    print("Starting another loop")
    with pyautogui.hold('alt'):
            pyautogui.press('tab')

# mouseinfo.mouseInfo()