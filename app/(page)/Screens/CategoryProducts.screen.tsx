'use client'

import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faEye, faStar } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ProductsResponse } from '../types/category.type'
import { useWishlist } from '@/hooks/useWishlist'
import { useCart } from '@/hooks/useCart'

interface CategoryProductsScreenProps {
  products: ProductsResponse
  categoryName: string
  categoryId: string
}

export default function CategoryProductsScreen({
  products,
  categoryName,
  categoryId
}: CategoryProductsScreenProps) {
  const { toggleWishlist, isInWishlist, isAuthenticated } = useWishlist()
  const { addProductToCart } = useCart()
  const [isMounted, setIsMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Header */}
      <div className='bg-white border-b border-gray-200'>
        <div className='max-w-7xl mx-auto px-4 py-8'>
          <nav className='flex items-center gap-2 text-sm text-gray-500 mb-4'>
            <Link href='/' className='hover:text-[#16a34a] transition-colors'>Home</Link>
            <span>/</span>
            <Link href='/categories' className='hover:text-[#16a34a] transition-colors'>Categories</Link>
            <span>/</span>
            <span className='text-[#16a34a] font-medium'>{categoryName}</span>
          </nav>
          <h1 className='text-3xl font-bold text-gray-900'>{categoryName}</h1>
          <p className='text-gray-600 mt-2'>
            Showing {products.data.length} products
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <div className='max-w-7xl mx-auto px-4 py-12'>
        {products.data.length === 0 ? (
          <div className='text-center py-16'>
            <p className='text-gray-600 text-lg mb-4'>No products found in this category</p>
            <Link
              href='/categories'
              className='inline-flex items-center gap-2 px-6 py-3 bg-[#16a34a] text-white rounded-lg hover:bg-[#15803d] transition-all'
            >
              Back to Categories
            </Link>
          </div>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-6'>
            {products.data.map((product, i) => (
              <div
                key={i}
                className='group relative bg-white p-4 rounded-xl shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 flex flex-col transform hover:-translate-y-1'
              >
                <Link href={`/product-details/${product._id}`}>
                  {/* Badges */}
                  <div className='absolute top-3 left-3 z-10 flex flex-col gap-1'>
                    {product.priceAfterDiscount && (
                      <span className='bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded'>
                        discount
                      </span>
                    )}
                  </div>

                  {/* Product Image */}
                  <div className='relative mb-4 h-48 flex items-center justify-center overflow-hidden rounded-lg bg-gray-50'>
                    <img
                      src={product.imageCover}
                      className='max-w-[80%] max-h-full object-contain group-hover:scale-110 transition-transform duration-500'
                      alt={product.title}
                    />

                    {/* Overlay Controls */}
                    <div className='absolute top-2 right-2 flex flex-col gap-2 translate-x-12 group-hover:translate-x-0 transition-transform duration-300'>
                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          if (isMounted) {
                            toggleWishlist(product)
                          }
                        }}
                        className={`w-9 h-9 bg-white shadow-md rounded-full flex items-center justify-center transition-all ${isMounted && isInWishlist(product._id)
                            ? 'text-red-500 bg-red-50'
                            : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                          }`}
                      >
                        <FontAwesomeIcon
                          icon={isMounted && isInWishlist(product._id) ? faHeart : faHeartRegular}
                        />
                      </button>
                      <button className='w-9 h-9 bg-white shadow-md rounded-full flex items-center justify-center text-gray-400 hover:text-[#16a34a] hover:bg-green-50 transition-all'>
                        <FontAwesomeIcon icon={faEye} />
                      </button>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className='flex-1 flex flex-col'>
                    <span
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        router.push(`/categories/${product.category._id}`)
                      }}
                      className='text-[#16a34a] text-[11px] font-bold uppercase tracking-wider mb-1 hover:underline cursor-pointer'
                    >
                      {product.category.name}
                    </span>
                    <h3 className='text-gray-800 font-bold text-[14px] leading-tight mb-2 group-hover:text-[#16a34a] transition-colors cursor-pointer'>
                      {product.title}
                    </h3>

                    <div className='flex items-center gap-1 mb-2'>
                      {[...Array(5)].map((_, s) => (
                        <FontAwesomeIcon
                          key={s}
                          icon={faStar}
                          className={`text-[10px] ${s < Math.floor(product.ratingsAverage) ? 'text-yellow-400' : 'text-gray-200'
                            }`}
                        />
                      ))}
                      <span className='text-[11px] text-gray-400 ml-1'>({product.ratingsQuantity})</span>
                    </div>

                    <div className='flex items-center gap-2 mt-auto'>
                      {product.priceAfterDiscount ? (
                        <>
                          <span className='text-gray-400 line-through text-[12px]'>{product.price}</span>
                          <span className='text-[#16a34a] font-bold text-[16px]'>{product.priceAfterDiscount}</span>
                        </>
                      ) : (
                        <span className='text-[#16a34a] font-bold text-[16px]'>{product.price}</span>
                      )}
                    </div>
                  </div>
                </Link>

                {/* Add to Cart Button */}
                <button
                  onClick={() => addProductToCart(product, 1)}
                  className='w-full mt-3 bg-[#16a34a] text-white py-2 px-3 rounded-lg hover:bg-[#15803d] transition-all duration-200 font-semibold text-sm flex items-center justify-center gap-2'>
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
