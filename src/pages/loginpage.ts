import { Locator, Page } from '@playwright/test';
import { BasePage } from "./Basepage.js";

export class LoginPage extends BasePage

{
    private readonly emailid:Locator
    private readonly password:Locator
    private readonly loginbtn:Locator
    private readonly forgotpwdlink:Locator
    private readonly pageerrormessage:Locator

    constructor(page:Page)
    {
    super(page);
    this.emailid=page.locator('#input-email');// this constructor will be called when we create object for this class
    this.password=page.locator('#input-password');
    this.loginbtn=page.locator("//button[text()='Login']");
    this.forgotpwdlink=page.locator("(//a[text()='Forgotten Password'])[1]");
    this.pageerrormessage=page.locator(".alert.alert-danger.alert-dismissible");
    }
 
    async gotologinpage():Promise<void>
    {
        await this.page.goto("en-gb?route=account/login");
    }

     async getloginpagetitle(): Promise<string>
    {
        return await this.page.title();
    }

     
    async isforgotpwdlink():Promise<boolean>
    {
       return await this.forgotpwdlink.isVisible();
    }

    async dologin(username:string,password:string)
    {
       await this.emailid.fill(username);
       await this.password.fill(password);
       await this.loginbtn.click();

       await this.page.waitForTimeout(2000);       
    }
      async getpageerrormessage():Promise<string>
      {
       return await this.pageerrormessage.innerText();
      }
    
}