'use server'
import { AuthState } from "@/types";
import axios, { AxiosRequestConfig } from "axios";
import { cookies } from "next/headers";

export async function setToken(token: string, remember: boolean): Promise<void> {
    if (remember) {
        const cookieStore = await cookies();
        cookieStore.set('token', token, {
            httpOnly: true,
            maxAge: 30 * 24 * 60 * 60
        })
    } else {
        const cookieStore = await cookies();
        cookieStore.set('token', token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60
        })
    }
}

export async function getToken(): Promise<string | null> {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value || null
    return token
}

export async function clearToken(): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.delete('token')
}

export async function verifytoken(): Promise<AuthState> {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value || null
    if (!token) {
        return {
            isAuthenticated: false,
            userInfo: null
        }
    }

    try {
        const options: AxiosRequestConfig = {
            url: 'https://ecommerce.routemisr.com/api/v1/auth/verifyToken',
            method: 'GET',
            headers: { token }
        }

        const { data } = await axios.request(options)
        const { name, id, role } = data.decoded
        if (data.message === 'verified') {
            return {
                isAuthenticated: true,
                userInfo: { name, id, role }
            }
        }
        return {
            isAuthenticated: false,
            userInfo: null
        }
    } catch (error) {
        return {
            isAuthenticated: false,
            userInfo: null
        }
    }
}