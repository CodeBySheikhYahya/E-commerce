"use client";

import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { ShoppingCart, Heart, Eye } from "lucide-react";
import ProductActions from "./ProductActions";
import { useWishlistStore } from "../lib/wishlistStore";
import { useCartStore } from "../lib/cartStore";

interface ProductCardProps {
  id: string;
  name: string;
  price: string;
  image: string;
  originalPrice?: string;
  discount?: string;
  view?: "grid" | "list";
  onWishlist?: (productId: string) => void;
  onQuickView?: (productId: string) => void;
  onAddToCart?: (productId: string) => void;
}

export default function ProductCard({ 
  id, 
  name, 
  price, 
  image, 
  originalPrice, 
  discount,
  view = "grid",
  onWishlist,
  onQuickView,
  onAddToCart
}: ProductCardProps) {
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore();
  const { addItem: addToCart } = useCartStore();
  
  const isWishlisted = isInWishlist(id);
  
  const handleWishlistToggle = () => {
    if (isWishlisted) {
      removeFromWishlist(id);
    } else {
      addToWishlist({ id, name, price, image, originalPrice, discount });
    }
  };
  
  const handleAddToCart = () => {
    addToCart({ id, name, price, image });
  };
  
  // Mobile list view layout
  if (view === "list") {
    return (
      <Card className="group relative overflow-hidden border-0 shadow-sm bg-gray-50 rounded-lg hover:shadow-lg transition-all duration-300 cursor-pointer">
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* New Badge */}
          <div className="absolute top-3 left-3 bg-black text-white text-xs font-medium px-2 py-1 rounded">
            New
          </div>
        </div>
        
        <CardContent className="p-4">
          <h3 className="font-medium text-gray-900 mb-2" style={{fontFamily: 'var(--header-font-family)'}}>
            {name}
          </h3>
          
          <p className="text-sm text-gray-600 mb-3">
            Elevate your dining experience with the Baxter Colette Chair, a perfect blend of modern elegance and timeless craftsmanship.
          </p>
          
          <div className="flex items-center space-x-2 mb-4">
            <span className="text-lg font-semibold text-gray-900" style={{fontFamily: 'var(--header-font-family)'}}>
              {price}
            </span>
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <Button 
              onClick={handleAddToCart}
              className="flex-1 bg-black hover:bg-gray-800 text-white rounded-lg font-medium transition-colors duration-300"
              style={{fontFamily: 'var(--header-font-family)'}}
            >
              Add To Cart
            </Button>
            
            <div className="flex gap-2">
              <button
                onClick={handleWishlistToggle}
                className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors duration-200"
              >
                <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
              </button>
              
              <button
                onClick={() => (onQuickView || (() => {}))(id)}
                className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors duration-200"
              >
                <Eye className="h-4 w-4 text-gray-600" />
              </button>
              
              <button className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors duration-200">
                <svg className="h-4 w-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Default grid view layout (for desktop and mobile grid)
  return (
    <Card className="group relative overflow-hidden border-0 shadow-sm bg-gray-50 rounded-lg hover:shadow-lg transition-all duration-300 cursor-pointer">
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* New Badge */}
        <div className="absolute top-3 left-3 bg-black text-white text-xs font-medium px-2 py-1 rounded">
          New
        </div>
        
        {/* Product Actions - Show on hover for desktop, always visible on mobile */}
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
          <ProductActions
            productId={id}
            productName={name}
            productPrice={price}
            productImage={image}
            onWishlist={handleWishlistToggle}
            onQuickView={onQuickView || (() => {})}
            onAddToCart={handleAddToCart}
          />
        </div>
      </div>
      
      <CardContent className="p-4">
        <h3 className="text-xl font-medium text-gray-800 mb-2" style={{fontFamily: 'var(--header-font-family)'}}>
          {name}
        </h3>
        
        <div className="flex items-center space-x-2">
          <span className="text-lg font-normal text-gray-600" style={{fontFamily: 'var(--header-font-family)'}}>
            {price}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

