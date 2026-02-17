import { string, success } from "zod";
import { signupFormValues, signupSchema } from "../Schemas/signup.Schema";
import axios,{AxiosError, AxiosRequestConfig} from "axios"
export default async function signupAction(values:signupFormValues){
    const validationResult = signupSchema.safeParse(values)

    if(!validationResult.success){
        const errors:Record<string,string> = {}
        if(validationResult.error){
            validationResult.error.issues.forEach((issue)=>{
                const field = issue.path[0] as string
                const message  = issue.message 
               
            if(!errors[field]){
                errors[field] = message
            }
            }) 
        }
        return {
            success:false,
            message:'validation error',
            errors
        }
    }

    const {terms , ...requestBody} = values
    
    try {
        const options:AxiosRequestConfig = {
            url: "https://ecommerce.routemisr.com/api/v1/auth/signup",
            method:'POST',
            data:values
        }

        const {data} = await axios.request(options)

        if (data.message === 'success') {
            return{success:true,message:"Account created successfully",data}
            
        }
        return{
            success:false,
            message:data.message||'some thing went wrong'
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            const errorMessage = error.response?.data.message
            if (errorMessage === 'Account Already Exists') {
                return{
                    success:false,
                    message:'Account already exists',
                    errors:{
                        email:'an Account with this email already exists'
                    }
                }
            }
        }
    }
}