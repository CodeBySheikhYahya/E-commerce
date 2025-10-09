"use client";

import { Button } from "./ui/button";
import CartItem from "./CartItem";
import CartTotals from "./CartTotals";
import { useCartStore } from "../lib/cartStore";
import Image from "next/image";
import { Plus, Minus, X } from "lucide-react";

interface CartPageProps {
  onCheckout?: () => void;
  onContinueShopping?: () => void;
  className?: string;
}

export default function CartPage({
  onCheckout,
  onContinueShopping,
  className = ""
}: CartPageProps) {
  const { items, updateQuantity, removeItem, getSubtotal } = useCartStore();
  const currentItems = items;

  const handleUpdateQuantity = (id: string, quantity: number) => {
    updateQuantity(id, quantity);
  };

  const handleRemoveItem = (id: string) => {
    removeItem(id);
  };

  const subtotal = getSubtotal();

  return (
    <div className={`${className}`}>
      {/* Hero Section with Cart Image */}
      <section className="relative h-[50vh] lg:h-[60vh] overflow-hidden mb-8 lg:mx-14 lg:rounded-2xl">
        <div className="absolute inset-0">
          {/* Mobile Image */}
          <Image
            src="/viewcart.jpeg"
            alt="Shopping Cart"
            fill
            className="object-cover md:hidden"
            priority
          />
          {/* Desktop Landscape Image */}
          <Image
            src="/view cart landscape.jpg"
            alt="Shopping Cart"
            fill
            className="object-cover hidden md:block"
            priority
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 w-full">
            <div className="text-center">
              <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4 animate-fade-in-up" style={{fontFamily: 'var(--header-font-family)'}}>
                Your Shopping Cart
              </h1>
              <p className="text-lg lg:text-xl text-white/90 mb-2 animate-fade-in-up animation-delay-200">
                Home &gt; Shop &gt; View Cart
              </p>
              <p className="text-xl lg:text-2xl text-white font-medium animate-fade-in-up animation-delay-400">
                Review your items and proceed to checkout
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 pb-8 lg:pb-12">

        {/* Two Column Layout for Desktop, Single Column for Mobile */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          {/* Left Column - Products */}
          <div className="xl:col-span-8">
            {/* Desktop View */}
            <div className="hidden xl:block bg-white">
              {currentItems.length === 0 ? (
                <div className="py-12 text-center">
                  <div className="mb-6">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0h6" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h3>
                    <p className="text-gray-500 mb-6">Looks like you haven't added any items to your cart yet.</p>
                  </div>
                  <Button
                    variant="outline"
                    size="lg"
                    className="px-6 py-2.5 border-black text-black hover:bg-gray-50"
                    onClick={onContinueShopping}
                  >
                    Continue Shopping
                  </Button>
                </div>
              ) : (
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="px-6 py-4 text-left text-lg font-bold text-black">Products</th>
                      <th className="px-6 py-4 text-center text-lg font-bold text-black">Price</th>
                      <th className="px-6 py-4 text-center text-lg font-bold text-black">Quantity</th>
                      <th className="px-6 py-4 text-right text-lg font-bold text-black">Subtotal</th>
                      <th className="px-6 py-4"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {currentItems.map((item) => (
                      <CartItem
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        price={item.price}
                        image={item.image}
                        quantity={item.quantity}
                        onUpdateQuantity={handleUpdateQuantity}
                        onRemoveItem={handleRemoveItem}
                        variant="page"
                      />
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {/* Mobile Horizontal Table View */}
            <div className="xl:hidden">
              <h2 className="font-semibold text-gray-900 text-base mb-3">Products</h2>
              {currentItems.length === 0 ? (
                <div className="bg-white rounded-lg border border-gray-200 py-12 text-center">
                  <div className="mb-6">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0h6" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Your cart is empty</h3>
                    <p className="text-gray-500 mb-6 text-sm px-4">Looks like you haven't added any items to your cart yet.</p>
                  </div>
                  <Button
                    variant="outline"
                    className="px-6 py-2 border-black text-black hover:bg-gray-50 text-sm"
                    onClick={onContinueShopping}
                  >
                    Continue Shopping
                  </Button>
                </div>
              ) : (
                <div className="bg-white rounded-lg border border-gray-200 overflow-x-auto">
                  <div className="min-w-[600px]">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-900">Products</th>
                          <th className="px-12 py-3 text-center text-xs font-semibold text-gray-900">Price</th>
                          <th className="px-4 py-3 text-center text-xs font-semibold text-gray-900">Qty</th>
                          <th className="px-12 py-3 text-right text-xs font-semibold text-gray-900">Total</th>
                          <th className="px-3 py-3"></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {currentItems.map((item) => (
                          <CartItem
                            key={item.id}
                            id={item.id}
                            name={item.name}
                            price={item.price}
                            image={item.image}
                            quantity={item.quantity}
                            onUpdateQuantity={handleUpdateQuantity}
                            onRemoveItem={handleRemoveItem}
                            variant="page"
                          />
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Actions - Desktop */}
            {currentItems.length > 0 && (
              <div className="hidden xl:flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-6">
                {/* Coupon Code */}
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Coupon code"
                    className="px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-sm bg-gray-50 min-w-[180px]"
                  />
                  <Button className="px-6 py-2.5 bg-black text-white hover:bg-gray-800 rounded-md">
                    Apply coupon
                  </Button>
                </div>

                {/* Continue Shopping */}
                <Button
                  variant="outline"
                  className="px-6 py-2.5 border border-black text-black hover:bg-gray-50 rounded-md"
                  onClick={onContinueShopping}
                >
                  Continue Shopping
                </Button>
              </div>
            )}

            {/* Bottom Actions - Mobile */}
            {currentItems.length > 0 && (
              <div className="xl:hidden mt-6 space-y-3">
                {/* Coupon Code */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Coupon code"
                    className="flex-1 px-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-sm bg-gray-50"
                  />
                  <Button className="px-4 py-2.5 bg-black text-white hover:bg-gray-800 rounded-md text-sm">
                    Apply coupon
                  </Button>
                </div>

                {/* Continue Shopping */}
                <Button
                  variant="outline"
                  className="w-full py-2.5 border border-black text-black hover:bg-gray-50 rounded-md"
                  onClick={onContinueShopping}
                >
                  Continue Shopping
                </Button>
              </div>
            )}
          </div>

          {/* Right Column - Cart Totals */}
          <div className="xl:col-span-4">
            <CartTotals
              subtotal={subtotal}
              onCheckout={onCheckout}
              variant="page"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
