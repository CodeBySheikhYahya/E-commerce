"use client";

import Image from "next/image";
import { UserPlus } from "lucide-react";
import CtaPillButton from "./ui/cta-pill-button";

export default function SafetyGallery() {
  return (
    <section className="pt-0 pb-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header with Title and Follow Button */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <h2 className="section-heading mb-4 lg:mb-0">
            Safety Gallery
          </h2>
          
           <CtaPillButton className="px-7 py-3 text-sm lg:px-7 lg:text-base h-11 lg:h-12 flex items-center gap-2 self-start lg:self-auto" style={{fontFamily: 'var(--header-font-family)'}}>
             <UserPlus className="h-4 w-4" />
             Follow
           </CtaPillButton>
        </div>

        {/* Image Grid - 2x2 on mobile, 4x1 on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {/* Image 1 */}
          <div className="relative aspect-square overflow-hidden rounded-lg">
            <Image
              src="/safe.png"
              alt="Safety equipment in action"
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Image 2 */}
          <div className="relative aspect-square overflow-hidden rounded-lg">
            <Image
              src="/saftey.png"
              alt="Workplace safety gear"
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Image 3 */}
          <div className="relative aspect-square overflow-hidden rounded-lg">
            <Image
              src="/saftey1.png"
              alt="Industrial safety equipment"
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Image 4 */}
          <div className="relative aspect-square overflow-hidden rounded-lg">
            <Image
              src="/safty gloves.png"
              alt="Safety gloves and protection"
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
