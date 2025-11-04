import React from "react";
import { cn } from "@/utils";

interface SpinnerProps {
  /**
   * Optional label text displayed next to the spinner.
   * Example: "Loading data..."
   */
  children?: React.ReactNode;

  /**
   * Controls the size of the spinner.
   * - `sm` → small
   * - `md` → medium (default)
   * - `lg` → large
   */
  size?: "sm" | "md" | "lg";

  /**
   * Tailwind class for spinner color (applies to the top border).
   * Defaults to `border-t-blue-500`.
   */
  color?: string;
}

/**
 * Spinner component
 *
 * Displays a circular loading spinner with optional label text.
 * Supports size and color customization via props.
 *
 * @example
 * ```tsx
 * // Default medium spinner
 * <Spinner />
 *
 * // With label
 * <Spinner>Loading...</Spinner>
 *
 * // Small red spinner
 * <Spinner size="sm" color="border-t-red-500">Fetching</Spinner>
 *
 * // Large spinner without text
 * <Spinner size="lg" />
 * ```
 */
export function Spinner({
  children,
  size = "md",
  color = "border-t-blue-500",
}: SpinnerProps) {
  const sizes: Record<typeof size, string> = {
    sm: "w-3 h-3 border",
    md: "w-5 h-5 border-2",
    lg: "w-8 h-8 border-4",
  };

  return (
    <div
      className="flex items-center justify-center gap-2"
      role="status"
      aria-label="Loading"
    >
      <div
        className={cn(
          "rounded-full animate-spin border-gray-300",
          sizes[size],
          color
        )}
      />
      {children && <span>{children}</span>}
    </div>
  );
}
