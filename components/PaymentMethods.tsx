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

        {/* Credit/Debit Card */}
        <div className="space-y-2">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="radio"
              name="payment"
              value="card"
              checked={selectedPayment === "card"}
              onChange={() => setSelectedPayment("card")}
              className="text-black focus:ring-black"
            />
            <span className="text-sm font-medium text-gray-900">Pay with Credit Debit card</span>
          </label>
          {selectedPayment === "card" && (
            <p className="text-xs text-gray-600 ml-6">
              You can choose how you'd like to pay after you place your order.
            </p>
          )}
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
          {selectedPayment === "paypal" && (
            <p className="text-xs text-gray-600 ml-6">
              Click the PayPal button below to process your order.
            </p>
          )}
        </div>

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
            </div>
          </label>
          {selectedPayment === "bank-transfer" && (
            <div className="ml-6 text-xs text-gray-600 space-y-1">
              <p><strong>Reference:</strong> 691070</p>
              <p><strong>Account holder:</strong> Buy With Us Pk Ltd</p>
              <p><strong>Swift/BIC:</strong> TRWIGB2LXXX</p>
              <p><strong>IBAN:</strong> GB21 TRWI 2308 0110 0600 47</p>
              <p><strong>Bank name and address:</strong></p>
              <p>Wise Payments Limited 1st Floor, Worship Square, 65 Clifton Street</p>
              <p>London EC2A 4JE</p>
              <p>United Kingdom</p>
            </div>
          )}
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
          {selectedPayment === "cod" && (
            <p className="text-xs text-gray-600 ml-6">
              Pay with cash when your order is delivered. Additional delivery charges may apply.
            </p>
          )}
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
