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
    console.groupEnd()
    console.debug(`(Retry Function) Failed. Out of tries. Parameter was ${fn}`)
    return Promise.reject(err)
  }
  return fn().catch(async err => {
    if (retries < 5) {
      console.groupEnd()
    }
    console.groupCollapsed(`Retry attempt: ${6-retries}/5`)
    console.debug(`(Retry Function) Tries remaining: ${retries}`)
    console.debug('(Retry Function) Rejected. Retrying if there are tries remaining.')
    if (delay !== 0) {
      if (retries === 1) {
        delay += 2000
        console.debug('(Retry Function)Last retry, sleeping for 5000 ms longer than initial delay')
      }
      if (retries === 2) {
        delay += 2000
        console.debug('(Retry Function)4th retry, sleeping for 3000 ms longer than initial delay')
      }
      if (retries === 3) {
        delay += 500
        console.debug('(Retry Function) 3rd retry, sleeping for 1000 ms longer than initial delay')
      }
      if (retries === 4) {
        delay += 500
        console.debug('(Retry Function) 2nd retry, sleeping for 500 ms longer than initial delay')
      }
      if (retries === 5) {
        console.debug('(Retry Function) 1st retry, sleeping for specified delay.')
      }
      console.debug(`(Retry Function) Sleeping for ${delay} ms...`)
      await sleep(delay)
      console.debug('(Retry Function) Done sleeping.')
    }
    return retry(fn, delay, (retries - 1), err)
  })
}
async function errorCheck (funct) {
  try {
    const elem = funct()
    console.debug('(errorCheck) Checking. The values checked are elem and funct.', elem, funct)
    if (elem === undefined || elem === null) {
      console.debug('(ErrorCheck) (1/3) Failed. The parameter is listed below.')
      console.debug('(ErrorCheck) (2/3) elem: ', elem)
      console.debug('(ErrorCheck) (3/3) funct:', funct)
      throw new Error(`(errorCheck)error1: Value is Null/Undefined. Value: ${elem}`)
    }
    console.debug(`(ErrorCheck) Success with parameter ${funct}`)
  } catch (error) {
    console.debug(`(ErrorCheck) There was an error: ${error}`)
    console.debug(error)
    throw new Error('error22222')
  }
}
async function waitForExist (funct) {
  await retry(() => errorCheck(funct))
}

class csPage {
  static acceptButton = () => {}
  static saveButton = () => {}

  // All elements under More Actions button are hidden until moreActions is pressed, wait 0.1s for element to appear.
  static moreActionsButton = () => {}
  static composeEmailButton = () => {}
  static createIncidentButton = () => {}

  static descriptionBox = () => {}
  static shortDescriptionField = () => {}
  static workNotesBox = () => {}
}

class incidentPage {
  // these buttons have a shadow root directly underneath. The only other way to differentiate them is their index number which means they may accidentally refer to a different button if their positions change
  static createSecurityIncident = () => {}
  static saveButton = () => {}

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
  // searchBar: () => document.querySelector('input'),
  // searchButton: () => document.querySelector('input'),

  // userIDField: () => document.querySelector('input'),
  // firstNameField: () => document.querySelector('input'),
  // lastNameField: () => document.querySelector('input'),
  // locationField: () => document.querySelector('input'),
  // cityField: () => document.querySelector('input'),
  // zipCodeField: () => document.querySelector('input'),
  // streetField: () => document.querySelector('input'),
  // desklocationField: () => document.querySelector('input'),

  // emailField: () => document.querySelector('input'),
  // businessPhoneField: () => document.querySelector('input'),
  // mobilePhoneField: () => document.querySelector('input'),
  // euaDeptField: () => document.querySelector('input'),
  // isContractorSelectionBox: () => document.querySelector('input'),

  // This is not an element. This is an array of row elements containing text Personal Computer in the Model Category column.
  assetRows: () => {}

}
class scripts {
/*
When calling async functions, they must always be with await. Ex: await scripts.accountLocked()
*/

