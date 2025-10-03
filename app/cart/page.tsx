"use client";

import { useRouter } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import MobileBottomNav from "../../components/MobileBottomNav";
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
      <Header />
      <main className="min-h-screen pb-20 lg:pb-0 pt-[var(--mobile-header-height)] lg:pt-[calc(var(--desktop-top-bar-height)+var(--desktop-header-height))]">
        <CartPage
          onCheckout={handleCheckout}
          onContinueShopping={handleContinueShopping}
        />
        <RelatedProducts />
        <NewsletterSection />
      </main>
      <Footer />
      <MobileBottomNav />
    </>
  );
}
