'use client'

import { faArrowLeft, faCreditCard, faTruck, faBox } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/navigation'
import { useCart } from '@/hooks/useCart'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { AppState } from '@/store/store'
import checkoutAction, { CheckoutFormData } from '../server/checkout.Actions'

function SkeletonPulse({ className }: { className?: string }) {
  return (
    <div className={`bg-gray-200 rounded-lg animate-pulse ${className ?? ''}`} />
  )
}

export default function CheckoutScreen() {
  const router = useRouter()
  const { cart, getTotalPrice, clearCart } = useCart()
  const authState = useSelector((state: AppState) => state.auth)
  const [isMounted, setIsMounted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)

  const [formData, setFormData] = useState<CheckoutFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    paymentMethod: 'cod'
  })

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (
      <div className='min-h-screen bg-gray-50 py-12'>
        <div className='max-w-7xl mx-auto px-4'>
          {/* Header Skeleton */}
          <div className='mb-8'>
            <SkeletonPulse className="w-24 h-6 mb-4" />
            <SkeletonPulse className="w-48 h-10 mb-2" />
            <SkeletonPulse className="w-64 h-5" />
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
            {/* Form Skeleton */}
            <div className='lg:col-span-2 space-y-6'>
              <div className='bg-white rounded-lg p-6 shadow-sm'>
                <div className='flex items-center gap-3 mb-8'>
                  <SkeletonPulse className="w-10 h-10 rounded-full" />
                  <SkeletonPulse className="w-48 h-8" />
                </div>

                <div className='space-y-6'>
                  <div className='grid grid-cols-2 gap-4'>
                    <div className='space-y-2'>
                      <SkeletonPulse className="w-24 h-4" />
                      <SkeletonPulse className="w-full h-12" />
                    </div>
                    <div className='space-y-2'>
                      <SkeletonPulse className="w-24 h-4" />
                      <SkeletonPulse className="w-full h-12" />
                    </div>
                  </div>
                  <div className='grid grid-cols-2 gap-4'>
                    <div className='space-y-2'>
                      <SkeletonPulse className="w-16 h-4" />
                      <SkeletonPulse className="w-full h-12" />
                    </div>
                    <div className='space-y-2'>
                      <SkeletonPulse className="w-16 h-4" />
                      <SkeletonPulse className="w-full h-12" />
                    </div>
                  </div>
                  <div className='space-y-2'>
                    <SkeletonPulse className="w-20 h-4" />
                    <SkeletonPulse className="w-full h-12" />
                  </div>
                  <div className='grid grid-cols-3 gap-4'>
                    <div className='space-y-2'>
                      <SkeletonPulse className="w-16 h-4" />
                      <SkeletonPulse className="w-full h-12" />
                    </div>
                    <div className='space-y-2'>
                      <SkeletonPulse className="w-24 h-4" />
                      <SkeletonPulse className="w-full h-12" />
                    </div>
                    <div className='space-y-2'>
                      <SkeletonPulse className="w-20 h-4" />
                      <SkeletonPulse className="w-full h-12" />
                    </div>
                  </div>

                  {/* Payment Method Skeleton */}
                  <div className='pt-6 mt-6 border-t border-gray-100'>
                    <div className='flex items-center gap-3 mb-6'>
                      <SkeletonPulse className="w-10 h-10 rounded-full" />
                      <SkeletonPulse className="w-40 h-8" />
                    </div>
                    <div className='space-y-3'>
                      <SkeletonPulse className="w-full h-20" />
                      <SkeletonPulse className="w-full h-20" />
                    </div>
                    <SkeletonPulse className="w-full h-14 mt-8 rounded-lg" />
                  </div>
                </div>
              </div>
            </div>

            {/* Summary Skeleton */}
            <div className='lg:col-span-1'>
              <div className='bg-white rounded-lg p-6 shadow-sm sticky top-4'>
                <SkeletonPulse className="w-40 h-7 mb-6" />

                <div className='space-y-4 mb-6 pb-6 border-b border-gray-100'>
                  {[1, 2, 3].map((i) => (
                    <div key={i} className='flex justify-between'>
                      <div className='space-y-2'>
                        <SkeletonPulse className="w-32 h-4" />
                        <SkeletonPulse className="w-12 h-3" />
                      </div>
                      <SkeletonPulse className="w-20 h-4" />
                    </div>
                  ))}
                </div>

                <div className='space-y-4 mb-6 pb-6 border-b border-gray-100'>
                  <div className='flex justify-between'>
                    <SkeletonPulse className="w-20 h-4" />
                    <SkeletonPulse className="w-24 h-4" />
                  </div>
                  <div className='flex justify-between'>
                    <SkeletonPulse className="w-20 h-4" />
                    <SkeletonPulse className="w-16 h-4" />
                  </div>
                </div>

                <div className='flex justify-between items-center mt-6'>
                  <SkeletonPulse className="w-16 h-6" />
                  <SkeletonPulse className="w-32 h-8" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (cart.length === 0) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='text-center'>
          <h1 className='text-2xl font-bold text-gray-900 mb-4'>Your cart is empty</h1>
          <button
            onClick={() => router.push('/')}
            className='inline-flex items-center gap-2 px-6 py-3 bg-[#16a34a] text-white rounded-lg hover:bg-[#15803d] transition-all'
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            Back to Shopping
          </button>
        </div>
      </div>
    )
  }

  const subtotal = getTotalPrice()
  const shippingCost = subtotal > 500 ? 0 : 50
  const total = subtotal + shippingCost

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handlePaymentMethodChange = (method: 'card' | 'cod') => {
    setFormData(prev => ({ ...prev, paymentMethod: method }))
  }

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone ||
      !formData.address || !formData.city || !formData.country) {
      toast.error('Please fill in all required fields')
      return
    }

    // Check if user is authenticated using Redux state
    if (!authState.isAuthenticated) {
      toast.error('Please log in to place an order')
      router.push('/login?callbackUrl=/checkout')
      return
    }

    setLoading(true)
    try {
      const response = await checkoutAction({
        ...formData,
        cartItems: cart.map(item => ({ productId: item._id, quantity: item.quantity }))
      })

      if (response.success) {
        if (formData.paymentMethod === 'card' && response.paymentUrl) {
          toast.loading('Redirecting to payment gateway...')
          window.location.href = response.paymentUrl
        } else {
          setOrderPlaced(true)
          clearCart()
          toast.success(response.message)
        }
      } else {
        if (response.statusCode === 401) {
          toast.error(response.message)
          router.push('/login?callbackUrl=/checkout')
        } else {
          toast.error(response.message)
        }
      }
    } catch (error: any) {
      console.error('Order placement error:', error)
      toast.error('Error placing order. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (orderPlaced) {
    return (
      <div className='min-h-screen bg-gray-50 py-12'>
        <div className='max-w-2xl mx-auto px-4'>
          <div className='bg-white rounded-lg p-8 text-center shadow-lg'>
            <div className='w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6'>
              <svg className='w-10 h-10 text-green-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
              </svg>
            </div>
            <h1 className='text-3xl font-bold text-gray-900 mb-4'>Order Placed Successfully!</h1>
            <p className='text-gray-600 mb-8'>Thank you for your purchase. Your order has been confirmed.</p>

            <div className='bg-gray-50 rounded-lg p-6 mb-8 text-left'>
              <p className='text-sm text-gray-600 mb-2'>Order Details:</p>
              <p className='text-lg font-semibold text-gray-900'>Items: {cart.length}</p>
              <p className='text-lg font-semibold text-[#16a34a] mt-2'>Total: {total.toFixed(2)} EGP</p>
            </div>

            <div className='space-y-3'>
              <button
                onClick={() => router.push('/orders')}
                className='w-full bg-[#16a34a] text-white py-3 px-4 rounded-lg hover:bg-[#15803d] transition-all font-semibold'
              >
                View Orders
              </button>
              <button
                onClick={() => router.push('/')}
                className='w-full border-2 border-[#16a34a] text-[#16a34a] py-3 px-4 rounded-lg hover:bg-green-50 transition-all font-semibold'
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='bg-gray-50 min-h-screen py-12'>
      <div className='max-w-7xl mx-auto px-4'>
        {/* Header */}
        <div className='mb-8'>
          <button
            onClick={() => router.back()}
            className='flex items-center gap-2 text-[#16a34a] hover:underline mb-4 font-semibold'
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            Back to Cart
          </button>
          <h1 className='text-4xl font-bold text-gray-900'>Checkout</h1>
          <p className='text-gray-600 mt-2'>Complete your purchase securely</p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Checkout Form */}
          <div className='lg:col-span-2 space-y-6'>
            {/* Shipping Information */}
            <div className='bg-white rounded-lg p-6 shadow-sm'>
              <div className='flex items-center gap-3 mb-6'>
                <div className='w-10 h-10 bg-[#16a34a] text-white rounded-full flex items-center justify-center font-bold'>1</div>
                <h2 className='text-2xl font-bold text-gray-900'>Shipping Address</h2>
              </div>

              <form onSubmit={handlePlaceOrder} className='space-y-4'>
                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-sm font-semibold text-gray-700 mb-2'>First Name *</label>
                    <input
                      type='text'
                      name='firstName'
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#16a34a] focus:ring-2 focus:ring-green-100'
                      placeholder='John'
                      required
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-semibold text-gray-700 mb-2'>Last Name *</label>
                    <input
                      type='text'
                      name='lastName'
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#16a34a] focus:ring-2 focus:ring-green-100'
                      placeholder='Doe'
                      required
                    />
                  </div>
                </div>

                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-sm font-semibold text-gray-700 mb-2'>Email *</label>
                    <input
                      type='email'
                      name='email'
                      value={formData.email}
                      onChange={handleInputChange}
                      className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#16a34a] focus:ring-2 focus:ring-green-100'
                      placeholder='john@example.com'
                      required
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-semibold text-gray-700 mb-2'>Phone *</label>
                    <input
                      type='tel'
                      name='phone'
                      value={formData.phone}
                      onChange={handleInputChange}
                      className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#16a34a] focus:ring-2 focus:ring-green-100'
                      placeholder='+20 100 000 0000'
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>Address *</label>
                  <input
                    type='text'
                    name='address'
                    value={formData.address}
                    onChange={handleInputChange}
                    className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#16a34a] focus:ring-2 focus:ring-green-100'
                    placeholder='123 Main Street'
                    required
                  />
                </div>

                <div className='grid grid-cols-3 gap-4'>
                  <div>
                    <label className='block text-sm font-semibold text-gray-700 mb-2'>City *</label>
                    <input
                      type='text'
                      name='city'
                      value={formData.city}
                      onChange={handleInputChange}
                      className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#16a34a] focus:ring-2 focus:ring-green-100'
                      placeholder='Cairo'
                      required
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-semibold text-gray-700 mb-2'>Postal Code</label>
                    <input
                      type='text'
                      name='postalCode'
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#16a34a] focus:ring-2 focus:ring-green-100'
                      placeholder='10001'
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-semibold text-gray-700 mb-2'>Country *</label>
                    <input
                      type='text'
                      name='country'
                      value={formData.country}
                      onChange={handleInputChange}
                      className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#16a34a] focus:ring-2 focus:ring-green-100'
                      placeholder='Egypt'
                      required
                    />
                  </div>
                </div>

                {/* Payment Method */}
                <div className='border-t border-gray-200 pt-6 mt-6'>
                  <div className='flex items-center gap-3 mb-6'>
                    <div className='w-10 h-10 bg-[#16a34a] text-white rounded-full flex items-center justify-center font-bold'>2</div>
                    <h2 className='text-2xl font-bold text-gray-900'>Payment Method</h2>
                  </div>

                  <div className='space-y-3'>
                    <label className='flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-[#16a34a] transition-all' style={{ borderColor: formData.paymentMethod === 'cod' ? '#16a34a' : '#e5e7eb', backgroundColor: formData.paymentMethod === 'cod' ? '#f0fdf4' : 'white' }}>
                      <input
                        type='radio'
                        name='paymentMethod'
                        value='cod'
                        checked={formData.paymentMethod === 'cod'}
                        onChange={() => handlePaymentMethodChange('cod')}
                        className='w-4 h-4 accent-[#16a34a]'
                      />
                      <span className='ml-3 flex flex-col'>
                        <span className='font-semibold text-gray-900'>Cash on Delivery (COD)</span>
                        <span className='text-sm text-gray-600'>Pay when you receive your order</span>
                      </span>
                    </label>

                    <label className='flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-[#16a34a] transition-all' style={{ borderColor: formData.paymentMethod === 'card' ? '#16a34a' : '#e5e7eb', backgroundColor: formData.paymentMethod === 'card' ? '#f0fdf4' : 'white' }}>
                      <input
                        type='radio'
                        name='paymentMethod'
                        value='card'
                        checked={formData.paymentMethod === 'card'}
                        onChange={() => handlePaymentMethodChange('card')}
                        className='w-4 h-4 accent-[#16a34a]'
                      />
                      <span className='ml-3 flex flex-col'>
                        <span className='font-semibold text-gray-900 flex items-center gap-2'>
                          <FontAwesomeIcon icon={faCreditCard} className='text-[#16a34a]' />
                          Credit/Debit Card
                        </span>
                        <span className='text-sm text-gray-600'>Secure payment via card gateway</span>
                      </span>
                    </label>
                  </div>
                </div>

                <button
                  type='submit'
                  disabled={loading}
                  className='w-full bg-[#16a34a] text-white py-3 px-4 rounded-lg hover:bg-[#15803d] transition-all font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed mt-8'
                >
                  {loading ? 'Processing...' : 'Place Order'}
                </button>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className='lg:col-span-1'>
            <div className='bg-white rounded-lg p-6 shadow-sm sticky top-4'>
              <h2 className='text-xl font-bold text-gray-900 mb-6'>Order Summary</h2>

              {/* Cart Items */}
              <div className='space-y-4 mb-6 pb-6 border-b border-gray-200 max-h-64 overflow-y-auto'>
                {cart.map((item) => (
                  <div key={item._id} className='flex justify-between items-start'>
                    <div className='flex-1'>
                      <p className='font-semibold text-gray-900 text-sm line-clamp-1'>{item.title}</p>
                      <p className='text-sm text-gray-600'>Qty: {item.quantity}</p>
                    </div>
                    <p className='font-semibold text-gray-900'>
                      {(item.quantity * (item.priceAfterDiscount || item.price)).toFixed(2)} EGP
                    </p>
                  </div>
                ))}
              </div>

              {/* Pricing */}
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

              <div className='flex justify-between items-center'>
                <span className='text-lg font-bold text-gray-900'>Total:</span>
                <span className='text-2xl font-bold text-[#16a34a]'>{total.toFixed(2)} EGP</span>
              </div>

              {/* Features */}
              <div className='mt-8 space-y-3 pt-6 border-t border-gray-200'>
                <div className='flex items-center gap-3 text-sm'>
                  <FontAwesomeIcon icon={faTruck} className='text-[#16a34a] text-lg' />
                  <span className='text-gray-600'>Free shipping on orders over 500 EGP</span>
                </div>
                <div className='flex items-center gap-3 text-sm'>
                  <FontAwesomeIcon icon={faBox} className='text-[#16a34a] text-lg' />
                  <span className='text-gray-600'>14-day return policy</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
