"use client";

import NewsletterSection from "../../components/NewsletterSection";
import WishlistContent from "../../components/WishlistContent";
import WishlistHeroSection from "../../components/WishlistHeroSection";

export default function WishlistPage() {
  return (
    <>
      <WishlistHeroSection />
      <WishlistContent />
      <NewsletterSection />
    </>
  );
}