"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import Link from "next/link"

export type UnderlineTabProps = {
  label: React.ReactNode
  isActive?: boolean
  onClick?: () => void
  className?: string
  disabled?: boolean
  href?: string
}

export function UnderlineTab({
  label,
  isActive = false,
  onClick,
  className,
  disabled = false,
  href,
}: UnderlineTabProps) {
  const classes = cn(
    "relative inline-flex items-center bg-transparent px-0 py-1 text-[18px] font-normal text-foreground/80 transition-colors duration-200",
    "hover:text-foreground disabled:opacity-50 disabled:pointer-events-none",
    "after:absolute after:left-0 after:-bottom-0.5 after:h-[2px] after:w-full after:bg-current after:transition-opacity after:duration-200",
    isActive ? "text-foreground after:opacity-100" : "after:opacity-0 hover:after:opacity-60",
    className
  )

  if (href) {
    return (
      <Link href={href} role="tab" aria-pressed={isActive} className={classes}>
        {label}
      </Link>
    )
  }

  return (
    <button
      type="button"
      role="tab"
      aria-pressed={isActive}
      disabled={disabled}
      onClick={onClick}
      className={classes}
    >
      {label}
    </button>
  )
}

export default UnderlineTab


