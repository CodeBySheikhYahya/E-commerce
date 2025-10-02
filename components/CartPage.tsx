"use client";

import { Button } from "./ui/button";
import CartItem from "./CartItem";
import CartTotals from "./CartTotals";
import { useCartStore } from "../lib/cartStore";

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
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2" style={{fontFamily: 'var(--header-font-family)'}}>
            View Cart
          </h1>
          <nav className="text-sm text-gray-600">
            <span>Home</span>
            <span className="mx-2">&gt;</span>
            <span>Shop</span>
            <span className="mx-2">&gt;</span>
            <span className="text-gray-900">View Cart</span>
          </nav>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Products */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              {/* Table Header */}
              <div className="hidden md:grid md:grid-cols-4 gap-4 p-4 bg-gray-50 border-b border-gray-200">
                <div className="font-medium text-gray-900">Products</div>
                <div className="font-medium text-gray-900 text-center">Price</div>
                <div className="font-medium text-gray-900 text-center">Quantity</div>
                <div className="font-medium text-gray-900 text-right">Subtotal</div>
              </div>

              {/* Cart Items */}
              <div className="divide-y divide-gray-200">
                {currentItems.length === 0 ? (
                  <div className="p-8 text-center">
                    <p className="text-gray-500 text-lg">Your cart is empty</p>
                    <Button
                      variant="outline"
                      className="mt-4"
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
                <div className="p-4 bg-gray-50 border-t border-gray-200">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    {/* Coupon Code */}
                    <div className="flex flex-1 max-w-md">
                      <input
                        type="text"
                        placeholder="Coupon code"
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                      />
                      <Button className="rounded-l-none">
                        Apply coupon
                      </Button>
                    </div>

                    {/* Continue Shopping */}
                    <Button
                      variant="outline"
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
