import axios from "axios"
import { ProductDetailsResponse } from "../types/product-details.type"


export async function getProductDetails(id: string): Promise<ProductDetailsResponse> {
    try {
        const options = {
            url: `https://ecommerce.routemisr.com/api/v1/products/${id}`,
            method: 'GET'
        }

        const { data } = await axios.request(options)
        return data
    } catch (error) {
        throw error
    }
}