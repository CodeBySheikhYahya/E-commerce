"use client";

import Image from "next/image";

export default function WishlistHeroSection() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Background image */}
      <div className="relative h-[40vh] md:h-[50vh] lg:h-[60vh]">
        {/* Mobile Image */}
        <Image
          src="/sm.jpeg"
          alt="Wishlist Hero"
          fill
          className="object-cover md:hidden"
          priority
        />
        {/* Desktop Image */}
        <Image
          src="/md.jpg"
          alt="Wishlist Hero"
          fill
          className="object-cover hidden md:block"
          priority
        />
        {/* Soft vignette to avoid hard edges on all sides */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/10" />
        {/* Left panel for text readability */}
        <div className="absolute inset-y-0 left-0 w-full lg:w-1/2 bg-gradient-to-r from-black/65 via-black/35 to-transparent" />

      </div>
    </section>
  );
}
