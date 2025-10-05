"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export type CtaPillButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean
}

export function CtaPillButton({ className, children, ...props }: CtaPillButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        "rounded-full bg-black text-white px-7 py-3 text-sm font-semibold",
        "hover:bg-gray-900 active:bg-black/90 disabled:opacity-50 disabled:pointer-events-none",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export default CtaPillButton


