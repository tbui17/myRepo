const savedStrings = {

  accountLockedString: ''
}

class csPage {
  static acceptButton = () => {}
  static saveButton = () => {}

  // All elements under More Actions button are hidden until moreActions is pressed, wait 0.1s for element to appear.
  static moreActionsButton = () => {}
  static composeEmailButton = () => {}
  static createIncidentButton = () => {}
  static proposeSolutionsButton = () => {}

  static descriptionBox = () => {}
  static shortDescriptionField = () => {}
  static workNotesBox = () => {}
}

class incidentPage {
  // these buttons have a shadow root directly underneath. The only other way to differentiate them is their index number which means they may accidentally refer to a different button if their positions change
  static createSecurityIncident = () => document.querySelector("#rso > div:nth-child(2) > div > div > div > div:nth-child(2) > div")
  static saveButton = () => document.querySelector("#rso > dasdiv:nth-child(2) > div > div > div > div:nth-child(2) > div")

  static moreActionsButton = () => {}
  static composeEmail = () => {}

  // may be prone to breaking if search results return more than one template
  static templateButton = () => {}
  static templateSearchBar = () => {}
  static undoButton = () => {}

  static accountLockedTemplate = () => {}
  static categoriesTemplate = () => {}
  static emailsTemplate = () => {}
  static followUpTemplate = () => {}

  static descriptionBox = () => {}
  static shortDescriptionField = () => {}
  static workNotesBox = () => {}
  static callerField = () => {}
  static followUpDateField = () => {}
  static statusChoice = () => {}

  // ribbon
  static userID = () => {}
  static phoneNumber = () => {}
  static email = () => {}
}

class emailPage {
  static toField = () => {}
  static ccField = () => {}
  static subjectField = () => {}
  static textField = () => {}
  static sendButton = () => {}
  static redErrorBanner = () => {}
}
class securityIncidentPage {

}

class oldCsPage {

}
class oldIncPage {

}

class oldEmailPage {

}

const oldSearchPage = {
  searchBar: () => document.querySelector('input'),
  searchButton: () => document.querySelector('input'),

  userIDField: () => document.querySelector('input'),
  firstNameField: () => document.querySelector('input'),
  lastNameField: () => document.querySelector('input'),
  locationField: () => document.querySelector('input'),
  cityField: () => document.querySelector('input'),
  zipCodeField: () => document.querySelector('input'),
  streetField: () => document.querySelector('input'),
  desklocationField: () => document.querySelector('input'),

  emailField: () => document.querySelector('input'),
  businessPhoneField: () => document.querySelector('input'),
  mobilePhoneField: () => document.querySelector('input'),
  euaDeptField: () => document.querySelector('input'),
  isContractorSelectionBox: () => document.querySelector('input'),

  // This is not an element. This is an array of row elements containing text Personal Computer in the Model Category column.
  assetRows: () => {}

}

// =======================================================================================
class scripts {

  // main scripts
  static async accountLocked () {
    // Accept, create INC, use account locked template, save page, open and send mail,
    const arrayEmail = await scripts.getDescriptionText(csPage)
    await scripts.acceptThenCreateIncTicket()
    await scripts.activateTemplate(incidentPage, 'accountLocked')
    await scripts.changeFollowUpTwoDays()
    await scripts.openMail(incidentPage)
    await scripts.sendMail(emailPage, arrayEmail, savedStrings.accountLockedString)
    // await scripts.savePage(incidentPage)
  }

  static async threeTouchInc (touchNumber) {
    // for touch 1 and 2, change follow up to two days, write work note, save page, open mail, send mail.
    const arrayEmail = scripts.getDescriptionText(incidentPage)
    await scripts.changeFollowUpTwoDays()
    if (touchNumber === 1) {
      await scripts.writeWorkNotes(incidentPage, savedStrings.followUpStringWorkNotes1)
      await scripts.savePage(incidentPage)
      await scripts.openMail(incidentPage)
      await scripts.sendMail(arrayEmail, savedStrings.followUpStringMail1)
    } else if (touchNumber === 2) {
      await scripts.writeWorkNotes(incidentPage, savedStrings.followUpStringWorkNotes2)
      await scripts.savePage(incidentPage)
      await scripts.openMail(incidentPage)
      await scripts.sendMail(arrayEmail, savedStrings.followUpStringMail2)
    } else if (touchNumber === 3) {
      throw new Error('This code is not finished.')
    } else { throw new Error('Not a from 1-3.') }
  }