  // main scripts
  static async accountLocked () {
    // Accept, create INC, use account locked template, save page, open and send mail,
    const arrayEmail = await scripts.getDescriptionText(csPage)
    await scripts.acceptThenCreateIncTicket()
    await scripts.activateTemplate(incidentPage, 'accountLocked')
    await scripts.openMail(incidentPage)
    // await scripts.sendMail(arrayEmail, )
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
      CC,
      to,
      subject,
      contents: input
    }
    return arrayEmail
  }

  static async acceptThenCreateIncTicket () {
    // create the incident ticket

    await csPage.acceptButton().click()
    // await wrapRetryErrorCheck(funct) //need to check for element that loads on page after accept
    await csPage.moreActionsButton().click()
    await waitForExist(csPage.createIncidentButton)
    await csPage.createIncidentButton().click()
    await waitForExist(incidentPage.templateButton)
  }

  static async activateTemplate (page, searchTerm) {
    // activate template and check for its completion
    // must use camelCase. Acronyms should be treated like any other normal word.

    await page.templateButton().click()
    await waitForExist(page.templateSearchBar)
    await waitForExist(page[`${searchTerm}Template`])
    await page[`${searchTerm}Template`]().click()
    await waitForExist(page.undoButton)
  }

  static async getDescriptionText (page) {
    // get description data
    const descBoxContents = page.descriptionBox().value // double check this
    const arrayEmail = scripts.regexEmail(descBoxContents)
    return arrayEmail
  }

  static async writeWorkNotes (page, text) {
    page.workNotesBox().value = text
  }

  static async changeFollowUpTwoDays () {
    await scripts.activateTemplate(incidentPage, '*followUp')
    const dateInTwoDays = await this.datePlusTwoNight()
    incidentPage.followUpDateField().value = dateInTwoDays
  }

  static async savePage (page) {
    await waitForExist(page.saveButton)
    await page.saveButton().click()
  }

  static async openMail (page) {
    // open email page from the page you were on
    await page.moreActions().click()
    await waitForExist(page.composeEmail)
    await page.composeEmail().click()
  }

  static async sendMail (page, arrayEmail, text) {
    // send email
    await waitForExist(page.textField) // double check entire email section
    page.toField().value = arrayEmail.sender
    page.ccField().value = arrayEmail.CC
    page.textField().innerHTML = text
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
        console.debug('(getAssetTags) Getting row:', rowWithPersonalComputer)
        const cellWithAssetTag = rowWithPersonalComputer.querySelector('td:nth-of-type(3)')
        // const cellWithAssetTag = rowWithPersonalComputer.querySelector('input')
        const assetTagValue = cellWithAssetTag.value
        arrayOfAssetTagValues.push(assetTagValue)
      }
      const stringOfAssetTagValues = `${arrayOfAssetTagValues}`
      return stringOfAssetTagValues
    } catch (error) {
      console.debug('(getAssetTags)error: ', error)
      console.debug('(getAssetTags) No element containing the asset tag was found.')
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

    console.debug('(oldSearchGetInfo) Beginning waitForExist loop')
    for (const [key, value] of arrayOldSearchPageValues) {
      if (key === 'assetRows') {
        console.debug(`(oldSearchGetInfo) Skipping over ${key} as specified in oldSearchGetInfo`)
        break
      }
      await console.debug(`(oldSearchGetInfo) Checking if exists: ${key}`)
      await waitForExist(value)
    }

    console.debug('(oldSearchGetInfo) All field elements exist.')
    console.debug('(oldSearchGetInfo) Now appending element values to array')

    const arrayFieldValues = {}

    console.debug('(oldSearchGetInfo) Beginning append to list loop')
    for (const [key, value] of arrayOldSearchPageValues) {
      if (key === 'assetRows') {
        console.debug(`(oldSearchGetInfo) Not appending and will skip over ${key} as specified in oldSearchGetInfo`)
        break
      }
      console.debug(`(oldSearchGetInfo) Pushing into arrayFieldValues array: "${key}" element whose value is`, value().value)
      // arrayFieldValues.push(value().value)
      arrayFieldValues[`${key}`] = value().value
    }
    // appending asset tags to list
    let assetTags = scripts.getAssetTagsOldSearchPage()
    arrayFieldValues['Asset Tag'] = assetTags
    console.debug(`(oldSearchGetInfo) For the key: "Asset Tag", the value ${assetTags} was pushed.`)
    return arrayFieldValues
  }

}

const savedToClipboard = {}

await scripts.jsonGetInfo()