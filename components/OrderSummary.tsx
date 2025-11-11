"use client";

import { useState } from "react";
import Image from "next/image";
import { useCartStore } from "../lib/cartStore";
import { useCouponByCode } from "../lib/hooks/useCoupons";
import { useCurrency } from "../lib/hooks/useCurrency";
import { formatPrice, parsePrice } from "../lib/currencyUtils";

interface OrderSummaryProps {
  className?: string;
}

export default function OrderSummary({ className = "" }: OrderSummaryProps) {
  const { items, getSubtotal, appliedCouponCode } = useCartStore();
  const [selectedShipping, setSelectedShipping] = useState<"free" | "flat">("free");
  const { symbol, currency } = useCurrency();
  
  const { coupon } = useCouponByCode(appliedCouponCode || "");
  
  const subtotal = getSubtotal();
  const flatShippingRate = 10;
  const shippingCost = selectedShipping === "free" ? 0 : flatShippingRate;
  
  // Check if coupon is valid and active
  const isValidCoupon = coupon && coupon.isActive && !coupon.isExpired && !coupon.isDeleted;
  const discountAmount = isValidCoupon && appliedCouponCode ? subtotal * 0.1 : 0; // 10% discount example
  const total = subtotal + shippingCost - discountAmount;

  return (
    <div className={`bg-white rounded-lg border border-gray-200 ${className}`}>
      {/* Header */}
      <div className="bg-black text-white px-4 py-3 rounded-t-lg">
        <h3 className="text-base font-bold text-center">
          Your Order
        </h3>
      </div>

      <div className="px-6 py-4">
        {/* Product List */}
        <div className="space-y-0">
          <div className="flex justify-between items-center text-lg font-bold text-gray-900 border-b border-gray-300 pb-3 mb-4">
            <span>Product</span>
            <span>Subtotal</span>
          </div>
          
          {items.map((item, index) => (
            <div key={item.id}>
              <div className="flex items-center space-x-4 py-4">
                <div className="flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={50}
                    height={50}
                    className="rounded object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-lg font-medium text-gray-900">
                    {item.name}
                  </h4>
                  <p className="text-base text-gray-600">Qty: {item.quantity}</p>
                </div>
                <div className="text-lg font-medium text-gray-900">
                  {formatPrice(parsePrice(item.price) * item.quantity, currency, symbol)}
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
          <div className="flex justify-between items-center py-3">
            <span className="text-lg text-gray-900">Subtotal</span>
            <span className="text-lg text-gray-900">
              {formatPrice(subtotal, currency, symbol)}
            </span>
          </div>
        </div>

        {/* Coupon Section */}
        <div id="coupon-section" className="border-t border-gray-300 pt-4">
          <div className="space-y-3">
            <h4 className="text-lg text-gray-900">Coupon</h4>
            {appliedCouponCode ? (
              <div className="bg-green-50 p-3 rounded-md">
                <p className="text-sm font-medium text-green-800">
                  Coupon Applied: {appliedCouponCode}
                </p>
                {coupon && (
                  <p className="text-xs text-green-600">{coupon.name}</p>
                )}
              </div>
            ) : (
              <p className="text-sm text-gray-600">
                If you want to apply a coupon, go to cart page
              </p>
            )}
          </div>
        </div>

        {/* Discount */}
        {discountAmount > 0 && (
          <div className="border-t border-gray-300 pt-4">
            <div className="flex justify-between items-center py-3">
              <span className="text-lg text-green-600">Discount</span>
              <span className="text-lg text-green-600">
                -{formatPrice(discountAmount, currency, symbol)}
              </span>
            </div>
          </div>
        )}

        {/* Shipping Options */}
        <div className="border-t border-gray-300 pt-4">
          <div className="flex justify-between items-start py-3">
            <h4 className="text-lg text-gray-900">Shipping</h4>
            <div className="space-y-2">
              <label className="flex items-center justify-end space-x-2 cursor-pointer">
                <span className="text-lg text-gray-700">Free Shipping</span>
                <input
                  type="radio"
                  name="shipping"
                  value="free"
                  checked={selectedShipping === "free"}
                  onChange={() => setSelectedShipping("free")}
                  className="w-4 h-4 text-black focus:ring-black focus:ring-2"
                />
              </label>
              
              <label className="flex items-center justify-end space-x-2 cursor-pointer">
                <span className="text-lg text-gray-700">Flat Rate {formatPrice(flatShippingRate, currency, symbol)}</span>
                <input
                  type="radio"
                  name="shipping"
                  value="flat"
                  checked={selectedShipping === "flat"}
                  onChange={() => setSelectedShipping("flat")}
                  className="w-4 h-4 text-black focus:ring-black focus:ring-2"
                />
              </label>
            </div>
          </div>
        </div>

        {/* Total */}
        <div className="border-t border-gray-300 pt-4">
          <div className="flex justify-between items-center py-3">
            <span className="text-xl font-semibold text-gray-900">Total</span>
            <span className="text-xl font-semibold text-gray-900">
              {formatPrice(total, currency, symbol)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
