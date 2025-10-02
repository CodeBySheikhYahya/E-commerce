"use client";

import { Heart, Eye, ShoppingCart } from "lucide-react";

interface ProductActionsProps {
  productId: string;
  onWishlist: (productId: string) => void;
  onQuickView: (productId: string) => void;
  onAddToCart: (productId: string) => void;
  className?: string;
}

export default function ProductActions({
  productId,
  onWishlist,
  onQuickView,
  onAddToCart,
  className = ""
}: ProductActionsProps) {
  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      <button
        onClick={() => onWishlist(productId)}
        className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow duration-200 group relative"
        aria-label="Add to wishlist"
        title="Add to wishlist"
      >
        <Heart className="h-4 w-4 text-gray-600" />
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-white text-black text-xs px-3 py-2 rounded-lg shadow-lg opacity-0 hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none border">
          Add to wishlist
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
        </div>
      </button>
      
      <button
        onClick={() => onQuickView(productId)}
        className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow duration-200 group relative"
        aria-label="Quick view"
        title="Quick view"
      >
        <Eye className="h-4 w-4 text-gray-600" />
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-white text-black text-xs px-3 py-2 rounded-lg shadow-lg opacity-0 hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none border">
          Quick view
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
        </div>
      </button>
      
      <button
        onClick={() => onAddToCart(productId)}
        className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow duration-200 group relative"
        aria-label="Add to cart"
        title="Add to cart"
      >
        <ShoppingCart className="h-4 w-4 text-gray-600" />
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-white text-black text-xs px-3 py-2 rounded-lg shadow-lg opacity-0 hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none border">
          Add to cart
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
        </div>
      </button>
      
    </div>
  );
}
