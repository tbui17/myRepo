
const savedStrings = {
  accountLockedString: "",
  deskEmailString: "",
  sirString: "",
  sirShortDescBefore: "",
  sirShortDescAfterMac: "",
  sirShortDescAfterAdhoc: "",
};

class csPage {
  static acceptButton = () => new HTMLElement()
  static saveButton = () => {};

  // All elements under More Actions button are hidden until moreActions is pressed, wait 0.1s for element to appear.
  static moreActionsButton = () => new Element()
  static composeEmailButton = () => {};
  static createIncidentButton = () => {};
  static proposeSolutionsButton = () => {};

  // may be prone to breaking if search results return more than one template
  static templateButton = () => {};
  static templateSearchBar = () => {};
  static undoButton = () => {};
  static firstTemplate = ()=>{};
  static h2FirstTemplate = ()=>{};

  static kbaSearchBar = () =>{};
  static firstKbaCard = ()=>{};


  static descriptionBox = () => {};
  static shortDescriptionField = () => {};
  static workNotesBox = () => {};
}

class incidentPage {
  // these buttons have a shadow root directly underneath. The only other way to differentiate them is their index number which means they may accidentally refer to a different button if their positions change
  static createSecurityIncidentButton = () =>
    document.querySelector(
      "#rso > div:nth-child(2) > div > div > div > div:nth-child(2) > div"
    );
  static saveButton = () =>
    document.querySelector(
      "#rso > dasdiv:nth-child(2) > div > div > div > div:nth-child(2) > div"
    );

  static moreActionsButton = () => {};
  static composeEmailButton = () => {};

  // may be prone to breaking if search results return more than one template
  static templatesTable = () => {}
  static templateButton = () => {};
  static templateSearchBar = () => {};
  static undoButton = () => {};
  static firstTemplate = ()=>{};
  static h2FirstTemplate = ()=>{};

  static accountLockedTemplate = () => searchDictCardHeader(this, 'accountLocked')
  static categoriesTemplate = () => {};
  static emailsTemplate = () => {};
  static followUpTemplate = () => {};

  static descriptionBox = () => {};
  static shortDescriptionField = () => {};
  static workNotesBox = () => {};
  static callerField = () => {};
  static followUpDateField = () => {};
  static statusChoice = () => {};

  // ribbon
  static userID = () => {};
  static phoneNumber = () => {};
  static email = () => {};
}

class emailPage {
  static emailDocument = () => {};
  static bodyDocument = () => {};

  static toField = () => {};
  static ccField = () => {};
  static subjectField = () => {};
  static textField = () => {};
  static sendButton = () => {};
  static redErrorBanner = () => {};
}
class securityIncidentPage {
  static saveButton = () => {}

  static templateButton = () => {}
  static templateSearchBar = () => {};
  static macTemplate = ()=>{}
  static adhocTemplate = () => {}
  static undoButton = () => {};

  static ticketNumber = () => new HTMLFormElement()

  static closeButton = () => {}
}

class requestPage {
  // constructor()

}

class oldCsPage {}

const oldIncPage = {
  iframe: () => {},

  numberField: () => {},
  email: () => {},
  businessPhone: () => {},
  contractor: () => {},
  preferredContactMethod: () => {},
  category: () => {},
  subcategory: () => {},
  businessService: () => {},
  configurationItem: () => {},
  attachKba: () => {},

  opened: () => {},
  openedBy: () => {},
  channel: () => {},
  state: () => {},
  impact: () => {},
  urgency: () => {},
  priority: () => {},
  previousAssignmentGroup: () => {},
  assignmentGroup: () => {},
  assignedTo: () => {},

  shortDescriptionField: () => {},
  descriptionBox: () => {},
  workNotesBox: () => {},

  saveButton: () => {},
  submitButton: () => {},
  resolveButton: () => {},

  templateButton: () => {},
  templateSearchBar: () => {},
  printers2Template: () => {},
  createSecurityIncidentButton: () => {},


  alertWindow: () => {},
}

class oldEmailPage {}

