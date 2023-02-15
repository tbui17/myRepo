import re
import sys
from PySide6.QtWidgets import *
import pyperclip

class mainWidget(QWidget):
    def __init__(self):
        super().__init__()


        #Widgets

        labelEntryBox = QLabel("Entry")
        self.entryBox = QLineEdit()
        self.entryBox.returnPressed.connect(self.regex)
        
        labelCCBox = QLabel("CC'd")
        self.CCBox = QPlainTextEdit()
        self.CCBox.setReadOnly(True)

        copyButton = QPushButton("Copy CC")
        copyButton.clicked.connect(self.copyMethodCC)

        copySenderButton = QPushButton("Copy Sender")
        copySenderButton.clicked.connect(self.copyMethodSender)

        convertButton = QPushButton("Convert")
        convertButton.clicked.connect(self.regex)

        labelSenderBox = QLabel("Sender")
        self.SenderBox = QPlainTextEdit()
        self.SenderBox.setReadOnly(True)
        

        #Layouts
        h1Layout = QHBoxLayout()
        h1Layout.addWidget(labelEntryBox)
        h1Layout.addWidget(self.entryBox)
        
        h2Layout = QHBoxLayout()
        h2Layout.addWidget(labelSenderBox)
        h2Layout.addWidget(convertButton)
        h2Layout.addWidget(copyButton)
        h2Layout.addWidget(copySenderButton)

        v1Layout = QVBoxLayout()
        v1Layout.addLayout(h1Layout)
        v1Layout.addLayout(h2Layout)
        v1Layout.addWidget(self.SenderBox)
        v1Layout.addWidget(labelCCBox)
        v1Layout.addWidget(self.CCBox)

        self.setLayout(v1Layout)

    #Slots

    def regex(self):
        importedresults = self.entryBox.text()
        regexsyntax = re.compile(r"""
        [a-zA-Z0-9_.]+ #username
        @ #@ symbol
        [a-zA-Z0-9_.]+ #domain name
        """, re.VERBOSE)
        regexresults = regexsyntax.findall(importedresults)
        CCList = "; ".join(regexresults)
        Sender = regexresults[0]
        self.SenderBox.clear()
        self.CCBox.clear()
        self.SenderBox.appendPlainText(Sender)
        self.CCBox.appendPlainText(CCList)


    def copyMethodCC(self):
        results = self.CCBox.toPlainText()
        pyperclip.copy(results)

    def copyMethodSender(self):
        results = self.SenderBox.toPlainText()
        pyperclip.copy(results)


app = QApplication(sys.argv)

widget = mainWidget()
widget.show()

app.exec()