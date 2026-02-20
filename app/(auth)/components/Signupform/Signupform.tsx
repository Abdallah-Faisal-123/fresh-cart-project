'use client'
import { faSpinner, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { SubmitHandler, useForm } from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import { signupFormValues, signupSchema } from '../../Schemas/signup.Schema'
import signupAction from '../../Server/signup.Actions'
import { toast } from 'react-toastify'
import { useRouter, useSearchParams } from 'next/navigation'

export default function Signupform() {
    
    const router = useRouter()
    const searchParams = useSearchParams()

    const onSubmit:SubmitHandler<signupFormValues> = async (values) =>{
       try {
        const response = await signupAction(values)
        if(response?.success){
            const callbackUrl = searchParams.get('callbackUrl') || '/login'
            toast.success(response.message)
            setTimeout(()=>{
                router.push(callbackUrl)
            },1000)
        }
        else{
            if (response?.errors) {
               Object.keys(response.errors).forEach((key)=>{
                setError(key as keyof signupFormValues,{message:response.errors[key]})
               })       
            }
        }
       } catch (error) {
        
       }
    } 

    const {register,handleSubmit,formState:{errors,isSubmitting},setError} = useForm<signupFormValues>({
        defaultValues:{
            name:"",
            email:"",
            password:"",
            rePassword:"",
            phone:"",
            terms:false
        },
        resolver:zodResolver(signupSchema),
        mode:'onSubmit',
        reValidateMode:'onChange'
    });

  return (
    <div className='bg-white shadow-md rounded-xl p-10 space-y-8 '>
                        <div className='text-center '>
                            <h2 className='text-3xl font-semibold'>Create Your Account</h2>
                            <p className='mt-4'>Start your fresh journey with us today</p>
                        </div>
                        <div className='flex gap-2 *:flex *:gap-2 *:items-center *:w-full *:justify-center *:hover:bg-gray-100 '>
                            <button className='bg-transparent border rounded-md border-gray-400/40 px-3 py-1'>
                                <FontAwesomeIcon className='text-red-500' icon={faGoogle} />
                                <span>Google</span>
                            </button>

                            <button className='bg-transparent border rounded-md border-gray-400/40 px-3 py-1'>
                                <FontAwesomeIcon className='text-blue-500' icon={faFacebook} />
                                <span>Facebook</span>
                            </button>
                        </div>
                        <div className=' relative w-full h-0.5 bg-gray-300/40'>
                            <span className=' absolute top-1/2 left-1/2 -translate-1/2 px-4 bg-white'>or</span>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className='space-y-7'>
                            <div className='flex flex-col gap-1'>
                                <label htmlFor="name">Name</label>
                                <input 
                                 {...register("name")} 
                                className='border border-gray-400/50 focus:outline-0 focus:border-[#22c55e] rounded-md w-full px-3 py-2' type="text" id='name' placeholder='Abdullah' />
                                {errors.name&& <p className='text-red-500 mt-2'> {errors.name.message} </p> }
                            </div>

                            <div className='flex flex-col gap-1'>
                                <label htmlFor="email">Email</label>
                                <input 
                                 {...register("email")} 
                                className='border border-gray-400/50 focus:outline-0 focus:border-[#22c55e] rounded-md w-full px-3 py-2' type="email" id='email' placeholder='Abdullah@examble.com' />
                                {errors.email&& <p className='text-red-500 mt-2'> {errors.email.message} </p> }
                            </div>

                            <div className='flex flex-col gap-1'>
                                <label htmlFor="password">Password</label>
                                <input 
                                 {...register("password")} 
                                className='border border-gray-400/50 focus:outline-0 focus:border-[#22c55e] rounded-md w-full px-3 py-2' type="password" id='password' placeholder='Create a strong password' />
                               {errors.password&& <p className='text-red-500 mt-2'> {errors.password.message} </p> }
                            </div>
                             <div className='flex gap-2 items-center'>
                                    <div className='bar rounded-xl overflow-hidden w-full h-1 bg-gray-200'>
                                        <div className="progress w-1/4 bg-red-500 h-full">
                                        </div>
                                    </div>
                                    <span>Week</span>
                                </div>

                            <div className='flex flex-col gap-1'>
                                <label htmlFor="rePassword">Confirm Password</label>
                                <input 
                                 {...register("rePassword")} 
                                className='border border-gray-400/50 focus:outline-0 focus:border-[#22c55e] rounded-md w-full px-3 py-2' type="password" id='rePassword' placeholder='Confirm password' />
                                {errors.rePassword&& <p className='text-red-500 mt-2'> {errors.rePassword.message} </p> }
                            </div>

                            <div className='flex flex-col gap-1'>
                                <label htmlFor="phone">Phone</label>
                                <input 
                                 {...register("phone")}
                                className='border border-gray-400/50 focus:outline-0 focus:border-[#22c55e] rounded-md w-full px-3 py-2' type="text" id='phone' placeholder='+2 010 1273 4407' />
                                {errors.phone&& <p className='text-red-500 mt-2'> {errors.phone.message} </p> }
                            </div>
                            <div className='flex gap-2 items-center'>
                                <input 
                                 {...register("terms")} 
                                className='accent-[#16a34b] size-4' type="checkbox" name="terms" id="terms" />
                                <label htmlFor="terms">
                                    I agree to the <Link className='text-[#16a34b]' href={'/terms'}>Terms of Service</Link> and <Link className='text-[#16a34b]' href={'/privacy-policy'}>Privacy Policy</Link>
                                </label>
                                {errors.terms&& <p className='text-red-500 mt-2'> {errors.terms.message} </p> }
                            </div>
                            <button disabled={isSubmitting} className=' disabled:bg-gray-950 disabled:cursor-not-allowed border rounded-md border-gray-400/40 bg-[#16a34b] px-3 py-1 flex gap-2 items-center justify-center text-white hover:cursor-pointer w-full  hover:bg-[#298a43] ' type='submit'>
                                {isSubmitting ? <>
                                 <FontAwesomeIcon spin icon={faSpinner} />
                                <span>Creating an account</span>
                                </> : <>
                                <FontAwesomeIcon icon={faUserPlus} />
                                <span>Create My Account</span>
                                </>}
                            </button>
                        </form>
                        <p className='text-center pt-8 border-t border-gray-300/30'>Already have account <Link className='text-[#16a34b]' href={'/login'}>Sign in</Link></p>
                    </div>
  )
}
