"use client";

import { Grid3X3, List } from "lucide-react";

interface ViewToggleProps {
  currentView: "grid" | "list";
  onViewChange: (view: "grid" | "list") => void;
  className?: string;
}

export default function ViewToggle({ 
  currentView, 
  onViewChange, 
  className = "" 
}: ViewToggleProps) {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <button
        onClick={() => onViewChange("grid")}
        className={`p-2 rounded-md transition-colors duration-200 ${
          currentView === "grid" 
            ? "bg-black text-white" 
            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
        }`}
        aria-label="Grid view"
      >
        <Grid3X3 className="h-4 w-4" />
      </button>
      
      <button
        onClick={() => onViewChange("list")}
        className={`p-2 rounded-md transition-colors duration-200 ${
          currentView === "list" 
            ? "bg-black text-white" 
            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
        }`}
        aria-label="List view"
      >
        <List className="h-4 w-4" />
      </button>
    </div>
  );
}