  static async jsonGetInfo () {
    const output = await scripts.oldSearchGetInfo()
    const outputInJson = JSON.stringify(output, null, 4)
    console.log(outputInJson)
  }
  // mini scripts

  static regexEmail (input) {
    const regexSubject = /(?<=Subject:).*/
    const subject = regexSubject.exec(input)[0]
    if (subject === null) {
      const arrayEmail = 111
      return arrayEmail
    }
    const regexTo = /(?<=To: ).*/
    const to = regexTo.exec(input)[0]
    const regexAboveTo = /([\s\S]*)(?=To: )/
    const aboveTo = regexAboveTo.exec(input)[0]
    const regexSenderAndCC = /[a-zA-Z0-9_.]+@[a-zA-Z0-9_.]+/g
    const senderAndCCMatches = [...aboveTo.matchAll(regexSenderAndCC)]
    const senderAndCC = []
    for (const match in senderAndCCMatches) {
      if (Object.hasOwnProperty.call(senderAndCCMatches, match)) {
        const element = senderAndCCMatches[match]
        senderAndCC.push(element[0])
      }
    }
    const sender = senderAndCC[0]
    const CC = senderAndCC.join('; ')
    const arrayEmail = {
      sender: `${sender};`,
      CC: `${CC}`,
      to: `${to}`,
      subject: `${subject}`,
      contents: input
    }
    return arrayEmail
  }

  static async acceptThenCreateIncTicket () {
    // create the incident ticket

    await csPage.acceptButton().click()
    await waitForExist(csPage.proposeSolutionsButton)
    await csPage.moreActionsButton().click()
    await waitForExist(csPage.createIncidentButton)
    await csPage.createIncidentButton.click()
    await waitForExist(incidentPage.templateButton)
  }

  static async activateTemplate (page, searchTerm) {
    // activate template and check for its completion
    // must use camelCase. Acronyms should be treated like any other normal word.

    await page.templateButton().click()
    await waitForExist(page.templateSearchBar)
    await sleep(1000)
    setFieldValue(page.templateSearchBar, `*${searchTerm}`)
    await sleep(500)
    await waitForExist(page[`${searchTerm}Template`])
    await sleep(500)
    await page[`${searchTerm}Template`]().click()
    await waitForExist(page.undoButton)
  }

  static async getDescriptionText (page) {
    // get description data
    const descBoxContents = page.descriptionBox().value
    const arrayEmail = scripts.regexEmail(descBoxContents)
    console.log('(getDescriptionText) ', arrayEmail)
    return arrayEmail
  }

  static async writeWorkNotes (page, text) {
    page.workNotesBox().value = text
  }

  static async changeFollowUpTwoDays () {
    const dateInTwoDays = scripts.datePlusTwoNight()
    setFieldValue(incidentPage.followUpDateField, dateInTwoDays)
  }

  static async savePage (page) {
    await waitForExist(page.saveButton)
    await page.saveButton().click()
  }

  static async openMail (page) {
    // open email page from the page you were on
    await page.moreActionsButton().click()
    await waitForExist(page.composeEmail)
    await page.composeEmail().click()
  }

  static async sendMail (page, arrayEmail, text) {
    // send email
    if (arrayEmail === 111) {
      console.log('(sendMail) Subject does not contain email. Cancelling send mail.')
      return
    }
    await waitForExist(page.textField) // double check entire email section
    // page.toField().value = arrayEmail.sender
    // page.ccField().value = arrayEmail.CC
    // page.textField().innerHTML = text
    setFieldValue(page.toField(), arrayEmail.sender)
    setFieldValue(page.ccField(), arrayEmail.sender)
    textBr = text.replaceAll('\n', '<br>')
    page.textField().innerHTML = scripts.convertToHtml(text)
    await sleep(500) // optional
    // await emailPageElements.sendButton().click() // ensure everything else is functional first
  }

  static async datePlusTwoNight () {
    const date = new Date()
    let dayAdd
    if (date.getHours() >= 20) {
      dayAdd = 3
    } else {
      dayAdd = 2
    }
    const day = date.getDate() + dayAdd
    const month = date.getMonth()
    const year = date.getFullYear()

    let dayFormatted = null
    if (day < 10) {
      dayFormatted = '0' + day.toString()
    } else { dayFormatted = day }

    let monthFormatted = null
    if (month < 10) {
      monthFormatted = '0' + month.toString()
    } else { monthFormatted = month }

    // This arrangement can be altered based on how we want the date's format to appear.
    const currentDateTime = `${monthFormatted}/${dayFormatted}/${year} 08:00:00 AM`
    return currentDateTime
  }

