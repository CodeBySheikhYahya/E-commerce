"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { Product } from "./DemoData";

interface WishlistItemProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onRemove: (id: string) => void;
  variant: "table" | "card";
}

export default function WishlistItem({ 
  product, 
  onAddToCart, 
  onRemove, 
  variant 
}: WishlistItemProps) {
  const isTable = variant === "table";

  if (isTable) {
    return (
      <tr className="hover:bg-gray-50">
        <td className="px-6 py-4">
          <div className="flex items-center space-x-4">
            <Image
              src={product.image}
              alt={product.name}
              width={60}
              height={60}
              className="rounded-lg object-cover"
            />
            <div>
              <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
            </div>
          </div>
        </td>
        <td className="px-6 py-4">
          <div className="text-sm text-gray-900">
            <span className="font-medium">{product.price}</span>
            {product.originalPrice && (
              <span className="ml-2 text-gray-500 line-through">{product.originalPrice}</span>
            )}
          </div>
        </td>
        <td className="px-6 py-4">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            In Stock
          </span>
        </td>
        <td className="px-6 py-4">
          <div className="flex items-center justify-center space-x-2">
            <button
              onClick={() => onAddToCart(product)}
              className="px-4 py-2 bg-black text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors"
            >
              Add To Cart
            </button>
            <button
              onClick={() => onRemove(product.id)}
              className="p-2 text-gray-400 hover:text-red-500 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </td>
      </tr>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex items-center space-x-4">
        <Image
          src={product.image}
          alt={product.name}
          width={80}
          height={80}
          className="rounded-lg object-cover flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-gray-900 mb-1">{product.name}</h3>
          <div className="text-sm text-gray-900 mb-2">
            <span className="font-medium">{product.price}</span>
            {product.originalPrice && (
              <span className="ml-2 text-gray-500 line-through">{product.originalPrice}</span>
            )}
          </div>
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 mb-3">
            In Stock
          </span>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onAddToCart(product)}
              className="px-4 py-2 bg-black text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors"
            >
              Add To Cart
            </button>
            <button
              onClick={() => onRemove(product.id)}
              className="p-2 text-gray-400 hover:text-red-500 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
