



const deepSelectorAll = (node, selector) => {
  const nodes = [...node.querySelectorAll(selector)]
  const nodeIterator = document.createNodeIterator(node, Node.ELEMENT_NODE)
  let currentNode
  while (currentNode = nodeIterator.nextNode()) {
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
      console.log(`Sleeping for ${delay} ms...`)
      await sleep(delay)
      console.log('Done sleeping.')
    }
    return retry(fn, delay, (retries - 1), err)
  })
}
async function errorCheck (funct) {
  try {
    const elem = funct()
    if (elem === undefined) {
      throw new Error('error11111')
    }
    console.log(`Success with parameter ${funct}`)
  } catch (error) {
    console.log('There was an error')
    console.log(error)
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

class oldSearchPage {

  static searchBar = () => {}
  static searchButton = () => {}


  static userIDField = () => {}
  static firstNameField = () => {}
  static lastNameField = () => {}
  static locationField = () => {}
  static cityField = () => {}
  static zipCodeField = () => {}
  static streetField = () => {}
  static desklocationField = () => {}

  static emailField = () => {}
  static businessPhoneField = () => {}
  static mobilePhoneField = () => {}
  static euaDeptField = () => {} 
  static isContractorSelectionBox = () => {}

  // This is not an element. This is an array of row elements containing text Personal Computer in the Model Category column.
  static assetRows = () => {}
}

class scripts {
/*
When calling async functions, they must always be with await. Ex: await scripts.accountLocked()
*/
  // main scripts
  static async accountLocked () {
    // Accept, create INC, use account locked template, save page, open and send mail,
    const arrayEmail = await scripts.getDescriptionText(csPage)
    await scripts.createIncTicketInCsPage()
    await scripts.activateTemplate(incidentPage, 'accountLocked')

    await scripts.openMail(incidentPage)
    // await scripts.sendMail(arrayEmail, )
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

  // mini scripts

  static regexEmail (input) {
    const regexSubject = /(?<=Subject:).*/
    const subject  = regexSubject.exec(input)[0]
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

  static async createIncTicketInCsPage () {
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
    page.saveButton()
  }

  static async openMail (page) {
    // open email page from the page you were on
    await page.moreActions().click()
    await waitForExist(page.composeEmail)
    await page.composeEmail().click()
  }

  static async sendMail (arrayEmail, text) {
    // send email
    await waitForExist(emailPage.textField) // double check entire email section
    emailPage.toField().value = arrayEmail.sender
    emailPage.ccField().value = arrayEmail.CC
    // emailPageElements.textField.innerHTML = // need to get from user input
    await sleep(500) // optional
    // emailPageElements.sendButton().click() // ensure everything else is functional first
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
    const month = date.getMonth() + 1/
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

  static async getProfileInformationOldSearchPage () {
      await waitForExist(oldSearchPage.searchButton)
      
  }

  static getAssetTags(arrayOfRowsWithPersonalComputer){
    let arrayOfAssetTagValues = []
    for (let rowWithPersonalComputer of arrayOfRowsWithPersonalComputer) {
       let cellWithAssetTag = rowWithPersonalComputer.querySelect('td:nth-of-type(3)')
       let assetTagValue = cellWithAssetTag.value
  
       arrayOfAssetTagValues.push(assetTagValue)
    }
    let stringOfAssetTagValues = `${arrayOfAssetTagValues}`
    return stringOfAssetTagValues
  }
}

class savedStrings {
  static accountLockedStringMail = ''
  static followUpStringMail1 = ''
  static followUpStringWorkNotes1 = ''
  static followUpStringMail2 = savedStrings.followUpStringMail1
  static followUpStringWorkNotes2 = ''
  static followUpStringMail3 = ''
  static followUpStringWorkNotes3 = ''
}

// await scripts.accountLocked()
