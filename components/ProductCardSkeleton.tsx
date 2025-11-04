"use client";

import { Card, CardContent } from "./ui/card";

interface ProductCardSkeletonProps {
  view?: "grid" | "list";
}

export default function ProductCardSkeleton({ view = "grid" }: ProductCardSkeletonProps) {
  // List view skeleton
  if (view === "list") {
    return (
      <Card className="border-0 shadow-sm bg-white rounded-lg overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* Image skeleton */}
          <div className="relative w-full lg:w-80 h-64 lg:h-56 bg-gray-200 skeleton-shimmer" />
          
          {/* Content skeleton */}
          <CardContent className="flex-1 p-6 flex flex-col justify-between">
            <div className="space-y-3">
              {/* Title skeleton */}
              <div className="h-7 w-3/4 bg-gray-200 rounded skeleton-shimmer" />
              
              {/* Description skeleton */}
              <div className="space-y-2">
                <div className="h-4 w-full bg-gray-200 rounded skeleton-shimmer" />
                <div className="h-4 w-5/6 bg-gray-200 rounded skeleton-shimmer" />
              </div>
              
              {/* Price skeleton */}
              <div className="h-6 w-24 bg-gray-200 rounded skeleton-shimmer" />
            </div>
            
            {/* Buttons skeleton */}
            <div className="flex items-center gap-3 mt-6">
              <div className="h-10 w-32 bg-gray-200 rounded skeleton-shimmer" />
              <div className="h-12 w-12 bg-gray-200 rounded skeleton-shimmer" />
              <div className="h-12 w-12 bg-gray-200 rounded skeleton-shimmer" />
            </div>
          </CardContent>
        </div>
      </Card>
    );
  }

  // Grid view skeleton (default)
  return (
    <Card className="border-0 shadow-sm bg-gray-50 rounded-lg overflow-hidden">
      {/* Image skeleton */}
      <div className="relative aspect-square bg-gray-200 skeleton-shimmer" />
      
      <CardContent className="p-4 space-y-3">
        {/* Title skeleton */}
        <div className="h-5 w-3/4 bg-gray-200 rounded skeleton-shimmer" />
        
        {/* Price skeleton */}
        <div className="h-5 w-20 bg-gray-200 rounded skeleton-shimmer" />
      </CardContent>
    </Card>
  );
}