const oldSearchPage = {
  searchBar: () => document.querySelector("input"),
  searchButton: () => document.querySelector("input"),

  userIDField: () => document.querySelector("input"),
  firstNameField: () => document.querySelector("input"),
  lastNameField: () => document.querySelector("input"),
  locationField: () => document.querySelector("input"),
  cityField: () => document.querySelector("input"),
  stateField: () => document.querySelector("input"),
  zipCodeField: () => document.querySelector("input"),
  streetField: () => document.querySelector("input"),
  desklocationField: () => document.querySelector("input"),

  emailField: () => document.querySelector("input"),
  businessPhoneField: () => document.querySelector("input"),
  mobilePhoneField: () => document.querySelector("input"),
  euaDeptField: () => document.querySelector("input"),
  isContractorSelectionBox: () => document.querySelector("input"),

  // This is not an element. This is an array of row elements containing text Personal Computer in the Model Category column.
  assetRows: () => {},
};

// =======================================================================================

class mainScripts{
  // main scripts
  static async accountLocked() {
    // Accept, create INC, use account locked template, save page, open and send mail,
    const arrayEmail = await scripts.getDescriptionText(csPage);
    await scripts.createIncTicket();
    await scripts.activateTemplateAndValidateCallerField(incidentPage, "accountLocked");
    await scripts.changeFollowUpTwoDays();
    await scripts.openMail(incidentPage);
    await scripts.sendMail(
      emailPage,
      arrayEmail,
      savedStrings.accountLockedString
    );
    // await scripts.savePage(incidentPage)
  }

  static async threeTouchInc(touchNumber) {
    // for touch 1 and 2, change follow up to two days, write work note, save page, open mail, send mail.
    const arrayEmail = scripts.getDescriptionText(incidentPage);
    await scripts.changeFollowUpTwoDays();
    if (touchNumber === 1) {
      await scripts.writeWorkNotes(
        incidentPage,
        savedStrings.followUpStringWorkNotes1
      );
      await scripts.savePage(incidentPage);
      await scripts.openMail(incidentPage);
      await scripts.sendMail(arrayEmail, savedStrings.followUpStringMail1);
    } else if (touchNumber === 2) {
      await scripts.writeWorkNotes(
        incidentPage,
        savedStrings.followUpStringWorkNotes2
      );
      await scripts.savePage(incidentPage);
      await scripts.openMail(incidentPage);
      await scripts.sendMail(arrayEmail, savedStrings.followUpStringMail2);
    } else if (touchNumber === 3) {
      throw new Error("This code is not finished.");
    } else {
      throw new Error("Not a from 1-3.");
    }
  }

  

  static async notificationMail() {
    await waitForExist(csPage.acceptButton);
    await csPage.acceptButton().click();
    await waitForExist(csPage.proposeSolutionsButton)
    await scripts.activateTemplateAndValidateCallerField(csPage, "notificationMail");
    await sleep (3000)
    await waitForExist(csPage.proposeSolutionsButton)
    await sleep(1000)
    await csPage.proposeSolutionsButton().click()
  }

  
  
  static async printers(supportCenter, descContent){
    const arrayMatches = scripts.regexPrinters(descContent)
    const arrayTicketNumbers = []
    for (let index = 0; index < arrayMatches.length; index++) {
      const match = arrayMatches[0]
      await waitForExist(oldIncPage.printers2Template)
      await sleep(500)
      let ticketNumber = oldIncPage.ticketNumber().value
      console.debug(`ticketNumber is ${ticketNumber}`)
      arrayTicketNumbers.push(ticketNumber)
      await oldIncPage.printers2Template().click()
      await waitForExist(oldIncPage.alertWindow)
      await sleep(1000)
      await setEmailFieldValue(oldIncPage.assignmentGroup, `${supportCenter}`, oldIncPage.iframe)
      await setEmailFieldValue(oldIncPage.shortDescriptionField, `${match} is now Stale`, oldIncPage.iframe)
      await scripts.savePage(oldIncPage)
      await sleep(6000)
      await waitForExist(oldIncPage.createSecurityIncidentButton)
      await sleep(500)
      await waitForExist(oldIncPage.createIncidentButton)
      await oldIncPage.createIncidentButton().click()
      await sleep(3000)
    }
    console.log('Complete. Ticket numbers below.')
    console.log(`${arrayTicketNumbers}`)
  }

