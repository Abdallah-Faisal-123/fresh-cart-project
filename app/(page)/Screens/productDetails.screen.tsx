"use client"

import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faHeart, faCartPlus, faTruck, faShieldAlt, faUndo, faHeadset, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { getProductDetails } from '../server/product-details.server'
import { ProductDetails } from '../types/product-details.type'
import ProductDetailsLoader from '@/components/loaders/product-details-loade'
import { CategoriesResponse, ProductsResponse } from '../types/category.type'
import Link from 'next/link'
import { useCart } from '@/hooks/useCart'
import { useWishlist } from '@/hooks/useWishlist'

export default function ProductDetailsScreen({ res, productsRes }: { res: CategoriesResponse, productsRes: ProductsResponse }) {
  const router = useRouter()
  const { id } = useParams()
  const { addProductToCart } = useCart()
  const [activeTab, setActiveTab] = useState('description')
  const [activeImage, setActiveImage] = useState(0)
  const { toggleWishlist, isInWishlist, isAuthenticated } = useWishlist()
  const [quantity, setQuantity] = useState(1)
  const [product, setProduct] = useState<ProductDetails | null>(null)
  const [swiper, setSwiper] = useState<any>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!id) return
    getProductDetails(id as string).then((res) => {
      setProduct(res.data)
    })
  }, [id])

  if (!product) return <ProductDetailsLoader />

  const isActuallyWishlisted = isInWishlist(product._id)


  return (
    <div className="bg-[#f8f9fa] min-h-screen">

      {/* Main Product Section */}
      <div className="bg-white">
        <div className="container mx-auto px-4 py-8">


          <nav
            className="flex items-center text-sm text-gray-500 mb-8 opacity-0 animate-[fadeIn_0.5s_ease-out_0.1s_forwards]"
          >
            <Link href="/" className="hover:text-[#0aad0a] cursor-pointer transition-colors duration-300">Home</Link>
            <span className="mx-2 text-gray-300">/</span>
            <Link href="/categories" className="hover:text-[#0aad0a] cursor-pointer transition-colors duration-300">Shop</Link>
            <span className="mx-2 text-gray-300">/</span>
            <Link href={`/categories/${product.category._id}`} className="text-[#0aad0a] font-medium hover:underline">{product.category.name}</Link>
            <span className="mx-2 text-gray-300">/</span>
            <span className="text-gray-800 font-semibold truncate max-w-50">{product.title}</span>
          </nav>

          {/* Product Details Grid */}
          <div
            className="flex flex-col lg:flex-row gap-10 opacity-0 animate-[fadeSlideUp_0.6s_ease-out_0.2s_forwards]"
          >
            {/* Image Gallery */}
            <div className="w-full lg:w-5/12">
              {/* Main Image */}
              <div className="relative bg-white border border-gray-100 rounded-2xl overflow-hidden mb-4 group">
                {/* Discount Badge */}
                {/* {discount > 0 && (
                  <div className="absolute top-4 left-4 z-10 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg animate-[bounceIn_0.5s_ease-out]">
                    -{discount}%
                  </div>
                )} */}

                <Swiper
                  autoplay={{ delay: 4000, disableOnInteraction: false }}
                  pagination={{
                    clickable: true,
                    bulletClass: 'swiper-pagination-bullet !w-2.5 !h-2.5 !bg-gray-300 !opacity-100 !mx-1 transition-all duration-300',
                    bulletActiveClass: '!bg-[#0aad0a] !w-8 !rounded-full',
                  }}
                  modules={[Autoplay, Pagination]}
                  onSlideChange={(swiper) => setActiveImage(swiper.activeIndex)}
                  className="rounded-2xl"
                >
                  {product.images.map((img, index) => (
                    <SwiperSlide key={index}>
                      <div className="flex items-center justify-center p-8 bg-white min-h-100">
                        <img
                          src={img}
                          alt={product.title}
                          className="max-w-full max-h-95 object-contain transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              {/* Thumbnail Strip */}
              <div className="flex gap-3">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`w-20 h-20 rounded-xl border-2 overflow-hidden transition-all duration-300 flex items-center justify-center p-1.5 bg-white hover:shadow-md ${activeImage === index
                      ? 'border-[#0aad0a] shadow-lg shadow-green-100'
                      : 'border-gray-100 opacity-60 hover:opacity-100'
                      }`}
                  >
                    <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="w-full lg:w-7/12 flex flex-col">
              {/* Category */}
              <span className="inline-block text-[#0aad0a] text-xs font-semibold uppercase tracking-wider bg-green-50 px-3 py-1 rounded-full w-fit mb-4">

              </span>

              {/* Title */}
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight mb-3">
                {product.title}
              </h1>

              {/* Description */}
              <p className="text-gray-500 text-base leading-relaxed mb-5">
                {product.description}
              </p>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <FontAwesomeIcon
                      key={i}
                      icon={faStar}
                      className={`text-sm ${i < Math.floor(product.ratingsAverage) ? 'text-[#ffc107]' : 'text-gray-200'}`}
                    />
                  ))}
                </div>
                <span className="text-sm font-semibold text-gray-800">{product.ratingsAverage}</span>
                <span className="text-sm text-gray-400">({product.ratingsQuantity} reviews)</span>
                <div className="h-4 w-px bg-gray-200 mx-1"></div>
                <span className="text-sm text-[#0aad0a] font-medium cursor-pointer hover:underline">Write a review</span>
              </div>

              {/* Price Section */}
              <div className="flex items-end gap-4 mb-6 pb-6 border-b border-gray-100">
                <span className="text-3xl font-bold text-gray-900">{product.price} EGP</span>
                {/*  {product.oldPrice > product.price && (
                  <>
                    <span className="text-lg text-gray-400 line-through mb-0.5">{product.oldPrice} EGP</span>
                    <span className="text-sm font-semibold text-red-500 bg-red-50 px-2 py-0.5 rounded-md mb-0.5">
                      Save {product.oldPrice - product.price} EGP
                    </span>
                  </>
                )} */}
              </div>

              {/* Brand */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-sm text-gray-400">Brand:</span>
                {/* <span className="text-sm font-semibold text-gray-800 bg-gray-50 px-3 py-1 rounded-lg">{product.brand}</span> */}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 mb-8">
                <button
                  onClick={() => addProductToCart(product, quantity)}
                  className="flex-1 bg-[#0aad0a] hover:bg-[#099309] text-white font-semibold py-3.5 px-8 rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] shadow-lg shadow-green-200/50 hover:shadow-xl hover:shadow-green-200/60 text-sm flex items-center justify-center gap-2.5">
                  <FontAwesomeIcon icon={faCartPlus} className="text-base" />
                  Add to Cart
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    if (isMounted) {
                      toggleWishlist(product)
                    }
                  }}
                  className={`w-14 h-14 rounded-xl border-2 flex items-center justify-center transition-all duration-300 transform hover:-translate-y-0.5 active:scale-90 ${isActuallyWishlisted
                    ? 'bg-red-50 border-red-200 text-red-500'
                    : 'bg-white border-gray-200 text-gray-400 hover:border-red-200 hover:text-red-400 hover:bg-red-50'
                    }`}
                >
                  <FontAwesomeIcon
                    icon={faHeart}
                    className={`text-lg transition-transform duration-300 ${isActuallyWishlisted ? 'scale-110' : 'group-hover:scale-110'}`}
                  />
                </button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 border border-gray-100">
                  <FontAwesomeIcon icon={faTruck} className="text-[#0aad0a] text-sm" />
                  <div>
                    <p className="text-xs font-semibold text-gray-800">Free Shipping</p>
                    <p className="text-[10px] text-gray-400">On orders over 500 EGP</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 border border-gray-100">
                  <FontAwesomeIcon icon={faUndo} className="text-[#0aad0a] text-sm" />
                  <div>
                    <p className="text-xs font-semibold text-gray-800">Easy Returns</p>
                    <p className="text-[10px] text-gray-400">14-day return policy</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 border border-gray-100">
                  <FontAwesomeIcon icon={faShieldAlt} className="text-[#0aad0a] text-sm" />
                  <div>
                    <p className="text-xs font-semibold text-gray-800">Secure Payment</p>
                    <p className="text-[10px] text-gray-400">100% secure checkout</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 border border-gray-100">
                  <FontAwesomeIcon icon={faHeadset} className="text-[#0aad0a] text-sm" />
                  <div>
                    <p className="text-xs font-semibold text-gray-800">24/7 Support</p>
                    <p className="text-[10px] text-gray-400">Contact us anytime</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="container mx-auto px-4 py-12 opacity-0 animate-[fadeSlideUp_0.6s_ease-out_0.4s_forwards]">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {/* Tab Headers */}
          <div className="flex border-b border-gray-100">
            {['description', 'information', 'reviews'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative flex-1 py-4 text-sm font-semibold uppercase tracking-wider transition-all duration-300 ${activeTab === tab
                  ? 'text-[#0aad0a] bg-green-50/50'
                  : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50/50'
                  }`}
              >
                {tab}
                <span
                  className={`absolute bottom-0 left-0 h-0.75 bg-[#0aad0a] rounded-t-full transition-all duration-500 ${activeTab === tab ? 'w-full' : 'w-0'
                    }`}
                />
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {activeTab === 'description' && (
              <div className="animate-[fadeIn_0.4s_ease-out]">
                <div className="grid md:grid-cols-2 gap-10 items-start">
                  <div className="space-y-5">
                    <h4 className="text-lg font-bold text-gray-900">Product Features</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      Discover the perfect blend of comfort and style with this premium tunic. Crafted from high-quality materials,
                      it offers a flattering fit that transitions seamlessly from day to night.
                    </p>
                    <ul className="space-y-3">
                      {[
                        'Lightweight and breathable fabric for maximum comfort',
                        'Premium stitching and high-quality construction',
                        'Modern design with a classic LT.CAMEL finish',
                        'Machine washable for easy care',
                        'Available in multiple sizes'
                      ].map((feature, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-sm text-gray-600"
                          style={{ animationDelay: `${i * 0.1}s` }}
                        >
                          <span className="mt-1.5 w-2 h-2 bg-[#0aad0a] rounded-full shrink-0"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-100">
                    <div className="flex items-center justify-center p-6">
                      <img
                        src={product.images[0]}
                        alt="Product preview"
                        className="max-h-70 object-contain"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'information' && (
              <div className="animate-[fadeIn_0.4s_ease-out]">
                <div className="max-w-2xl">
                  {[
                    { label: 'Weight', value: '0.45 kg' },
                    { label: 'Dimensions', value: '35 × 20 × 12 cm' },
                    { label: 'Brand', value: product.brand },
                    { label: 'Material', value: '65% Cotton, 35% Polyester' },
                    { label: 'Color', value: 'LT.CAMEL (Brown)' },
                    { label: 'Sleeve Type', value: 'Long Sleeve' },
                    { label: 'Care Instructions', value: 'Machine wash cold, tumble dry low' },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between py-4 ${index !== 6 ? 'border-b border-gray-50' : ''
                        }`}
                    >
                      <span className="text-sm text-gray-400 font-medium">{item.label}</span>
                      {/* <span className="text-sm font-semibold text-gray-800">{item.value}</span> */}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="animate-[fadeIn_0.4s_ease-out]">
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="flex items-center gap-2 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <FontAwesomeIcon
                        key={i}
                        icon={faStar}
                        className={`text-2xl ${i < Math.floor(product.ratingsAverage) ? 'text-[#ffc107]' : 'text-gray-200'}`}
                      />
                    ))}
                  </div>
                  <p className="text-4xl font-bold text-gray-900 mb-2">{product.ratingsAverage}</p>
                  <p className="text-sm text-gray-400 mb-6">Based on {product.ratingsQuantity} reviews</p>
                  <div className="w-full max-w-sm space-y-2 mb-8">
                    {[
                      { stars: 5, percent: 70 },
                      { stars: 4, percent: 20 },
                      { stars: 3, percent: 5 },
                      { stars: 2, percent: 3 },
                      { stars: 1, percent: 2 },
                    ].map((bar) => (
                      <div key={bar.stars} className="flex items-center gap-3 text-sm">
                        <span className="text-gray-400 w-3 text-right">{bar.stars}</span>
                        <FontAwesomeIcon icon={faStar} className="text-[#ffc107] text-xs" />
                        <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#ffc107] rounded-full transition-all duration-1000"
                            style={{ width: `${bar.percent}%` }}
                          />
                        </div>
                        <span className="text-gray-400 w-8 text-right">{bar.percent}%</span>
                      </div>
                    ))}
                  </div>
                  <button className="bg-[#0aad0a] text-white text-sm font-semibold px-6 py-2.5 rounded-xl hover:bg-[#099309] transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 shadow-lg shadow-green-200/50">
                    Write a Review
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="container mx-auto px-4 pb-16 opacity-0 animate-[fadeSlideUp_0.6s_ease-out_0.6s_forwards]">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <h3 className="text-xl font-bold text-gray-900">Related Products</h3>
            <div className="h-px w-16 bg-gray-200 hidden sm:block"></div>
          </div>

          <div className="flex items-center gap-3">
            <button className="swiper-button-prev-custom w-9 h-9 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-400 hover:bg-[#0aad0a] hover:text-white hover:border-[#0aad0a] transition-all duration-300 active:scale-95 shadow-sm hover:shadow z-10 group/nav cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
              <FontAwesomeIcon icon={faChevronLeft} className="text-xs group-hover/nav:text-white" />
            </button>
            <button className="swiper-button-next-custom w-9 h-9 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-400 hover:bg-[#0aad0a] hover:text-white hover:border-[#0aad0a] transition-all duration-300 active:scale-95 shadow-sm hover:shadow z-10 group/nav cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
              <FontAwesomeIcon icon={faChevronRight} className="text-xs group-hover/nav:text-white" />
            </button>
          </div>
        </div>

        <div
          onMouseEnter={() => swiper?.autoplay.stop()}
          onMouseLeave={() => swiper?.autoplay.start()}
        >
          <Swiper
            onSwiper={setSwiper}
            breakpoints={{
              0: { slidesPerView: 2, spaceBetween: 10 },
              640: { slidesPerView: 3, spaceBetween: 20 },
              1024: { slidesPerView: 4, spaceBetween: 20 },
              1280: { slidesPerView: 6, spaceBetween: 20 },
            }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            modules={[Autoplay, Navigation]}
            navigation={{
              nextEl: '.swiper-button-next-custom',
              prevEl: '.swiper-button-prev-custom',
            }}
            className="py-5 relative"
          >
            {productsRes.data.map((item, i) => (
              <SwiperSlide key={item.id}>
                <Link href={`../product-details/${item._id}`}>
                  <div
                    className="group bg-white rounded-2xl border border-gray-100 hover:border-[#0aad0a]/30 overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-green-100/40 hover:-translate-y-1 h-full"
                  >
                    {/* Card Image */}
                    <div className="relative overflow-hidden bg-white p-4">
                      {/* Wishlist Button */}
                      <button className="absolute top-3 right-3 z-10 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full shadow-sm flex items-center justify-center text-gray-300 hover:text-red-500 hover:bg-red-50 transition-all duration-300 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0">
                        <FontAwesomeIcon icon={faHeart} className="text-xs" />
                      </button>

                      <div className="aspect-square flex items-center justify-center">
                        <img
                          src={item.imageCover}
                          alt={item.title}
                          className="max-w-[85%] max-h-[85%] object-contain group-hover:scale-110 transition-transform duration-700"
                        />
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="px-4 pb-4">
                      <p
                        onClick={(e) => {
                          e.preventDefault();
                          router.push(`/categories/${item.category._id}`);
                        }}
                        className="text-[#0aad0a] text-[10px] font-semibold uppercase tracking-wider mb-1 hover:underline cursor-pointer">
                        {item.category.name}
                      </p>
                      <h4 className="text-sm font-semibold text-gray-800 line-clamp-1 mb-2 group-hover:text-[#0aad0a] transition-colors duration-300">
                        {item.title}
                      </h4>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          {item.priceAfterDiscount ? <>
                            <span className="text-xs text-gray-400 line-through">{item.price}</span>

                            <span className="text-sm font-bold text-gray-900">{item.priceAfterDiscount} EGP</span>
                          </> : <>

                            <span className="text-sm font-bold text-gray-900">{item.price} EGP</span>
                          </>}

                        </div>
                        <div className="flex items-center gap-1">
                          <FontAwesomeIcon icon={faStar} className="text-[#ffc107] text-[10px]" />
                          <span className="text-xs font-semibold text-gray-600">{item.ratingsAverage}</span>
                        </div>
                      </div>

                      {/* Add to Cart - Slides up on hover */}
                      <div className="overflow-hidden max-h-0 group-hover:max-h-12 transition-all duration-500">
                        <button
                          onClick={() => addProductToCart(item, 1)}
                          className="w-full bg-[#0aad0a] text-white text-xs font-semibold py-2.5 rounded-lg hover:bg-[#099309] transition-colors duration-300 flex items-center justify-center gap-1.5">
                          <FontAwesomeIcon icon={faCartPlus} className="text-[10px]" />
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

      </div>
    </div>
  )
}
