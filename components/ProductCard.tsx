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
  
  return (
    <Card className="group relative overflow-hidden border-0 shadow-sm bg-gray-50 rounded-lg hover:shadow-lg transition-all duration-300">
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
        
        {/* Product Actions - Show on hover */}
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
        <h3 className="font-medium text-gray-900 mb-2" style={{fontFamily: 'var(--header-font-family)'}}>
          {name}
        </h3>
        
        <div className="flex items-center space-x-2">
          <span className="text-lg font-semibold text-gray-900" style={{fontFamily: 'var(--header-font-family)'}}>
            {price}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

