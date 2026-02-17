'use server'

import axios from 'axios'
import { verifytoken } from '@/app/(auth)/Server/auth.Actions'

export interface OrderProduct {
    count: number
    _id: string
    product: {
        subcategory: any[]
        _id: string
        title: string
        imageCover: string
        category: {
            _id: string
            name: string
            slug: string
            image: string
        }
        ratingsAverage: number
        id: string
    }
    price: number
}

export interface Order {
    shippingAddress: {
        details: string
        phone: string
        city: string
    }
    taxPrice: number
    shippingPrice: number
    totalOrderPrice: number
    paymentMethodType: string
    isPaiad: boolean
    isDelivered: boolean
    _id: string
    user: {
        _id: string
        name: string
        email: string
        phone: string
    }
    cartItems: OrderProduct[]
    createdAt: string
    updatedAt: string
    id: number
}

export async function getUserOrders() {
    try {
        const auth = await verifytoken()
        if (!auth.isAuthenticated || !auth.userInfo) {
            return {
                success: false,
                message: 'Unauthorized',
                statusCode: 401
            }
        }

        const userId = auth.userInfo.id
        const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)

        return {
            success: true,
            data: data as Order[]
        }
    } catch (error: any) {
        console.error('Error fetching orders:', error)
        return {
            success: false,
            message: error.response?.data?.message || 'Failed to fetch orders',
            statusCode: error.response?.status || 500
        }
    }
}
