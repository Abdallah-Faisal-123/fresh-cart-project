import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { CartState, CartItem, Product } from "@/types"

const initialState: CartState = {
    items: []
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<Product & { quantity?: number }>) => {
            const productExists = state.items.find(item => item._id === action.payload._id)
            if (productExists) {
                productExists.quantity += action.payload.quantity || 1
            } else {
                state.items.push({ ...action.payload, quantity: action.payload.quantity || 1 } as CartItem)
            }
        },
        removeFromCart: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(item => item._id !== action.payload)
        },
        updateCartItemQuantity: (state, action: PayloadAction<{ productId: string; quantity: number }>) => {
            const item = state.items.find(item => item._id === action.payload.productId)
            if (item) {
                item.quantity = action.payload.quantity
                if (item.quantity <= 0) {
                    state.items = state.items.filter(i => i._id !== action.payload.productId)
                }
            }
        },
        clearCart: (state) => {
            state.items = []
        },
        setCart: (state, action: PayloadAction<CartItem[]>) => {
            state.items = action.payload
        }
    }
})

export const cartReducer = cartSlice.reducer
export const { addToCart, removeFromCart, updateCartItemQuantity, clearCart, setCart } = cartSlice.actions
