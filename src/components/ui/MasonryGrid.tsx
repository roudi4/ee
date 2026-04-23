import React from "react"
import { cn } from "@/lib/utils"

export interface MasonryGridProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
}

export function MasonryGrid({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6", className)} {...props}>
      {children}
    </div>
  )
}

export function MasonryItem({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("break-inside-avoid mb-6", className)} {...props}>
      {children}
    </div>
  )
}
