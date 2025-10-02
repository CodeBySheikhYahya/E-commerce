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
    <div className={`${isSidebar ? 'p-4 border-t border-gray-200' : 'bg-gray-50 p-6 rounded-lg'} ${className}`}>
      {/* Header */}
      <h3 className={`font-semibold text-gray-900 mb-4 ${isSidebar ? 'text-base' : 'text-lg'}`}>
        Cart Totals
      </h3>

      {/* Subtotal */}
      <div className="flex justify-between items-center mb-3">
        <span className="text-gray-600">Subtotal</span>
        <span className="font-medium text-gray-900">
          ${subtotal.toFixed(2)}
        </span>
      </div>

      {/* Shipping Options */}
      <div className="mb-4">
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
        
        <div className="mt-2 text-sm text-gray-600">
          <span>Shipping to USA</span>
          <button className="ml-2 text-blue-600 hover:text-blue-800 underline">
            Change address
          </button>
        </div>
      </div>

      {/* Shipping Cost */}
      {calculatedShipping > 0 && (
        <div className="flex justify-between items-center mb-3">
          <span className="text-gray-600">Shipping</span>
          <span className="font-medium text-gray-900">
            ${calculatedShipping.toFixed(2)}
          </span>
        </div>
      )}

      {/* Tax */}
      {tax > 0 && (
        <div className="flex justify-between items-center mb-3">
          <span className="text-gray-600">Tax</span>
          <span className="font-medium text-gray-900">
            ${tax.toFixed(2)}
          </span>
        </div>
      )}

      {/* Divider */}
      <div className="border-t border-gray-200 my-4"></div>

      {/* Total */}
      <div className="flex justify-between items-center mb-6">
        <span className={`font-semibold text-gray-900 ${isSidebar ? 'text-base' : 'text-lg'}`}>
          Total
        </span>
        <span className={`font-bold text-gray-900 ${isSidebar ? 'text-lg' : 'text-xl'}`}>
          ${total.toFixed(2)}
        </span>
      </div>

      {/* Action Buttons */}
      <div className={`space-y-3 ${isSidebar ? '' : 'flex flex-col sm:flex-row sm:space-y-0 sm:space-x-3'}`}>
        {onContinueShopping && (
          <Button
            variant="outline"
            className={`${isSidebar ? 'w-full' : 'flex-1'}`}
            onClick={onContinueShopping}
          >
            Continue Shopping
          </Button>
        )}
        
        <Button
          className={`${isSidebar ? 'w-full bg-black hover:bg-gray-800 text-white' : 'flex-1 bg-black hover:bg-gray-800 text-white'}`}
          onClick={onCheckout}
        >
          Proceed to checkout
        </Button>
      </div>
    </div>
  );
}
