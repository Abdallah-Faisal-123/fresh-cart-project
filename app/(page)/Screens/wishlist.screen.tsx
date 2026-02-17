'use client'

import { faHeart, faArrowRight, faShoppingBag, faSignInAlt, faTrash, faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useWishlist } from '@/hooks/useWishlist'
import { useCart } from '@/hooks/useCart'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { removeFromWishlist } from '@/store/slices/wishlist.slice'

function SkeletonPulse({ className }: { className?: string }) {
  return (
    <div className={`bg-gray-200 rounded-lg animate-pulse ${className ?? ''}`} />
  )
}

export default function WishlistScreen() {
  const router = useRouter()
  const { wishlist, isAuthenticated } = useWishlist()
  const { addProductToCart } = useCart()
  const [isMounted, setIsMounted] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (
      <div className=' min-h-screen bg-gray-50  py-12'>
        <div className='max-w-6xl mx-auto px-4'>
          <div className='mb-8'>
            <SkeletonPulse className='h-8 w-48 mb-2' />
            <SkeletonPulse className='h-4 w-96' />
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
            {[...Array(8)].map((_, i) => (
              <div key={i} className='bg-white rounded-lg shadow-sm overflow-hidden'>
                {/* Image Skeleton */}
                <SkeletonPulse className='w-full h-48 rounded-none' />

                {/* Content Skeleton */}
                <div className='p-4'>
                  <SkeletonPulse className='h-3 w-20 mb-3' />
                  <SkeletonPulse className='h-4 w-full mb-2' />
                  <SkeletonPulse className='h-4 w-full mb-3' />

                  {/* Rating Skeleton */}
                  <div className='flex gap-1 mb-3'>
                    {[...Array(5)].map((_, j) => (
                      <SkeletonPulse key={j} className='h-3 w-3 rounded-full' />
                    ))}
                  </div>

                  {/* Price Skeleton */}
                  <SkeletonPulse className='h-4 w-24 mb-3' />

                  {/* Button Skeleton */}
                  <SkeletonPulse className='h-9 w-full' />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className='min-h-screen bg-gray-50'>
        <div className='max-w-6xl mx-auto px-4 py-16 lg:py-24'>
          <div className='text-center mb-12'>
            <div className='flex justify-center mb-8'>
              <div className='w-24 h-24 rounded-full bg-red-100 flex items-center justify-center'>
                <FontAwesomeIcon icon={faHeart} className='text-5xl text-red-500' />
              </div>
            </div>

            <h1 className='text-4xl font-bold text-gray-900 mb-4'>Sign in to Your Wishlist</h1>

            <p className='text-xl text-gray-600 mb-8 max-w-2xl mx-auto'>
              Please sign in to view and manage your wishlist across all devices.
            </p>

            <div className='flex flex-col sm:flex-row gap-4 justify-center mb-12'>
              <Link
                href='/login'
                className='inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#16a34a] text-white rounded-lg hover:bg-[#15803d] transition-all duration-200 font-semibold text-lg shadow-md hover:shadow-lg'
              >
                <FontAwesomeIcon icon={faSignInAlt} className='text-lg' />
                Sign In
              </Link>

              <button
                onClick={() => router.push('/categories')}
                className='inline-flex items-center justify-center gap-2 px-8 py-4 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-all duration-200 font-semibold text-lg shadow-md hover:shadow-lg'
              >
                <FontAwesomeIcon icon={faShoppingBag} className='text-lg' />
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gray-50 py-12'>
      <div className='max-w-6xl mx-auto px-4'>
        {wishlist.length === 0 ? (
          <div className='text-center py-16'>
            <div className='flex justify-center mb-8'>
              <div className='w-24 h-24 rounded-full bg-red-100 flex items-center justify-center'>
                <FontAwesomeIcon icon={faHeart} className='text-5xl text-red-500' />
              </div>
            </div>

            <h1 className='text-4xl font-bold text-gray-900 mb-4'>Your wishlist is empty</h1>

            <p className='text-xl text-gray-600 mb-8 max-w-2xl mx-auto'>
              Browse products and save your favorites here. Sign in to sync your wishlist across devices.
            </p>

            <button
              onClick={() => router.push('/categories')}
              className='inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#16a34a] text-white rounded-lg hover:bg-[#15803d] transition-all duration-200 font-semibold text-lg shadow-md hover:shadow-lg'
            >
              <FontAwesomeIcon icon={faShoppingBag} className='text-lg' />
              Browse Products
            </button>

            {/* Features Section */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20 pt-16 border-t border-gray-200'>
              {/* Feature 1 */}
              <div className='text-center'>
                <div className='flex justify-center mb-4'>
                  <div className='w-16 h-16 rounded-full bg-green-100 flex items-center justify-center'>
                    <svg className='w-8 h-8 text-green-600' fill='currentColor' viewBox='0 0 20 20'>
                      <path d='M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773c.058.319.23.635.484.919.205.209.456.491.82.68.36.19.748.13 1.154-.185l1.08-2.877a4 4 0 016.635 0l1.08 2.877c.406.315.794.375 1.154.185.364-.189.615-.471.82-.68.254-.284.426-.6.484-.919l-1.548-.773a1 1 0 01-.54-1.06l.74-4.435A1 1 0 0116.847 2H19a1 1 0 011 1v2h2a1 1 0 110 2v3a14.975 14.975 0 01-2 8.434A1 1 0 0118 19H2a1 1 0 01-1-1v-3l-1-4V5a1 1 0 011-1h2V3z' />
                    </svg>
                  </div>
                </div>
                <h3 className='text-lg font-bold text-gray-900 mb-2'>Free Shipping</h3>
                <p className='text-gray-600'>On orders over 500 EGP</p>
              </div>

              {/* Feature 2 */}
              <div className='text-center'>
                <div className='flex justify-center mb-4'>
                  <div className='w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center'>
                    <svg className='w-8 h-8 text-blue-600' fill='currentColor' viewBox='0 0 20 20'>
                      <path fillRule='evenodd' d='M5 2a1 1 0 011 1v1h1V3a1 1 0 112 0v1h1V3a1 1 0 112 0v1h1V3a1 1 0 112 0v1h2a2 2 0 012 2v2h1a1 1 0 110 2h-1v1h1a1 1 0 110 2h-1v1h1a1 1 0 110 2h-1v2a2 2 0 01-2 2h-2v1a1 1 0 11-2 0v-1h-1v1a1 1 0 11-2 0v-1H5v1a1 1 0 11-2 0v-1H2a2 2 0 01-2-2v-2H1a1 1 0 110-2h1v-1H1a1 1 0 110-2h1V9H1a1 1 0 110-2h1V6a2 2 0 012-2h2V3a1 1 0 011-1zm6 4v6H8V6h3z' clipRule='evenodd' />
                    </svg>
                  </div>
                </div>
                <h3 className='text-lg font-bold text-gray-900 mb-2'>Easy Returns</h3>
                <p className='text-gray-600'>14-day return policy</p>
              </div>

              {/* Feature 3 */}
              <div className='text-center'>
                <div className='flex justify-center mb-4'>
                  <div className='w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center'>
                    <svg className='w-8 h-8 text-yellow-600' fill='currentColor' viewBox='0 0 20 20'>
                      <path d='M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z' />
                    </svg>
                  </div>
                </div>
                <h3 className='text-lg font-bold text-gray-900 mb-2'>Secure Payment</h3>
                <p className='text-gray-600'>100% secure checkout</p>
              </div>

              {/* Feature 4 */}
              <div className='text-center'>
                <div className='flex justify-center mb-4'>
                  <div className='w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center'>
                    <svg className='w-8 h-8 text-purple-600' fill='currentColor' viewBox='0 0 20 20'>
                      <path d='M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773c.058.319.23.635.484.919.205.209.456.491.82.68.36.19.748.13 1.154-.185l1.08-2.877a4 4 0 016.635 0l1.08 2.877c.406.315.794.375 1.154.185.364-.189.615-.471.82-.68.254-.284.426-.6.484-.919l-1.548-.773a1 1 0 01-.54-1.06l.74-4.435A1 1 0 0116.847 2H19a1 1 0 011 1v2h2a1 1 0 110 2v3a14.975 14.975 0 01-2 8.434A1 1 0 0118 19H2a1 1 0 01-1-1v-3l-1-4V5a1 1 0 011-1h2V3z' />
                    </svg>
                  </div>
                </div>
                <h3 className='text-lg font-bold text-gray-900 mb-2'>24/7 Support</h3>
                <p className='text-gray-600'>Contact us anytime</p>
              </div>
            </div>
          </div>
        ) : (
          <>
            <h1 className='text-3xl font-bold text-gray-900 mb-8'>My Wishlist ({wishlist.length})</h1>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
              {wishlist.map((product) => (
                <div key={product._id} className='bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group'>
                  {/* Clickable Card Content */}
                  <div
                    onClick={() => router.push(`/product-details/${product._id}`)}
                    className='cursor-pointer'>
                    {/* Product Image */}
                    <div className='relative h-48 bg-gray-50 flex items-center justify-center overflow-hidden'>
                      <img
                        src={product.imageCover}
                        alt={product.title}
                        className='max-w-[80%] max-h-full object-contain group-hover:scale-110 transition-transform duration-500'
                      />
                    </div>

                    {/* Product Info */}
                    <div className='p-4'>
                      <span
                        onClick={(e) => {
                          e.stopPropagation()
                          router.push(`/categories/${product.category._id}`)
                        }}
                        className='text-[#16a34a] text-[11px] font-bold uppercase tracking-wider mb-1 block hover:underline cursor-pointer'
                      >
                        {product.category.name}
                      </span>

                      <h3 className='text-gray-800 font-bold text-[14px] leading-tight mb-3 line-clamp-2 group-hover:text-[#16a34a] transition-colors'>
                        {product.title}
                      </h3>

                      {/* Rating */}
                      <div className='flex items-center gap-1 mb-3'>
                        {[...Array(5)].map((_, i) => (
                          <FontAwesomeIcon
                            key={i}
                            icon={faStar}
                            className={`text-[10px] ${i < Math.floor(product.ratingsAverage) ? 'text-yellow-400' : 'text-gray-200'}`}
                          />
                        ))}
                        <span className='text-[11px] text-gray-400 ml-1'>({product.ratingsQuantity})</span>
                      </div>

                      {/* Price */}
                      <div className='flex items-center gap-2 mb-4'>
                        {product.priceAfterDiscount ? (
                          <>
                            <span className='text-gray-400 line-through text-[12px]'>{product.price} EGP</span>
                            <span className='text-[#16a34a] font-bold text-[16px]'>{product.priceAfterDiscount} EGP</span>
                          </>
                        ) : (
                          <span className='text-[#16a34a] font-bold text-[16px]'>{product.price} EGP</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons (Not Clickable for Navigation) */}
                  <div className='p-4 pt-0 space-y-2'>
                    {/* Add to Cart Button */}
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        addProductToCart(product, 1)
                      }}
                      className='w-full bg-[#16a34a] text-white py-2 px-3 rounded-lg hover:bg-[#15803d] transition-all duration-200 font-semibold text-sm flex items-center justify-center gap-2'
                    >
                      <FontAwesomeIcon icon={faShoppingBag} className='text-xs' />
                      Add to Cart
                    </button>

                    {/* Remove Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        dispatch(removeFromWishlist(product._id))
                      }}
                      className='w-full bg-red-50 text-red-500 py-2 px-3 rounded-lg hover:bg-red-100 transition-all duration-200 font-semibold text-sm flex items-center justify-center gap-2'
                    >
                      <FontAwesomeIcon icon={faTrash} className='text-xs' />
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
