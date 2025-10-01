"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface SortDropdownProps {
  currentSort: string;
  onSortChange: (sort: string) => void;
  className?: string;
}

const sortOptions = [
  { value: "default", label: "Default sorting" },
  { value: "popularity", label: "Sort by popularity" },
  { value: "rating", label: "Sort by average rating" },
  { value: "latest", label: "Sort by latest" },
  { value: "price-low", label: "Sort by price: low to high" },
  { value: "price-high", label: "Sort by price: high to low" }
];

export default function SortDropdown({ 
  currentSort, 
  onSortChange, 
  className = "" 
}: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = sortOptions.find(option => option.value === currentSort);

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50 transition-colors duration-200 min-w-[200px]"
      >
        <span className="text-sm text-gray-700">
          {selectedOption?.label || "Default sorting"}
        </span>
        <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${
          isOpen ? "rotate-180" : ""
        }`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onSortChange(option.value);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors duration-200 ${
                currentSort === option.value ? "bg-gray-100 text-black" : "text-gray-700"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