  static async sirTickets(orgName, macOrAdhoc){
    let macOrAdhocSearchTerm;
    let sirShortDescAfter;

    //conditionals for mac/adhoc
    if (macOrAdhoc === 1) {
      macOrAdhocSearchTerm = 'sirMac'
      sirShortDescAfter = savedStrings.sirShortDescAfterMac
    } else if (macOrAdhoc === 2) {
      macOrAdhocSearchTerm = 'sirAdHoc'
      sirShortDescAfter = savedStrings.sirShortDescAfterAdhoc
    } else {throw new Error('Invalid mac or ad hoc entry')}

    //create inc
    let arrayEmail = scripts.getDescriptionText(csPage)
    await scripts.createIncTicket()

    //template activation
    await scripts.activateTemplateAndValidateCallerField(incidentPage, `${macOrAdhocSearchTerm}`)
    let newDesc = `${savedStrings.sirShortDescBefore} ${orgName} ${sirShortDescAfter}`
    await setFieldValue(incidentPage.shortDescriptionField, newDesc)
    await sleep(1000)

    //create sec ticket
    await aclick(incidentPage.createSecurityIncidentButton)
    await sleep(6000)

    //templates activation and get sir ticket
    await waitForExist(securityIncidentPage.templateButton)
    await sleep(1000)
    await aclick(securityIncidentPage.templateButton)
    await sleep(5000)
    let sirTicketNumber = `${securityIncidentPage.ticketNumber().value}`
    if (macOrAdhoc === 1) {
      aclick(securityIncidentPage.macTemplate)
    } else if (macOrAdhoc === 2) {
      aclick(securityIncidentPage.adhocTemplate)
    } else {throw new Error('error in mac/adhoc template for sec page')}
    await sleep(3000)
    
    await scripts.savePage(securityIncidentPage)
    await sleep (8000)
    aclick(securityIncidentPage.closeButton)
    await sleep(2000)
    await scripts.openMail(incidentPage)
    await scripts.sendMailSir(emailPage, arrayEmail, sirTicketNumber, savedStrings.sirString) // check sirString in savedStrings
    alert('Ready for review')
    // scripts.savePage(incidentPage) // double check first everything else is functional
  }
}
class scripts {
  // mini scripts

  static regexPrinters(input) {
    const regexPattern = /LEXMARK\s+\S+/g;
    const arrayMatches = input.match(regexPattern)
    return arrayMatches;
  }

  static regexEmail(input) {
    const regexSubject = /(?<=Subject:).*/;
    const subject = regexSubject.exec(input)[0];
    if (subject === null) {
      const arrayEmail = null
      return arrayEmail;
    }


    const regexTo = /(?<=To: ).*/;
    const to = regexTo.exec(input)[0];
    const regexAboveTo = /([\s\S]*)(?=To: )/;
    const aboveTo = regexAboveTo.exec(input)[0];
    const aboveToLowercase = aboveTo.toLowerCase();
    const aboveToLowercaseFiltered = aboveToLowercase.replaceAll(
      savedStrings.deskEmail,
      ""
    );
    

    const regexAboveSubject = /([\s\S]*)(?=Subject: )/;
    const aboveSubject = regexAboveSubject.exec(input)[0];
    const aboveSubjectLowercase = aboveSubject.toLowerCase();
    const aboveSubjectLowercaseFiltered = aboveSubjectLowercase.replaceAll(
      savedStrings.deskEmail,
      ""
    );

    const regexSenderAndCC = /[a-zA-Z0-9_.]+@[a-zA-Z0-9_.]+/g;
    const senderArray = aboveToLowercaseFiltered.match(regexSenderAndCC)
    const sender = senderArray[0]
    const senderAndCCArray = aboveSubjectLowercaseFiltered.match(regexSenderAndCC)
    const CC = senderAndCCArray.join("; ");
    const arrayEmail = {
      sender: `${sender};`,
      CC: `${CC}`,
      to: `${to}`,
      subject: `${subject}`,
      contents: input,
    };
    return arrayEmail;
  }

  static async createIncTicket() {
    // create the incident ticket

    await csPage.moreActionsButton().click();
    await sleep(200)
    await waitForExist(csPage.createIncidentButton);
    await csPage.createIncidentButton().click();
    await sleep(10000)
    await waitForExist(incidentPage.templateButton);
  }

  static async activateTemplateAndValidateCallerField(page, searchTerm) {
    // activate template and check for its completion
    // must use camelCase. Acronyms should be treated like any other normal word.

    await waitForExist(page.templateButton);
    await page.templateButton().click();
    await sleep(5000)
    await waitForExist(page.templateSearchBar);
    await sleep(1000);
    await setFieldValue(page.templateSearchBar, `*${searchTerm}`)
    await sleep(1000);
    await waitForExist(page.firstTemplate);

    //caller field validation
    scripts.callerValidation(incidentPage.callerField)
    
    await sleep(1000);
    // validate correct template
    await scripts.validateTemplateButton(page.h2FirstTemplate, searchTerm)

    await page.firstTemplate().click();
    await sleep(1000)
    await waitForExist(page.undoButton);
    await sleep(1000)
  }

