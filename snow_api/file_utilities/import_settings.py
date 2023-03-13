import json
from pathlib import Path

from tkinter.filedialog import askopenfilename


def filepicker():
    filename = (
        askopenfilename()
    )  # show an "Open" dialog box and return the path to the selected file
    print(filename)
    return filename


user_configs = filepicker()
