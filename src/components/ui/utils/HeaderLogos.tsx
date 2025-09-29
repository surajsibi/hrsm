import React, { ReactNode } from "react";
import { cn } from "@/utils";
import { cva, type VariantProps } from "class-variance-authority";

const headerLogo = cva(["bg-gradient-primary","flex", "items-center", "justify-center","shadow-sm"],{
    variants:{
        variant:{
           rounded:["rounded-full","h-16","w-16","mx-auto"],
           square:["rounded-2xl","h-16","w-16","mx-auto"]
        },
    },
    defaultVariants:{
        variant:"rounded",
    }
})

export interface HeaderLogoProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof headerLogo> {
    icon?: ReactNode,
    className?: string,
    variant?: "rounded" | "square"
}

export const HeaderLogo: React.FC<HeaderLogoProps> = ({icon,children, className,variant, ...props}) => (<div className={cn(headerLogo({variant}), className)} {...props}>{icon} {children}</div>)