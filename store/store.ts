'use client'
import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from './slices/auth.slice'
import { wishlistReducer } from './slices/wishlist.slice'
import { cartReducer } from './slices/cart.slice'
import { AuthState, WishlistState, CartState } from '@/types'

export type preloadedState = {
  auth: AuthState
  wishlist: WishlistState
  cart: CartState
}

export function createStore(preloadedState: preloadedState) {
  const store = configureStore({
    reducer: {
      auth: authReducer,
      wishlist: wishlistReducer,
      cart: cartReducer
    },
    preloadedState
  })
  return store
}

export type AppStore = ReturnType<typeof createStore>;
export type AppState = ReturnType<AppStore['getState']>