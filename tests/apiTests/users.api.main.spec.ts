import {test,expect} from "../../src/fixtures/apifixtures.js";

const TOKEN= process.env.API_TOKEN;
let AUTH_TOKEN={'Authorization':`Bearer ${TOKEN}`};
let userId:number;


test.describe.serial("end o end usecase api test cases",()=>
{

test("Get all users API Test", async({apiHelper})=>
{
   let response=await apiHelper.getRequest("/public/v2/users",AUTH_TOKEN);
   console.log(response);
   console.log(response.responseBody);

 expect(response.statusCode).toBe(200);
 expect(response.responseBody.length).toBeGreaterThan(5)

})

test("Create fresh users API Test", async({apiHelper})=>
{

       let userdata= {
    
                    "name": "Reshma Suresh",
                    "email": `reshma${Date.now()}@gmail.com`,
                    "gender": "female",
                    "status": "inactive"
}
   let response=await apiHelper.postRequest("/public/v2/users",userdata,AUTH_TOKEN);
   console.log(response);
   console.log(response.responseBody);
   
    expect(response.statusCode).toBe(201);
    expect(response.responseBody.name).toBe(userdata.name);

    userId= response.responseBody.id;
    console.log("Userid is : "+userId);
})

test("Update users API Test", async({apiHelper})=>
{

       let userdata= {
    
                    "name": "Reshma KS",
                    "email": `reshma${Date.now()}@gmail.com`,
                    "gender": "female",
                    "status": "active"
}
   let response=await apiHelper.putRequest(`/public/v2/users/${userId}`,userdata,AUTH_TOKEN);
   console.log(response);
   console.log(response.responseBody);
   
    expect(response.statusCode).toBe(200);
    expect(response.responseBody.name).toBe(userdata.name);
    expect(response.responseBody.status).toBe(userdata.status);
})

test("Delete users API Test", async({apiHelper})=>
{

   let response=await apiHelper.deleteRequest(`/public/v2/users/${userId}`,AUTH_TOKEN);
   console.log(response);
   expect(response.statusCode).toBe(204);
   expect(response.statustext).toBe("No Content");
   
})
});
