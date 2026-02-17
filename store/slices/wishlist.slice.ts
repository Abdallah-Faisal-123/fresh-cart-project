import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { WishlistState, Product } from "@/types"

const initialState: WishlistState = {
    items: []
}

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        addToWishlist: (state, action: PayloadAction<Product>) => {
            const productExists = state.items.some(item => item._id === action.payload._id)
            if (!productExists) {
                state.items.push(action.payload)
            }
        },
        removeFromWishlist: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(item => item._id !== action.payload)
        },
        clearWishlist: (state) => {
            state.items = []
        },
        setWishlist: (state, action: PayloadAction<Product[]>) => {
            state.items = action.payload
        }
    }
})

export const wishlistReducer = wishlistSlice.reducer
export const { addToWishlist, removeFromWishlist, clearWishlist, setWishlist } = wishlistSlice.actions
