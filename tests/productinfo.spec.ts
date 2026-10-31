import { homepage } from "src/pages/homepage.js";
import {test,expect} from "../src/fixtures/pagefixtures.js";
import { SearchResultsPage } from "src/pages/SearchResultsPage.js";
import { ProductInfoPage } from "src/pages/Productinfopage.js";


test.beforeEach(async({loginpage})=>
{

  await loginpage.gotologinpage();
  await loginpage.dologin(process.env.USER_NAME!,process.env.PASSWORD!);

})

test ("Verify the product image count",async({homePage,searchpage,productinfo})=>
{
  await homePage.dosearch("Macbook");
  await searchpage.SelectANDClickOnProduct("MacBook Air")
  let imagecount=await productinfo.getProdutcImagCount();

  expect(imagecount).toBeGreaterThan(1);

})

test ("Verify the product information Test",async({homePage,searchpage,productinfo})=>
{
  await homePage.dosearch("Macbook");
  await searchpage.SelectANDClickOnProduct("MacBook Pro");
  let completeinfo= await productinfo.getProductCompleteInfo();

  console.log(completeinfo);

  expect.soft(completeinfo.get("Brand")).toBe("Apple");
  expect.soft(completeinfo.get("Product Code")).toBe("Product 18");
  expect.soft(completeinfo.get("Reward Points")).toBe("800");
  expect.soft(completeinfo.get("Availability")).toBe("In Stock");
  expect.soft(completeinfo.get("Product price")).toBe("$2,000.00");
  

})

test ("Verify the common logo test @sanity",async({productinfo})=>
{
  let isvisilble=await productinfo.isLogoVisible();
  

  expect(isvisilble).toBe(true);

})

test ("Verify the footer count test",async({productinfo})=>
{
  let footercount=await productinfo.getPageFootersCount()
  expect(footercount).toBe(15);

})
