"use client";

import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { heroImages, heroContent } from "./DemoData";

export default function HeroSection() {
  const images = heroImages;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      className="relative w-full h-[60vh] md:h-[70vh] lg:h-[90vh] overflow-hidden"
      onMouseEnter={() => setCurrentImageIndex(currentImageIndex)}
      onMouseLeave={() => setCurrentImageIndex(currentImageIndex)}
    >
      {/* Image Carousel */}
      <div className="relative w-full h-full">
        {images.map((image, index) => (
          <motion.div
            key={index}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url('${image}')` }}
            initial={{ x: '100%' }}
            animate={{ 
              x: index === currentImageIndex ? '0%' : 
                 index === (currentImageIndex - 1 + images.length) % images.length ? '-100%' : '100%'
            }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          />
        ))}
      </div>
      
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/20"></div>

      {/* Text Overlay Container */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 w-full">
          <div className="max-w-2xl">
            {/* Main Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl lg:text-6xl font-bold text-white mb-4 leading-tight" 
              style={{fontFamily: 'var(--header-font-family)'}}
            >
              {heroContent.title}
              <br />
              <span className="text-white">{heroContent.subtitle}</span>
            </motion.h1>
            
            {/* Description */}
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg lg:text-xl text-white/90 mb-8 leading-relaxed max-w-lg"
            >
              {heroContent.description}
            </motion.p>
            
            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Button 
                size="lg" 
                className="bg-black hover:bg-gray-800 text-white px-8 py-4 text-lg font-medium rounded-lg transition-all duration-300 hover:scale-105"
                style={{fontFamily: 'var(--header-font-family)'}}
              >
                {heroContent.buttonText}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Carousel Indicators */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <div className="flex space-x-2">
          {images.map((_, index) => (
            <div 
              key={index}
              className={`h-1 rounded-full transition-all duration-300 ${
                index === currentImageIndex ? 'w-8 bg-white' : 'w-1 bg-white/50'
              }`}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
