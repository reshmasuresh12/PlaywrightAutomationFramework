import {test,expect} from "@playwright/test";

let AUTH_TOKEN={'Authorization':'Bearer 3ce9574cf2c92b02c4600a1e5c5781d770dcf73fdb6fc06252c73a226d392a72'}

test("Fetch single user", async({request})=>
{
   let response=await request.get("https://gorest.co.in/public/v2/users/8683820",{headers:AUTH_TOKEN});
   console.log(response);

   let responsebody=await response.json();
   console.log(responsebody);

   console.log("Response code is : "+response.status());
   console.log("Response mesaage is :"+response.statusText());
})

test("Fetch multiple user", async({request})=>
{
   let response=await request.get("https://gorest.co.in/public/v2/users",{headers:AUTH_TOKEN});
   console.log(response);// jsobject in retrun

   let responsebody=await response.json();//conversion of js object to json string
   console.log(responsebody);

   console.log("Response code is : "+response.status());
   console.log("Response mesaage is :"+response.statusText());

   expect(response.status()).toBe(200);
})


test("Create a user POST", async({request})=>
{

   let userdata= {
    
                    "name": "Reshmaaa",
                    "email": `reshma${Date.now()}@gmail.com`,
                    "gender": "female",
                    "status": "active"
}

   let response=await request.post("https://gorest.co.in/public/v2/users",{headers:AUTH_TOKEN,data:userdata});
   console.log(response);// jsobject in retrun

   let responsebody=await response.json();//conversion of js object to json string
   console.log(responsebody);

   console.log("Response code is : "+response.status());
   console.log("Response mesaage is :"+response.statusText());
})


test("update the created user-PUT", async({request})=>
{

   let userdata= {
    
                    "name": "Reshma Suresh",
                    "email": `reshma${Date.now()}@gmail.com`,
                    "gender": "female",
                    "status": "inactive"
}

   let response=await request.put("https://gorest.co.in/public/v2/users/8685891",{headers:AUTH_TOKEN,data:userdata});
   console.log(response);// jsobject in retrun

   let responsebody=await response.json();//conversion of js object to json string
   console.log(responsebody);

   console.log("Response code is : "+response.status());
   console.log("Response mesaage is :"+response.statusText());
})


test("delete the created user-delete", async({request})=>
{



   let response=await request.delete("https://gorest.co.in/public/v2/users/8685891",{headers:AUTH_TOKEN});
   console.log(response);// jsobject in retrun

   console.log("Response code is : "+response.status());
   console.log("Response mesaage is :"+response.statusText());
})