"use client";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import NewsletterSection from "../../components/NewsletterSection";
import MobileBottomNav from "../../components/MobileBottomNav";
import WishlistContent from "../../components/WishlistContent";

export default function WishlistPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-[var(--mobile-header-height)] lg:pt-[calc(var(--desktop-top-bar-height)+var(--desktop-header-height))]">
        <WishlistContent />
        <NewsletterSection />
      </main>
      <Footer />
      <MobileBottomNav />
    </>
  );
}