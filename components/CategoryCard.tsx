"use client";

import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { motion } from "framer-motion";

interface SubCategory {
  id: number;
  name: string;
  fullName: string;
}

interface CategoryCardProps {
  id: string;
  name: string;
  image: string;
  href: string;
  subcategories?: SubCategory[];
}

export default function CategoryCard({ id, name, image, href, subcategories = [] }: CategoryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
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
        <h3 className="text-xl font-medium text-gray-800 transition-colors duration-300" style={{fontFamily: 'var(--header-font-family)'}}>
          {name}
        </h3>
        {subcategories.length > 0 && (
          <div className="mt-2 pt-2 border-t border-gray-200">
            <div className="flex flex-wrap gap-1 justify-center">
              {subcategories.slice(0, 3).map((sub) => (
                <span
                  key={sub.id}
                  className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full"
                >
                  {sub.name || sub.fullName}
                </span>
              ))}
              {subcategories.length > 3 && (
                <span className="text-xs text-gray-500">+{subcategories.length - 3}</span>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
    </motion.div>
  );
}

