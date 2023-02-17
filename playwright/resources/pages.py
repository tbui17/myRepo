from .res_imports import *


@dataclass
class ticket_page():
    ## these buttons have a shadow root directly underneath. The only other way to differentiate them is their index number which means they may accidentally refer to a different button if their positions change
    
    save: str = r"""document.querySelector("body > ts-app").shadowRoot.querySelector("div > div.controls > div.control-group.profile > div > paper-dropdown-menu").shadowRoot.querySelector("\#input").shadowRoot.querySelector("\#input-4 > [aria-labelledby='paper-input-label-4']")"""

    more_actions: str = r""" {};"""
    compose_email_button: str = r""" {};"""

    ## may be prone to breaking if search results return more than one template
    templates_table: str = r""" {}"""
    templateButton: str = r""" {};"""
    templateSearchBar: str = r""" {};"""
    undoButton: str = r""" {};"""
    firstTemplate: str = r"""{};"""
    h2FirstTemplate: str = r"""{};"""

    
    
    kbaSearchBar:str = r"""{};"""
    firstKbaCard:str = r"""{};"""


    description_field: str = r""" {};"""
    short_description_field: str = r""" {};"""
    work_notes_field: str = r""" {};"""
    
    assignedToField: str = r""" {}"""
    assignmentGroupField: str = r""" {}"""

    ## ribbon
    userID: str = r""" {};"""
    phoneNumber: str = r""" {};"""
    email: str = r""" {};"""

    tabBar: str = r""" {}"""

@dataclass
class incident_page(ticket_page):
    
    createSecurityIncidentButton: str = r"""document.querySelector("\#rso > div:nth-child(2) > div > div > div > div:nth-child(2) > div");"""
    
    
    accountLockedTemplate: str = r""" searchDictCardHeader(this, 'accountLocked')"""
    categoriesTemplate: str = r""" {};"""
    emailsTemplate: str = r""" {};"""
    followUpTemplate: str = r""" {};"""
    
@dataclass
class cs_page(ticket_page):
    contactField:str=r"""{};"""
    createIncidentButton:str = r""" {};"""
    proposeSolutionsButton:str = r""" {};"""
    assignToMeButton:str = r""" {}"""


class emailPage():
    def __init__(self) -> None:
        
        self.emailDocument = r""" {};"""
        self.bodyDocument = r""" {};"""

        self.toField = r""" {};"""
        self.ccField = r""" {};"""
        self.subjectField = r""" {};"""
        self.textField = r""" {};"""
        self.sendButton = r""" {};"""
        self.redErrorBanner = r""" {};"""

class securityIncidentPage():
    def __init__(self) -> None:
        self.saveButton = r""" {}"""

        self.templateButton = r""" {}"""
        self.templateSearchBar = r""" {};"""
        self.macTemplate = r"""{}"""
        self.adhocTemplate = r""" {}"""
        self.undoButton = r""" {};"""

        self.ticketNumber = r""" new HTMLFormElement()"""

        self.closeButton = r""" {}"""