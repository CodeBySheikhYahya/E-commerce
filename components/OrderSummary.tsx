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
    <div className={`bg-white rounded-lg border border-gray-300 ${className}`}>
      {/* Header */}
      <div className="bg-black text-white px-6 py-4 rounded-t-lg">
        <h3 className="text-lg font-bold text-center" style={{fontFamily: 'var(--header-font-family)'}}>
          YOUR ORDER
        </h3>
      </div>

      <div className="p-6">
        {/* Product List */}
        <div className="space-y-0">
          <div className="flex justify-between items-center text-sm font-bold text-gray-900 border-b border-gray-300 pb-3 mb-3">
            <span>Product</span>
            <span>Subtotal</span>
          </div>
          
          {items.map((item, index) => (
            <div key={item.id}>
              <div className="flex items-center space-x-4 py-3">
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
              {index < items.length - 1 && (
                <div className="border-b border-gray-300"></div>
              )}
            </div>
          ))}
        </div>

        {/* Subtotal */}
        <div className="border-t border-gray-300 pt-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-900">Subtotal</span>
            <span className="text-sm text-gray-900">
              ${subtotal.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Shipping Options */}
        <div className="border-t border-gray-300 pt-4">
          <div className="flex justify-between items-start">
            <h4 className="text-sm text-gray-900">Shipping</h4>
            <div className="space-y-2">
              <label className="flex items-center justify-end space-x-2 cursor-pointer">
                <span className="text-sm text-gray-700">Free Shipping</span>
                <input
                  type="radio"
                  name="shipping"
                  value="free"
                  checked={selectedShipping === "free"}
                  onChange={() => setSelectedShipping("free")}
                  className="text-black focus:ring-black"
                />
              </label>
              
              <label className="flex items-center justify-end space-x-2 cursor-pointer">
                <span className="text-sm text-gray-700">Flat Rate ${flatShippingRate.toFixed(2)}</span>
                <input
                  type="radio"
                  name="shipping"
                  value="flat"
                  checked={selectedShipping === "flat"}
                  onChange={() => setSelectedShipping("flat")}
                  className="text-black focus:ring-black"
                />
              </label>
            </div>
          </div>
        </div>

        {/* Total */}
        <div className="border-t border-gray-300 pt-4">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-gray-900">Total</span>
            <span className="text-lg font-semibold text-gray-900">
              ${total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
