import re
import pyautogui as pa
import time
import pyperclip
import cv2

#Vars
data = """
LEXMARK CHI-6-142 asdas d qwjmfiomdsio vjiosdj kqwpodk LEXMARK CHI-6-143
"""
Assignment_Group = 'Baltimore Support'

#Coordinates
# Coords_Create_New = 
# Coords_Printers2 = 
# Coords_Assignment_Group = 
# Coords_Short_Description = 
# Coords_Save = 
# Coords_Ticket_Number = 
# Coords_Printers_Applied = 
# Coords_Create_Security_Incident = 
# Coords_Submit = 


# DEBUG COORDINATES
# Coords_Create_New = (2701,615)
# Coords_Printers2 = (2701,615)
# Coords_Assignment_Group = (2701,615)
# Coords_Short_Description = (2701,615)
# Coords_Save = (2701,615)
# Coords_Ticket_Number = (1785,429)
# Coords_Printers_Applied = (1785,429)
# Coords_Create_Security_Incident = (1785,429)
# Coords_Submit = (1785,429)

#Locate On Screen Inputs
Submit = 1
Printers_Applied = 2
Create_Security_Incident = 3

#Pictures Paths
Pic_Printers_Applied =  #Printers2 template applied. Checks if page has fully loaded after using the template.
Pic_Create_Security_Incident =  #Checks page if it has finished saving.
Pic_Submit =  #Checks if loading finished after creating new ticket.


#Regions
#You can pass a four-integer tuple of the left, top, width, and height of the region to capture
create_new_region = 
save_region = 
printers2_region = 

def regex(data):
    importedresults = data
    regexsyntax = re.compile(r"""
    (LEXMARK\s+\S+)
    """, re.VERBOSE)
    finalresult = regexsyntax.findall(importedresults)
    print("Raw list: ")
    print(finalresult)
    return finalresult

def locate_on_screen(data):
    count = 0
    while True:
        print(f"Beginning locateOnScreen for {data}...")
        if data is Submit:
            res1 = pa.locateOnScreen(Pic_Submit, region=create_new_region, confidence=0.9)
        elif data is Printers_Applied:
            res1 = pa.locateOnScreen(Pic_Printers_Applied, region=printers2_region, confidence=0.9)
        elif data is Create_Security_Incident:
            res1 = pa.locateOnScreen(Pic_Create_Security_Incident, region=save_region, confidence=0.9)
        else:
            raise Exception("Invalid data provided for locateOnScreen")
        if res1 is None:
            if count == 3:
                raise Exception("Tried 3 additional times, process still not complete or other error. See log.")
            count+=1
            print(f"Process not done yet. Retrying {3 - count} more times.")
            print("Sleeping for 6 seconds...")
            time.sleep(6)
        else:
            print("Found picture on screen.")
            break

def script1(data):
    def clear():
        with pa.hold('ctrl'):
            pa.press('a')
        pa.press('backspace')
    def copy():
        with pa.hold('ctrl'):
            pa.press('c')
    def writeToFile():
        with open('tick_num.txt', 'a') as f:
            res = pyperclip.paste()
            print(f"Copied and wrote ticket number {res}")
            f.write('\n' + res)
            
    printer_name = data
    
    #Create new ticket
    pa.click(Coords_Create_New[0], Coords_Create_New[1])
    sleep1 = 3
    print(f"Clicked create new, now sleeping for {sleep1} seconds...")
    time.sleep((sleep1))
    print("Checking if process has finished.")
    locate_on_screen(Submit)
    print("Process finished.")
    
    #Use template
    pa.click(Coords_Printers2[0], Coords_Printers2[1])
    sleep2 = 2
    print(f"Clicked printer template, now sleeping for {sleep2} seconds...")
    time.sleep(sleep2)
    print("Checking if process has finished.")
    locate_on_screen(Printers_Applied)
    print("Process finished.")
    
    #Add printer to beginning of short description
    pa.click(Coords_Short_Description[0], Coords_Short_Description[1])
    pa.press('home')
    pa.write(printer_name)
    
    #Write the assignment group
    pa.click(Coords_Assignment_Group[0], Coords_Assignment_Group[1])
    clear()
    pa.write(Assignment_Group)
    
    #Get ticket number and write to file
    pa.click(Coords_Ticket_Number[0], Coords_Ticket_Number[1])
    pa.click(Coords_Ticket_Number[0], Coords_Ticket_Number[1])
    copy()
    writeToFile()
    
    #Save
    pa.click(Coords_Save[0], Coords_Save[1])
    sleep3 = 6
    print(f"Clicked save, now sleeping for {sleep3} seconds...")
    time.sleep(sleep3)
    print("Checking if process has finished.")
    locate_on_screen(Create_Security_Incident)
    print("Process finished.")
    


def main():
    print("Beginning program.")
    reslist = regex(data)
    for i in reslist:
        print(f"======Creating ticket for {i}")
        script1(i)
        print(f"======Finished ticket for {i}")
    print("Program completed. Ending program.")
    
if __name__ == '__main__':
    main()
    
# [a-zA-Z0-9_.]+ #username
# @ #@ symbol
# [a-zA-Z0-9_.]+ #domain name
