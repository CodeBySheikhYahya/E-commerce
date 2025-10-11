"use client";

import { useRouter } from "next/navigation";
import CartPage from "../../components/CartPage";
import NewsletterSection from "../../components/NewsletterSection";
import RelatedProducts from "../../components/RelatedProducts";
import { useCartStore } from "../../lib/cartStore";

export default function Cart() {
  const router = useRouter();
  
  const handleCheckout = () => {
    router.push('/checkout');
  };

  const handleContinueShopping = () => {
    // Navigate back to products
    window.history.back();
  };

  return (
    <>
      <CartPage
        onCheckout={handleCheckout}
        onContinueShopping={handleContinueShopping}
      />
      <RelatedProducts />
      <NewsletterSection />
    </>
  );
}
