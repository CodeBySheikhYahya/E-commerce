"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductImageGallery({ images, productName }: ProductImageGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const openFullscreen = () => {
    setIsFullscreenOpen(true);
  };

  const closeFullscreen = () => {
    setIsFullscreenOpen(false);
  };

  return (
    <>
      {/* Main Image Gallery */}
      <div className="relative">
        {/* Main Image */}
        <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
          <Image
            src={images[currentImageIndex]}
            alt={`${productName} - Image ${currentImageIndex + 1}`}
            fill
            className="object-cover"
            priority
          />
          
          {/* Navigation Arrows */}
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors duration-200"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors duration-200"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Fullscreen Button */}
          <button
            onClick={openFullscreen}
            className="absolute top-4 right-4 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors duration-200"
          >
            <Maximize2 className="h-4 w-4" />
          </button>

          {/* Image Counter */}
          <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
            {currentImageIndex + 1} / {images.length}
          </div>
        </div>

        {/* Thumbnail Gallery (Mobile) */}
        <div className="lg:hidden mt-4">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors duration-200 ${
                  index === currentImageIndex 
                    ? 'border-black' 
                    : 'border-gray-200 hover:border-gray-400'
                }`}
              >
                <Image
                  src={image}
                  alt={`${productName} thumbnail ${index + 1}`}
                  width={80}
                  height={80}
                  className="object-cover w-full h-full"
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Fullscreen Modal */}
      {isFullscreenOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <div className="relative max-w-7xl max-h-full">
            {/* Close Button */}
            <button
              onClick={closeFullscreen}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/60 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors duration-200"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Fullscreen Image */}
            <div className="relative">
              <Image
                src={images[currentImageIndex]}
                alt={`${productName} - Fullscreen ${currentImageIndex + 1}`}
                width={1200}
                height={800}
                className="object-contain max-h-[80vh] w-auto"
              />
              
              {/* Fullscreen Navigation Arrows */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/60 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors duration-200"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/60 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors duration-200"
              >
                <ChevronRight className="h-6 w-6" />
              </button>

              {/* Fullscreen Image Counter */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded-full text-sm">
                {currentImageIndex + 1} / {images.length}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