  static getAssetTagsOldSearchPage () {
    const arrayOfRowsWithPersonalComputer = oldSearchPage.assetRows()
    try {
      const arrayOfAssetTagValues = []
      for (const rowWithPersonalComputer of arrayOfRowsWithPersonalComputer) {
        console.log('(getAssetTags) Getting row:', rowWithPersonalComputer)
        const cellWithAssetTag = rowWithPersonalComputer.querySelector('td:nth-of-type(3)')
        // const cellWithAssetTag = rowWithPersonalComputer.querySelector('input')
        const assetTagValue = cellWithAssetTag.value
        arrayOfAssetTagValues.push(assetTagValue)
      }
      const stringOfAssetTagValues = `${arrayOfAssetTagValues}`
      return stringOfAssetTagValues
    } catch (error) {
      console.log('(getAssetTags)error: ', error)
      console.log('(getAssetTags) No element containing the asset tag was found.')
      return ('n/a')
    }
  }

  static async locateClickUser () {
    // locate entry for user on old search page and click button to navigate to profile. Must have email address already in search bar.
    await waitForExist(oldSearchPage.searchBar)
    const emailAddress = oldSearchPage.searchBar().value
    const buttonOnPage = () => $x(`//div[@class="user-left"][..//ul/li[text()="${emailAddress}"]]`)
    await waitForExist(buttonOnPage)
    await buttonOnPage().click()
  }

  static async oldSearchGetInfo () {
    // get all fields in search information and append them to the list
    const arrayOldSearchPageValues = Object.entries(oldSearchPage)

    console.log('(oldSearchGetInfo) Beginning waitForExist loop')
    for (const [key, value] of arrayOldSearchPageValues) {
      if (key === 'assetRows') {
        console.log(`(oldSearchGetInfo) Skipping over ${key} as specified in oldSearchGetInfo`)
        break
      }
      await console.log(`(oldSearchGetInfo) Checking if exists: ${key}`)
      await waitForExist(value)
    }

    console.log('(oldSearchGetInfo) All field elements exist.')
    console.log('(oldSearchGetInfo) Now appending element values to array')

    const arrayFieldValues = {}

    console.log('(oldSearchGetInfo) Beginning append to list loop')
    for (const [key, value] of arrayOldSearchPageValues) {
      if (key === 'assetRows') {
        console.log(`(oldSearchGetInfo) Not appending and will skip over ${key} as specified in oldSearchGetInfo`)
        break
      }
      console.log(`(oldSearchGetInfo) Pushing into arrayFieldValues array: "${key}" element whose value is`, value().value)
      // arrayFieldValues.push(value().value)
      arrayFieldValues[`${key}`] = value().value
    }
    // appending asset tags to list
    let assetTags = scripts.getAssetTagsOldSearchPage()
    arrayFieldValues['Asset Tag'] = assetTags
    console.log(`(oldSearchGetInfo) For the key: "Asset Tag", the value ${assetTags} was pushed.`)
    return arrayFieldValues
  }

  static convertToHtml(string) {
    string.replace('\n', '<br>')
  }
}

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
};

