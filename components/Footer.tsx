"use client";

import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[var(--header-bg)] border-t border-[var(--header-border)]">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Brand Section - Left */}
          <div className="lg:col-span-1 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start mb-4">
              <Image
                src="/logo.png"
                alt="BuyWithUsPK"
                width={120}
                height={40}
                className="h-8 w-auto"
              />
            </div>
            <p className="text-[var(--header-text-muted)] text-sm leading-relaxed">
              BuyWithUsPK provides you with the essential pieces to build a stunning online store for your industrial safety products business. We deliver quality safety equipment across the UK.
            </p>
          </div>

          {/* Footer Sections - Right */}
          <div className="lg:col-span-4">
            <div className="flex flex-col lg:flex-row lg:justify-start gap-6 lg:gap-0">
              
              {/* Navigate Section */}
              <div className="lg:w-1/4 lg:pr-8">
                <h3 className="text-[var(--header-text)] font-medium mb-4" style={{fontFamily: 'var(--header-font-family)'}}>
                  Navigate
                </h3>
                <ul className="space-y-3">
                  <li><a href="/" className="text-[var(--header-text-muted)] hover:text-[var(--header-text)] transition-colors text-sm">Home</a></li>
                  <li><a href="/shop" className="text-[var(--header-text-muted)] hover:text-[var(--header-text)] transition-colors text-sm">Shop</a></li>
                  <li><a href="/contact" className="text-[var(--header-text-muted)] hover:text-[var(--header-text)] transition-colors text-sm">Contact Us</a></li>
                  <li><a href="/about" className="text-[var(--header-text-muted)] hover:text-[var(--header-text)] transition-colors text-sm">About</a></li>
                </ul>
              </div>

              {/* Policies Section */}
              <div className="lg:w-1/4 lg:pr-8">
                <h3 className="text-[var(--header-text)] font-medium mb-4" style={{fontFamily: 'var(--header-font-family)'}}>
                  Policies
                </h3>
                <ul className="space-y-3">
                  <li><a href="/refund-policy" className="text-[var(--header-text-muted)] hover:text-[var(--header-text)] transition-colors text-sm">Refund Policy</a></li>
                  <li><a href="/shipment-policy" className="text-[var(--header-text-muted)] hover:text-[var(--header-text)] transition-colors text-sm">Shipment Policy</a></li>
                  <li><a href="/faqs" className="text-[var(--header-text-muted)] hover:text-[var(--header-text)] transition-colors text-sm">FAQs</a></li>
                </ul>
              </div>

              {/* Quick Links Section */}
              <div className="lg:w-1/4 lg:pr-8">
                <h3 className="text-[var(--header-text)] font-medium mb-4" style={{fontFamily: 'var(--header-font-family)'}}>
                  Quick Links
                </h3>
                <ul className="space-y-3">
                  <li><a href="/category/safety-vests" className="text-[var(--header-text-muted)] hover:text-[var(--header-text)] transition-colors text-sm">Safety Vests</a></li>
                  <li><a href="/category/safety-helmets" className="text-[var(--header-text-muted)] hover:text-[var(--header-text)] transition-colors text-sm">Safety Helmets</a></li>
                  <li><a href="/category/goggles" className="text-[var(--header-text-muted)] hover:text-[var(--header-text)] transition-colors text-sm">Goggles</a></li>
                </ul>
              </div>

              {/* Social Media Section */}
              <div className="lg:w-1/4">
                <h3 className="text-[var(--header-text)] font-medium mb-4" style={{fontFamily: 'var(--header-font-family)'}}>
                  Social Media Presence
                </h3>
                <ul className="space-y-3">
                  <li><a href="https://instagram.com/buywithuspk" className="text-[var(--header-text-muted)] hover:text-[var(--header-text)] transition-colors text-sm">Instagram</a></li>
                  <li><a href="https://facebook.com/buywithuspk" className="text-[var(--header-text-muted)] hover:text-[var(--header-text)] transition-colors text-sm">Facebook</a></li>
                  <li><a href="https://wa.me/447946252194" className="text-[var(--header-text-muted)] hover:text-[var(--header-text)] transition-colors text-sm">WhatsApp</a></li>
                  <li><a href="mailto:Javeria.aman@buywithuspkltd.co.uk" className="text-[var(--header-text-muted)] hover:text-[var(--header-text)] transition-colors text-sm">Email</a></li>
                </ul>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-[var(--header-border)] bg-[var(--header-bg)]">
        <div className="max-w-7xl mx-auto px-4 py-4 lg:py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 lg:gap-4">
            
            {/* Copyright */}
            <div className="text-[var(--header-text-muted)] text-xs lg:text-sm text-center md:text-left">
              © 2025, All Rights Reserved by BuyWithUsPK. Powered by The Brand Hut
            </div>


          </div>
        </div>
      </div>
    </footer>
  );
}

