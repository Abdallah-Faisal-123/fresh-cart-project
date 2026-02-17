export type User = {
    name: string
    email?: string
    role: string
    id?: string
}

export type Category = {
    _id: string
    name: string
    slug?: string
    image?: string
}

export type Product = {
    _id: string
    title: string
    description: string
    price: number
    priceAfterDiscount?: number
    imageCover: string
    images: string[]
    category: Category
    ratingsAverage: number
    ratingsQuantity: number
}

export type CartItem = Product & {
    quantity: number
}

export type AuthState = {
    isAuthenticated: boolean
    userInfo: null | User
}

export type WishlistState = {
    items: Product[]
}

export type CartState = {
    items: CartItem[]
}
