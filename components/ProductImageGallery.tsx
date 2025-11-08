"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductImageGallery({ images, productName }: ProductImageGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);

  // Helper function to validate image src
  const isValidImageSrc = (src: string | undefined | null): boolean => {
    return !!src && typeof src === 'string' && src.trim() !== "" && src !== "/";
  };

  // Filter out empty or invalid images
  const validImages = images.filter(img => isValidImageSrc(img));
  
  // Ensure we have at least one image
  const displayImages = validImages.length > 0 ? validImages : ['/sa.webp'];
  
  // Reset index if current index is out of bounds or images changed
  useEffect(() => {
    if (currentImageIndex >= displayImages.length) {
      setCurrentImageIndex(0);
    }
  }, [displayImages.length, currentImageIndex]);
  
  const safeIndex = currentImageIndex >= displayImages.length ? 0 : currentImageIndex;
  const currentImageSrc = displayImages[safeIndex];
  const hasValidImage = isValidImageSrc(currentImageSrc);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % displayImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + displayImages.length) % displayImages.length);
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
          {hasValidImage ? (
            <Image
              src={currentImageSrc!}
              alt={`${productName} - Image ${safeIndex + 1}`}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
              No Image Available
            </div>
          )}
          
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
            {safeIndex + 1} / {displayImages.length}
          </div>
        </div>

        {/* Thumbnail Gallery (Mobile) */}
        <div className="lg:hidden mt-4">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {displayImages.map((image, index) => {
              // Use image path + index as unique key, fallback to index if image is same
              const uniqueKey = `${image}-${index}`;
              return (
                <button
                  key={uniqueKey}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors duration-200 ${
                    index === safeIndex 
                      ? 'border-black' 
                      : 'border-gray-200 hover:border-gray-400'
                  }`}
                >
                  {isValidImageSrc(image) ? (
                    <Image
                      src={image}
                      alt={`${productName} thumbnail ${index + 1}`}
                      width={80}
                      height={80}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-xs text-gray-400">
                      No Image
                    </div>
                  )}
                </button>
              );
            })}
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
              {hasValidImage ? (
                <Image
                  src={currentImageSrc!}
                  alt={`${productName} - Fullscreen ${safeIndex + 1}`}
                  width={1200}
                  height={800}
                  className="object-contain max-h-[80vh] w-auto"
                />
              ) : (
                <div className="w-full h-full bg-gray-800 flex items-center justify-center text-white">
                  No Image Available
                </div>
              )}
              
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
                {safeIndex + 1} / {displayImages.length}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

