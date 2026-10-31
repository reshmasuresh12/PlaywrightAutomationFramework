import {test,expect} from "../src/fixtures/pagefixtures.js";
import {CsvHelper} from  "../src/utils/csvUtils.js" 
import { homepage } from "src/pages/homepage.js";
import { SearchResultsPage } from "src/pages/SearchResultsPage.js";

test.beforeEach(async({loginpage})=>
{

  await loginpage.gotologinpage();
  await loginpage.dologin(process.env.USER_NAME!,process.env.PASSWORD!);

})

test ("Verify search Header Functionality Test @sanity",async({homePage,searchpage})=>
{
  await homePage.dosearch("macbook");
  let searchheader:string=await searchpage.getSearchResultspageHeader();

  expect(searchheader).toContain("macbook");
})

test ("search Functionality Count Test",async({homePage,searchpage})=>
{
  await homePage.dosearch("samsung");
  let resultcount:number=await searchpage.getSearchResultscount();

  expect(resultcount).toBeGreaterThan(0);
})


test ("Verify click product Functionality Test",async({homePage,searchpage,page})=>
{
  await homePage.dosearch("Macbook");
  await searchpage.SelectANDClickOnProduct("MacBook Air")

  expect(page).toHaveTitle("MacBook Air");
})

//csv

// let testData: Record<string, string>[] =CsvHelper.readCsv("src/testData/searchData.csv");

// for (let data of testData)
// {
//     test(`Search test: ${data.searchData}`, async ({homePage,searchpage}) =>
//     {
//          await homePage.dosearch(data.searchData);

//         let productname = await searchpage.getSearchResultspageHeader();
//         let count = await searchpage.getSearchResultscount();

//         expect(productname).toContain(data.productname);
//         expect(count).toBe(Number(data.count));
//     });
// }