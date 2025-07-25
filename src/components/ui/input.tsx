import { cva, type VariantProps } from "class-variance-authority"
import type * as React from "react"

import { cn } from "@/lib/utils"

const inputVariants = cva(
    [
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex w-full min-w-0 rounded-md border bg-transparent shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:border-0 file:bg-transparent file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
    ],
    {
        variants: {
            size: {
                xs: "h-7 px-2 py-1 text-xs file:h-5 file:text-xs",
                sm: "h-8 px-2.5 py-1 text-sm file:h-6 file:text-xs",
                md: "h-9 px-3 py-1 text-base md:text-sm file:h-7 file:text-sm",
                lg: "h-10 px-3 py-2 text-base file:h-8 file:text-sm",
                xl: "h-11 px-4 py-2 text-lg file:h-9 file:text-base",
                "2xl": "h-12 px-4 py-3 text-xl file:h-10 file:text-base",
            },
        },
        defaultVariants: {
            size: "md",
        },
    },
)

export interface InputProps extends Omit<React.ComponentProps<"input">, "size">, VariantProps<typeof inputVariants> {}

function Input({ className, type, size, ...props }: InputProps) {
    return <input type={type} data-slot="input" className={cn(inputVariants({ size, className }))} {...props} />
}

export { Input, inputVariants }
