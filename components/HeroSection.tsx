"use client";

import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { heroContent } from "./DemoData";
import { useRouter } from "next/navigation";

export default function HeroSection() {
  const router = useRouter();

  return (
    <section className="relative w-full overflow-hidden">
      {/* Background image */}
      <div className="relative h-[60vh] md:h-[70vh] lg:h-[90vh]">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('/herooo.png')` }} />
        {/* Soft vignette to avoid hard edges on all sides */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/10" />
        {/* Left panel for text readability */}
        <div className="absolute inset-y-0 left-0 w-full lg:w-1/2 bg-gradient-to-r from-black/65 via-black/35 to-transparent" />

        {/* Content */}
        <div className="absolute inset-0 z-10 flex items-center">
          <div className="max-w-7xl mx-auto px-4 w-full">
            <div className="max-w-2xl">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.6 }}
                transition={{ duration: 0.7 }}
                className="text-white text-4xl lg:text-8xl font-light leading-tight"
              >
                {heroContent.title}
                <br />
                <span className="text-white/95">{heroContent.subtitle}</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.6 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="mt-4 text-white/95 text-lg lg:text-2xl max-w-xl"
              >
                {heroContent.description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.6 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="mt-8"
              >
                 <Button 
                   size="lg" 
                   className="bg-white text-black hover:bg-white/20 px-10 py-5 rounded-lg shadow-xl transition-all duration-300"
                   onClick={() => router.push('/products')}
                 >
                   {heroContent.buttonText}
                   <ArrowRight className="ml-2 h-5 w-5" />
                 </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
