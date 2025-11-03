"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";

const videos = [
  { src: "/vid.mp4", id: "vid1" },
  { src: "/vid 1.mp4", id: "vid2" },
  { src: "/vid4.mp4", id: "vid4" },
  { src: "/vid5.mp4", id: "vid5" },
  { src: "/vid6.mp4", id: "vid6" },
  { src: "/vid7.mp4", id: "vid7" },
  { src: "/vid8.mp4", id: "vid8" },
  { src: "/vid9.mp4", id: "vid9" }
];

export default function VideoSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadingStates, setLoadingStates] = useState<{ [key: string]: boolean }>({
    vid1: true,
    vid2: true,
    vid4: true,
    vid5: true,
    vid6: true,
    vid7: true,
    vid8: true,
    vid9: true
  });
  const videoRef = useRef<HTMLVideoElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleVideoLoad = (id: string) => {
    setLoadingStates(prev => ({ ...prev, [id]: false }));
  };

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % videos.length);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Handle video end event
  const handleVideoEnd = () => {
    goToNext();
  };

  // Timer-based slideshow (7 seconds)
  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      goToNext();
    }, 7000);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [currentIndex, goToNext]);

  // Reset and play video when slide changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {
        // Auto-play was prevented, but video will play when user interacts
      });
    }
  }, [currentIndex]);

  const currentVideo = videos[currentIndex];

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          className="relative w-full"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Video Slideshow Container */}
          <div className="relative w-full rounded-lg overflow-hidden bg-gray-100 shadow-lg">
            <div className="relative w-full aspect-video">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  {loadingStates[currentVideo.id] && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-200 z-10">
                      <div className="animate-pulse text-gray-400">Loading video...</div>
                    </div>
                  )}
                  <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    playsInline
                    preload="metadata"
                    onLoadedData={() => handleVideoLoad(currentVideo.id)}
                    onEnded={handleVideoEnd}
                  >
                    <source src={currentVideo.src} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Buttons */}
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 md:p-3 transition-all duration-200"
                aria-label="Previous video"
              >
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 md:p-3 transition-all duration-200"
                aria-label="Next video"
              >
                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Video Indicators/Dots */}
          <div className="flex justify-center gap-2 mt-4">
            {videos.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex
                    ? "w-8 h-2 bg-black"
                    : "w-2 h-2 bg-gray-400 hover:bg-gray-600"
                }`}
                aria-label={`Go to video ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

