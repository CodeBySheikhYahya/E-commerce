"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useCartStore } from "../lib/cartStore";
import { useCouponByCode } from "../lib/hooks/useCoupons";
import { useCoupons } from "../lib/hooks/useCoupons";

interface OrderSummaryProps {
  className?: string;
}

export default function OrderSummary({ className = "" }: OrderSummaryProps) {
  const { items, getSubtotal } = useCartStore();
  const [selectedShipping, setSelectedShipping] = useState<"free" | "flat">("free");
  const [couponCode, setCouponCode] = useState("");
  const [appliedCouponCode, setAppliedCouponCode] = useState<string | null>(null);
  const [searchCode, setSearchCode] = useState("");
  
  const { coupon, isLoading: couponLoading, error: couponError } = useCouponByCode(searchCode);
  const { coupons: availableCoupons } = useCoupons();
  
  const subtotal = getSubtotal();
  const flatShippingRate = 10;
  const shippingCost = selectedShipping === "free" ? 0 : flatShippingRate;
  
  // Check if coupon is valid and active
  const isValidCoupon = coupon && coupon.isActive && !coupon.isExpired && !coupon.isDeleted;
  const discountAmount = isValidCoupon && appliedCouponCode ? subtotal * 0.1 : 0; // 10% discount example
  const total = subtotal + shippingCost - discountAmount;

  // Auto-apply coupon when it's validated and valid
  useEffect(() => {
    if (coupon && isValidCoupon && searchCode && !appliedCouponCode) {
      setAppliedCouponCode(searchCode);
      setCouponCode(searchCode);
    }
  }, [coupon, isValidCoupon, searchCode, appliedCouponCode]);

  const handleApplyCoupon = () => {
    if (couponCode.trim()) {
      setSearchCode(couponCode.trim().toUpperCase());
    }
  };

  const handleRemoveCoupon = () => {
    setCouponCode("");
    setAppliedCouponCode(null);
    setSearchCode("");
  };

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
          <div className="flex justify-between items-center py-3">
            <span className="text-lg text-gray-900">Subtotal</span>
            <span className="text-lg text-gray-900">
              ${subtotal.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Coupon Section */}
        <div id="coupon-section" className="border-t border-gray-300 pt-4">
          <div className="space-y-3">
            <h4 className="text-lg text-gray-900">Coupon</h4>
            {appliedCouponCode ? (
              <div className="flex items-center justify-between bg-green-50 p-3 rounded-md">
                <div>
                  <p className="text-sm font-medium text-green-800">
                    Coupon Applied: {appliedCouponCode}
                  </p>
                  {coupon && (
                    <p className="text-xs text-green-600">{coupon.name}</p>
                  )}
                </div>
                <button
                  onClick={handleRemoveCoupon}
                  className="text-sm text-red-600 hover:text-red-800 underline"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
                  />
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    disabled={!couponCode.trim() || couponLoading}
                    className="px-4 py-2 bg-black text-white rounded-lg text-sm hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    Apply
                  </button>
                </div>
                {couponError && (
                  <p className="text-sm text-red-600">
                    Invalid or expired coupon code
                  </p>
                )}
                {couponCode && !couponLoading && !coupon && !couponError && (
                  <p className="text-sm text-gray-500">
                    Press Apply to validate coupon
                  </p>
                )}
                {availableCoupons && availableCoupons.length > 0 && (
                  <div className="mt-2">
                    <p className="text-xs text-gray-600 mb-1">Available coupons:</p>
                    <div className="flex flex-wrap gap-1">
                      {availableCoupons
                        .filter(c => c.isActive && !c.isExpired && !c.isDeleted)
                        .slice(0, 3)
                        .map((c) => (
                          <button
                            key={c.id}
                            onClick={() => setCouponCode(c.code)}
                            className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded"
                          >
                            {c.code}
                          </button>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Discount */}
        {discountAmount > 0 && (
          <div className="border-t border-gray-300 pt-4">
            <div className="flex justify-between items-center py-3">
              <span className="text-lg text-green-600">Discount</span>
              <span className="text-lg text-green-600">
                -${discountAmount.toFixed(2)}
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
                <span className="text-lg text-gray-700">Flat Rate ${flatShippingRate.toFixed(2)}</span>
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
              ${total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
