"use client";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import NewsletterSection from "../../components/NewsletterSection";
import MobileBottomNav from "../../components/MobileBottomNav";
import WishlistContent from "../../components/WishlistContent";
import WishlistHeroSection from "../../components/WishlistHeroSection";

export default function WishlistPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <WishlistHeroSection />
        <WishlistContent />
        <NewsletterSection />
      </main>
      <Footer />
      <MobileBottomNav />
    </>
  );
}