  static async getDescriptionText(page) {
    // get description data
    const descBoxContents = page.descriptionBox().value;
    const arrayEmail = scripts.regexEmail(descBoxContents);
    console.debug("(getDescriptionText) ", arrayEmail);
    if (arrayEmail === null) {
      throw new Error('Nothing found for description text')
    }
    return arrayEmail;
  }

  static async writeWorkNotes(page, text) {
    page.workNotesBox().value = text;
  }

  static async changeFollowUpTwoDays() {
    const dateInTwoDays = scripts.datePlusTwoNight();
    await setFieldValue(incidentPage.followUpDateField, dateInTwoDays);
  }

  static async savePage(page) {
    await waitForExist(page.saveButton);
    await page.saveButton().click();
  }

  static async openMail(page) {
    // open email page from the page you were on
    await page.moreActionsButton().click();
    await sleep(200)
    await waitForExist(page.composeEmailButton);
    await page.composeEmailButton().click();
    await sleep(10000)
    await waitForExist(emailPage.textField)
  }

  static async sendMail(page, arrayEmail, text) {
    // send email
    if (arrayEmail === null || arrayEmail === undefined) {
      throw new Error(`(sendMail) arrayEmail is null or undefined. ${arrayEmail}`)
    }
    console.debug(`(sendMail) arrayEmail: ${arrayEmail}`)
    console.debug(`(sendMail) text: ${text}`)
    const textBr = scripts.convertToHtml(text);
    await waitForExist(page.textField); // double check entire email section
    // page.toField().value = arrayEmail.sender // these are old methods of setting value
    // page.ccField().value = arrayEmail.CC
    // page.textField().innerHTML = text
    await sleep(3000);
    await setEmailFieldValue(page.toField, arrayEmail.sender, page.emailDocument);
    await setEmailFieldValue(page.ccField, arrayEmail.CC, page.emailDocument);
    page.textField().innerHTML = textBr;
    await sleep(500); // optional
    // await emailPageElements.sendButton().click() // ensure everything else is functional first
  }

  static async sendMailSir(page, arrayEmail, ticketNumber, text) {
    // send email
    if (arrayEmail === null || arrayEmail === undefined) {
      throw new Error(`(sendMailSir) arrayEmail is null or undefined. ${arrayEmail}`)
    }
    console.debug(`(sendMailSir) arrayEmail: ${arrayEmail}`)
    console.debug(`(sendMailSir) text: ${text}`)
    const textBr = scripts.convertToHtml(text);
    await waitForExist(page.textField); // double check entire email section
    // page.toField().value = arrayEmail.sender // these are old methods of setting value
    // page.ccField().value = arrayEmail.CC
    // page.textField().innerHTML = text
    await sleep(3000);
    await setEmailFieldValue(page.toField, arrayEmail.sender, page.emailDocument);
    await setEmailFieldValue(page.ccField, arrayEmail.CC, page.emailDocument);
    page.textField().innerHTML = textBr;
    let oldSubj = page.subjectField().value
    await sleep(100)
    let newSubj = `${ticketNumber}/` + oldSubj
    await setEmailFieldValue(emailPage.subjectField, newSubj, page.emailDocument)
    await sleep(500); // optional
    // await emailPageElements.sendButton().click() // ensure everything else is functional first
  }

  static async datePlusTwoNight() {
    // entire function is broken, need to adjust according to dateTime Object type
    const date = new Date();
    let dayAdd;
    if (date.getHours() >= 20) {
      dayAdd = 3;
    } else {
      dayAdd = 2;
    }
    const day = date.getDate() + dayAdd;
    const month = date.getMonth();
    const year = date.getFullYear();

    let dayFormatted = null;
    if (day < 10) {
      dayFormatted = "0" + day.toString();
    } else {
      dayFormatted = day;
    }

    let monthFormatted = null;
    if (month < 10) {
      monthFormatted = "0" + month.toString();
    } else {
      monthFormatted = month;
    }

    // This arrangement can be altered based on how we want the date's format to appear.
    const currentDateTime = `${monthFormatted}/${dayFormatted}/${year} 08:00:00 AM`;
    return currentDateTime;
  }

