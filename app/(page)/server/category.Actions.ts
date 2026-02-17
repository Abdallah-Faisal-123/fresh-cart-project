import axios, { AxiosRequestConfig } from "axios"
import { CategoriesResponse, ProductsResponse } from "../types/category.type"

export default async function getCategories(): Promise<CategoriesResponse> {
    const options: AxiosRequestConfig = {
        url: 'https://ecommerce.routemisr.com/api/v1/categories',
        method: 'GET'
    }

    try {
        const { data } = await axios.request(options)
        return data
    } catch (error) {
        throw error
    }
}

export async function getProducts(): Promise<ProductsResponse> {
    const options: AxiosRequestConfig = {
        url: 'https://ecommerce.routemisr.com/api/v1/products',
        method: 'GET'
    }

    try {
        const { data } = await axios.request(options)
        return data
    } catch (error) {
        throw error
    }
}

export async function getRelatedProducts(): Promise<ProductsResponse> {
    const options: AxiosRequestConfig = {
        url: 'https://ecommerce.routemisr.com/api/v1/products',
        method: 'GET'
    }

    try {
        const { data } = await axios.request(options)
        return data
    } catch (error) {
        throw error
    }
}

export async function getProductsByCategory(categoryId: string): Promise<ProductsResponse> {
    const options: AxiosRequestConfig = {
        url: `https://ecommerce.routemisr.com/api/v1/products?category=${categoryId}`,
        method: 'GET'
    }

    try {
        const { data } = await axios.request(options)
        return data
    } catch (error) {
        throw error
    }
}