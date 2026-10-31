import {APIRequestContext} from"@playwright/test";

export class APIHelper
{


    private readonly request:APIRequestContext;
    private readonly baseURL:string;

    constructor(request:APIRequestContext,baseURL:string)
    {
        this.request=request;
        this.baseURL=baseURL;
    }

    //public reusable http methods

    async getRequest(endPoint:string,requestHeaders?:Record<string,string>)
    {
     let response= await this.request.get(`${this.baseURL}${endPoint}`,{headers:requestHeaders})

       return{
         statusCode:response.status(),
         responseBody:await response.json()
       };
    }

async postRequest(endPoint:string,bodyData:object,requestHeaders?:Record<string,string>)
    {
     let response= await this.request.post(`${this.baseURL}${endPoint}`,{headers:requestHeaders,data:bodyData})

       return{
         statusCode:response.status(),
         responseBody:await response.json()
       };
    }

async putRequest(endPoint:string,bodyData:object,requestHeaders?:Record<string,string>)
    {
     let response= await this.request.put(`${this.baseURL}${endPoint}`,{headers:requestHeaders,data:bodyData})

       return{
         statusCode:response.status(),
         responseBody:await response.json()
       };
    }

    async deleteRequest(endPoint:string,requestHeaders?:Record<string,string>)
    {
     let response= await this.request.delete(`${this.baseURL}${endPoint}`,{headers:requestHeaders})

       return{
         statusCode:response.status(),
         statustext:response.statusText()
       };
    }
}