  static getAssetTagsOldSearchPage() {
    //broken
    const arrayOfRowsWithPersonalComputer = oldSearchPage.assetRows();
    try {
      const arrayOfAssetTagValues = [];
      for (const rowWithPersonalComputer of arrayOfRowsWithPersonalComputer) {
        console.debug("(getAssetTags) Getting row:", rowWithPersonalComputer);
        const cellWithAssetTag =
          rowWithPersonalComputer.querySelector("td:nth-of-type(3)");
        // const cellWithAssetTag = rowWithPersonalComputer.querySelector('input')
        const assetTagValue = cellWithAssetTag.value;
        arrayOfAssetTagValues.push(assetTagValue);
      }
      const stringOfAssetTagValues = `${arrayOfAssetTagValues}`;
      return stringOfAssetTagValues;
    } catch (error) {
      console.debug("(getAssetTags)error: ", error);
      console.debug(
        "(getAssetTags) No element containing the asset tag was found."
      );
      return "n/a";
    }
  }

  static async locateClickUser() {
    // locate entry for user on old search page and click button to navigate to profile. Must have email address already in search bar.
    // await waitForExist(oldSearchPage.searchBar);
    // const emailAddress = oldSearchPage.searchBar().value;
    // const buttonOnPage = () =>
    // $x(`//div[@class="user-left"][..//ul/li[text()="${emailAddress}"]]`); // this does not work, xpath does not work properly
    // await waitForExist(buttonOnPage);
    // await buttonOnPage().click();
  }

  static async oldSearchGetInfo() {
    // get all fields in search information and append them to the list
    const arrayOldSearchPageValues = Object.entries(oldSearchPage);

    console.debug("(oldSearchGetInfo) Beginning waitForExist loop");
    for (const [key, value] of arrayOldSearchPageValues) {
      if (key === "assetRows") {
        console.debug(
          `(oldSearchGetInfo) Skipping over ${key} as specified in oldSearchGetInfo`
        );
        break;
      }
      await console.debug(`(oldSearchGetInfo) Checking if exists: ${key}`);
      await waitForExist(value);
    }

    console.debug("(oldSearchGetInfo) All field elements exist.");
    console.debug("(oldSearchGetInfo) Now appending element values to array");

    const arrayFieldValues = {};

    console.debug("(oldSearchGetInfo) Beginning append to list loop");
    for (const [key, value] of arrayOldSearchPageValues) {
      if (key === "assetRows") {
        console.debug(
          `(oldSearchGetInfo) Not appending and will skip over ${key} as specified in oldSearchGetInfo`
        );
        break;
      }
      console.debug(
        `(oldSearchGetInfo) Pushing into arrayFieldValues array: "${key}" element whose value is`,
        value().value
      );
      // arrayFieldValues.push(value().value)
      arrayFieldValues[`${key}`] = value().value;
    }
    // appending asset tags to list
    let assetTags = scripts.getAssetTagsOldSearchPage();
    arrayFieldValues["Asset Tag"] = assetTags;
    console.debug(
      `(oldSearchGetInfo) For the key: "Asset Tag", the value ${assetTags} was pushed.`
    );
    return arrayFieldValues;
  }

  static convertToHtml(string) {
    const res = string.replaceAll("\n", "<br>");
    return res;
  }

  static showScripts() {
   console.log (Object.keys(scripts))
  }
  
  static async acceptCsPage () {
    await csPage.acceptButton().click();
    await sleep(6000)
    await waitForExist(csPage.proposeSolutionsButton);
  }

  
  
  static async searchForRequestItemAndClick(page, searchTerm){
    await waitForExist(page.kbaSearchBar);
    await sleep(1000)
    await setFieldValue(page.kbaSearchBar, searchTerm)
    await waitForExist(page.firstKbaCard)
    await sleep(2000)
    await waitForExist(page.submitRequestButton)
    await sleep(1000)
    await page.submitRequestButton().click()
    await sleep(6000)
    await waitForExist()
  }

  static async jsonGetInfo() {
    const output = await scripts.oldSearchGetInfo();
    const outputInJson = JSON.stringify(output, null, 4);
    console.debug(outputInJson);
  }

  static async callerValidation(page) {
    await waitForExist(page.callerField)
    let callerValue = page.callerField().value
    if (callerValue === '') {
      await setFieldValue(page.callerField, 'ESD User')
    } else {throw new Error('Unknown error in callerValidation')}
  }

