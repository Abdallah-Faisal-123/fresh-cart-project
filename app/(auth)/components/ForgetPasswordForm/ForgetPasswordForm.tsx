'use client'
import { faEnvelope, faLock, faKey, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { SubmitHandler, useForm } from 'react-hook-form'
import { ForgetPasswordFormValues, forgetPasswordSchema } from '../../Schemas/forget-password.Schema'
import forgetPasswordAction from '../../Server/forgetPassword.Action'
import { setToken } from '../../Server/auth.Actions'
import { useDispatch } from 'react-redux'
import { setAuthInfo } from '@/store/slices/auth.slice'
import { toast } from 'react-toastify'

type ForgetPasswordFormProps = {
  showIllustration?: boolean
}

export default function ForgetPasswordForm({ showIllustration = true }: ForgetPasswordFormProps) {
  const dispatch = useDispatch()
  const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm<ForgetPasswordFormValues>({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(forgetPasswordSchema),
    mode: 'onSubmit',
    reValidateMode: 'onChange'
  })

  const onSubmit: SubmitHandler<ForgetPasswordFormValues> = async (values) => {
    try {
      const response = await forgetPasswordAction(values)
      if (response.success) {

        /* dispatch(setAuthInfo({isAuthenticated:true,userInfo:response.data.user}))                                            */
        toast.success(response.message)
      }
      else {
        if (response?.errors) {
          Object.keys(response.errors).forEach((key) => {
            setError(key as keyof ForgetPasswordFormValues, { type: 'server', message: response.errors[key] })

          })
        }
      }
    } catch (error) {
      toast.error('An unexpected error occurred. Please try again later.')
    }
  }

  return (
    <div className='space-y-6'>
      {showIllustration ? (
        <>
          {/* Illustration Section - LEFT SIDE */}
          <div className='w-full h-80 sm:h-96 lg:h-full bg-gradient-to-br from-green-50 via-green-50 to-emerald-50 rounded-2xl shadow-lg flex items-center justify-center relative overflow-hidden min-h-72'>
            {/* Decorative blobs */}
            <div className='absolute top-8 left-8 w-24 h-24 rounded-full bg-green-100/50'></div>
            <div className='absolute bottom-12 right-10 w-32 h-32 rounded-full bg-green-100/50'></div>
            <div className='absolute top-20 right-20 w-16 h-16 rounded-full bg-emerald-100/50'></div>

            {/* Icons cards */}
            <div className='relative flex flex-col items-center gap-6 z-10'>
              {/* Main lock icon */}
              <div className='w-28 h-28 rounded-3xl bg-white shadow-xl flex items-center justify-center rotate-3 hover:rotate-0 transition-transform duration-300'>
                <div className='w-20 h-20 rounded-2xl bg-green-100 flex items-center justify-center'>
                  <FontAwesomeIcon icon={faLock} className='text-[#16a34a] text-4xl' />
                </div>
              </div>

              {/* Side icons */}
              <div className='absolute -left-16 top-4 w-14 h-14 rounded-xl bg-white shadow-lg flex items-center justify-center -rotate-12'>
                <FontAwesomeIcon icon={faEnvelope} className='text-[#16a34a] text-xl' />
              </div>
              <div className='absolute -right-16 top-8 w-14 h-14 rounded-xl bg-white shadow-lg flex items-center justify-center rotate-12'>
                <FontAwesomeIcon icon={faLock} className='text-green-500 text-xl' />
              </div>

              {/* Animated dots */}
              <div className='flex gap-3'>
                <div className='w-3 h-3 rounded-full bg-green-400 animate-pulse'></div>
                <div className='w-3 h-3 rounded-full bg-green-500 animate-pulse' style={{ animationDelay: '150ms' }}></div>
                <div className='w-3 h-3 rounded-full bg-green-600 animate-pulse' style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className='space-y-4'>
            <h2 className='text-3xl font-bold text-gray-800'>Reset Your Password</h2>
            <p className='text-lg text-gray-600'>Don't worry, it happens to the best of us. We'll help you get back into your account in no time.</p>

            {/* Features */}
            <div className='flex items-center justify-center space-x-8 text-sm text-gray-500 pt-2'>
              <div className='flex items-center'>
                <FontAwesomeIcon icon={faEnvelope} className='text-[#16a34a] mr-2' />
                Email Verification
              </div>
              <div className='flex items-center'>
                <FontAwesomeIcon icon={faKey} className='text-[#16a34a] mr-2' />
                Secure Reset
              </div>
              <div className='flex items-center'>
                <FontAwesomeIcon icon={faLock} className='text-[#16a34a] mr-2' />
                Encrypted
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Form Only Section - RIGHT SIDE */}
          <div className='bg-white rounded-2xl shadow-xl p-8 lg:p-12 space-y-6'>
            {/* Header with Logo */}
            <div className='text-center mb-8'>
              <div className='flex items-center justify-center mb-4'>
                <span className='text-3xl font-bold'>
                  <span className='text-[#16a34a]'>Fresh</span>
                  <span className='text-gray-800'>Cart</span>
                </span>
              </div>
              <h1 className='text-2xl font-bold text-gray-800 mb-2'>Forgot Password?</h1>
              <p className='text-gray-600'>No worries, we'll send you a reset code</p>
            </div>

            {/* Progress Indicator */}
            <div className='flex items-center justify-center mb-8'>
              <div className='flex items-center gap-2'>
                {/* Step 1 - Active */}
                <div className='w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 bg-[#16a34a] text-white ring-4 ring-green-100'>
                  <FontAwesomeIcon icon={faEnvelope} className='text-xs' />
                </div>
                <div className='w-16 h-0.5 transition-all duration-300 bg-gray-200'></div>

                {/* Step 2 - Inactive */}
                <div className='w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 bg-gray-100 text-gray-400'>
                  <FontAwesomeIcon icon={faKey} className='text-xs' />
                </div>
                <div className='w-16 h-0.5 transition-all duration-300 bg-gray-200'></div>

                {/* Step 3 - Inactive */}
                <div className='w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 bg-gray-100 text-gray-400'>
                  <FontAwesomeIcon icon={faLock} className='text-xs' />
                </div>
              </div>
            </div>

            {/* Form */}
            <div className='space-y-6'>
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div>
                  <label htmlFor="email" className='block text-sm font-semibold text-gray-700 mb-2'>
                    Email Address
                  </label>
                  <div className='relative'>
                    <input
                      className={`w-full px-4 py-3 pl-12 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all ${errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-100' : 'border-gray-200 focus:border-[#16a34a] focus:ring-green-100'
                        }`}
                      type="email"
                      id='email'
                      placeholder='Enter your email address'
                      {...register('email')}
                    />
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400'
                    />
                  </div>
                  {errors.email && (
                    <p className='text-red-500 text-sm mt-2'>{errors.email.message}</p>
                  )}
                </div>

                <button
                  type='submit'
                  disabled={isSubmitting}
                  className='w-full bg-[#16a34a] text-white py-3 px-4 rounded-xl hover:bg-[#15803d] transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed'
                >
                  {isSubmitting ? 'Sending...' : 'Send Reset Code'}
                </button>

              </form>
              {/* Back to Sign In */}
              <div className='text-center'>
                <Link
                  href="/login"
                  className='inline-flex items-center gap-2 text-sm text-[#16a34a] hover:text-[#15803d] font-medium transition-colors'
                >
                  <FontAwesomeIcon icon={faArrowLeft} className='text-xs' />
                  Back to Sign In
                </Link>
              </div>
            </div>

            {/* Footer */}
            <div className='text-center mt-8 pt-6 border-t border-gray-100'>
              <p className='text-gray-600'>
                Remember your password?{' '}
                <Link href="/login" className='text-[#16a34a] hover:text-[#15803d] font-semibold transition-colors'>
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
