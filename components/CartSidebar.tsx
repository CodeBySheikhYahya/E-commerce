"use client";

import { useMemo } from "react";
import { X, Plus, Minus, Trash2 } from "lucide-react";
import { createPortal } from "react-dom";
import { Button } from "./ui/button";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "../lib/cartStore";
import { formatPrice } from "../lib/currencyUtils";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartSidebar({
  isOpen,
  onClose
}: CartSidebarProps) {
  const { items, updateQuantity, removeItem, getSubtotal, isClosing, closeCartWithAnimation } = useCartStore();
  const currentItems = items;

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(id, newQuantity);
  };

  const handleRemoveItem = (id: string) => {
    removeItem(id);
  };

  // Function to handle cart closing with animation (mobile only)
  const handleCartClose = () => {
    if (window.innerWidth < 1024) { // Mobile only
      closeCartWithAnimation();
    } else {
      onClose(); // Desktop - immediate close
    }
  };

  const freeShippingThreshold = 500;
  const subtotal = useMemo(() => getSubtotal(), [items]);
  const remainingForFreeShipping = useMemo(() => freeShippingThreshold - subtotal, [subtotal]);

  if (!isOpen) return null;

  const overlay = (
    <div className="fixed inset-0 z-[1000] lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-white"
        onClick={handleCartClose}
      />

      {/* Cart Sidebar */}
      <div className={`flex flex-col fixed right-0 top-0 h-full w-full max-w-sm bg-white shadow-xl transform transition-transform duration-300 ease-in-out overscroll-contain ${
        isClosing 
          ? 'animate-out slide-out-to-right duration-300' 
          : 'animate-in slide-in-from-right duration-300'
      }`}>
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              SHOPPING CART({currentItems.length})
            </h2>
            <button
              onClick={handleCartClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="h-5 w-5 text-gray-600" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4 bg-white">
            {currentItems.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">Your cart is empty</p>
              </div>
            ) : (
              <div className="space-y-4">
                {currentItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={60}
                        height={60}
                        className="rounded-lg object-cover"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 truncate">
                        {item.name}
                      </h3>
                      
                      {/* Quantity Controls and Price - Mobile Box Style */}
                      <div className="flex items-center mt-2">
                        <div className="flex items-center border border-gray-600 rounded bg-white">
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 transition-colors"
                          >
                            <Minus className="h-3 w-3 text-gray-600" />
                          </button>
                          <span className="text-base font-medium w-12 text-center py-2">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 transition-colors"
                          >
                            <Plus className="h-3 w-3 text-gray-600" />
                          </button>
                        </div>
                        <p className="text-base font-medium text-gray-900 ml-2">{item.price}</p>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Free Shipping Progress */}
          {remainingForFreeShipping > 0 && (
            <div className="p-4 border-t border-gray-200">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">
                  Add {formatPrice(remainingForFreeShipping)} to cart and get Free shipping!
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all duration-300"
                    style={{ 
                      width: `${Math.min((subtotal / freeShippingThreshold) * 100, 100)}%` 
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="p-4 border-t border-gray-200 space-y-3">
            <Link href="/cart" onClick={handleCartClose}>
              <Button
                variant="outline"
                className="w-full"
              >
                View Cart
              </Button>
            </Link>
            <Link href="/checkout" onClick={handleCartClose}>
              <Button
                className="w-full bg-black hover:bg-gray-800 text-white"
              >
                Check Out
              </Button>
            </Link>
          </div>

          {/* Subtotal */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-900">Subtotal:</span>
              <span className="text-lg font-semibold text-gray-900">
                {formatPrice(subtotal)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (typeof window === "undefined") {
    return null;
  }

  return createPortal(overlay, document.body);
}