  static async validateTemplateButton(h2FirstTemplate, searchTerm) {
    let elementTitleUpper = h2FirstTemplate().title.toUppercase()
    let searchTermUpper = `*${searchTerm}`.toUpperCase()
    if (elementTitleUpper != searchTermUpper) {
      throw new Error('(validateTemplateButton) h2firstTemplate().title and searchTerm do not match.')
    }
  }
}

//----------- global functions

function* descend(el, sel, parent) {
  if (el.matches(sel)) {
    yield parent ? el.parentElement : el;
  }
  if (el.shadowRoot) {
    for (const child of el.shadowRoot.children) {
      yield* descend(child, sel, parent);
    }
  }
  for (const child of el.children) {
    yield* descend(child, sel, parent);
  }
}

function elementValidation(page) {
  let entries = Object.entries(page);
  for (const entry of entries) {
    let key = entry[0];
    let value = entry[1];
    try {
      var valueActive = value();
    } catch (error) {
      if (error instanceof TypeError) {
        valueActive = "null (Shadow Root)";
      } else {
        throw error;
      }
    }
    if (valueActive === null) {
      console.groupCollapsed(`%c${key} was null`, "color: #27ACEF");
      console.debug(`key: ${key}`);
      console.debug(`value: ${value}`);
      console.debug(`valueActive: ${valueActive}`);
      console.groupEnd();
    } else if (valueActive === "null (Shadow Root)") {
      console.groupCollapsed(
        `%c${key} was null (Shadow Root)`,
        "color: #E713A3"
      );
      console.debug(`key: ${key}`);
      console.debug(`value: ${value}`);
      console.debug(`valueActive: ${valueActive}`);
      console.groupEnd();
    } else if (valueActive === undefined) {
      console.groupCollapsed(`%c${key} was undefined`, "color: #A020F0");
      console.debug(`key: ${key}`);
      console.debug(`value: ${value}`);
      console.debug(`valueActive: ${valueActive}`);
      console.groupEnd();
    } else if (valueActive === false) {
      console.groupCollapsed(`%c${key} was false`, "color: #FF0000");
      console.debug(`key: ${key}`);
      console.debug(`value: ${value}`);
      console.debug(`valueActive: ${valueActive}`);
      console.groupEnd();
    } else if (valueActive instanceof Element) {
      console.groupCollapsed(`%c${key} exists.`, "color: #168E2F");
      console.debug(`key: ${key}`);
      console.debug(`value: ${value}`);
      console.debug(`valueActive: ${valueActive}`);
      console.groupEnd();
    } else {
      console.groupCollapsed(`%c${key} is unknown??.`, "color: #FFA500");
      console.debug(`key: ${key}`);
      console.debug(`value: ${value}`);
      console.debug(`valueActive: ${valueActive}`);
      console.groupEnd();
    }
  }
}

async function setFieldValue(selector, value) {
  console.debug("(setFieldValue fieldElement and value are)", selector, value);
  let focus1 = new Event('focus')
  let blur1 = new Event('blur')
  let paste1 = new Event('paste')
  let input1 = new Event('input')
  selector().dispatchEvent(focus1)
  // selector().select(); // old version
  // document.execCommand("insertText", false, value);
  selector().value=value
  selector().dispatchEvent(paste1)
  selector().dispatchEvent(input1)
  await sleep (1000)
  await selector().dispatchEvent(blur1)
  if (selector().value != value) {
    console.log('(setFieldValue) Field did not change. Is the content in an iframe?')
  }
}

async function setEmailFieldValue(selector, value, parentDocumentSelector) {
  console.debug("(emailsetFieldValue fieldElement and value are)", selector, value);
  let focus1 = new Event('focus')
  let blur1 = new Event('blur')
  let paste1 = new Event('paste')
  selector().dispatchEvent(focus1)
  // selector().select(); // old version
  // parentDocumentSelector().execCommand("insertText", false, value);
  selector().value=value
  selector().dispatchEvent(paste1)
  await sleep (1000)
  selector().dispatchEvent(blur1)
  if (selector().value != value) {
    console.log('Field did not change. Did you choose the right parent document?')
  }
}

