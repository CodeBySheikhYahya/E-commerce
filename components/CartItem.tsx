"use client";

import { Plus, Minus, Trash2 } from "lucide-react";
import Image from "next/image";

interface CartItemProps {
  id: string;
  name: string;
  price: string;
  image: string;
  quantity: number;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  variant?: "sidebar" | "page";
  className?: string;
}

export default function CartItem({
  id,
  name,
  price,
  image,
  quantity,
  onUpdateQuantity,
  onRemoveItem,
  variant = "sidebar",
  className = ""
}: CartItemProps) {
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return;
    onUpdateQuantity(id, newQuantity);
  };

  const isSidebar = variant === "sidebar";

  return (
    <div className={`flex items-center space-x-3 ${isSidebar ? 'p-3 bg-gray-50 rounded-lg' : 'p-4 border-b border-gray-200'} ${className}`}>
      {/* Product Image */}
      <div className="flex-shrink-0">
        <Image
          src={image}
          alt={name}
          width={isSidebar ? 60 : 80}
          height={isSidebar ? 60 : 80}
          className="rounded-lg object-cover"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 min-w-0">
        <h3 className={`font-medium text-gray-900 ${isSidebar ? 'text-sm truncate' : 'text-base'}`}>
          {name}
        </h3>
        <p className={`text-gray-600 ${isSidebar ? 'text-sm' : 'text-base'}`}>
          {price}
        </p>
        
        {/* Quantity Controls */}
        <div className="flex items-center space-x-2 mt-2">
          <button
            onClick={() => handleQuantityChange(quantity - 1)}
            className={`flex items-center justify-center bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors ${
              isSidebar ? 'w-6 h-6' : 'w-8 h-8'
            }`}
          >
            <Minus className={`${isSidebar ? 'h-3 w-3' : 'h-4 w-4'}`} />
          </button>
          <span className={`font-medium text-center ${isSidebar ? 'text-sm w-8' : 'text-base w-10'}`}>
            {quantity}
          </span>
          <button
            onClick={() => handleQuantityChange(quantity + 1)}
            className={`flex items-center justify-center bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors ${
              isSidebar ? 'w-6 h-6' : 'w-8 h-8'
            }`}
          >
            <Plus className={`${isSidebar ? 'h-3 w-3' : 'h-4 w-4'}`} />
          </button>
        </div>
      </div>

      {/* Price and Remove Button */}
      <div className="flex flex-col items-end space-y-2">
        {/* Subtotal for page variant */}
        {!isSidebar && (
          <span className="text-base font-semibold text-gray-900">
            ${(parseFloat(price.replace('$', '')) * quantity).toFixed(2)}
          </span>
        )}
        
        {/* Remove Button */}
        <button
          onClick={() => onRemoveItem(id)}
          className="text-gray-400 hover:text-red-500 transition-colors"
          title="Remove item"
        >
          <Trash2 className={`${isSidebar ? 'h-4 w-4' : 'h-5 w-5'}`} />
        </button>
      </div>
    </div>
  );
}
