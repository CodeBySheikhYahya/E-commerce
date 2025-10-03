"use client";

import Link from "next/link";
import { Heart, ShoppingBag } from "lucide-react";

export default function EmptyWishlist() {
  return (
    <section className="py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="section-heading">Wishlist</h1>
        
        <div className="text-center py-16">
          <div className="mb-8">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <Heart className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your wishlist is empty</h2>
            <p className="text-gray-500 max-w-md mx-auto">
              Looks like you haven't added any items to your wishlist yet. Start exploring our products and add items you love!
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="inline-flex items-center px-6 py-3 bg-black text-white font-medium rounded-md hover:bg-gray-800 transition-colors"
            >
              <ShoppingBag className="w-5 h-5 mr-2" />
              Start Shopping
            </Link>
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 transition-colors"
            >
              Browse Categories
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
