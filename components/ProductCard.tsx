"use client";

import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { ShoppingCart, Heart } from "lucide-react";

interface ProductCardProps {
  id: string;
  name: string;
  price: string;
  image: string;
  originalPrice?: string;
  discount?: string;
}

export default function ProductCard({ 
  id, 
  name, 
  price, 
  image, 
  originalPrice, 
  discount 
}: ProductCardProps) {
  return (
    <Card className="group relative overflow-hidden border-0 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Discount Badge */}
        {discount && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-full">
            {discount}
          </div>
        )}
        
        {/* Wishlist Button */}
        <button className="absolute top-3 right-3 p-2 bg-white/80 hover:bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Heart className="h-4 w-4 text-gray-600" />
        </button>
        
        {/* Quick Add to Cart - Hidden by default, shows on hover */}
        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button 
            size="sm" 
            className="w-full bg-black hover:bg-gray-800 text-white"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Quick Add
          </Button>
        </div>
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-medium text-gray-900 mb-2 line-clamp-2" style={{fontFamily: 'var(--header-font-family)'}}>
          {name}
        </h3>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-semibold text-gray-900" style={{fontFamily: 'var(--header-font-family)'}}>
              {price}
            </span>
            {originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                {originalPrice}
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
