"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import ScrollableContainer from "./ScrollableContainer";

const videos = [
  { src: "/vid.mp4", id: "vid1" },
  { src: "/vid 1.mp4", id: "vid2" }
];

export default function VideoSection() {
  const [loadingStates, setLoadingStates] = useState<{ [key: string]: boolean }>({
    vid1: true,
    vid2: true
  });

  const handleVideoLoad = (id: string) => {
    setLoadingStates(prev => ({ ...prev, [id]: false }));
  };

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
          {/* Mobile: Horizontal Scrollable */}
          <div className="lg:hidden">
            <ScrollableContainer>
              {videos.map((video) => (
                <div
                  key={video.id}
                  className="flex-shrink-0 w-[calc(100vw-2rem)] rounded-lg overflow-hidden bg-gray-100"
                >
                  <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                    {loadingStates[video.id] && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-200 z-10">
                        <div className="animate-pulse text-gray-400">Loading video...</div>
                      </div>
                    )}
                    <video
                      className="w-full h-full object-cover"
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="metadata"
                      onLoadedData={() => handleVideoLoad(video.id)}
                    >
                      <source src={video.src} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
              ))}
            </ScrollableContainer>
          </div>

          {/* Desktop: One Large Video at a Time with Navigation */}
          <div className="hidden lg:block">
            <ScrollableContainer className="lg:gap-0">
              {videos.map((video) => (
                <div
                  key={video.id}
                  className="flex-shrink-0 w-full rounded-lg overflow-hidden bg-gray-100 shadow-lg snap-center"
                >
                  <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                    {loadingStates[video.id] && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-200 z-10">
                        <div className="animate-pulse text-gray-400">Loading video...</div>
                      </div>
                    )}
                    <video
                      className="w-full h-full object-cover"
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="metadata"
                      onLoadedData={() => handleVideoLoad(video.id)}
                    >
                      <source src={video.src} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
              ))}
            </ScrollableContainer>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

