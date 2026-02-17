'use client'
import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { faHeart, faPlus, faStar, faTruck, faCheckCircle, faUndo, faHeadset, faEye, faChevronLeft, faChevronRight, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { faApple, faGooglePlay, faCcVisa, faCcMastercard, faCcPaypal, faCcAmazonPay } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CategoriesResponse, ProductsResponse } from '../types/category.type';
import Link from 'next/link';
import { useWishlist } from '@/hooks/useWishlist';
import { useRouter } from 'next/navigation';
import { useCart } from '@/hooks/useCart';



export default function Homescreen({ res, productsRes }: { res: CategoriesResponse, productsRes: ProductsResponse }) {
  const prevRef = React.useRef<HTMLButtonElement>(null);
  const nextRef = React.useRef<HTMLButtonElement>(null);
  const { toggleWishlist, isInWishlist, isAuthenticated } = useWishlist()
  const { addProductToCart } = useCart()
  const [isMounted, setIsMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <main className="min-h-screen bg-[#f8f9fa]">

      {/* --- 1. Hero Slider Section --- */}
      <section className="container mx-auto px-4 md:px-10 pt-6">
        <div className="grid grid-cols-12 gap-0 overflow-hidden rounded-2xl shadow-xl bg-white border border-gray-100">
          {/* Main Slider - Full Width */}
          <div
            className="col-span-12 h-87.5 md:h-112.5 relative"
            onMouseEnter={() => {
              const swiper = (document.querySelector('.main-slider') as any)?.swiper;
              if (swiper) swiper.autoplay.stop();
            }}
            onMouseLeave={() => {
              const swiper = (document.querySelector('.main-slider') as any)?.swiper;
              if (swiper) swiper.autoplay.start();
            }}
          >
            <Swiper
              modules={[Pagination, Autoplay, Navigation]}
              pagination={{ clickable: true, dynamicBullets: true }}
              navigation={{
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              }}
              onBeforeInit={(swiper) => {
                const nav = swiper.params.navigation;
                if (nav && typeof nav !== 'boolean') {
                  nav.prevEl = prevRef.current;
                  nav.nextEl = nextRef.current;
                }
              }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              loop={true}
              slidesPerView={1}
              className="h-full w-full main-slider group"
            >
              {[
                {
                  img: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1200",
                  title: "Fresh & Organic Grocery",
                  desc: "Save up to 20% off on your first order with us.",
                  tag: "Special Offer"
                },
                {
                  img: "https://plus.unsplash.com/premium_photo-1664302148512-ddea30cd2a92?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                  title: "Daily Fresh Vegetables",
                  desc: "Get the best quality vegetables delivered to your home.",
                  tag: "New Arrivals"
                },
                {
                  img: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&q=80&w=1200",
                  title: "Premium Fruit Collection",
                  desc: "Enjoy the taste of fresh fruits with massive discounts.",
                  tag: "Seasonal Deals"
                }
              ].map((slide, idx) => (
                <SwiperSlide key={idx}>
                  <div className="relative w-full h-full overflow-hidden">
                    <img src={slide.img} className="w-full h-full object-cover" alt={slide.title} />
                    <div className="absolute inset-0 bg-linear-to-r from-black/40 to-transparent flex flex-col justify-center px-12 md:px-20 text-white">
                      <span className="bg-[#0aad0a] text-white text-xs font-bold px-3 py-1 rounded-full w-fit mb-4">{slide.tag}</span>
                      <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">{slide.title}</h1>
                      <p className="text-lg md:text-xl mb-8 opacity-90 max-w-md">{slide.desc}</p>
                      <button className="bg-white text-gray-900 px-8 py-3 rounded-md font-bold hover:bg-[#0aad0a] hover:text-white transition-all w-fit shadow-lg transform hover:-translate-y-1 border-none">
                        Shop Now
                      </button>
                    </div>
                  </div>
                </SwiperSlide>
              ))}

              {/* Custom Navigation Buttons */}
              <button
                ref={prevRef}
                className="swiper-button-prev-custom absolute left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/90 shadow-lg rounded-full flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-[#0aad0a] hover:text-white text-gray-800 border-none outline-none"
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
              <button
                ref={nextRef}
                className="swiper-button-next-custom absolute right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/90 shadow-lg rounded-full flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-[#0aad0a] hover:text-white text-gray-800 border-none outline-none"
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </Swiper>

            {/* Pagination Controls Style Override */}
            <style jsx global>{`
              .main-slider .swiper-pagination-bullet {
                width: 10px;
                height: 10px;
                background: #ccc;
                opacity: 0.5;
                transition: all 0.3s;
              }
              .main-slider .swiper-pagination-bullet-active {
                background: #0aad0a !important;
                opacity: 1;
                width: 25px;
                border-radius: 5px;
              }
            `}</style>
          </div>
        </div>
      </section>

      {/* --- Service Features Section --- */}
      <section className="container mx-auto px-4 md:px-10 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { icon: faTruck, title: "Free Shipping", desc: "On all orders over $75" },
            { icon: faCheckCircle, title: "Secure Payment", desc: "100% secure payment methods" },
            { icon: faUndo, title: "Easy Returns", desc: "30 days money back guarantee" },
            { icon: faHeadset, title: "24/7 Support", desc: "Dedicated support team" },
          ].map((feature, i) => (
            <div key={i} className="flex items-center gap-4 p-6 bg-white rounded-xl shadow-sm border border-gray-50 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-[#e8f5e9] text-[#0aad0a] rounded-full flex items-center justify-center text-xl shrink-0">
                <FontAwesomeIcon icon={feature.icon} />
              </div>
              <div>
                <h4 className="font-bold text-gray-800">{feature.title}</h4>
                <p className="text-sm text-gray-500">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- 2. Category Slider --- */}
      <section className="container mx-auto px-4 md:px-10 py-12">
        <h2 className="text-2xl font-bold mb-8 text-gray-800 flex items-center gap-3">
          <span className="w-2 h-8 bg-[#0aad0a] rounded-full"></span>
          Shop By Popular Categories
        </h2>
        <Swiper
          modules={[Navigation, Autoplay]}
          autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true }}
          loop={true}
          spaceBetween={20}
          breakpoints={{
            320: { slidesPerView: 2 },
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 6 },
            1280: { slidesPerView: 8 },
          }}
          className="category-swiper py-4"
        >
          {res.data.map((cat, i) => (
            <SwiperSlide key={i}>
              <Link href={`/categories/${cat._id}`}>
                <div className="flex flex-col items-center group cursor-pointer">
                  <div className="w-32 h-32 md:w-36 md:h-36 rounded-full overflow-hidden mb-4 border-2 border-transparent group-hover:border-[#0aad0a] group-hover:shadow-lg transition-all duration-300 p-1">
                    <div className="w-full h-full rounded-full overflow-hidden bg-white shadow-inner">
                      <img
                        src={cat.image}
                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                        alt={cat.name}
                      />
                    </div>
                  </div>
                  <h3 className="font-bold text-gray-700 text-sm group-hover:text-[#0aad0a] transition-colors">{cat.name}</h3>
                  <span className="text-[10px] text-gray-400 mt-1">20+ Items</span>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* --- 3. Promo Banners --- */}
      <section className="container mx-auto px-4 md:px-10 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Banner 1: Deal of the Day */}
          <div className="relative overflow-hidden rounded-3xl bg-[#00966b] p-8 md:p-12 text-white group cursor-pointer shadow-xl transition-transform hover:-translate-y-1">
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold mb-6">
                <span>🔥</span> Deal of the Day
              </div>
              <h2 className="text-3xl md:text-4xl font-black mb-3 leading-tight uppercase">Fresh Organic <br /> Fruits</h2>
              <p className="text-white/80 mb-8 max-w-70">Get up to 40% off on selected organic fruits</p>

              <div className="flex items-center gap-4 mb-10">
                <span className="text-4xl md:text-5xl font-black">40% OFF</span>
                <div className="text-sm font-medium opacity-80 border-l border-white/30 pl-4 py-1">
                  Use code: <span className="font-black text-white">ORGANIC40</span>
                </div>
              </div>

              <button className="bg-white text-[#00966b] px-8 py-3.5 rounded-full font-black text-sm flex items-center gap-2 hover:bg-opacity-90 transition-all shadow-lg active:scale-95 border-none outline-none">
                Shop Now <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </div>
          </div>

          {/* Banner 2: New Arrivals */}
          <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-[#ff9a44] to-[#ff4b2b] p-8 md:p-12 text-white group cursor-pointer shadow-xl transition-transform hover:-translate-y-1">
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold mb-6">
                <span>✨</span> New Arrivals
              </div>
              <h2 className="text-3xl md:text-4xl font-black mb-3 leading-tight uppercase">Exotic <br /> Vegetables</h2>
              <p className="text-white/80 mb-8 max-w-70">Discover our latest collection of premium vegetables</p>

              <div className="flex items-center gap-4 mb-10">
                <span className="text-4xl md:text-5xl font-black">25% OFF</span>
                <div className="text-sm font-medium opacity-80 border-l border-white/30 pl-4 py-1">
                  Use code: <span className="font-black text-white">FRESH25</span>
                </div>
              </div>

              <button className="bg-white text-[#ff4b2b] px-8 py-3.5 rounded-full font-black text-sm flex items-center gap-2 hover:bg-opacity-90 transition-all shadow-lg active:scale-95 border-none outline-none">
                Explore Now <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- 4. Products Grid --- */}
      <section className="container mx-auto px-4 md:px-10 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Featured Products</h2>
          <button className="text-[#0aad0a] font-semibold hover:underline">View All Products</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-6">

          {productsRes.data.map((product, i) => (
            <div key={i} className="group relative bg-white p-4 rounded-xl shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 flex flex-col transform hover:-translate-y-1">

              <Link href={`product-details/${product._id}`}>
                {/* Badges */}
                <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
                  {product.priceAfterDiscount && <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded">discount</span>}

                </div>

                {/* Product Image */}
                <div className="relative mb-4 h-48 flex items-center justify-center overflow-hidden rounded-lg bg-gray-50">
                  <img
                    src={product.imageCover}
                    className="max-w-[80%] max-h-full object-contain group-hover:scale-110 transition-transform duration-500"
                    alt="Fresh Spinach"
                  />

                  {/* Overlay Controls */}
                  <div className="absolute top-2 right-2 flex flex-col gap-2 translate-x-12 group-hover:translate-x-0 transition-transform duration-300">
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
                      <FontAwesomeIcon icon={isMounted && isInWishlist(product._id) ? faHeart : faHeartRegular} />
                    </button>
                    <button className="w-9 h-9 bg-white shadow-md rounded-full flex items-center justify-center text-gray-400 hover:text-[#0aad0a] hover:bg-green-50 transition-all">
                      <FontAwesomeIcon icon={faEye} />
                    </button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="flex-1 flex flex-col">
                  <span
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      router.push(`/categories/${product.category._id}`)
                    }}
                    className="text-[#0aad0a] text-[11px] font-bold uppercase tracking-wider mb-1 hover:underline cursor-pointer"
                  >
                    {product.category.name}
                  </span>
                  <h3 className="text-gray-800 font-bold text-[14px] leading-tight mb-2 group-hover:text-[#0aad0a] transition-colors cursor-pointer">{product.title}</h3>

                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, s) => (
                      <FontAwesomeIcon key={s} icon={faStar} className={`text-[10px] ${s < 4 ? 'text-yellow-400' : 'text-gray-200'}`} />
                    ))}
                    <span className="text-[11px] text-gray-400 ml-1">(4.8)</span>
                  </div>

                  <div className="flex items-center gap-2 mt-auto">
                    {product.priceAfterDiscount ? <>
                      <span className="text-gray-400 line-through text-[12px]">{product.price}</span>
                      <span className="text-[#0aad0a] font-bold text-[16px]">{product.priceAfterDiscount}</span>
                    </> : <span className="text-[#0aad0a] font-bold text-[16px]">{product.price}</span>}

                  </div>
                </div>

                {/* Add to Cart Button (Animated) */}
                <div className="mt-4 pt-4 border-t border-gray-50">
                  <button
                    onClick={() => addProductToCart(product, 1)}
                    className="w-full bg-[#0aad0a] text-white py-2.5 rounded-lg hover:bg-[#08ac0a] shadow-lg shadow-green-100 font-bold text-sm flex items-center justify-center gap-2 transform active:scale-95 transition-all">
                    <FontAwesomeIcon icon={faPlus} className="text-[10px]" />
                    Add to Cart
                  </button>
                </div>
              </Link>
            </div>
          ))}

        </div>
      </section>



      {/* --- 5. Newsletter Section --- */}
      <section className="relative py-20 mt-12 bg-[#0aad0a] overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>

        <div className="container mx-auto px-4 md:px-10 relative z-10 text-white">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left">
              <h2 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight">Get the FreshCart App <br /> for a Better Experience</h2>
              <p className="text-green-50 opacity-90 text-lg mb-8">Download our mobile app to get exclusive deals, track your orders in real-time, and shop faster than ever before.</p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <div className="bg-black text-white px-6 py-3 rounded-xl flex items-center gap-3 cursor-pointer hover:scale-105 transition-transform border border-gray-800">
                  <div className="text-2xl"><FontAwesomeIcon icon={faApple} /></div>
                  <div className="text-left">
                    <p className="text-[10px] uppercase opacity-60 leading-none">Download on the</p>
                    <p className="text-lg font-bold leading-none mt-1">App Store</p>
                  </div>
                </div>
                <div className="bg-black text-white px-6 py-3 rounded-xl flex items-center gap-3 cursor-pointer hover:scale-105 transition-transform border border-gray-800">
                  <div className="text-2xl"><FontAwesomeIcon icon={faGooglePlay} /></div>
                  <div className="text-left">
                    <p className="text-[10px] uppercase opacity-60 leading-none">Get it on</p>
                    <p className="text-lg font-bold leading-none mt-1">Google Play</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 w-full max-w-md bg-white p-8 rounded-3xl shadow-2xl text-gray-800 mt-8 lg:mt-0">
              <h3 className="text-xl font-bold mb-2">Join our Newsletter</h3>
              <p className="text-gray-500 text-sm mb-6">Stay updated with the latest products and special offers delivered to your inbox.</p>

              <div className="space-y-4">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0aad0a] focus:border-transparent transition-all bg-gray-50"
                />
                <button className="w-full bg-[#0aad0a] text-white py-4 rounded-xl font-bold shadow-lg shadow-green-100 hover:bg-[#08ac0a] transition-all transform active:scale-95 border-none">
                  Subscribe Now
                </button>
              </div>
              <p className="text-[10px] text-gray-400 mt-4 text-center italic">We respect your privacy. Unsubscribe at any time.</p>
            </div>
          </div>

          <div className="mt-20 pt-10 border-t border-white/20 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">Safe Payment Options:</span>
              <div className="flex gap-3 text-2xl opacity-80">
                <FontAwesomeIcon icon={faCcVisa} />
                <FontAwesomeIcon icon={faCcMastercard} />
                <FontAwesomeIcon icon={faCcPaypal} />
                <FontAwesomeIcon icon={faCcAmazonPay} />
              </div>
            </div>
            <p className="text-sm opacity-60">© 2026 FreshCart Store. All rights reserved.</p>
          </div>
        </div>
      </section>

    </main>
  );
}