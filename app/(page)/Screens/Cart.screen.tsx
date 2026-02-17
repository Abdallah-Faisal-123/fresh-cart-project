'use client'

import { faTrash, faShoppingBag, faMinus, faPlus, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCart } from '@/hooks/useCart'
import { useEffect, useState } from 'react'

function SkeletonPulse({ className }: { className?: string }) {
  return (
    <div className={`bg-gray-200 rounded-lg animate-pulse ${className ?? ''}`} />
  )
}

export default function CartScreen() {
  const router = useRouter()
  const { cart, removeProductFromCart, updateQuantity, getTotalPrice, getTotalItems } = useCart()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const subtotal = getTotalPrice()
  const shippingCost = subtotal > 500 ? 0 : 50
  const total = subtotal + shippingCost

  if (!isMounted) {
    return (
      <div className='min-h-screen bg-gray-50 py-12'>
        <div className='max-w-7xl mx-auto px-4'>
          <div className='mb-8'>
            <SkeletonPulse className='h-8 w-48 mb-2' />
            <SkeletonPulse className='h-4 w-96' />
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
            <div className='lg:col-span-2 space-y-4'>
              {[...Array(3)].map((_, i) => (
                <div key={i} className='bg-white rounded-lg p-4 flex gap-4'>
                  <SkeletonPulse className='h-32 w-32' />
                  <div className='flex-1'>
                    <SkeletonPulse className='h-4 w-full mb-2' />
                    <SkeletonPulse className='h-4 w-3/4 mb-4' />
                    <SkeletonPulse className='h-8 w-32' />
                  </div>
                </div>
              ))}
            </div>
            <div>
              <SkeletonPulse className='h-64 w-full rounded-lg' />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (cart.length === 0) {
    return (
      <div className='min-h-screen bg-gray-50'>
        <div className='max-w-6xl mx-auto px-4 py-16 lg:py-24'>
          <div className='text-center mb-12'>
            <div className='flex justify-center mb-8'>
              <div className='w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center'>
                <FontAwesomeIcon icon={faShoppingBag} className='text-5xl text-blue-500' />
              </div>
            </div>

            <h1 className='text-4xl font-bold text-gray-900 mb-4'>Your cart is empty</h1>
            
            <p className='text-xl text-gray-600 mb-8 max-w-2xl mx-auto'>
              Looks like you haven't added anything to your cart yet. Start exploring our products!
            </p>

            <button
              onClick={() => router.push('/')}
              className='inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#16a34a] text-white rounded-lg hover:bg-[#15803d] transition-all duration-200 font-semibold text-lg shadow-md hover:shadow-lg'
            >
              <FontAwesomeIcon icon={faShoppingBag} className='text-lg' />
              Start Shopping
            </button>

            {/* Features Section */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20 pt-16 border-t border-gray-200'>
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
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-gray-50 py-12'>
      <div className='max-w-7xl mx-auto px-4'>
        {/* Header */}
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-gray-900 mb-2'>Shopping Cart</h1>
          <p className='text-gray-600'>You have {getTotalItems()} items in your cart</p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Cart Items */}
          <div className='lg:col-span-2 space-y-4'>
            {cart.map((item) => {
              const price = item.priceAfterDiscount || item.price
              const totalPrice = price * item.quantity

              return (
                <div key={item._id} className='bg-white rounded-lg p-4 flex gap-4 shadow-sm hover:shadow-md transition-all'>
                  {/* Product Image */}
                  <Link href={`/product-details/${item._id}`}>
                    <div className='w-24 h-24 md:w-32 md:h-32 shrink-0 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden group'>
                      <img
                        src={item.imageCover}
                        alt={item.title}
                        className='w-full h-full object-contain group-hover:scale-110 transition-transform'
                      />
                    </div>
                  </Link>

                  {/* Product Info */}
                  <div className='flex-1 flex flex-col'>
                    <Link href={`/product-details/${item._id}`}>
                      <h3 className='text-gray-900 font-semibold mb-2 line-clamp-2 hover:text-[#16a34a] transition-colors'>
                        {item.title}
                      </h3>
                    </Link>

                    <div className='flex items-center gap-2 mb-3'>
                      {item.priceAfterDiscount ? (
                        <>
                          <span className='text-gray-400 line-through text-sm'>{item.price} EGP</span>
                          <span className='text-[#16a34a] font-bold text-lg'>{item.priceAfterDiscount} EGP</span>
                        </>
                      ) : (
                        <span className='text-[#16a34a] font-bold text-lg'>{item.price} EGP</span>
                      )}
                    </div>

                    <div className='flex items-center justify-between mt-auto'>
                      {/* Quantity Controls */}
                      <div className='flex items-center border border-gray-300 rounded-lg'>
                        <button
                          onClick={() => updateQuantity(item._id, item.quantity - 1)}
                          className='p-2 text-gray-500 hover:text-gray-700 transition-colors'
                        >
                          <FontAwesomeIcon icon={faMinus} className='text-sm' />
                        </button>
                        <span className='px-4 py-2 text-gray-900 font-semibold'>{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item._id, item.quantity + 1)}
                          className='p-2 text-gray-500 hover:text-gray-700 transition-colors'
                        >
                          <FontAwesomeIcon icon={faPlus} className='text-sm' />
                        </button>
                      </div>

                      {/* Total Price & Remove */}
                      <div className='text-right'>
                        <div className='text-[#16a34a] font-bold text-lg mb-2'>{totalPrice.toFixed(2)} EGP</div>
                        <button
                          onClick={() => removeProductFromCart(item._id)}
                          className='text-red-500 hover:text-red-700 transition-colors flex items-center gap-1'
                        >
                          <FontAwesomeIcon icon={faTrash} className='text-sm' />
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Order Summary */}
          <div className='lg:col-span-1'>
            <div className='bg-white rounded-lg p-6 shadow-sm sticky top-4'>
              <h2 className='text-xl font-bold text-gray-900 mb-6'>Order Summary</h2>

              <div className='space-y-4 mb-6 pb-6 border-b border-gray-200'>
                <div className='flex justify-between text-gray-700'>
                  <span>Subtotal:</span>
                  <span className='font-semibold'>{subtotal.toFixed(2)} EGP</span>
                </div>
                <div className='flex justify-between text-gray-700'>
                  <span>Shipping:</span>
                  <span className={`font-semibold ${shippingCost === 0 ? 'text-[#16a34a]' : 'text-gray-900'}`}>
                    {shippingCost === 0 ? 'FREE' : `${shippingCost} EGP`}
                  </span>
                </div>
                <div className='flex justify-between text-gray-700'>
                  <span>Tax:</span>
                  <span className='font-semibold'>0 EGP</span>
                </div>
              </div>

              <div className='flex justify-between items-center mb-6'>
                <span className='text-lg font-bold text-gray-900'>Total:</span>
                <span className='text-2xl font-bold text-[#16a34a]'>{total.toFixed(2)} EGP</span>
              </div>

              <button 
                onClick={() => router.push('/checkout')}
                className='w-full bg-[#16a34a] text-white py-3 px-4 rounded-lg hover:bg-[#15803d] transition-all duration-200 font-semibold text-lg shadow-md hover:shadow-lg mb-3'>
                Proceed to Checkout
              </button>

              <button
                onClick={() => router.push('/')}
                className='w-full border-2 border-[#16a34a] text-[#16a34a] py-3 px-4 rounded-lg hover:bg-green-50 transition-all duration-200 font-semibold'
              >
                Continue Shopping
              </button>

              <Link href='/wishlist' className='block text-center mt-4 text-[#16a34a] hover:underline font-semibold'>
                View Wishlist
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
