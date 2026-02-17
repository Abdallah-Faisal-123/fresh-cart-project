import { Product } from "./category.type";

export interface ReviewUser {
    _id: string;
    name: string;
}

export interface Review {
    _id: string;
    review: string;
    rating: number;
    product: string;
    user: ReviewUser;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface ProductDetails extends Product {
    reviews: Review[];
    __v: number;
}

export interface ProductDetailsResponse {
    data: ProductDetails;
}