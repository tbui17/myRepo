function promise1(param) {
  return new Promise((resolve, reject) => {
    let result = param + 1
    if (result == 2) {
      resolve(`Success with param ${param}`)
    } else {
      reject(`Failed with param ${param}`)
    }
  });
}
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
async function asyncFunction() {
  try {
    let response = await promise1(1)
    console.log(response)
    let response2 = await promise1(2)
    console.log(response2)
  } catch (error) {
    console.log(error)
  }
}
async function sayHello() {
  console.log("hello")
  await sleep(1000)
  console.log("hello2")
}

function retry(fn, delay=3000, retries=3, err=null) {
  if (!retries) {
    console.log(`(Retry Function) Failed. Out of tries.`)
    return Promise.reject(err);
  }
  return fn().catch(async err => {
      console.log(`(Retry Function) Tries remaining: ${retries}`)
      console.log('(Retry Function) Rejected. Retrying if there are tries remaining.')
      if (delay != 0) {
        if (retries == 1) {
          delay += 5000
          console.log('Last try, sleeping for 5000 ms longer.');
        }
        console.log(`Sleeping for ${delay} ms...`);
        await sleep(delay)
        console.log(`Done sleeping.`);
      }
      return retry(fn, delay, (retries - 1), err);
    });
}

async function getElement() {
  let elem = document.querySelector('hellsdfdsfxo')
  if (elem == undefined) {
    throw new Error("error in sayHello function")
  }
}

let funct12 = ()=>document.querySelector("#main > div:nth-child(3) > a.w3-left.w3-btn")

async function errorCheck(funct){

  try {
    let elem = funct()
    if (elem == undefined) {
      throw new Error("error11111")
    }
  } catch (error) {
    throw new Error("error22222")
  }
}

function wrapRetryErrorCheck(funct) {
  retry(()=>errorCheck(funct))
}


// function waitForElm(selector) {
//   return new Promise(resolve => {
//       if (document.querySelector(selector)) {
//           return resolve(document.querySelector(selector));
//       }

//       const observer = new MutationObserver(mutations => {
//           if (document.querySelector(selector)) {
//               resolve(document.querySelector(selector));
//               observer.disconnect();
//           }
//       });

//       observer.observe(document.body, {
//           childList: true,
//           subtree: true
//       });
//   });
// }

function waitForElement(querySelector, timeout){
  return new Promise((resolve, reject)=>{
    var timer = false;
    if(document.querySelectorAll(querySelector).length) return resolve();
    const observer = new MutationObserver(()=>{
      if(document.querySelectorAll(querySelector).length){
        observer.disconnect();
        if(timer !== false) clearTimeout(timer);
        return resolve();
      }
    });
    observer.observe(document.body, {//document.body may not work with shadow DOMs, may have to 
      childList: true, 
      subtree: true
    });
    if(timeout) timer = setTimeout(()=>{
      observer.disconnect();
      reject();
    }, timeout);
  });
}





async function main() {
waitForElement(`#nav-companies > div > div`, 3000).then(function(){
  alert("element is loaded.. do stuff");
}).catch(()=>{
  alert("element did not load in 3 seconds");
});
}
main()



function returnOne() {
  let var1 = 1+1
  return var1
}

function isThisOne(funct1) {
  if (funct1() == 1) {
    console.log('This is one')
  } else if (funct1() == 2) {
    console.log('This is two')
  } else {console.log('this is not one or two')}
}

isThisOne(returnOne)


let getEleHeader = ()=>document.querySelector("#main > div:nth-child(5) > h3")

function waitForElement1(select_func, timeout=3000){
  return new Promise((resolve, reject)=>{
    var timer = false;
    console.log(select_func())
    if(select_func()) return resolve();
    const observer = new MutationObserver(()=>{
      if(select_func()){
        observer.disconnect();
        if(timer !== false) clearTimeout(timer);
        return resolve();
      }
    });
    observer.observe(document.body, {//document.body may not work with shadow DOMs, may have to 
      childList: true, 
      subtree: true
    });
    if(timeout) timer = setTimeout(()=>{
      observer.disconnect();
      reject();
    }, timeout);
  });
}

let Funct_Select_AcceptButton = ()=>document.querySelector("#main > div:nth-child(3) > a.w3-left.w3-btn")

waitForElement1(Funct_Select_AcceptButton)