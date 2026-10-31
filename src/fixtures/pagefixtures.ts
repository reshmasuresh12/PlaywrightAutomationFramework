import {test as baseTest} from '@playwright/test';
import { LoginPage } from "src/pages/LoginPage.js";
import { homepage } from "../pages/homepage.js";
import {SearchResultsPage} from "src/pages/SearchResultsPage.js"
import {ProductInfoPage} from "src/pages/Productinfopage.js"

//defining types for page fixture

type pageFixtures={
loginpage:LoginPage;
homePage:homepage;
searchpage:SearchResultsPage;
productinfo:ProductInfoPage;

}

export let test=baseTest.extend<pageFixtures>({

   loginpage:async ({page}, use)=>
    {
       let loginpage=new LoginPage(page);
       await use(loginpage);
    },

     homePage:async ({page}, use)=>
    {
       let homePage=new homepage(page);
       await use(homePage);
    },

    searchpage:async ({page}, use)=>
    {
       let searchpage=new SearchResultsPage(page);
       await use(searchpage);
    },

   productinfo:async ({page}, use)=>
    {
       let productinfo=new ProductInfoPage(page);
       await use(productinfo);
    }

});

export {expect} from '@playwright/test';
