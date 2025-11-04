"use client";

import { Card, CardContent } from "./ui/card";

export default function CategoryCardSkeleton() {
  return (
    <Card className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
      {/* Image skeleton */}
      <div className="relative aspect-square bg-gray-200 skeleton-shimmer" />
      
      <CardContent className="p-4 text-center">
        {/* Title skeleton */}
        <div className="h-6 w-3/4 bg-gray-200 rounded mx-auto skeleton-shimmer" />
      </CardContent>
    </Card>
  );
}

