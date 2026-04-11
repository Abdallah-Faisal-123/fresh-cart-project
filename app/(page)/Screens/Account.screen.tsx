'use client'

import { useState } from 'react'
import { useSelector } from 'react-redux'
import { AppState } from '@/store/store'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faUser,
    faEnvelope,
    faPhone,
    faLock,
    faShieldAlt,
    faPen,
    faCheck,
    faXmark,
    faSpinner,
    faShoppingBag,
    faHeart,
    faGear,
    faCircleUser,
    faKey,
    faRightFromBracket,
    faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { updateUserData, changePassword } from '../server/account.Actions'
import { toast } from 'react-toastify'
import useLogout from '@/hooks/useLogout'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

// --- Schemas ---
const profileSchema = z.object({
    name: z.string().nonempty('Name is required').min(3, 'Name must be at least 3 characters').max(30, 'Name cannot exceed 30 characters'),
    email: z.string().nonempty('Email is required').pipe(z.email('Invalid email address')),
    phone: z.string().nonempty('Phone is required').regex(/^(\+2)?01[0125][0-9]{8}$/, 'Only Egyptian phone numbers are allowed'),
})

const passwordSchema = z.object({
    currentPassword: z.string().nonempty('Current password is required'),
    password: z
        .string()
        .nonempty('New password is required')
        .min(8, 'Password must be at least 8 characters')
        .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
        .regex(/[a-z]/, 'Must contain at least one lowercase letter')
        .regex(/[!@#$%^&*()<>?":|,.]/, 'Must contain at least one special character'),
    rePassword: z.string().nonempty('Confirm password is required'),
}).refine((data) => data.password === data.rePassword, {
    message: 'Passwords do not match',
    path: ['rePassword'],
})

type ProfileFormValues = z.infer<typeof profileSchema>
type PasswordFormValues = z.infer<typeof passwordSchema>

// --- Skeleton Component ---
function SkeletonPulse({ className }: { className?: string }) {
    return <div className={`bg-gray-200 rounded-lg animate-pulse ${className ?? ''}`} />
}

// --- Tab type ---
type Tab = 'profile' | 'password'

export default function AccountScreen() {
    const { isAuthenticated, userInfo } = useSelector((state: AppState) => state.auth)
    const [activeTab, setActiveTab] = useState<Tab>('profile')
    const [isEditingProfile, setIsEditingProfile] = useState(false)
    const [profileLoading, setProfileLoading] = useState(false)
    const [passwordLoading, setPasswordLoading] = useState(false)
    const { logout } = useLogout()
    const router = useRouter()

    // Profile form
    const {
        register: registerProfile,
        handleSubmit: handleProfileSubmit,
        formState: { errors: profileErrors },
        reset: resetProfile,
    } = useForm<ProfileFormValues>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: userInfo?.name || '',
            email: userInfo?.email || '',
            phone: '',
        },
    })

    // Password form
    const {
        register: registerPassword,
        handleSubmit: handlePasswordSubmit,
        formState: { errors: passwordErrors },
        reset: resetPassword,
    } = useForm<PasswordFormValues>({
        resolver: zodResolver(passwordSchema),
    })

    // --- Handlers ---
    const onProfileSubmit = async (values: ProfileFormValues) => {
        setProfileLoading(true)
        try {
            const result = await updateUserData(values)
            if (result.success) {
                toast.success(result.message)
                setIsEditingProfile(false)
            } else {
                toast.error(result.message)
                if (result.statusCode === 401) {
                    router.push('/login?callbackUrl=/account')
                }
            }
        } catch {
            toast.error('Something went wrong')
        } finally {
            setProfileLoading(false)
        }
    }

    const onPasswordSubmit = async (values: PasswordFormValues) => {
        setPasswordLoading(true)
        try {
            const result = await changePassword(values)
            if (result.success) {
                toast.success(result.message)
                resetPassword()
            } else {
                toast.error(result.message)
                if (result.statusCode === 401) {
                    router.push('/login?callbackUrl=/account')
                }
            }
        } catch {
            toast.error('Something went wrong')
        } finally {
            setPasswordLoading(false)
        }
    }

    const cancelEdit = () => {
        setIsEditingProfile(false)
        resetProfile({
            name: userInfo?.name || '',
            email: userInfo?.email || '',
            phone: '',
        })
    }

    // --- Not Authenticated ---
    if (!isAuthenticated) {
        return (
            <div className='min-h-screen bg-gray-50 flex items-center justify-center p-4'>
                <div className='bg-white p-10 rounded-3xl shadow-xl text-center max-w-md w-full border border-gray-100'>
                    <div className='w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6'>
                        <FontAwesomeIcon icon={faCircleUser} className='text-[#16a34a] text-4xl' />
                    </div>
                    <h2 className='text-2xl font-black text-gray-900 mb-3'>Sign in to Your Account</h2>
                    <p className='text-gray-500 mb-8'>Log in to view your profile, manage your settings and track your orders.</p>
                    <Link
                        href='/login?callbackUrl=/account'
                        className='block w-full bg-[#16a34a] text-white py-3.5 rounded-xl font-bold hover:bg-[#15803d] transition-all text-center shadow-lg shadow-green-100'
                    >
                        Sign In
                    </Link>
                    <p className='text-sm text-gray-400 mt-4'>
                        Don&apos;t have an account?{' '}
                        <Link href='/signup' className='text-[#16a34a] font-bold hover:underline'>
                            Create one
                        </Link>
                    </p>
                </div>
            </div>
        )
    }

    // --- Get initials for avatar ---
    const initials = userInfo?.name
        ? userInfo.name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2)
        : '?'

    // --- Tabs Config ---
    const tabs: { key: Tab; label: string; icon: typeof faUser }[] = [
        { key: 'profile', label: 'Profile', icon: faUser },
        { key: 'password', label: 'Security', icon: faShieldAlt },
    ]

    return (
        <div className='bg-gray-50 min-h-screen'>
            {/* Hero Header */}
            <div className='relative bg-gradient-to-br from-[#16a34a] via-[#15803d] to-[#0f5a2a] overflow-hidden'>
                {/* Decorative Shapes */}
                <div className='absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl' />
                <div className='absolute bottom-0 left-0 w-80 h-80 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/3 blur-3xl' />
                <div className='absolute top-1/2 left-1/2 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl' />

                <div className='relative z-10 max-w-5xl mx-auto px-4 py-16 pb-24'>
                    <div className='flex flex-col sm:flex-row items-center gap-6'>
                        {/* Avatar */}
                        <div className='relative'>
                            <div className='w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white/20 backdrop-blur-sm border-4 border-white/30 flex items-center justify-center shadow-2xl'>
                                <span className='text-3xl sm:text-4xl font-black text-white'>{initials}</span>
                            </div>
                            <div className='absolute -bottom-1 -right-1 w-8 h-8 bg-green-400 rounded-full border-4 border-[#15803d] flex items-center justify-center'>
                                <FontAwesomeIcon icon={faCheck} className='text-white text-[10px]' />
                            </div>
                        </div>

                        {/* User Info */}
                        <div className='text-center sm:text-left'>
                            <h1 className='text-3xl sm:text-4xl font-black text-white mb-1'>
                                {userInfo?.name || 'User'}
                            </h1>
                            <p className='text-green-200 text-sm font-medium flex items-center justify-center sm:justify-start gap-2'>
                                <FontAwesomeIcon icon={faShieldAlt} className='text-xs' />
                                {userInfo?.role === 'admin' ? 'Administrator' : 'Customer Account'}
                            </p>
                        </div>

                        {/* Quick Actions */}
                        <div className='sm:ml-auto flex gap-3'>
                            <Link
                                href='/orders'
                                className='flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-white/25 transition-all border border-white/20'
                            >
                                <FontAwesomeIcon icon={faShoppingBag} className='text-xs' />
                                My Orders
                            </Link>
                            <Link
                                href='/wishlist'
                                className='flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-white/25 transition-all border border-white/20'
                            >
                                <FontAwesomeIcon icon={faHeart} className='text-xs' />
                                Wishlist
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className='max-w-5xl mx-auto px-4 -mt-12 pb-16'>
                <div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
                    {/* Sidebar */}
                    <div className='lg:col-span-1'>
                        <div className='bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-28'>
                            <div className='p-2'>
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.key}
                                        onClick={() => setActiveTab(tab.key)}
                                        className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${activeTab === tab.key
                                            ? 'bg-green-50 text-[#16a34a]'
                                            : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                                            }`}
                                    >
                                        <FontAwesomeIcon icon={tab.icon} className='w-4' />
                                        {tab.label}
                                    </button>
                                ))}
                            </div>
                            <div className='border-t border-gray-100 p-2'>
                                <button
                                    onClick={logout}
                                    className='w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 transition-all cursor-pointer'
                                >
                                    <FontAwesomeIcon icon={faRightFromBracket} className='w-4' />
                                    Log Out
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className='lg:col-span-3 z-50'>
                        {/* Profile Tab */}
                        {activeTab === 'profile' && (
                            <div className='space-y-6 ' style={{ animation: 'fadeSlideUp 0.4s ease-out' }}>
                                {/* Profile Info Card */}
                                <div className='bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden'>
                                    <div className='px-8 py-6 border-b border-gray-100 flex items-center justify-between'>
                                        <div>
                                            <h2 className='text-xl font-black text-gray-900'>Personal Information</h2>
                                            <p className='text-sm text-gray-400 mt-1'>Manage your account details</p>
                                        </div>
                                        {!isEditingProfile ? (
                                            <button
                                                onClick={() => setIsEditingProfile(true)}
                                                className='flex items-center gap-2 bg-green-50 text-[#16a34a] px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-green-100 transition-all cursor-pointer'
                                            >
                                                <FontAwesomeIcon icon={faPen} className='text-xs' />
                                                Edit Profile
                                            </button>
                                        ) : (
                                            <button
                                                onClick={cancelEdit}
                                                className='flex items-center gap-2 bg-gray-100 text-gray-600 px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-gray-200 transition-all cursor-pointer'
                                            >
                                                <FontAwesomeIcon icon={faXmark} className='text-xs' />
                                                Cancel
                                            </button>
                                        )}
                                    </div>

                                    {!isEditingProfile ? (
                                        /* View Mode */
                                        <div className='p-8'>
                                            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                                                {/* Name */}
                                                <div className='bg-gray-50 rounded-2xl p-5 border border-gray-100'>
                                                    <div className='flex items-center gap-3 mb-3'>
                                                        <div className='w-9 h-9 rounded-full bg-green-100 flex items-center justify-center'>
                                                            <FontAwesomeIcon icon={faUser} className='text-[#16a34a] text-sm' />
                                                        </div>
                                                        <span className='text-[11px] font-bold text-gray-400 uppercase tracking-widest'>Full Name</span>
                                                    </div>
                                                    <p className='text-gray-900 font-bold text-lg pl-12'>{userInfo?.name || '—'}</p>
                                                </div>

                                                {/* Email */}
                                                <div className='bg-gray-50 rounded-2xl p-5 border border-gray-100'>
                                                    <div className='flex items-center gap-3 mb-3'>
                                                        <div className='w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center'>
                                                            <FontAwesomeIcon icon={faEnvelope} className='text-blue-600 text-sm' />
                                                        </div>
                                                        <span className='text-[11px] font-bold text-gray-400 uppercase tracking-widest'>Email Address</span>
                                                    </div>
                                                    <p className='text-gray-900 font-bold text-lg pl-12'>{userInfo?.email || '—'}</p>
                                                </div>

                                                {/* Role */}
                                                <div className='bg-gray-50 rounded-2xl p-5 border border-gray-100'>
                                                    <div className='flex items-center gap-3 mb-3'>
                                                        <div className='w-9 h-9 rounded-full bg-purple-100 flex items-center justify-center'>
                                                            <FontAwesomeIcon icon={faShieldAlt} className='text-purple-600 text-sm' />
                                                        </div>
                                                        <span className='text-[11px] font-bold text-gray-400 uppercase tracking-widest'>Account Type</span>
                                                    </div>
                                                    <p className='text-gray-900 font-bold text-lg pl-12 capitalize'>{userInfo?.role || '—'}</p>
                                                </div>

                                                {/* Member Since */}
                                                <div className='bg-gray-50 rounded-2xl p-5 border border-gray-100'>
                                                    <div className='flex items-center gap-3 mb-3'>
                                                        <div className='w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center'>
                                                            <FontAwesomeIcon icon={faGear} className='text-amber-600 text-sm' />
                                                        </div>
                                                        <span className='text-[11px] font-bold text-gray-400 uppercase tracking-widest'>Account Status</span>
                                                    </div>
                                                    <div className='pl-12'>
                                                        <span className='inline-flex items-center gap-1.5 bg-green-100 text-green-700 text-sm font-bold px-3 py-1 rounded-full'>
                                                            <span className='w-2 h-2 bg-green-500 rounded-full' />
                                                            Active
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        /* Edit Mode */
                                        <form onSubmit={handleProfileSubmit(onProfileSubmit)} className='p-8'>
                                            <div className='space-y-5'>
                                                {/* Name Input */}
                                                <div>
                                                    <label className='block text-sm font-bold text-gray-700 mb-2'>
                                                        <FontAwesomeIcon icon={faUser} className='text-gray-400 mr-2' />
                                                        Full Name
                                                    </label>
                                                    <input
                                                        {...registerProfile('name')}
                                                        type='text'
                                                        className={`w-full px-5 py-3.5 rounded-xl border-2 focus:outline-none transition-all bg-gray-50 text-gray-900 font-medium ${profileErrors.name ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-[#16a34a]'
                                                            }`}
                                                        placeholder='Enter your full name'
                                                    />
                                                    {profileErrors.name && (
                                                        <p className='mt-1.5 text-sm text-red-500 font-medium flex items-center gap-1'>
                                                            <FontAwesomeIcon icon={faExclamationTriangle} className='text-xs' />
                                                            {profileErrors.name.message}
                                                        </p>
                                                    )}
                                                </div>

                                                {/* Email Input */}
                                                <div>
                                                    <label className='block text-sm font-bold text-gray-700 mb-2'>
                                                        <FontAwesomeIcon icon={faEnvelope} className='text-gray-400 mr-2' />
                                                        Email Address
                                                    </label>
                                                    <input
                                                        {...registerProfile('email')}
                                                        type='email'
                                                        className={`w-full px-5 py-3.5 rounded-xl border-2 focus:outline-none transition-all bg-gray-50 text-gray-900 font-medium ${profileErrors.email ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-[#16a34a]'
                                                            }`}
                                                        placeholder='Enter your email address'
                                                    />
                                                    {profileErrors.email && (
                                                        <p className='mt-1.5 text-sm text-red-500 font-medium flex items-center gap-1'>
                                                            <FontAwesomeIcon icon={faExclamationTriangle} className='text-xs' />
                                                            {profileErrors.email.message}
                                                        </p>
                                                    )}
                                                </div>

                                                {/* Phone Input */}
                                                <div>
                                                    <label className='block text-sm font-bold text-gray-700 mb-2'>
                                                        <FontAwesomeIcon icon={faPhone} className='text-gray-400 mr-2' />
                                                        Phone Number
                                                    </label>
                                                    <input
                                                        {...registerProfile('phone')}
                                                        type='tel'
                                                        className={`w-full px-5 py-3.5 rounded-xl border-2 focus:outline-none transition-all bg-gray-50 text-gray-900 font-medium ${profileErrors.phone ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-[#16a34a]'
                                                            }`}
                                                        placeholder='e.g. 01012345678'
                                                    />
                                                    {profileErrors.phone && (
                                                        <p className='mt-1.5 text-sm text-red-500 font-medium flex items-center gap-1'>
                                                            <FontAwesomeIcon icon={faExclamationTriangle} className='text-xs' />
                                                            {profileErrors.phone.message}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Actions */}
                                            <div className='flex gap-3 mt-8'>
                                                <button
                                                    type='submit'
                                                    disabled={profileLoading}
                                                    className='flex-1 flex items-center justify-center gap-2 bg-[#16a34a] text-white py-3.5 rounded-xl font-bold hover:bg-[#15803d] transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-green-100 cursor-pointer'
                                                >
                                                    {profileLoading ? (
                                                        <>
                                                            <FontAwesomeIcon icon={faSpinner} className='animate-spin' />
                                                            Saving...
                                                        </>
                                                    ) : (
                                                        <>
                                                            <FontAwesomeIcon icon={faCheck} />
                                                            Save Changes
                                                        </>
                                                    )}
                                                </button>
                                                <button
                                                    type='button'
                                                    onClick={cancelEdit}
                                                    className='px-6 py-3.5 rounded-xl font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-all cursor-pointer'
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </form>
                                    )}
                                </div>

                                {/* Quick Links */}
                                <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
                                    <Link href='/orders' className='bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md hover:-translate-y-0.5 transition-all group'>
                                        <div className='w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform'>
                                            <FontAwesomeIcon icon={faShoppingBag} className='text-orange-600 text-lg' />
                                        </div>
                                        <h3 className='font-bold text-gray-900 mb-1'>My Orders</h3>
                                        <p className='text-sm text-gray-400'>Track & manage orders</p>
                                    </Link>
                                    <Link href='/wishlist' className='bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md hover:-translate-y-0.5 transition-all group'>
                                        <div className='w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform'>
                                            <FontAwesomeIcon icon={faHeart} className='text-pink-600 text-lg' />
                                        </div>
                                        <h3 className='font-bold text-gray-900 mb-1'>Wishlist</h3>
                                        <p className='text-sm text-gray-400'>Your saved items</p>
                                    </Link>
                                    <Link href='/cart' className='bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md hover:-translate-y-0.5 transition-all group'>
                                        <div className='w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform'>
                                            <FontAwesomeIcon icon={faGear} className='text-blue-600 text-lg' />
                                        </div>
                                        <h3 className='font-bold text-gray-900 mb-1'>Cart</h3>
                                        <p className='text-sm text-gray-400'>View your cart</p>
                                    </Link>
                                </div>
                            </div>
                        )}

                        {/* Password/Security Tab */}
                        {activeTab === 'password' && (
                            <div className='space-y-6' style={{ animation: 'fadeSlideUp 0.4s ease-out' }}>
                                <div className='bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden'>
                                    <div className='px-8 py-6 border-b border-gray-100'>
                                        <h2 className='text-xl font-black text-gray-900 flex items-center gap-3'>
                                            <div className='w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center'>
                                                <FontAwesomeIcon icon={faKey} className='text-amber-600' />
                                            </div>
                                            Change Password
                                        </h2>
                                        <p className='text-sm text-gray-400 mt-2 ml-13'>
                                            Update your password to keep your account secure
                                        </p>
                                    </div>

                                    <form onSubmit={handlePasswordSubmit(onPasswordSubmit)} className='p-8'>
                                        <div className='space-y-5 max-w-lg'>
                                            {/* Current Password */}
                                            <div>
                                                <label className='block text-sm font-bold text-gray-700 mb-2'>
                                                    <FontAwesomeIcon icon={faLock} className='text-gray-400 mr-2' />
                                                    Current Password
                                                </label>
                                                <input
                                                    {...registerPassword('currentPassword')}
                                                    type='password'
                                                    className={`w-full px-5 py-3.5 rounded-xl border-2 focus:outline-none transition-all bg-gray-50 text-gray-900 font-medium ${passwordErrors.currentPassword ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-[#16a34a]'
                                                        }`}
                                                    placeholder='Enter current password'
                                                />
                                                {passwordErrors.currentPassword && (
                                                    <p className='mt-1.5 text-sm text-red-500 font-medium flex items-center gap-1'>
                                                        <FontAwesomeIcon icon={faExclamationTriangle} className='text-xs' />
                                                        {passwordErrors.currentPassword.message}
                                                    </p>
                                                )}
                                            </div>

                                            {/* New Password */}
                                            <div>
                                                <label className='block text-sm font-bold text-gray-700 mb-2'>
                                                    <FontAwesomeIcon icon={faLock} className='text-gray-400 mr-2' />
                                                    New Password
                                                </label>
                                                <input
                                                    {...registerPassword('password')}
                                                    type='password'
                                                    className={`w-full px-5 py-3.5 rounded-xl border-2 focus:outline-none transition-all bg-gray-50 text-gray-900 font-medium ${passwordErrors.password ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-[#16a34a]'
                                                        }`}
                                                    placeholder='Enter new password'
                                                />
                                                {passwordErrors.password && (
                                                    <p className='mt-1.5 text-sm text-red-500 font-medium flex items-center gap-1'>
                                                        <FontAwesomeIcon icon={faExclamationTriangle} className='text-xs' />
                                                        {passwordErrors.password.message}
                                                    </p>
                                                )}
                                            </div>

                                            {/* Confirm New Password */}
                                            <div>
                                                <label className='block text-sm font-bold text-gray-700 mb-2'>
                                                    <FontAwesomeIcon icon={faLock} className='text-gray-400 mr-2' />
                                                    Confirm New Password
                                                </label>
                                                <input
                                                    {...registerPassword('rePassword')}
                                                    type='password'
                                                    className={`w-full px-5 py-3.5 rounded-xl border-2 focus:outline-none transition-all bg-gray-50 text-gray-900 font-medium ${passwordErrors.rePassword ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-[#16a34a]'
                                                        }`}
                                                    placeholder='Confirm new password'
                                                />
                                                {passwordErrors.rePassword && (
                                                    <p className='mt-1.5 text-sm text-red-500 font-medium flex items-center gap-1'>
                                                        <FontAwesomeIcon icon={faExclamationTriangle} className='text-xs' />
                                                        {passwordErrors.rePassword.message}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        {/* Password Requirements */}
                                        <div className='mt-6 p-4 bg-blue-50/50 rounded-xl border border-blue-100 max-w-lg'>
                                            <p className='text-xs font-bold text-blue-800 mb-2'>Password Requirements:</p>
                                            <ul className='text-xs text-blue-600 space-y-1'>
                                                <li>• At least 8 characters long</li>
                                                <li>• Contains uppercase and lowercase letters</li>
                                                <li>• Contains at least one special character</li>
                                            </ul>
                                        </div>

                                        {/* Submit */}
                                        <div className='mt-8 max-w-lg'>
                                            <button
                                                type='submit'
                                                disabled={passwordLoading}
                                                className='w-full flex items-center justify-center gap-2 bg-[#16a34a] text-white py-3.5 rounded-xl font-bold hover:bg-[#15803d] transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-green-100 cursor-pointer'
                                            >
                                                {passwordLoading ? (
                                                    <>
                                                        <FontAwesomeIcon icon={faSpinner} className='animate-spin' />
                                                        Updating Password...
                                                    </>
                                                ) : (
                                                    <>
                                                        <FontAwesomeIcon icon={faShieldAlt} />
                                                        Update Password
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </form>
                                </div>

                                {/* Security Tips */}
                                <div className='bg-white rounded-2xl shadow-sm border border-gray-100 p-8'>
                                    <h3 className='text-lg font-black text-gray-900 mb-4 flex items-center gap-2'>
                                        <FontAwesomeIcon icon={faShieldAlt} className='text-[#16a34a]' />
                                        Security Tips
                                    </h3>
                                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                                        {[
                                            { title: 'Use a strong password', desc: 'Combine letters, numbers, and symbols' },
                                            { title: 'Never share your password', desc: 'Keep your credentials private' },
                                            { title: 'Update regularly', desc: 'Change your password every 3-6 months' },
                                            { title: 'Unique passwords', desc: 'Use different passwords for each account' },
                                        ].map((tip, i) => (
                                            <div key={i} className='flex gap-3 p-3 rounded-xl bg-gray-50/50'>
                                                <div className='w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5'>
                                                    <FontAwesomeIcon icon={faCheck} className='text-[#16a34a] text-xs' />
                                                </div>
                                                <div>
                                                    <p className='text-sm font-bold text-gray-800'>{tip.title}</p>
                                                    <p className='text-xs text-gray-400'>{tip.desc}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
