"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import CheckoutForm, { CheckoutFormRef } from "./CheckoutForm";
import OrderSummary from "./OrderSummary";
import PaymentMethods from "./PaymentMethods";
import { useCartStore } from "../lib/cartStore";
import { useCouponByCode } from "../lib/hooks/useCoupons";
import { createOrder, OrderRequest } from "../lib/orderApi";
import { useToastStore } from "../lib/toastStore";
import { useColors } from "../lib/hooks/useColors";
import { useSizes } from "../lib/hooks/useSizes";
import { useQuantities } from "../lib/hooks/useQuantities";

interface CheckoutLayoutProps {
  className?: string;
}

export default function CheckoutLayout({ className = "" }: CheckoutLayoutProps) {
  const router = useRouter();
  const { items, getSubtotal, appliedCouponCode, clearCart } = useCartStore();
  const { coupon } = useCouponByCode(appliedCouponCode || "");
  const { colors } = useColors();
  const { sizes } = useSizes();
  const { quantities } = useQuantities();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<CheckoutFormRef>(null);

  const subtotal = getSubtotal();
  const isValidCoupon = coupon && coupon.isActive && !coupon.isExpired && !coupon.isDeleted;
  const discountAmount = isValidCoupon && appliedCouponCode ? subtotal * 0.1 : 0;
  const total = subtotal - discountAmount;

  const handlePlaceOrder = async () => {
    if (!formRef.current) {
      useToastStore.getState().show('Form not ready. Please wait...', 'error');
      return;
    }

    // Validate form first
    const isValid = await formRef.current.triggerValidation();
    
    if (!isValid) {
      useToastStore.getState().show('Please fill in all required fields correctly', 'error');
      // Scroll to first error
      const firstError = document.querySelector('.text-red-600');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    // Get form values
    const formData = formRef.current.getValues();

    if (items.length === 0) {
      useToastStore.getState().show('Your cart is empty', 'error');
      return;
    }

    setIsSubmitting(true);

    try {
      // Map cart items to order items
      const orderItems = items.map(item => {
        // Use stored IDs if available, otherwise find by name
        let colorID = item.colorID;
        if (!colorID && item.selectedColor) {
          const color = colors.find(c => c.name === item.selectedColor);
          colorID = color?.id || 0;
        }

        let sizeID = item.sizeID;
        if (!sizeID && item.selectedSize) {
          const size = sizes.find(s => s.name === item.selectedSize);
          sizeID = size?.id || 0;
        }

        let quantityID = item.quantityID;
        if (!quantityID) {
          const quantity = quantities.find(q => q.name === item.selectedQuantityPack) || quantities[0];
          quantityID = quantity?.id || 1;
        }

        // Get product code from item or use product ID as fallback
        const productCode = item.productCode || item.id;

        const unitPrice = parseFloat(item.price.replace('$', ''));

        return {
          productCode,
          productName: item.name,
          quantityID,
          colorID: colorID || 0,
          sizeID: sizeID || 0,
          unitPrice,
        };
      });

      // Build order request
      const orderRequest: OrderRequest = {
        customerName: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        addressLine1: formData.address,
        addressLine2: formData.additionalInfo || undefined,
        city: formData.city,
        state: formData.state,
        postalCode: formData.zipCode,
        country: formData.country,
        discount: discountAmount,
        amount: total,
        items: orderItems,
        createdByUserId: undefined, // Optional, can be set if user is logged in
      };

      const response = await createOrder(orderRequest);

      if (response.success && !Array.isArray(response.data) && response.data.orderNumber) {
        useToastStore.getState().show(`Order placed successfully! Order #${response.data.orderNumber}`, 'success');
        clearCart();
        router.push('/');
      } else {
        const errorMessage = Array.isArray(response.data) 
          ? response.data.join(', ') 
          : response.message || 'Failed to place order';
        useToastStore.getState().show(errorMessage, 'error');
      }
    } catch (error: any) {
      console.error('Order error:', error);
      useToastStore.getState().show(
        error.message || 'Failed to place order. Please try again.',
        'error'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`max-w-7xl mx-auto px-4 py-8 ${className}`}>
      {/* Desktop Layout - 2 Columns */}
      <div className="hidden lg:grid lg:grid-cols-2 lg:gap-8">
        {/* Left Column - Checkout Form */}
        <div className="space-y-8">
          <CheckoutForm ref={formRef} />
        </div>

        {/* Right Column - Order Summary & Payment */}
        <div className="space-y-6">
          <OrderSummary />
          <PaymentMethods onPlaceOrder={handlePlaceOrder} isSubmitting={isSubmitting} />
        </div>
      </div>

      {/* Mobile Layout - Stacked */}
      <div className="lg:hidden space-y-6">
        {/* Checkout Form - Mobile */}
        <CheckoutForm ref={formRef} />
        
        {/* Order Summary - Mobile */}
        <OrderSummary />
        
        {/* Payment Methods - Mobile */}
        <PaymentMethods onPlaceOrder={handlePlaceOrder} isSubmitting={isSubmitting} />
      </div>
    </div>
  );
}
