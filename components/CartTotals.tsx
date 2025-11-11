"use client";

import { useState, useMemo, useEffect } from "react";
import { Button } from "./ui/button";
import { useCouponByCode } from "../lib/hooks/useCoupons";
import { useCoupons } from "../lib/hooks/useCoupons";
import { useCartStore } from "../lib/cartStore";
import { formatPrice } from "../lib/currencyUtils";

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
  const [couponCode, setCouponCode] = useState("");
  const [searchCode, setSearchCode] = useState("");
  
  const appliedCouponCode = useCartStore((state) => state.appliedCouponCode);
  const setAppliedCoupon = useCartStore((state) => state.setAppliedCoupon);
  
  const { coupon, isLoading: couponLoading, error: couponError } = useCouponByCode(searchCode || appliedCouponCode || "");
  const { coupons: availableCoupons } = useCoupons();
  
  const freeShippingThreshold = 500;
  const flatShippingRate = 10;
  
  const calculatedShipping = selectedShipping === "free" ? 0 : flatShippingRate;
  
  // Check if coupon is valid and active
  const isValidCoupon = coupon && coupon.isActive && !coupon.isExpired && !coupon.isDeleted;
  const discountAmount = isValidCoupon && appliedCouponCode ? subtotal * 0.1 : 0; // 10% discount example
  
  const total = useMemo(() => {
    const shippingCost = selectedShipping === "free" ? 0 : flatShippingRate;
    return subtotal + shippingCost + tax - discountAmount;
  }, [subtotal, selectedShipping, tax, discountAmount]);

  // Load stored coupon on mount
  useEffect(() => {
    if (appliedCouponCode && !searchCode) {
      setSearchCode(appliedCouponCode);
      setCouponCode(appliedCouponCode);
    }
  }, [appliedCouponCode]);

  // Auto-apply coupon when it's validated and valid
  useEffect(() => {
    if (coupon && isValidCoupon && searchCode && !appliedCouponCode) {
      setAppliedCoupon(searchCode);
      setCouponCode(searchCode);
    }
  }, [coupon, isValidCoupon, searchCode, appliedCouponCode, setAppliedCoupon]);

  const handleApplyCoupon = () => {
    if (couponCode.trim()) {
      setSearchCode(couponCode.trim().toUpperCase());
    }
  };

  const handleRemoveCoupon = () => {
    setCouponCode("");
    setAppliedCoupon(null);
    setSearchCode("");
  };

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
          {formatPrice(subtotal)}
        </span>
      </div>

      {/* Coupon Section */}
      <div className="mb-4 pb-4 border-b border-gray-200">
        <h4 className="text-gray-900 text-base mb-3">Coupon</h4>
        {appliedCouponCode ? (
          <div className="flex items-center justify-between bg-green-50 p-2 rounded-md">
            <div>
              <p className="text-xs font-medium text-green-800">
                {appliedCouponCode}
              </p>
              {coupon && (
                <p className="text-xs text-green-600">{coupon.name}</p>
              )}
            </div>
            <button
              onClick={handleRemoveCoupon}
              className="text-xs text-red-600 hover:text-red-800 underline"
            >
              Remove
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Coupon code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                className="flex-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
              />
              <button
                type="button"
                onClick={handleApplyCoupon}
                disabled={!couponCode.trim() || couponLoading}
                className="px-3 py-2 bg-black text-white rounded-md text-sm hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed whitespace-nowrap"
              >
                Apply
              </button>
            </div>
            {couponError && (
              <p className="text-xs text-red-600">
                Invalid or expired coupon
              </p>
            )}
            {availableCoupons && availableCoupons.length > 0 && (
              <div className="mt-2">
                <p className="text-xs text-gray-600 mb-1">Available:</p>
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

      {/* Discount */}
      {discountAmount > 0 && (
        <div className="pb-4 mb-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <span className="text-base text-green-600">Discount</span>
            <span className="text-base text-green-600">
              -{formatPrice(discountAmount)}
            </span>
          </div>
        </div>
      )}

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
            <span className="text-gray-900 text-base">Flat Rate {formatPrice(flatShippingRate)}</span>
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
          {formatPrice(total)}
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
