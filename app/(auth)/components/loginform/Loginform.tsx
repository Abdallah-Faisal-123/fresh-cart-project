'use client'
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons'
import { faLock, faPeopleGroup, faSpinner, faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { SubmitHandler, useForm } from 'react-hook-form'
import { LoginFormValues, loginSchima } from '../../Schemas/login.Schema'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import loginAction from '../../Server/login.Actions'
import { toast } from 'react-toastify'
import { useRouter, useSearchParams } from 'next/navigation'
import { faEnvelope } from '@fortawesome/free-regular-svg-icons'
import { setToken } from '../../Server/auth.Actions'
import { useDispatch } from 'react-redux'
import { setAuthInfo } from '@/store/slices/auth.slice'

export default function Loginform() {
    const router = useRouter()
    const dispatch = useDispatch()
    const searchParams = useSearchParams()

    const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm<LoginFormValues>({
        defaultValues: {
            email: '',
            password: '',
            remember: false
        },
        resolver: zodResolver(loginSchima),
        mode: 'onSubmit',
        reValidateMode: 'onChange'
    })

    const onSubmit: SubmitHandler<LoginFormValues> = async (values) => {
        try {
            const response = await loginAction(values)
            if (response.success) {
                const callbackUrl = searchParams.get('callbackUrl') || '/'
                await setToken(response.data.token, values.remember)
                dispatch(setAuthInfo({ isAuthenticated: true, userInfo: response.data.user }))
                toast.success(response.message)
                setTimeout(() => {
                    router.push(callbackUrl)
                }, 1000)
            }
            else {
                if (response?.errors) {
                    Object.keys(response.errors).forEach((key) => {
                        setError(key as keyof LoginFormValues, { type: 'server', message: response.errors[key] })
                    })
                }
            }
        } catch (error) {

        }
    }

    return (
        <div className='bg-white shadow-md rounded-xl p-10 space-y-8 '>
            <div className='text-center '>
                <h1>
                    <span className="text-3xl font-semibold" >
                        <span className="text-green-500">Fresh</span><span>Cart</span>
                    </span>
                </h1>
                <h2 className='text-2xl font-bold'>Welcome Back!</h2>
                <p className='mt-4'>Sign in to continue your fresh shopping exqerience</p>
            </div>
            <div className='flex flex-col *:hover:cursor-pointer gap-2 *:flex *:gap-2 *:items-center *:w-full *:justify-center *:hover:bg-gray-100 '>
                <button className='bg-transparent border rounded-md border-gray-400/40 px-3 py-1'>
                    <FontAwesomeIcon className='text-red-500' icon={faGoogle} />
                    <span>Countinue with Google</span>
                </button>

                <button className='bg-transparent border rounded-md border-gray-400/40 px-3 py-1'>
                    <FontAwesomeIcon className='text-blue-500' icon={faFacebook} />
                    <span>Countinue with Facebook</span>
                </button>
            </div>
            <div className=' relative w-full h-0.5 bg-gray-300/40'>
                <span className=' absolute top-1/2 left-1/2 -translate-1/2 px-4 bg-white'>or</span>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className='space-y-7'>
                <div className='flex flex-col gap-1 relative'>
                    <label htmlFor="email">Email</label>
                    <input
                        {...register("email")}
                        className='border border-gray-400/50 focus:outline-0 focus:border-[#22c55e] rounded-md w-full pl-9.5 py-2' type="email" id='email' placeholder='Abdullah@examble.com' />
                    <span className='text-lg absolute top-1/2 left-2 text-gray-400'><FontAwesomeIcon icon={faEnvelope} /></span>
                    {errors.email && <p className='text-red-500 mt-2'> {errors.email.message} </p>}
                </div>
                <div className='flex flex-col gap-1 relative'>
                    <label htmlFor="password" className='flex justify-between'>
                        <label htmlFor="password">Password</label>
                        <span><Link className='text-[#16a34b]' href={'/forget-password'}>Forget Password?</Link></span>
                    </label>
                    <input
                        {...register("password")}
                        className='border border-gray-400/50 focus:outline-0 focus:border-[#22c55e] rounded-md w-full pl-9.5 py-2' type="password" id='password' placeholder='Create a strong password' />
                    <span className='text-lg absolute top-1/2 left-2 text-gray-400'><FontAwesomeIcon icon={faLock} /></span>
                    {errors.password && <p className='text-red-500 mt-2'> {errors.password.message} </p>}
                </div>
                <div className='flex gap-2 items-center'>
                    <input
                        {...register("remember")}
                        className='accent-[#16a34b] size-4' type="checkbox" name="terms" id="terms" />
                    <label htmlFor="terms">
                        Remember Me
                    </label>
                    {errors.remember && <p className='text-red-500 mt-2'> {errors.remember.message} </p>}
                </div>
                <button disabled={isSubmitting} className=' disabled:bg-gray-950 disabled:cursor-not-allowed border rounded-md border-gray-400/40 bg-[#16a34b] px-3 py-1 flex gap-2 items-center justify-center text-white hover:cursor-pointer w-full  hover:bg-[#298a43] ' type='submit'>
                    {isSubmitting ? <>
                        <FontAwesomeIcon spin icon={faSpinner} />
                        <span>Logging you in</span>
                    </> : <>
                        <span>Login</span>
                    </>}
                </button>
            </form>
            <p className='text-center pt-8 border-t border-gray-300/30'>New in freshCart? <Link className='text-[#16a34b]' href={'/signup'}>Create an account</Link></p>
            <div className="flex justify-around">
                <div className=""><FontAwesomeIcon icon={faLock} />
                    <span>SSL Secured</span>
                </div>

                <div className=""><FontAwesomeIcon icon={faPeopleGroup} />
                    <span>50k+ Users</span>
                </div>

                <div className=""><FontAwesomeIcon icon={faStar} />
                    <span>4.9 Rating</span>
                </div>
            </div>
        </div>
    )
}