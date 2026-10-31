import { LoginPage } from "src/pages/LoginPage.js";
import {test,expect} from "../src/fixtures/pagefixtures.js";
import {CsvHelper} from  "../src/utils/csvUtils.js" 
import {ExcelHelper}from "../src/utils/excelUtils.js"
import {JsonHelper}from "../src/utils/jsonUtils.js"

test.beforeEach(async({loginpage})=>
{
  await loginpage.gotologinpage();

  
})

//create object for the child login class
test ("login title test",async({loginpage})=>
{
  let title= await loginpage.getloginpagetitle();
  expect(title).toBe("Account Login");

})

test ("forgot pwd link exist test",async({loginpage})=>
{

  let ispwdlink= await loginpage.isforgotpwdlink();
  expect(ispwdlink).toBe(true);

})

test ("do login test",async({loginpage,homePage})=>
{
 await loginpage.dologin(process.env.USER_NAME!,process.env.PASSWORD!);
 //assertions
 let flag= await homePage.islogoutlink();
 expect(flag).toBeTruthy();

})

//reading the multiple data from multiple csv file for negative testing---CSV
let testData:Record<string, string>[]=CsvHelper.readCsv("src/testData/loginData.csv");

for (let data of testData)
{
    
test(`Negative test: ${data.username} and ${data.password}`,async({loginpage})=>
{
   await loginpage.dologin(data.username,data.password);
   let errormsg=await loginpage.getpageerrormessage();

   expect(errormsg).toContain("Warning: No match for E-Mail Address and/or Password.");
})
}
//with excel

let testData2:Record<string, string>[]=ExcelHelper.readExcel("src/testData/loginData.xlsx");

for (let data of testData2)
{
    
test(`Negative test2 with excel: ${data.username} and ${data.password}`,async({loginpage})=>
{
   await loginpage.dologin(data.username,data.password);
   let errormsg=await loginpage.getpageerrormessage();

   expect(errormsg).toContain("Warning: No match for E-Mail Address and/or Password.");
})
}

//with json

let testData3:Record<string, string>[]=JsonHelper.readJson("src/testData/jsonData.json");

for (let data of testData3)
{
    
test(`Negative test3 with json: ${data.username} and ${data.password}`,async({loginpage})=>
{
   await loginpage.dologin(data.username,data.password);
   let errormsg=await loginpage.getpageerrormessage();

   expect(errormsg).toContain("Warning: No match for E-Mail Address and/or Password.");
})
}