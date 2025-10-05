"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import { ArrowUpRight, Check } from "lucide-react";
import Link from "next/link";

export default function BeInspiredSection() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image Section */}
          <div className="relative">
            <div className="relative h-[400px] lg:h-[500px] rounded-lg overflow-hidden">
              <Image
                src="/inspired.png"
                alt="Safety equipment inspiration"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Content Section */}
          <div className="space-y-6">
            {/* Heading */}
            <h2 className="section-heading text-left">
              Be Inspired...
            </h2>
            
            {/* Description */}
            <p className="text-gray-600 text-lg leading-relaxed">
              Are you planning on upgrading your safety equipment or freshening up your workplace protection? Find premium safety gear to create a brand-new secure environment in no time, or discover your next level of protection for a complete safety refresh...
            </p>

            {/* Features List */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                <span className="text-gray-700">Effortless browsing experience</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                <span className="text-gray-700">Access to the finest 5% of safety equipment for your workplace</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                <span className="text-gray-700">Secure payment options for peace of mind</span>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <Button asChild size="lg" className="bg-black hover:bg-gray-800 text-white px-12 py-4 rounded-full font-medium transition-colors duration-300" style={{fontFamily: 'var(--header-font-family)'}}>
                <Link href="/products">
                  Shop Safety Products
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
