"use client";

import { Button } from "./ui/button";
import CartItem from "./CartItem";
import CartTotals from "./CartTotals";
import { useCartStore } from "../lib/cartStore";
import Image from "next/image";

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
    <div className={`py-12 lg:py-16 ${className}`}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Hero Section */}
        <section className="relative h-[60vh] lg:h-[70vh] overflow-hidden mb-16">
          <div className="absolute inset-0">
            <Image
              src="/viewcart.jpg"
              alt="View Cart"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
          
          <div className="relative z-10 h-full flex items-center">
            <div className="max-w-7xl mx-auto px-4 w-full">
              <div className="text-center">
                <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4" style={{fontFamily: 'var(--header-font-family)'}}>
                  View Cart
                </h1>
                <p className="text-lg lg:text-xl text-white/90 mb-2">
                  Home &gt; Shop &gt; View Cart
                </p>
                <p className="text-xl lg:text-2xl text-white font-medium">
                  Your Shopping Cart
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Products */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              {/* Table Header */}
              <div className="hidden md:grid md:grid-cols-4 gap-4 p-6 bg-gray-50 border-b border-gray-200">
                <div className="font-semibold text-gray-900 text-sm uppercase tracking-wide">Products</div>
                <div className="font-semibold text-gray-900 text-sm uppercase tracking-wide text-center">Price</div>
                <div className="font-semibold text-gray-900 text-sm uppercase tracking-wide text-center">Quantity</div>
                <div className="font-semibold text-gray-900 text-sm uppercase tracking-wide text-right">Subtotal</div>
              </div>

              {/* Cart Items */}
              <div className="divide-y divide-gray-200">
                {currentItems.length === 0 ? (
                  <div className="p-12 text-center">
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
                      className="px-8 py-3"
                      onClick={onContinueShopping}
                    >
                      Continue Shopping
                    </Button>
                  </div>
                ) : (
                  currentItems.map((item) => (
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
                  ))
                )}
              </div>

              {/* Bottom Actions */}
              {currentItems.length > 0 && (
                <div className="p-6 bg-gray-50 border-t border-gray-200">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    {/* Coupon Code */}
                    <div className="flex flex-1 max-w-md">
                      <input
                        type="text"
                        placeholder="Coupon code"
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black text-sm"
                      />
                      <Button className="rounded-l-none px-6 py-3">
                        Apply coupon
                      </Button>
                    </div>

                    {/* Continue Shopping */}
                    <Button
                      variant="outline"
                      size="lg"
                      className="px-6 py-3"
                      onClick={onContinueShopping}
                    >
                      Continue Shopping
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Cart Totals */}
          <div className="lg:col-span-1">
            <CartTotals
              subtotal={subtotal}
              onCheckout={onCheckout}
              onContinueShopping={onContinueShopping}
              variant="page"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
