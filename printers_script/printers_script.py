import re
import pyautogui as pa
import time
import pyperclip

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


#DEBUG COORDINATES
Coords_Create_New = (2701,615)
Coords_Printers2 = (2701,615)
Coords_Assignment_Group = (2701,615)
Coords_Short_Description = (2701,615)
Coords_Save = (2701,615)
Coords_Ticket_Number = (1785,429)


def regex(data):
    importedresults = data
    regexsyntax = re.compile(r"""
    (LEXMARK\s+\S+)
    """, re.VERBOSE)
    finalresult = regexsyntax.findall(importedresults)
    print("Raw list: ")
    print(finalresult)
    return finalresult

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
    
    #Create new ticket then use template
    pa.click(Coords_Create_New[0], Coords_Create_New[1])
    sleep1 = 3
    print(f"Clicked create new, now sleeping for {sleep1} seconds...")
    time.sleep((sleep1))
    pa.click(Coords_Printers2[0], Coords_Printers2[1])
    sleep2 = 2
    print(f"Clicked printer template, now sleeping for {sleep2} seconds...")
    time.sleep(sleep2)
    
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
