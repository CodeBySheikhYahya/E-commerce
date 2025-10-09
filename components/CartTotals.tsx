"use client";

import { useState } from "react";
import { Button } from "./ui/button";

interface CartTotalsProps {
  subtotal: number;
  shipping?: number;
  tax?: number;
  onCheckout?: () => void;
  onContinueShopping?: () => void;
  variant?: "sidebar" | "page";
  className?: string;
}

export default function CartTotals({
  subtotal,
  shipping = 0,
  tax = 0,
  onCheckout,
  onContinueShopping,
  variant = "sidebar",
  className = ""
}: CartTotalsProps) {
  const [selectedShipping, setSelectedShipping] = useState<"free" | "flat">("free");
  
  const freeShippingThreshold = 500;
  const flatShippingRate = 10;
  
  const calculatedShipping = selectedShipping === "free" ? 0 : flatShippingRate;
  const total = subtotal + calculatedShipping + tax;

  const isSidebar = variant === "sidebar";

  return (
    <div className={`${isSidebar ? 'p-4 border-t border-gray-200' : 'bg-white border border-gray-300 rounded-lg p-6'} ${className}`}>
      {/* Header */}
      <h3 className="font-bold text-gray-900 text-lg mb-6">
        Cart Totals
      </h3>

      {/* Subtotal */}
      <div className="flex justify-between items-center pb-4 mb-4 border-b border-gray-200">
        <span className="text-gray-900 text-base">Subtotal</span>
        <span className="text-gray-900 text-base">
          ${subtotal.toFixed(2)}
        </span>
      </div>

      {/* Shipping Section - Reordered to match reference */}
      <div className="mb-4">
        {/* Radio Buttons First */}
        <div className="space-y-2 mb-3">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="shipping"
              value="free"
              checked={selectedShipping === "free"}
              onChange={() => setSelectedShipping("free")}
              className="w-4 h-4 text-black focus:ring-black border-gray-400"
            />
            <span className="text-gray-900 text-base">Free Shipping</span>
          </label>
          
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="shipping"
              value="flat"
              checked={selectedShipping === "flat"}
              onChange={() => setSelectedShipping("flat")}
              className="w-4 h-4 text-black focus:ring-black border-gray-400"
            />
            <span className="text-gray-900 text-base">Flat Rate ${flatShippingRate.toFixed(2)}</span>
          </label>
        </div>
        
        {/* Shipping Label Below Radio Buttons */}
        <div className="mb-2">
          <span className="text-gray-900 text-base">Shipping</span>
        </div>
        
        {/* Shipping to USA and Change address on same line */}
        <div className="text-sm text-gray-600">
          <span>Shipping to USA</span>
          <button className="ml-2 text-blue-600 hover:text-blue-700 underline">
            Change address
          </button>
        </div>
      </div>

      {/* Divider above Total */}
      <div className="border-t border-gray-200 mb-4"></div>

      {/* Total */}
      <div className="flex justify-between items-center mb-6">
        <span className="font-bold text-gray-900 text-lg">
          Total
        </span>
        <span className="font-bold text-gray-900 text-lg">
          ${total.toFixed(2)}
        </span>
      </div>

      {/* Proceed to Checkout Button */}
      <Button
        className="w-full bg-black hover:bg-gray-800 text-white py-3 rounded-md font-medium"
        onClick={onCheckout}
      >
        Proceed to checkout
      </Button>
    </div>
  );
}
