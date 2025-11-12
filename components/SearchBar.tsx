"use client";

import React, { useState, FormEvent, useEffect, useRef } from "react";
import { Search, Loader2, AlertCircle, WifiOff } from "lucide-react";
import { Button } from "./ui/button";
import { useProductSearch, ProductSearchItem } from "../lib/hooks/useProductSearch";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  onProductSelect?: () => void;
  className?: string;
}

// Debounce hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Highlight matching text function
function highlightText(text: string, searchTerm: string): React.ReactElement {
  if (!searchTerm.trim()) {
    return <span>{text}</span>;
  }

  const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  const parts = text.split(regex);

  return (
    <span>
      {parts.map((part, index) =>
        regex.test(part) ? (
          <mark key={index} className="bg-yellow-200 font-medium px-0.5 rounded">
            {part}
          </mark>
        ) : (
          <span key={index}>{part}</span>
        )
      )}
    </span>
  );
}

// Check if error is network error
function isNetworkError(error: Error | null): boolean {
  if (!error) return false;
  const message = error.message.toLowerCase();
  return message.includes('network') || 
         message.includes('fetch') || 
         message.includes('timeout') ||
         message.includes('failed to fetch');
}

// Check if error is 403 or 500
function isServerError(error: Error | null): boolean {
  if (!error) return false;
  const message = error.message.toLowerCase();
  return message.includes('403') || 
         message.includes('500') ||
         message.includes('forbidden') ||
         message.includes('server error');
}

export default function SearchBar({
  placeholder = "Search products",
  value,
  onChange,
  onSubmit,
  onProductSelect,
  className
}: SearchBarProps) {
  const [internalValue, setInternalValue] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  
  const currentValue = value !== undefined ? value : internalValue;
  const debouncedSearchTerm = useDebounce(currentValue.trim(), 400);
  
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Fetch search results
  const { results, isLoading, error, refetch } = useProductSearch(debouncedSearchTerm);

  // Show dropdown when there's input and results/error
  useEffect(() => {
    if (currentValue.trim().length > 0 && (results.length > 0 || isLoading || error)) {
      setIsDropdownOpen(true);
    } else if (currentValue.trim().length === 0) {
      setIsDropdownOpen(false);
    }
  }, [currentValue, results.length, isLoading, error]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
        setSelectedIndex(-1);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (selectedIndex >= 0 && results[selectedIndex]) {
      handleSelectProduct(results[selectedIndex]);
    } else {
      onSubmit?.(currentValue.trim());
      setIsDropdownOpen(false);
    }
  }

  function handleChange(next: string) {
    if (onChange) onChange(next);
    else setInternalValue(next);
    setSelectedIndex(-1);
  }

  function handleSelectProduct(product: ProductSearchItem) {
    router.push(`/products/${product.id}`);
    setIsDropdownOpen(false);
    setSelectedIndex(-1);
    if (onChange) onChange("");
    else setInternalValue("");
    onProductSelect?.(); // Close parent modal if callback provided
  }

  // Retry function for error states
  const handleRetryClick = () => {
    refetch().catch(() => {
      // Error handling is done by the query
    });
  };

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!isDropdownOpen || results.length === 0) {
      if (e.key === "Escape") {
        setIsDropdownOpen(false);
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) => 
          prev < results.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0 && results[selectedIndex]) {
          handleSelectProduct(results[selectedIndex]);
        } else {
          onSubmit?.(currentValue.trim());
          setIsDropdownOpen(false);
        }
        break;
      case "Escape":
        setIsDropdownOpen(false);
        setSelectedIndex(-1);
        break;
    }
  }

  const displayResults = results.slice(0, 8); // Limit to 8 results

  return (
    <div className={`relative w-full ${className ?? ""}`}>
      <form onSubmit={handleSubmit} role="search">
        <div className="relative">
          <input
            ref={inputRef}
            type="search"
            className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-4 pr-12 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black/60 focus:border-black/60"
            placeholder={placeholder}
            value={currentValue}
            onChange={(e) => handleChange(e.target.value)}
            onFocus={() => {
              if (currentValue.trim().length > 0 && (results.length > 0 || isLoading || error)) {
                setIsDropdownOpen(true);
              }
            }}
            onKeyDown={handleKeyDown}
            aria-label="Search"
            aria-expanded={isDropdownOpen}
            aria-haspopup="listbox"
          />
          <Button
            type="submit"
            size="sm"
            className="absolute right-1.5 top-1/2 -translate-y-1/2 px-3"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Search className="h-4 w-4" />
            )}
          </Button>
        </div>
      </form>

      {/* Dropdown */}
      {isDropdownOpen && (
        <div
          ref={dropdownRef}
          className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-96 overflow-y-auto"
          role="listbox"
        >
          {isLoading && (
            <div className="p-4 text-center text-gray-500">
              <Loader2 className="h-5 w-5 animate-spin mx-auto mb-2" />
              <p className="text-sm">Searching...</p>
            </div>
          )}

          {!isLoading && error && (
            <div className="p-4">
              {isServerError(error) ? (
                <div className="text-center">
                  <AlertCircle className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-900 mb-1">
                    Unable to search right now
                  </p>
                  <p className="text-xs text-gray-600 mb-3">
                    Please try again later.
                  </p>
                  <Button
                    onClick={handleRetryClick}
                    size="sm"
                    variant="outline"
                    className="text-xs"
                  >
                    Retry
                  </Button>
                </div>
              ) : isNetworkError(error) ? (
                <div className="text-center">
                  <WifiOff className="h-8 w-8 text-red-500 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-900 mb-1">
                    Connection issue
                  </p>
                  <p className="text-xs text-gray-600 mb-3">
                    Check your internet and try again.
                  </p>
                  <Button
                    onClick={handleRetryClick}
                    size="sm"
                    variant="outline"
                    className="text-xs"
                  >
                    Retry
                  </Button>
                </div>
              ) : (
                <div className="text-center">
                  <AlertCircle className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">
                    Something went wrong. Please try again.
                  </p>
                  <Button
                    onClick={handleRetryClick}
                    size="sm"
                    variant="outline"
                    className="text-xs mt-2"
                  >
                    Retry
                  </Button>
                </div>
              )}
            </div>
          )}

          {!isLoading && !error && displayResults.length === 0 && currentValue.trim().length > 0 && (
            <div className="p-4 text-center text-gray-500">
              <Search className="h-6 w-6 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No products found</p>
              <p className="text-xs text-gray-400 mt-1">Try different keywords</p>
            </div>
          )}

          {!isLoading && !error && displayResults.length > 0 && (
            <div className="py-2">
              {displayResults.map((product, index) => (
                <button
                  key={product.id}
                  type="button"
                  onClick={() => handleSelectProduct(product)}
                  className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors text-left ${
                    selectedIndex === index ? "bg-gray-50" : ""
                  }`}
                  role="option"
                  aria-selected={selectedIndex === index}
                >
                  {/* Product Image */}
                  <div className="flex-shrink-0 w-12 h-12 relative bg-gray-100 rounded overflow-hidden">
                    <Image
                      src="/sa.webp"
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 mb-0.5">
                      {highlightText(product.fullName || product.name, currentValue.trim())}
                    </div>
                    <div className="text-xs text-gray-500">
                      Code: {product.code}
                    </div>
                  </div>

                  {/* Arrow Icon */}
                  <div className="flex-shrink-0">
                    <svg
                      className="w-4 h-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
