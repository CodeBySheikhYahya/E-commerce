"use client";

import Image from "next/image";
import { Card, CardContent } from "./ui/card";

interface CategoryCardProps {
  id: string;
  name: string;
  image: string;
  href: string;
}

export default function CategoryCard({ id, name, image, href }: CategoryCardProps) {
  return (
    <Card className="group relative overflow-hidden border-0 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
      </div>
      
      <CardContent className="p-4 text-center">
        <h3 className="font-medium text-gray-900 group-hover:text-gray-700 transition-colors duration-300" style={{fontFamily: 'var(--header-font-family)'}}>
          {name}
        </h3>
      </CardContent>
    </Card>
  );
}

