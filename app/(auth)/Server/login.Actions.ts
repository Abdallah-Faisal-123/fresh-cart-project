'use server'

import { LoginFormValues, loginSchima } from "../Schemas/login.Schema";
import axios, { AxiosError, AxiosRequestConfig } from "axios";

export default async function loginAction(values:LoginFormValues){
 const validatinResult =loginSchima.safeParse(values)
 if(!validatinResult.success){
    const errors:Record<string,string> = {}
    if(validatinResult.error){
       validatinResult.error.issues.forEach((issue)=>{
        const key = issue.path[0] as string
        const message = issue.message
        if(!errors[key]){
            errors[key] = message
        }   
    })
       
    }
   return{ 
    success:false,
    message:'validation error',
    errors
   }
 }
  
 try {
    const {remember, ...requesData} = values

    const options:AxiosRequestConfig = {
        url:'https://ecommerce.routemisr.com/api/v1/auth/signin',
        method:'POST',
        data:requesData
    }

    const {data} = await axios.request(options)
      console.log(data.message)
    if(data.message === 'success'){
        return{success:true,message:"Welcome Back",data}
    }

    return{
            success:false,
            message:data.message||'some thing went wrong',
            
        }
 } catch (error) {
    
    if(error instanceof AxiosError){
        console.log('error', error.response?.data.message)
        const errorMessage = error.response?.data.message;
        if(errorMessage === 'Incorrect email or password')
        {
            return{
                
            success:false,
            message:'wrong credintials',
            errors:{
                password:'incorrect email or password'
            }
            }
        }
    }
    return{
            success:false,
            message:'some thing went wrong',
            
        }
 }
}

