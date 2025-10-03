"use client";

import { useState } from "react";
import Image from "next/image";
import { useCartStore } from "../lib/cartStore";

interface OrderSummaryProps {
  className?: string;
}

export default function OrderSummary({ className = "" }: OrderSummaryProps) {
  const { items, getSubtotal } = useCartStore();
  const [selectedShipping, setSelectedShipping] = useState<"free" | "flat">("free");
  
  const subtotal = getSubtotal();
  const flatShippingRate = 10;
  const shippingCost = selectedShipping === "free" ? 0 : flatShippingRate;
  const total = subtotal + shippingCost;

  return (
    <div className={`bg-white rounded-lg border border-gray-200 ${className}`}>
      {/* Header */}
      <div className="bg-black text-white px-6 py-4 rounded-t-lg">
        <h3 className="text-lg font-semibold" style={{fontFamily: 'var(--header-font-family)'}}>
          Your Order
        </h3>
      </div>

      <div className="p-6">
        {/* Product List */}
        <div className="space-y-4">
          <div className="flex justify-between items-center text-sm font-medium text-gray-900 border-b border-gray-200 pb-2">
            <span>Product</span>
            <span>Subtotal</span>
          </div>
          
          {items.map((item) => (
            <div key={item.id} className="flex items-center space-x-4 py-2">
              <div className="flex-shrink-0">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={60}
                  height={60}
                  className="rounded-lg object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-gray-900 truncate">
                  {item.name}
                </h4>
                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
              </div>
              <div className="text-sm font-medium text-gray-900">
                ${(parseFloat(item.price.replace('$', '')) * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        {/* Subtotal */}
        <div className="flex justify-between items-center py-4 border-t border-gray-200">
          <span className="text-sm font-medium text-gray-900">Subtotal</span>
          <span className="text-sm font-medium text-gray-900">
            ${subtotal.toFixed(2)}
          </span>
        </div>

        {/* Shipping Options */}
        <div className="py-4 border-t border-gray-200">
          <h4 className="text-sm font-medium text-gray-900 mb-3">Shipping</h4>
          <div className="space-y-2">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="shipping"
                value="free"
                checked={selectedShipping === "free"}
                onChange={() => setSelectedShipping("free")}
                className="text-black focus:ring-black"
              />
              <span className="text-sm text-gray-700">Free Shipping</span>
            </label>
            
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="shipping"
                value="flat"
                checked={selectedShipping === "flat"}
                onChange={() => setSelectedShipping("flat")}
                className="text-black focus:ring-black"
              />
              <span className="text-sm text-gray-700">Flat Rate ${flatShippingRate.toFixed(2)}</span>
            </label>
          </div>
        </div>

        {/* Total */}
        <div className="flex justify-between items-center py-4 border-t border-gray-200">
          <span className="text-lg font-semibold text-gray-900">Total</span>
          <span className="text-lg font-semibold text-gray-900">
            ${total.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
