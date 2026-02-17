import {z} from "zod"
export const signupSchema = z.object({
    name:z.string().nonempty('name is required')
    .min(3,'name must be at least 3 characters')
    .max(30,'name can not be more than  30 characters'),
    email:z.string().nonempty('email is required').pipe(z.email('invalid email address')),
    password:z
    .string()
    .nonempty('password is required')
    .min(8,'password must be at least 8 characters')
    .regex(/[A-Z]/,'Password must contain at least one  uppercase letter')
    .regex(/[a-z]/,'Password must contain at least one  lowercase letter')
    .regex(/[a-z]/,'Password must contain at least one  lowercase letter')
    .regex(/[!@#$%^&*()<?>":|,.]/,'Password must contain at least one special character'),
    rePassword:z.string().nonempty('confirm Password is required'),
    phone:z.string().nonempty('phone is required is required').regex(/^(\+2)?01[0125][0-9]{8}$/,'only Egyptian phone numbers are allowed'),
    terms:z.boolean().refine((value)=>value === true,{error:'you must acept the terms and conditions'})
}).refine((data) => data.password === data.rePassword,{error:'password and confirm password must match',path:['rePassword']})

export type signupFormValues = z.infer<typeof signupSchema>