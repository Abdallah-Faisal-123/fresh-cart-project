'use client'

import { useEffect, useState } from 'react'
import { getUserOrders, Order } from '../server/orders.Actions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faBoxOpen,
    faCalendarAlt,
    faCheckCircle,
    faClock,
    faCreditCard,
    faMapMarkerAlt,
    faPhone,
    faReceipt,
    faShoppingBag,
    faTruck
} from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

function SkeletonPulse({ className }: { className?: string }) {
    return (
        <div className={`bg-gray-200 rounded-lg animate-pulse ${className ?? ''}`} />
    )
}

export default function OrdersScreen() {
    const [orders, setOrders] = useState<Order[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await getUserOrders()
                if (response.success && response.data) {
                    // Sort by date newest first
                    const sortedOrders = [...response.data].sort((a, b) =>
                        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                    )
                    setOrders(sortedOrders)
                } else {
                    setError(response.message || 'Failed to load orders')
                    if (response.statusCode === 401) {
                        router.push('/login?callbackUrl=/orders')
                    }
                }
            } catch (err) {
                setError('An unexpected error occurred')
            } finally {
                setLoading(false)
            }
        }

        fetchOrders()
    }, [router])

    if (loading) {
        return (
            <div className='bg-gray-50 min-h-screen py-12'>
                <div className='max-w-5xl mx-auto px-4'>
                    <div className='mb-8'>
                        <SkeletonPulse className="w-48 h-10 mb-2" />
                        <SkeletonPulse className="w-64 h-5" />
                    </div>

                    {[1, 2].map((i) => (
                        <div key={i} className='bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6'>
                            <div className='flex justify-between items-center mb-6 pb-6 border-b border-gray-50'>
                                <div className='flex gap-8'>
                                    <SkeletonPulse className="w-32 h-12" />
                                    <SkeletonPulse className="w-32 h-12" />
                                </div>
                                <SkeletonPulse className="w-24 h-8 rounded-full" />
                            </div>
                            <div className='space-y-4'>
                                <SkeletonPulse className="w-full h-24" />
                                <SkeletonPulse className="w-full h-24" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className='min-h-screen bg-gray-50 flex items-center justify-center p-4'>
                <div className='bg-white p-8 rounded-2xl shadow-xl text-center max-w-md w-full border border-red-50'>
                    <div className='w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                        <FontAwesomeIcon icon={faBoxOpen} className='text-red-600 text-2xl' />
                    </div>
                    <h2 className='text-2xl font-bold text-gray-900 mb-2'>Oops! Something went wrong</h2>
                    <p className='text-gray-600 mb-6'>{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className='w-full bg-[#16a34a] text-white py-3 rounded-xl font-bold hover:bg-[#15803d] transition-all'
                    >
                        Retry
                    </button>
                </div>
            </div>
        )
    }

    if (orders.length === 0) {
        return (
            <div className='min-h-screen bg-gray-50 flex items-center justify-center p-4'>
                <div className='text-center max-w-md'>
                    <div className='w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6'>
                        <FontAwesomeIcon icon={faShoppingBag} className='text-[#16a34a] text-4xl' />
                    </div>
                    <h1 className='text-3xl font-bold text-gray-900 mb-4'>No Orders Found</h1>
                    <p className='text-gray-600 mb-8 text-lg'>Looks like you haven't placed any orders yet. Start shopping and fill your cart!</p>
                    <Link
                        href='/'
                        className='inline-flex items-center gap-2 bg-[#16a34a] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#15803d] transition-all shadow-lg shadow-green-100'
                    >
                        Explore Products
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className='bg-gray-50 min-h-screen py-12'>
            <div className='max-w-5xl mx-auto px-4'>
                {/* Header */}
                <div className='mb-10'>
                    <h1 className='text-4xl font-black text-gray-900 flex items-center gap-4'>
                        My Orders
                        <span className='bg-green-100 text-[#16a34a] text-sm px-4 py-1.5 rounded-full font-bold'>
                            {orders.length} Total
                        </span>
                    </h1>
                    <p className='text-gray-500 mt-2 text-lg'>Track and manage your recent purchases</p>
                </div>

                {/* Orders List */}
                <div className='space-y-8'>
                    {orders.map((order) => (
                        <div
                            key={order._id}
                            className='bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group'
                        >
                            {/* Order Header */}
                            <div className='bg-gray-50/50 px-8 py-6 border-b border-gray-100'>
                                <div className='flex flex-wrap justify-between items-center gap-6'>
                                    <div className='flex gap-10'>
                                        <div className='space-y-1'>
                                            <p className='text-[11px] font-bold text-gray-400 uppercase tracking-widest'>Order ID</p>
                                            <p className='text-sm font-black text-gray-900 font-mono'>#{order._id.slice(-8).toUpperCase()}</p>
                                        </div>
                                        <div className='space-y-1'>
                                            <p className='text-[11px] font-bold text-gray-400 uppercase tracking-widest'>Placed On</p>
                                            <div className='flex items-center gap-2 text-sm font-bold text-gray-700'>
                                                <FontAwesomeIcon icon={faCalendarAlt} className='text-gray-400 w-3' />
                                                {new Date(order.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                                            </div>
                                        </div>
                                        <div className='space-y-1'>
                                            <p className='text-[11px] font-bold text-gray-400 uppercase tracking-widest'>Total Amount</p>
                                            <p className='text-lg font-black text-[#16a34a]'>{order.totalOrderPrice.toFixed(2)} EGP</p>
                                        </div>
                                    </div>

                                    <div className='flex items-center gap-3'>
                                        {/* Status Badges */}
                                        <div className={`px-4 py-1.5 rounded-full text-xs font-black flex items-center gap-2 ${order.isDelivered ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                                            }`}>
                                            <FontAwesomeIcon icon={order.isDelivered ? faCheckCircle : faTruck} className='text-[10px]' />
                                            {order.isDelivered ? 'Delivered' : 'On the Way'}
                                        </div>

                                        <div className={`px-4 py-1.5 rounded-full text-xs font-black flex items-center gap-2 ${order.isPaiad ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                            }`}>
                                            <FontAwesomeIcon icon={order.isPaiad ? faCreditCard : faClock} className='text-[10px]' />
                                            {order.isPaiad ? 'Paid' : 'Pending Payment'}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Order Body */}
                            <div className='p-8'>
                                <div className='grid grid-cols-1 lg:grid-cols-3 gap-10'>
                                    {/* Items Section */}
                                    <div className='lg:col-span-2 space-y-6'>
                                        <h3 className='text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2'>
                                            <FontAwesomeIcon icon={faShoppingBag} className='w-3' />
                                            Items in Order
                                        </h3>
                                        <div className='grid gap-4'>
                                            {order.cartItems.map((item) => (
                                                <div key={item._id} className='flex gap-4 p-4 rounded-2xl bg-gray-50/30 border border-gray-50 hover:border-green-100 transition-colors'>
                                                    <div className='h-20 w-20 bg-white rounded-xl overflow-hidden shadow-sm p-2 flex-shrink-0'>
                                                        <img
                                                            src={item.product.imageCover}
                                                            alt={item.product.title}
                                                            className='w-full h-full object-contain'
                                                        />
                                                    </div>
                                                    <div className='flex-1 flex flex-col justify-center gap-1'>
                                                        <p className='text-[11px] font-bold text-[#16a34a] uppercase'>{item.product.category.name}</p>
                                                        <h4 className='text-gray-900 font-bold text-sm line-clamp-1'>{item.product.title}</h4>
                                                        <div className='flex items-center gap-4 mt-1'>
                                                            <span className='text-xs font-bold text-gray-500'>Qty: {item.count}</span>
                                                            <span className='w-1 h-1 bg-gray-300 rounded-full'></span>
                                                            <span className='text-sm font-black text-gray-900'>{item.price} EGP</span>
                                                        </div>
                                                    </div>
                                                    <div className='flex flex-col justify-center text-right'>
                                                        <p className='text-xs text-gray-400'>Subtotal</p>
                                                        <p className='font-black text-gray-900'>{(item.count * item.price).toFixed(2)}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Summary & Shipping Info */}
                                    <div className='space-y-8'>
                                        {/* Shipping Address */}
                                        <div className='bg-gray-50 rounded-3xl p-6 border border-gray-100'>
                                            <h4 className='text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2'>
                                                <FontAwesomeIcon icon={faMapMarkerAlt} className='w-2.5' />
                                                Shipping Detail
                                            </h4>
                                            <div className='space-y-3'>
                                                <div className='flex gap-3'>
                                                    <div className='w-8 h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-sm'>
                                                        <FontAwesomeIcon icon={faMapMarkerAlt} className='text-[#16a34a] text-xs' />
                                                    </div>
                                                    <p className='text-sm font-bold text-gray-700 leading-relaxed'>
                                                        {order.shippingAddress.details}, {order.shippingAddress.city}
                                                    </p>
                                                </div>
                                                <div className='flex gap-3'>
                                                    <div className='w-8 h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-sm'>
                                                        <FontAwesomeIcon icon={faPhone} className='text-[#16a34a] text-xs' />
                                                    </div>
                                                    <p className='text-sm font-bold text-gray-700'>{order.shippingAddress.phone}</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Payment Info */}
                                        <div className='bg-green-50/50 rounded-3xl p-6 border border-green-50'>
                                            <h4 className='text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2'>
                                                <FontAwesomeIcon icon={faReceipt} className='w-2.5' />
                                                Order Summary
                                            </h4>
                                            <div className='space-y-2'>
                                                <div className='flex justify-between items-center text-sm'>
                                                    <span className='text-gray-500'>Payment Method:</span>
                                                    <span className='font-bold text-gray-900 uppercase'>{order.paymentMethodType}</span>
                                                </div>
                                                <div className='flex justify-between items-center text-sm'>
                                                    <span className='text-gray-500'>Shipping:</span>
                                                    <span className='font-bold text-green-600'>FREE</span>
                                                </div>
                                                <div className='flex justify-between items-center pt-2 mt-2 border-t border-green-100/50'>
                                                    <span className='text-lg font-bold text-gray-900'>Total:</span>
                                                    <span className='text-xl font-black text-[#16a34a]'>{order.totalOrderPrice.toFixed(2)} EGP</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
