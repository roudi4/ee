import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "link" | "secondary"
  size?: "default" | "sm" | "lg" | "icon"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          {
            "bg-stone-900 text-stone-50 hover:bg-stone-900/90": variant === "default",
            "bg-stone-200 text-stone-900 hover:bg-stone-300": variant === "secondary",
            "border border-stone-200 bg-transparent hover:bg-stone-100 text-stone-900": variant === "outline",
            "hover:bg-stone-100 hover:text-stone-900": variant === "ghost",
            "text-stone-900 underline-offset-4 hover:underline": variant === "link",
            "h-10 px-6 py-2": size === "default",
            "h-9 px-4": size === "sm",
            "h-12 px-8 text-base": size === "lg",
            "h-10 w-10": size === "icon",
          },
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
