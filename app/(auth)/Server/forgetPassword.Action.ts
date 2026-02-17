'use server'

import { ForgetPasswordFormValues, forgetPasswordSchema } from "../Schemas/forget-password.Schema";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { ZodIssue } from "zod";

export default async function forgetPasswordAction(values: ForgetPasswordFormValues) {
    const validationResult = forgetPasswordSchema.safeParse(values)
    if (!validationResult.success) {
        const errors: Record<string, string> = {}
        if (validationResult.error) {
            validationResult.error.issues.forEach((issue: ZodIssue) => {
                const key = issue.path[0] as string
                const message = issue.message
                if (!errors[key]) {
                    errors[key] = message
                }
            })
        }
        return {
            success: false,
            message: 'validation error',
            errors
        }
    }
    try {
        const options: AxiosRequestConfig = {
            url: 'https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',
            method: 'POST',
            data: values
        }
        const { data } = await axios.request(options)
        if (data.message === 'success') {
            return {
                success: true,
                message: 'Reset password instructions have been sent to your email.'
            }
        }
        return {
            success: false,
            message: data.message || 'some thing went wrong'
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            const errorMessage = error.response?.data.message;
            return {
                success: false,
                message: errorMessage || 'some thing went wrong'
            }
        }
        return {
            success: false,
            message: 'some thing went wrong'
        }
    }
}