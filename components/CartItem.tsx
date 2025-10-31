"use client";

import { memo } from "react";
import { Plus, Minus, X } from "lucide-react";
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

function CartItem({
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
  
  // For sidebar variant, keep the existing layout
  if (isSidebar) {
    return (
      <div className={`flex items-center space-x-4 p-3 bg-gray-50 rounded-lg ${className}`}>
        <div className="flex-shrink-0">
          <Image
            src={image}
            alt={name}
            width={60}
            height={60}
            className="rounded-lg object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 text-sm truncate">
            {name}
          </h3>
          <p className="text-gray-600 font-medium text-sm">
            {price}
          </p>
          <div className="flex items-center space-x-3 mt-3">
            <button
              onClick={() => handleQuantityChange(quantity - 1)}
              className="flex items-center justify-center bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors w-6 h-6"
            >
              <Minus className="h-3 w-3" />
            </button>
            <span className="font-semibold text-center text-sm w-8">
              {quantity}
            </span>
            <button
              onClick={() => handleQuantityChange(quantity + 1)}
              className="flex items-center justify-center bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors w-6 h-6"
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>
        </div>
        <button
          onClick={() => onRemoveItem(id)}
          className="text-gray-400 hover:text-red-500 transition-colors"
          title="Remove item"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  // For page variant
  const truncateName = (text: string, maxLength: number = 25) => {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  // Table row format for both desktop and mobile (mobile will scroll horizontally)
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-4 lg:px-6 py-4 lg:py-6">
        <div className="flex items-center space-x-4 lg:space-x-4">
          <div className="flex-shrink-0">
            <Image
              src={image}
              alt={name}
              width={50}
              height={50}
              className="rounded-lg object-cover lg:w-20 lg:h-20"
            />
          </div>
          <h3 className="text-xs lg:text-base font-normal text-gray-900 whitespace-nowrap">
            {name}
          </h3>
        </div>
      </td>
      <td className="px-12 lg:px-6 py-4 lg:py-6 text-center">
        <span className="text-xs lg:text-base font-normal text-gray-900">
          {price}
        </span>
      </td>
      <td className="px-4 lg:px-6 py-4 lg:py-6">
        <div className="flex items-center justify-center">
          <div className="flex items-center border border-gray-300 rounded">
            <button
              onClick={() => handleQuantityChange(quantity - 1)}
              className="px-2 lg:px-3 py-1 lg:py-2 hover:bg-gray-50 transition-colors"
            >
              <Minus className="h-2 w-2 lg:h-3 lg:w-3 text-gray-600" />
            </button>
            <input
              type="text"
              value={quantity}
              readOnly
              className="w-8 lg:w-12 text-center border-x border-gray-300 py-1 lg:py-2 text-xs lg:text-base font-normal"
            />
            <button
              onClick={() => handleQuantityChange(quantity + 1)}
              className="px-2 lg:px-3 py-1 lg:py-2 hover:bg-gray-50 transition-colors"
            >
              <Plus className="h-2 w-2 lg:h-3 lg:w-3 text-gray-600" />
            </button>
          </div>
        </div>
      </td>
      <td className="px-12 lg:px-6 py-4 lg:py-6 text-right">
        <span className="text-xs lg:text-base font-normal text-gray-900">
          ${(parseFloat(price.replace('$', '')) * quantity).toFixed(2)}
        </span>
      </td>
      <td className="px-3 lg:px-6 py-4 lg:py-6 text-center">
        <button
          onClick={() => onRemoveItem(id)}
          className="text-gray-400 hover:text-gray-700 transition-colors p-1"
          title="Remove item"
        >
          <X className="h-3 w-3 lg:h-4 lg:w-4" />
        </button>
      </td>
    </tr>
  );
}

export default memo(CartItem);
