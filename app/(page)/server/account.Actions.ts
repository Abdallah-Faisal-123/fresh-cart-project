'use server'

import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import { cookies } from 'next/headers'

export async function updateUserData(values: { name: string; email: string; phone: string }) {
    try {
        const cookieStore = await cookies()
        const token = cookieStore.get('token')?.value

        if (!token) {
            return {
                success: false,
                message: 'Unauthorized. Please log in.',
                statusCode: 401
            }
        }

        const options: AxiosRequestConfig = {
            url: 'https://ecommerce.routemisr.com/api/v1/users/updateMe/',
            method: 'PUT',
            data: values,
            headers: { token }
        }

        const { data } = await axios.request(options)

        if (data.user) {
            return {
                success: true,
                message: 'Profile updated successfully',
                data: data.user
            }
        }

        return {
            success: false,
            message: data.message || 'Something went wrong'
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            const errorMessage = error.response?.data?.message || 'Failed to update profile'
            return {
                success: false,
                message: errorMessage,
                statusCode: error.response?.status || 500
            }
        }
        return {
            success: false,
            message: 'Something went wrong'
        }
    }
}

export async function changePassword(values: {
    currentPassword: string
    password: string
    rePassword: string
}) {
    try {
        const cookieStore = await cookies()
        const token = cookieStore.get('token')?.value

        if (!token) {
            return {
                success: false,
                message: 'Unauthorized. Please log in.',
                statusCode: 401
            }
        }

        const options: AxiosRequestConfig = {
            url: 'https://ecommerce.routemisr.com/api/v1/users/changeMyPassword',
            method: 'PUT',
            data: values,
            headers: { token }
        }

        const { data } = await axios.request(options)

        if (data.message === 'success' || data.token) {
            // Update the session token with the new one
            if (data.token) {
                cookieStore.set('token', data.token, {
                    httpOnly: true,
                    maxAge: 30 * 24 * 60 * 60
                })
            }

            return {
                success: true,
                message: 'Password changed successfully',
                data
            }
        }

        return {
            success: false,
            message: data.message || 'Something went wrong'
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            const errorMessage = error.response?.data?.message || 'Failed to change password'
            return {
                success: false,
                message: errorMessage,
                statusCode: error.response?.status || 500
            }
        }
        return {
            success: false,
            message: 'Something went wrong'
        }
    }
}
