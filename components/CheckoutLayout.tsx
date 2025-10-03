"use client";

import CheckoutForm from "./CheckoutForm";
import OrderSummary from "./OrderSummary";
import PaymentMethods from "./PaymentMethods";

interface CheckoutLayoutProps {
  className?: string;
}

export default function CheckoutLayout({ className = "" }: CheckoutLayoutProps) {
  const handleCheckoutSubmit = (values: any) => {
    console.log("Checkout form submitted:", values);
  };

  const handlePlaceOrder = () => {
    console.log("Place order clicked");
  };

  return (
    <div className={`max-w-7xl mx-auto px-4 py-8 ${className}`}>
      {/* Desktop Layout - 2 Columns */}
      <div className="hidden lg:grid lg:grid-cols-2 lg:gap-8">
        {/* Left Column - Checkout Form */}
        <div className="space-y-8">
          <CheckoutForm onSubmit={handleCheckoutSubmit} />
        </div>

        {/* Right Column - Order Summary & Payment */}
        <div className="space-y-6">
          <OrderSummary />
          <PaymentMethods onPlaceOrder={handlePlaceOrder} />
        </div>
      </div>

      {/* Mobile Layout - Stacked */}
      <div className="lg:hidden space-y-6">
        {/* Checkout Form - Mobile */}
        <CheckoutForm onSubmit={handleCheckoutSubmit} />
        
        {/* Order Summary - Mobile */}
        <OrderSummary />
        
        {/* Payment Methods - Mobile */}
        <PaymentMethods onPlaceOrder={handlePlaceOrder} />
      </div>
    </div>
  );
}
