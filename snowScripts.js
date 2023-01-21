const { timers } = require("jquery");

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  function retry(fn, delay=200, retries=5, err=null) {
    if (!retries) {
      console.log(`(Retry Function) Failed. Out of tries.`)
      return Promise.reject(err);
    }
    return fn().catch(async err => {
        console.log(`(Retry Function) Tries remaining: ${retries}`)
        console.log('(Retry Function) Rejected. Retrying if there are tries remaining.')
        if (delay != 0) {
          if (retries == 1) {
            delay += 2000
            console.log('(Retry Function)Last retry, sleeping for 5000 ms longer than initial delay');
          }
          if (retries == 2) {
            delay += 2000
            console.log('(Retry Function)4th retry, sleeping for 3000 ms longer than initial delay');
          }
          if (retries == 3) {
            delay += 500
            console.log('(Retry Function) 3rd retry, sleeping for 1000 ms longer than initial delay');
          }
          if (retries == 4) {
            delay += 500
            console.log('(Retry Function) 2nd retry, sleeping for 500 ms longer than initial delay');
          }
          if (retries == 5) {
            console.log('(Retry Function) 1st retry, sleeping for specified delay.');
          }
          console.log(`Sleeping for ${delay} ms...`);
          await sleep(delay)
          console.log(`Done sleeping.`);
        }
        return retry(fn, delay, (retries - 1), err);
      });
  } 
async function errorCheck(funct){
  
    try {
      let elem = funct()
      if (elem == undefined) {
        throw new Error("error11111")
      }
      console.log(`Success with parameter ${funct}`)
    } catch (error) {
      throw new Error("error22222")
    }
    
  }
  
  async function waitForExist(funct) {
    await retry(()=>errorCheck(funct))
  }

class csPage {

    static acceptButton = ()=>{}
    static saveButton = ()=>{}

    //All elements under More Actions button are hidden until moreActions is pressed, wait 0.1s for element to appear.
    static moreActions = ()=>{}
    static composeEmail = ()=>{}
    static createIncident = ()=>{}

    static descriptionBox = ()=>{}
    static shortDescriptionBox = ()=>{}
    static workNotesBox = ()=>{}
}

class incidentPage {
    
    static moreActions = ()=>{}
    static composeEmail = ()=>{}
    
    static createSecurityIncident = ()=>{}
    static saveButton = ()=>{}


    static templateButton = ()=>{}
    static templateSearchBar = ()=>{}
    static undoButton = ()=>{}


    static accountLockedTemplate = ()=>{}
    static categoriesTemplate = ()=>{}
    static emailsTemplate = ()=>{}


    static descriptionBox = ()=>{}
    static shortDescriptionBox = ()=>{}
    static workNotesBox = ()=>{}
    static callerField = ()=>{}
    static followUpDate = ()=>{}
    static statusChoice = ()=>{}

    // ribbon
    static userID = ()=>{}
    static phoneNumber = ()=>{}
    static email = ()=>{}

}

class emailPage{

    static toField = ()=>{}
    static ccField = ()=>{}
    static textField = ()=>{}
    static sendButton = ()=>{}
    static redErrorBanner = ()=>{}

}
class securityIncidentPage{


}

class oldCsPage {

}
class oldIncPage {
  
}

class oldEmailPage{

}

class scripts{

    // main scripts
    static async accountLocked() {
 
        let arrayMail = await scripts.getDescriptionText(csPage)
        await scripts.createIncTicketInCsPage()
        await scripts.activateTemplate(incidentPage,'accountLocked')
        await scripts.openMail()
        await scripts.sendMail(arrayMail)
    }


    
    static async getInfoFromAdditionalUserDetailsPage(){
            // work in progress
    }



    // mini scripts




    static regexEmail(input){
        let regexSubject = /(?<=Subject:).*/
        let subject = regexSubject.exec(input)[0]
        let regexAboveSubject = /([\s\S]*)(?=\nSubject)/
        let aboveSubject = regexAboveSubject.exec(input)[0]
        let regexSenderAndCC = /[a-zA-Z0-9_.]+@[a-zA-Z0-9_.]+/g
        let senderAndCCMatches = [...aboveSubject.matchAll(regexSenderAndCC)]
        let senderAndCC = []
        for (const match in senderAndCCMatches) {
            if (Object.hasOwnProperty.call(senderAndCCMatches, match)) {
                const element = senderAndCCMatches[match];
                senderAndCC.push(element[0])
            }
        }
        let sender = senderAndCC[0]
        let CC = senderAndCC.join("; ")
        console.log(subject)
        let arrayEmail = {
            'sender':`${sender};`,
            'CC':CC,
            'subject':subject,
            'contents':input
        }
        return arrayEmail
    }

    static async createIncTicketInCsPage(){
        //create the incident ticket
        await csPage.acceptButton().click()
        // await wrapRetryErrorCheck(funct) //need to check for element that loads on page after accept
        await csPage.moreActions().click()
        await waitForExist(csPage.createIncident)
        await csPage.createIncident().click()
        await waitForExist(incidentPage.templateButton)
    }

    
    static async activateTemplate(page, searchTerm){
        //activate template and check for its completion
        //must use camelCase. Acronyms should be treated like any other normal word.

        await page.templateButton().click()
        await waitForExist(page.templateSearchBar)
        page.templateSearchBar().value = `*${searchTerm}` // double check this
        await waitForExist(page[`${searchTerm}Template`])
        await page[`${searchTerm}Template`]().click()
        await waitForExist(page.undoButton)
    }
    
    static async getDescriptionText(page){
        //get description data
        let descBoxContents = page.descriptionBox().value // double check this
        let arrayEmail = scripts.regexEmail(descBoxContents)
        return arrayEmail
    }
    
    
    static async openMail(page){
        //open email page from the page you were on
        await page.moreActions().click()
        await waitForExist(page.composeEmail)
        await page.composeEmail().click()
    }
    
    static async sendMail(arrayEmail){
        //send email
        await waitForExist(emailPage.textField) // double check entire email section
        emailPage.toField().value = arrayEmail.sender
        emailPage.ccField().value = arrayEmail.CC
        // emailPageElements.textField.innerHTML = // need to get from user input
        await sleep(500) // optional
        // emailPageElements.sendButton().click() // ensure everything else is functional first
    }

    
    static async datePlusTwoNight(){
      const date = new Date();
      let dayAdd;
      if (date.getHours() >= 20) {
        dayAdd = 3
      } else {
        dayAdd = 2
      }
      let day = date.getDate()+dayAdd;
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      
      let dayFormatted = null
      if (day < 10) {
        dayFormatted = '0' + day.toString()
      } else {dayFormatted = day}

      let monthFormatted = null
      if (month < 10) {
        monthFormatted = '0' + month.toString()
      } else {monthFormatted = month}
      
      // This arrangement can be altered based on how we want the date's format to appear.
      let currentDateTime = `${monthFormatted}/${dayFormatted}/${year} 08:00:00 AM`;
      return currentDateTime
    }
}

// scripts.accountLocked()