export interface Category {
    _id: string;
    name: string;
    slug: string;
    image: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface SubCategory {
    _id: string;
    name: string;
    slug: string;
    category: string;
}

export interface Brand {
    _id: string;
    name: string;
    slug: string;
    image: string;
}

export interface Product {
    sold: number | null;
    images: string[];
    subcategory: SubCategory[];
    ratingsQuantity: number;
    _id: string;
    title: string;
    slug: string;
    description: string;
    quantity: number;
    price: number;
    priceAfterDiscount?: number;
    imageCover: string;
    category: Category;
    brand: Brand;
    ratingsAverage: number;
    createdAt: string;
    updatedAt: string;
    id: string;
}

export interface PaginationMetadata {
    currentPage: number;
    numberOfPages: number;
    limit: number;
    nextPage?: number;
    prevPage?: number;
}

export interface CategoriesResponse {
    results: number;
    metadata: PaginationMetadata;
    data: Category[];
}

export interface ProductsResponse {
    results: number;
    metadata: PaginationMetadata;
    data: Product[];
}