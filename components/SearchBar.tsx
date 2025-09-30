"use client";

import { useState, FormEvent } from "react";
import { Search } from "lucide-react";
import { Button } from "./ui/button";

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  className?: string;
}

export default function SearchBar({
  placeholder = "Search products",
  value,
  onChange,
  onSubmit,
  className
}: SearchBarProps) {
  const [internalValue, setInternalValue] = useState("");
  const currentValue = value !== undefined ? value : internalValue;

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSubmit?.(currentValue.trim());
  }

  function handleChange(next: string) {
    if (onChange) onChange(next);
    else setInternalValue(next);
  }

  return (
    <form onSubmit={handleSubmit} className={`w-full ${className ?? ""}`} role="search">
      <div className="relative">
        <input
          type="search"
          className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-4 pr-12 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black/60 focus:border-black/60"
          placeholder={placeholder}
          value={currentValue}
          onChange={(e) => handleChange(e.target.value)}
          aria-label="Search"
        />
        <Button
          type="submit"
          size="sm"
          className="absolute right-1.5 top-1/2 -translate-y-1/2 px-3"
        >
          <Search className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
}


