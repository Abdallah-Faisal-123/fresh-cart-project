import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart, updateCartItemQuantity, clearCart, setCart } from '@/store/slices/cart.slice'
import { AppState } from '@/store/store'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Product, CartItem } from '@/types'

export const useCart = () => {
  const dispatch = useDispatch()
  const cart = useSelector((state: AppState) => state.cart)
  const [isMounted, setIsMounted] = useState(false)

  // Initialize cart from localStorage
  useEffect(() => {
    setIsMounted(true)
    const savedCart = localStorage.getItem('freshcart_cart')
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart)
        if (Array.isArray(parsedCart)) {
          dispatch(setCart(parsedCart))
        }
      } catch (error) {
        console.error('Error loading cart from localStorage', error)
      }
    }
  }, [dispatch])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isMounted && cart.items) {
      localStorage.setItem('freshcart_cart', JSON.stringify(cart.items))
    }
  }, [cart.items, isMounted])

  const addProductToCart = (product: Product, quantity: number = 1) => {
    dispatch(addToCart({ ...product, quantity }))
    toast.success('Added to cart')
  }

  const removeProductFromCart = (productId: string) => {
    dispatch(removeFromCart(productId))
    toast.success('Removed from cart')
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeProductFromCart(productId)
    } else {
      dispatch(updateCartItemQuantity({ productId, quantity }))
    }
  }

  const getTotalPrice = () => {
    return cart.items?.reduce((total, item) => {
      const price = item.priceAfterDiscount || item.price
      return total + (price * item.quantity)
    }, 0) ?? 0
  }

  const getTotalItems = () => {
    return cart.items?.reduce((total, item) => total + item.quantity, 0) ?? 0
  }

  const getTotalQuantity = () => {
    return cart.items?.length ?? 0
  }

  return {
    cart: cart.items ?? [],
    addProductToCart,
    removeProductFromCart,
    updateQuantity,
    getTotalPrice,
    getTotalItems,
    getTotalQuantity,
    clearCart: () => dispatch(clearCart())
  }
}
