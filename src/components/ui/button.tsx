import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// Base styles that apply to all buttons
const baseStyles = "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus:outline-none focus-visible:outline-none aria-invalid:ring-destructive/20 aria-invalid:border-destructive"

// Dark mode button variants
const darkButtonVariants = cva(
  baseStyles,
  {
    variants: {
      variant: {
        default: "backdrop-blur-sm border border-primary/30 shadow-lg shadow-primary/20 hover:scale-105 hover:shadow-xl hover:shadow-primary/40 active:button-bounce bg-primary/90 text-foreground",
        destructive: "backdrop-blur-sm border border-destructive/30 shadow-lg shadow-destructive/20 hover:scale-105 hover:shadow-xl hover:shadow-destructive/40 active:button-bounce text-foreground",
        outline: "bg-transparent border border-border/50 shadow-lg hover:scale-105 hover:outline-glow hover:border-primary/60 hover:shadow-primary/40 active:button-bounce text-foreground",
        secondary: "backdrop-blur-sm border border-secondary/30 shadow-lg shadow-secondary/20 hover:scale-105 hover:shadow-xl hover:shadow-secondary/40 active:button-bounce bg-secondary/90 text-foreground",
        ghost: "bg-transparent hover:text-primary transition-colors hover:scale-105 active:button-bounce text-foreground",
        link: "bg-transparent text-primary underline-offset-4 hover:underline hover:text-primary/80 active:text-primary/70 hover:scale-105 active:button-bounce",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof darkButtonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"  

  return (
    <Comp
      data-slot="button"
      className={cn(darkButtonVariants({ variant, size }), className)}
      {...props}
    />
  )
}

export default Button;
