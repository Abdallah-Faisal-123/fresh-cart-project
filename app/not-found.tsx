"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faMagnifyingGlass, faArrowLeft, faCartShopping, faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import logo from '../public/images/freshcart-logo.svg';

export default function NotFound() {
  return (
    <main className="min-h-[80vh] flex items-center justify-center px-4 bg-white overflow-hidden relative">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[500px] h-[500px] bg-[#16a34b]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[500px] h-[500px] bg-[#16a34b]/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Floating Grocery Icons Decor */}
      <div className="absolute top-20 left-[10%] opacity-10 blur-[1px] animate-bounce [animation-duration:3s] pointer-events-none hidden md:block">
        <FontAwesomeIcon icon={faCartShopping} className="text-6xl text-[#16a34b]" />
      </div>
      <div className="absolute bottom-40 right-[15%] opacity-10 blur-[1px] animate-bounce [animation-duration:4s] pointer-events-none hidden md:block">
        <FontAwesomeIcon icon={faShoppingBag} className="text-7xl text-[#16a34b]" />
      </div>

      <div className="max-w-3xl w-full text-center relative z-10 animate-[fadeIn_1s_ease-out]">
        {/* Logo and Status */}
        <div className="mb-12 flex justify-center opacity-50">
          <Image src={logo} alt="FreshCart Logo" width={180} height={40} />
        </div>

        <div className="relative inline-block mb-12">
          {/* Large Stylized 404 */}
          <h1 className="text-[12rem] md:text-[16rem] font-black text-[#16a34b]/5 tracking-tighter leading-none select-none">
            404
          </h1>

          {/* Main "Oops" Badge */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-[0_20px_50px_rgba(22,163,75,0.15)] transform -rotate-3 hover:rotate-0 transition-transform duration-500 cursor-default group border border-[#16a34b]/10 animate-[bounceIn_1s_ease-out]">
              <span className="text-5xl md:text-7xl text-[#16a34b] font-extrabold tracking-tight block">
                Oops!
              </span>
              <div className="h-1.5 w-12 bg-[#16a34b] rounded-full mt-2 mx-auto group-hover:w-20 transition-all duration-500" />
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="space-y-6 max-w-xl mx-auto animate-[fadeSlideUp_0.8s_ease-out_0.2s_both]">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 tracking-tight">
            We've lost this aisle.
          </h2>
          <p className="text-lg md:text-xl text-gray-500 font-medium leading-relaxed">
            The page you're looking for seems to have expired or moved to a different shelf.
            Don't worry, your fresh groceries are just a click away!
          </p>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-5">
            <Link
              href="/"
              className="group flex items-center gap-3 bg-[#16a34b] text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-[#047730] transition-all duration-500 shadow-[0_10px_25px_rgba(22,163,75,0.25)] hover:shadow-[0_15px_35px_rgba(22,163,75,0.35)] hover:-translate-y-1"
            >
              <FontAwesomeIcon icon={faHouse} className="group-hover:scale-110 transition-transform duration-500" />
              Back to Storefront
            </Link>

            <button
              onClick={() => window.history.back()}
              className="flex items-center gap-3 bg-white text-gray-700 border-2 border-gray-100 px-10 py-5 rounded-2xl font-bold text-lg hover:border-[#16a34b]/30 hover:bg-gray-50 transition-all duration-500"
            >
              <FontAwesomeIcon icon={faArrowLeft} />
              Previous Page
            </button>
          </div>
        </div>

        {/* Quick Help / Links */}
        <div className="mt-20 pt-10 border-t border-gray-100/80 animate-[fadeSlideUp_0.8s_ease-out_0.4s_both]">
          <p className="text-sm font-bold text-gray-400 uppercase tracking-[0.2em] mb-8">Need Help Finding Something?</p>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { name: 'Featured Products', href: '/featured' },
              { name: 'Latest Offers', href: '/offers' },
              { name: 'My Account', href: '/account' },
              { name: 'Support', href: '/contact' }
            ].map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="px-6 py-3 rounded-xl bg-gray-50 text-gray-600 hover:bg-[#16a34b] hover:text-white transition-all duration-300 text-sm font-bold border border-gray-100 hover:border-[#16a34b] shadow-sm hover:shadow-md"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
