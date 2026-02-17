"use client"

import React from 'react'

function SkeletonPulse({ className }: { className?: string }) {
    return (
        <div className={`bg-gray-200 rounded-lg animate-pulse ${className ?? ''}`} />
    )
}

export default function ProductDetailsLoader() {
    return (
        <div className="bg-[#f8f9fa] min-h-screen">

            {/* Main Product Section */}
            <div className="bg-white">
                <div className="container mx-auto px-4 py-8">

                    {/* Breadcrumb Skeleton */}
                    <div className="flex items-center gap-2 mb-8">
                        <SkeletonPulse className="h-4 w-12" />
                        <span className="text-gray-200">/</span>
                        <SkeletonPulse className="h-4 w-10" />
                        <span className="text-gray-200">/</span>
                        <SkeletonPulse className="h-4 w-24" />
                        <span className="text-gray-200">/</span>
                        <SkeletonPulse className="h-4 w-40" />
                    </div>

                    {/* Product Details Grid */}
                    <div className="flex flex-col lg:flex-row gap-10">

                        {/* Image Gallery Skeleton */}
                        <div className="w-full lg:w-5/12">
                            {/* Main Image */}
                            <SkeletonPulse className="w-full min-h-100 rounded-2xl mb-4" />

                            {/* Thumbnail Strip */}
                            <div className="flex gap-3">
                                {[...Array(5)].map((_, i) => (
                                    <SkeletonPulse key={i} className="w-20 h-20 rounded-xl" />
                                ))}
                            </div>
                        </div>

                        {/* Product Info Skeleton */}
                        <div className="w-full lg:w-7/12 flex flex-col">
                            {/* Category Badge */}
                            <SkeletonPulse className="h-6 w-28 rounded-full mb-4" />

                            {/* Title */}
                            <SkeletonPulse className="h-8 w-full max-w-md mb-2" />
                            <SkeletonPulse className="h-8 w-3/4 mb-3" />

                            {/* Description */}
                            <SkeletonPulse className="h-4 w-full mb-2" />
                            <SkeletonPulse className="h-4 w-5/6 mb-2" />
                            <SkeletonPulse className="h-4 w-4/6 mb-5" />

                            {/* Rating */}
                            <div className="flex items-center gap-3 mb-6">
                                <div className="flex gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <SkeletonPulse key={i} className="w-4 h-4 rounded-sm" />
                                    ))}
                                </div>
                                <SkeletonPulse className="h-4 w-8" />
                                <SkeletonPulse className="h-4 w-20" />
                            </div>

                            {/* Price */}
                            <div className="flex items-end gap-4 mb-6 pb-6 border-b border-gray-100">
                                <SkeletonPulse className="h-9 w-36" />
                                <SkeletonPulse className="h-5 w-24" />
                            </div>

                            {/* Brand */}
                            <div className="flex items-center gap-3 mb-6">
                                <SkeletonPulse className="h-4 w-12" />
                                <SkeletonPulse className="h-8 w-20 rounded-lg" />
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center gap-3 mb-8">
                                <SkeletonPulse className="flex-1 h-13 rounded-xl" />
                                <SkeletonPulse className="w-14 h-14 rounded-xl" />
                            </div>

                            {/* Trust Badges */}
                            <div className="grid grid-cols-2 gap-3">
                                {[...Array(4)].map((_, i) => (
                                    <div key={i} className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 border border-gray-100">
                                        <SkeletonPulse className="w-5 h-5 rounded-full shrink-0" />
                                        <div className="flex-1">
                                            <SkeletonPulse className="h-3 w-24 mb-1.5" />
                                            <SkeletonPulse className="h-2.5 w-32" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs Section Skeleton */}
            <div className="container mx-auto px-4 py-12">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    {/* Tab Headers */}
                    <div className="flex border-b border-gray-100">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="flex-1 flex items-center justify-center py-4">
                                <SkeletonPulse className="h-4 w-24" />
                            </div>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <div className="p-8">
                        <div className="grid md:grid-cols-2 gap-10 items-start">
                            <div className="space-y-5">
                                <SkeletonPulse className="h-6 w-40 mb-4" />
                                <SkeletonPulse className="h-4 w-full" />
                                <SkeletonPulse className="h-4 w-5/6" />
                                <SkeletonPulse className="h-4 w-4/6 mb-4" />
                                <div className="space-y-3">
                                    {[...Array(5)].map((_, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <SkeletonPulse className="w-2 h-2 rounded-full shrink-0" />
                                            <SkeletonPulse className="h-4 w-full" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <SkeletonPulse className="w-full h-80 rounded-2xl" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Related Products Skeleton */}
            <div className="container mx-auto px-4 pb-16">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <SkeletonPulse className="h-6 w-40" />
                        <SkeletonPulse className="h-px w-16 hidden sm:block" />
                    </div>
                    <SkeletonPulse className="h-4 w-20" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                            <div className="p-4">
                                <SkeletonPulse className="w-full aspect-square rounded-lg" />
                            </div>
                            <div className="px-4 pb-4">
                                <SkeletonPulse className="h-2.5 w-16 mb-2" />
                                <SkeletonPulse className="h-4 w-full mb-2" />
                                <div className="flex items-center justify-between">
                                    <SkeletonPulse className="h-4 w-16" />
                                    <SkeletonPulse className="h-3 w-8" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
