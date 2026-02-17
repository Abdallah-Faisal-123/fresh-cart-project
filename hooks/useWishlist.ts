import { useDispatch, useSelector } from 'react-redux'
import { addToWishlist, removeFromWishlist, setWishlist } from '@/store/slices/wishlist.slice'
import { AppState } from '@/store/store'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Product } from '@/types'

export const useWishlist = () => {
  const dispatch = useDispatch()
  const wishlist = useSelector((state: AppState) => state.wishlist)
  const isAuthenticated = useSelector((state: AppState) => state.auth.isAuthenticated)
  const [isMounted, setIsMounted] = useState(false)

  // Initialize wishlist from localStorage
  useEffect(() => {
    setIsMounted(true)
    const savedWishlist = localStorage.getItem('freshcart_wishlist')
    if (savedWishlist) {
      try {
        const parsedWishlist = JSON.parse(savedWishlist)
        if (Array.isArray(parsedWishlist)) {
          dispatch(setWishlist(parsedWishlist))
        }
      } catch (error) {
        console.error('Error loading wishlist from localStorage', error)
      }
    }
  }, [dispatch])

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    if (isMounted && wishlist.items) {
      localStorage.setItem('freshcart_wishlist', JSON.stringify(wishlist.items))
    }
  }, [wishlist.items, isMounted])

  const toggleWishlist = (product: Product) => {
    if (!isAuthenticated) {
      toast.info('Please sign in to add items to your wishlist')
      return
    }

    const isInWishlistCheck = wishlist.items?.some(item => item._id === product._id)

    if (isInWishlistCheck) {
      dispatch(removeFromWishlist(product._id))
      toast.success('Removed from wishlist')
    } else {
      dispatch(addToWishlist(product))
      toast.success('Added to wishlist')
    }
  }

  const isInWishlist = (productId: string) => {
    return wishlist.items?.some(item => item._id === productId) ?? false
  }

  return {
    wishlist: wishlist.items ?? [],
    toggleWishlist,
    isInWishlist,
    isAuthenticated
  }
}
