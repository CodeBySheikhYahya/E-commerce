"use client";

import { useState } from "react";
import { Button } from "./ui/button";

interface PaymentMethodsProps {
  onPlaceOrder?: () => void;
  className?: string;
}

export default function PaymentMethods({ onPlaceOrder, className = "" }: PaymentMethodsProps) {
  const [selectedPayment, setSelectedPayment] = useState<string>("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const handlePlaceOrder = () => {
    if (onPlaceOrder) {
      onPlaceOrder();
    } else {
      console.log("Place order clicked");
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Payment Methods */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-gray-900" style={{fontFamily: 'var(--header-font-family)'}}>
          Payment Methods
        </h4>

        {/* Direct Bank Transfer */}
        <div className="space-y-2">
          <label className="flex items-start space-x-3 cursor-pointer">
            <input
              type="radio"
              name="payment"
              value="bank-transfer"
              checked={selectedPayment === "bank-transfer"}
              onChange={() => setSelectedPayment("bank-transfer")}
              className="mt-1 text-black focus:ring-black"
            />
            <div className="flex-1">
              <span className="text-sm font-medium text-gray-900">Direct bank transfer</span>
              <p className="text-xs text-gray-600 mt-1">
                Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.
              </p>
            </div>
          </label>
        </div>

        {/* Check Payments */}
        <div className="space-y-2">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="radio"
              name="payment"
              value="check"
              checked={selectedPayment === "check"}
              onChange={() => setSelectedPayment("check")}
              className="text-black focus:ring-black"
            />
            <span className="text-sm font-medium text-gray-900">Check payments</span>
          </label>
        </div>

        {/* Cash on Delivery */}
        <div className="space-y-2">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="radio"
              name="payment"
              value="cod"
              checked={selectedPayment === "cod"}
              onChange={() => setSelectedPayment("cod")}
              className="text-black focus:ring-black"
            />
            <span className="text-sm font-medium text-gray-900">Cash on delivery</span>
          </label>
        </div>

        {/* PayPal */}
        <div className="space-y-2">
          <label className="flex items-start space-x-3 cursor-pointer">
            <input
              type="radio"
              name="payment"
              value="paypal"
              checked={selectedPayment === "paypal"}
              onChange={() => setSelectedPayment("paypal")}
              className="mt-1 text-black focus:ring-black"
            />
            <div className="flex-1">
              <span className="text-sm font-medium text-gray-900">PayPal</span>
              <div className="flex items-center space-x-2 mt-2">
                <div className="flex space-x-1">
                  <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">V</div>
                  <div className="w-8 h-5 bg-red-600 rounded text-white text-xs flex items-center justify-center font-bold">M</div>
                  <div className="w-8 h-5 bg-blue-500 rounded text-white text-xs flex items-center justify-center font-bold">A</div>
                  <div className="w-8 h-5 bg-orange-500 rounded text-white text-xs flex items-center justify-center font-bold">D</div>
                </div>
                <a href="#" className="text-xs text-blue-600 hover:text-blue-800 underline">
                  What is paypal?
                </a>
              </div>
            </div>
          </label>
        </div>
      </div>

      {/* Terms and Conditions */}
      <div className="space-y-4">
        <label className="flex items-start space-x-3 cursor-pointer">
          <input
            type="checkbox"
            checked={agreeToTerms}
            onChange={(e) => setAgreeToTerms(e.target.checked)}
            className="mt-1 rounded border-gray-300 text-black focus:ring-black"
          />
          <span className="text-sm text-gray-700">
            I have read and agree to the website{" "}
            <a href="#" className="text-blue-600 hover:text-blue-800 underline">
              terms and conditions
            </a>
          </span>
        </label>
      </div>

      {/* Place Order Button */}
      <Button
        onClick={handlePlaceOrder}
        disabled={!selectedPayment || !agreeToTerms}
        className="w-full bg-black hover:bg-gray-800 text-white py-3 text-lg font-medium"
        style={{fontFamily: 'var(--header-font-family)'}}
      >
        Place Order
      </Button>
    </div>
  );
}
