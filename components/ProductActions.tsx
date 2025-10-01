"use client";

import { Heart, Eye, ShoppingCart, Share2 } from "lucide-react";

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
        className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow duration-200"
        aria-label="Add to wishlist"
      >
        <Heart className="h-4 w-4 text-gray-600" />
      </button>
      
      <button
        onClick={() => onQuickView(productId)}
        className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow duration-200"
        aria-label="Quick view"
      >
        <Eye className="h-4 w-4 text-gray-600" />
      </button>
      
      <button
        onClick={() => onAddToCart(productId)}
        className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow duration-200"
        aria-label="Add to cart"
      >
        <ShoppingCart className="h-4 w-4 text-gray-600" />
      </button>
      
      <button
        className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow duration-200"
        aria-label="Share product"
      >
        <Share2 className="h-4 w-4 text-gray-600" />
      </button>
    </div>
  );
}
