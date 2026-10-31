import { homepage } from "src/pages/homepage.js";
import {test,expect} from "../src/fixtures/pagefixtures.js";


test.beforeEach(async({loginpage,homePage})=>
{

  await loginpage.gotologinpage();
  await loginpage.dologin(process.env.USER_NAME!,process.env.PASSWORD!);

})

test ("Homepage title test",async({homePage})=>
{
  let hptitle= await homePage.gethomepagetitle();
  expect(hptitle).toBe("My Account");

})

test ("Logout link exist test",async({homePage})=>
{

  let islogoutlink= await homePage.islogoutlink();
  expect(islogoutlink).toBe(true);

})

test ("home page header",async({homePage})=>
{

  let homepageheader= await homePage.gethomepageheader();
  expect(homepageheader).toHaveLength(3);
  expect.soft(homepageheader).toEqual(["My Orders","My Affiliate Account","Newsletter"]);
})