function elementValidation(page) {
  let entries = Object.entries(page)
  for (const entry of entries) {
    let key = entry[0]
    let value = entry[1]
    try {
      var valueActive = value()
    } catch (error) {
      if (error instanceof TypeError) {
        valueActive = 'null (Shadow Root)'
      } else { throw error }
    }
    if (valueActive === null) {
      console.groupCollapsed(`%c${key} was null`, 'color: #27ACEF')
      console.log(`key: ${key}`)
      console.log(`value: ${value}`)
      console.log(`valueActive: ${valueActive}`)
      console.groupEnd()
    } else if (valueActive === 'null (Shadow Root)') {
      console.groupCollapsed(`%c${key} was null (Shadow Root)`, 'color: #E713A3')
      console.log(`key: ${key}`)
      console.log(`value: ${value}`)
      console.log(`valueActive: ${valueActive}`)
      console.groupEnd()
    } else if (valueActive === undefined) {
      console.groupCollapsed(`%c${key} was undefined`, 'color: #A020F0')
      console.log(`key: ${key}`)
      console.log(`value: ${value}`)
      console.log(`valueActive: ${valueActive}`)
      console.groupEnd()
    } else if (valueActive === false) {
      console.groupCollapsed(`%c${key} was false`, 'color: #FF0000')
      console.log(`key: ${key}`)
      console.log(`value: ${value}`)
      console.log(`valueActive: ${valueActive}`)
      console.groupEnd()
    } else if (valueActive instanceof Element) {
      console.groupCollapsed(`%c${key} exists.`, 'color: #168E2F')
      console.log(`key: ${key}`)
      console.log(`value: ${value}`)
      console.log(`valueActive: ${valueActive}`)
      console.groupEnd()
    } else {
      console.groupCollapsed(`%c${key} is unknown??.`, 'color: #FFA500')
      console.log(`key: ${key}`)
      console.log(`value: ${value}`)
      console.log(`valueActive: ${valueActive}`)
      console.groupEnd()
    }
  }
}

function setFieldValue(selector, value, parentDocumentSelector = document) {
  console.log('(setFieldValue fieldElement and value are)', selector, value);
  selector().focus()
  selector().select()
  parentDocumentSelector.execCommand('insertText', false, value)
}

function queryCleaner(queryAsString) {
  // const regex = /(#chrome-tab-panel-record_[\w\d]*)/
  // const step2 = regex.exec(queryAsString)[0]
  let final = queryAsString.replace(/(#chrome-tab-panel-record_[\w\d]*)/, "[class='chrome-tab-panel is-active']")
  console.log(final)
}

const deepSelectorAll = (node, selector) => {
  const nodes = [...node.querySelectorAll(selector)]
  const nodeIterator = document.createNodeIterator(node, Node.ELEMENT_NODE)
  let currentNode
  while (currentNode === nodeIterator.nextNode()) {
    if (currentNode.shadowRoot) {
      nodes.push(...deepSelectorAll(currentNode.shadowRoot, selector))
    }
  }
  return nodes
}

function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function retry (fn, delay = 200, retries = 5, err = null) {
  if (!retries) {
    console.log(`(Retry Function) Failed. Out of tries. Parameter was ${fn}`)
    return Promise.reject(err)
  }
  return fn().catch(async err => {
    console.log(`(Retry Function) Tries remaining: ${retries}`)
    console.log('(Retry Function) Rejected. Retrying if there are tries remaining.')
    if (delay !== 0) {
      if (retries === 1) {
        delay += 2000
        console.log('(Retry Function)Last retry, sleeping for 5000 ms longer than initial delay')
      }
      if (retries === 2) {
        delay += 2000
        console.log('(Retry Function)4th retry, sleeping for 3000 ms longer than initial delay')
      }
      if (retries === 3) {
        delay += 500
        console.log('(Retry Function) 3rd retry, sleeping for 1000 ms longer than initial delay')
      }
      if (retries === 4) {
        delay += 500
        console.log('(Retry Function) 2nd retry, sleeping for 500 ms longer than initial delay')
      }
      if (retries === 5) {
        console.log('(Retry Function) 1st retry, sleeping for specified delay.')
      }
      console.log(`(Retry Function) Sleeping for ${delay} ms...`)
      await sleep(delay)
      console.log('(Retry Function) Done sleeping.')
    }
    return retry(fn, delay, (retries - 1), err)
  })
}
async function errorCheck (funct) {
  try {
    const elem = funct()
    console.log('(errorCheck) Checking. The values checked are elem and funct.', { elem }, { funct })
    console.log('(errorCheck) 2nd check for key')
    if (elem === undefined || elem === null) {
      console.log('(ErrorCheck) (1/3) Failed. The parameter is listed below.')
      console.log('(ErrorCheck) (2/3) elem: ', elem)
      console.log('(ErrorCheck) (3/3) funct:', funct)
      throw new Error(`(errorCheck)error1: Value is Null/Undefined. Value: ${elem}`)
    }
    console.log(`(ErrorCheck) Success with parameter ${funct}`)
  } catch (error) {
    console.log(`(ErrorCheck) There was an error: ${error}`)
    console.log(error)
    throw new Error('error22222')
  }
}
async function waitForExist (funct) {
  await retry(() => errorCheck(funct))
}