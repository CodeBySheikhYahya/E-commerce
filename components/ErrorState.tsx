"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

interface ErrorStateProps {
  onRetry?: () => void;
  className?: string;
}

export default function ErrorState({ onRetry, className = "" }: ErrorStateProps) {
  const router = useRouter();

  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      window.location.reload();
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center py-12 px-4 text-center ${className}`}>
      {/* Error Icon */}
      <div className="mb-6">
        <svg
          className="w-20 h-20 sm:w-24 sm:h-24 text-gray-400 mx-auto"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>

      {/* Heading */}
      <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-3" style={{fontFamily: 'var(--header-font-family)'}}>
        Something went wrong
      </h2>

      {/* Message */}
      <p className="text-gray-600 text-base sm:text-lg mb-8 max-w-md">
        We're experiencing technical difficulties. Please try again in a moment. If the problem persists, contact support.
      </p>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          onClick={handleRetry}
          className="px-6 py-3 bg-black text-white hover:bg-gray-800 rounded-md font-medium transition-colors"
        >
          Try Again
        </Button>
        <Button
          onClick={() => router.push('/')}
          variant="outline"
          className="px-6 py-3 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-md font-medium transition-colors"
        >
          Go to Homepage
        </Button>
      </div>
    </div>
  );
}

