import {Locator, Page} from '@playwright/test';
import { BasePage } from './Basepage.js';

export class ProductInfoPage extends BasePage
{
    private readonly productHeader:Locator
    private readonly productImages:Locator 
    private readonly productMetadata:Locator
    private readonly productPrice:Locator
    private readonly map:Map<string,string>

    constructor(page:Page)
    {

        super(page);
        this.productHeader= page.locator("h1");
        this.productImages= page.locator("//div[@class='image magnific-popup']//img");
        this.productMetadata= page.locator("(//div[@class='col-sm']//ul[@class='list-unstyled'])[1]//li");
        this.productPrice= page.locator("(//div[@class='col-sm']//ul[@class='list-unstyled'])[2]//span");
        this.map=new Map<string,string>();//key ,value
        }


    async getProductHeader():Promise<string>
    {
        return await this.productHeader.innerText()
    }

    async getProdutcImagCount():Promise<number>
    {
        await this.productImages.first().waitFor({state:'visible'});
        return this.productImages.count();
    }

    async getProductMetaData()
    {
        await this.productMetadata.first().waitFor({state:'visible'});
        let metainfo:string[]=await this.productMetadata.allInnerTexts();
       
        for (let data of metainfo)
        {
           let meta=data.split(":");
           let metakey=meta[0].trim();
           let metavalue=meta[1].trim();

           this.map.set(metakey,metavalue);

        }}

    async getProductPricingData():Promise<void>
    {
       let priceinfo= await this.productPrice.innerText();
       this.map.set("Product price", priceinfo);
    }


    async getProductCompleteInfo():Promise<Map<string,string>>
    {
        await this.getProductMetaData();
        await this.getProductPricingData();
        return this.map;
    }

}