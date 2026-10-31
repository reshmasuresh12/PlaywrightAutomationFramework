import {Locator, Page} from '@playwright/test';
import { BasePage } from './Basepage.js';

export class SearchResultsPage extends BasePage
{
  private readonly resultHeader:Locator
  private readonly searchResults:Locator

  constructor (page:Page)
  {
    super(page);
    this.resultHeader= page.locator("h1");
    this.searchResults=page.locator("div.product-thumb");
  }

  async getSearchResultspageHeader():Promise<string>
  {
    return await this.resultHeader.innerText()
  }

  async getSearchResultscount():Promise<number>
  {
    return await this.searchResults.count();
  }

  async SelectANDClickOnProduct(productname:string):Promise<void>
  {
    let productLocator:Locator=this.page.locator(`(//h4/a[text()="${productname}"])[1]`);
    console.log(`clicking on the product with name: ${productname}`);
    //await productLocator.waitFor({ state: 'visible', timeout: 10000 });
    await productLocator.click();
  }
}

