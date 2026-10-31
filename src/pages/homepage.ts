import {Locator, Page} from '@playwright/test';
import { Basepage } from './basepage.js';

export class homepage extends Basepage
{
    private readonly headers:Locator
    private readonly logoutlink:Locator
   
   
   constructor(page:Page)
    {
    super(page);
    this.headers=page.locator("h2");// this constructor will be called when we create object for this class
    this.logoutlink=page.locator("(//a[text()='Logout'])[2]");
   
    

    }

    async gethomepagetitle():Promise<string>
    {
        return await this.page.title();
    }

    async gethomepageheader():Promise<string[]>
    {
        let headers:string[]=await this.headers.allInnerTexts();
        return headers;
    }

   async islogoutlink():Promise<boolean>
   {
     return await this.logoutlink.isVisible()
   }

   async dosearch(searchText:string):Promise<void>
   {
    console.log(`searching from the product : ${searchText}`);
    await this.searchBar.fill(searchText);
    await this.searchIcon.click();
   }
}