function queryCleaner(queryAsString) {
  // const regex = /(#chrome-tab-panel-record_[\w\d]*)/
  // const step2 = regex.exec(queryAsString)[0]
  let final = queryAsString.replaceAll(
    /(#chrome-tab-panel-record_[\w\d]*)/,
    "[class='chrome-tab-panel is-active']"
  );
  console.debug(final);
}

const deepSelectorAll = (node, selector) => {
  const nodes = [...node.querySelectorAll(selector)];
  const nodeIterator = document.createNodeIterator(node, Node.ELEMENT_NODE);
  let currentNode;
  while (currentNode === nodeIterator.nextNode()) {
    if (currentNode.shadowRoot) {
      nodes.push(...deepSelectorAll(currentNode.shadowRoot, selector));
    }
  }
  return nodes;
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function retry(fn, delay = 200, retries = 5, err = null) {
  if (!retries) {
    console.debug(`(Retry Function) Failed. Out of tries. Parameter was ${fn}`);
    return Promise.reject(err);
  }
  console.debug(`Beginning try for ${fn}`)
  return fn().catch(async (err) => {
    console.groupCollapsed(`(Retry Function) Failed. Tries remaining: ${retries}`);
    if (delay !== 0) {
      if (retries === 1) {
        delay += 2000;
        console.debug(
          "(Retry Function)Last retry, sleeping for 5000 ms longer than initial delay"
        );
      }
      if (retries === 2) {
        delay += 2000;
        console.debug(
          "(Retry Function)4th retry, sleeping for 3000 ms longer than initial delay"
        );
      }
      if (retries === 3) {
        delay += 500;
        console.debug(
          "(Retry Function) 3rd retry, sleeping for 1000 ms longer than initial delay"
        );
      }
      if (retries === 4) {
        delay += 500;
        console.debug(
          "(Retry Function) 2nd retry, sleeping for 500 ms longer than initial delay"
        );
      }
      if (retries === 5) {
        console.debug(
          "(Retry Function) 1st retry, sleeping for specified delay."
        );
      }
      console.debug(`(Retry Function) Sleeping for ${delay} ms...`);
      await sleep(delay);
      console.debug("(Retry Function) Done sleeping.");
    }
    console.groupEnd()
    return retry(fn, delay, retries - 1, err);
  });
}
async function errorCheck(funct) {
  try {
    console.debug(`(errorCheck) 1st check. The key for funct is ${funct.name}. Will now perform const elem = funct().`)
    const elem = funct();
    console.debug(
      "(errorCheck) funct() works. The values of elem and funct are:",
      { elem },
      { funct }
    );
    console.debug("(errorCheck) 2nd check for elem === null or undefined.");
    if (elem === undefined || elem === null) {
      console.debug("(ErrorCheck) (1/3) Failed. The parameter is listed below.");
      console.debug("(ErrorCheck) (2/3) elem: ", elem);
      console.debug("(ErrorCheck) (3/3) funct:", funct);
      throw new Error(
        `(errorCheck) The elem is Null/Undefined. The elem is: ${elem}`
      );
    }
    console.debug('(ErrorCheck) Success, elem and funct are: ', elem, funct);
  } catch (error) {
    console.debug(`(ErrorCheck) There was an error, which is: ${error}`);
    throw new Error("");
  }
}
async function waitForExist(funct) {
  console.debug((`(waitForExist) The funct is ${funct.name}`))
  await retry(() => errorCheck(funct));
}
function getCardHeaders(page) {
  const templatesTable = page.templatesTable()
  const arrayCards = templatesTable.querySelectorAll('now-template-card-attachment')
  let dictCardHeader = {}
  for (let index = 0; index < arrayCards.length; index++) {
    const card = arrayCards[index];
    const cardHeader = card.shadowRoot.querySelector('now-card-header').shadowRoot.querySelector("h2")
    const cardHeaderTitle = cardHeader.title
    dictCardHeader[`${cardHeaderTitle}`] = cardHeader
  }
  return dictCardHeader
}
function searchDictCardHeader (page, term, asteriskCount=1) {
  let dictCardHeader = getCardHeaders(page)
  let ast = '*'.repeat(asteriskCount)
  try {
    let result = dictCardHeader[`${ast}${term}`]
  return result
  } catch (error) {
    console.warn(`Did not find the term: ${term} in dictionary with asteriskCount = ${asteriskCount}. Returning null.`)
    return null
  }
}

async function aclick(element){
  await waitForExist(element)
  await element().click()
  await sleep(100)
}

function cdebug(message){
  let parentFunctionName = cdebug.caller.name
  console.debug(`(${parentFunctionName}) ${message}`)
}