import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils";

/**
 * Utility for creating styled title classes with variants.
 *
 * Variants:
 * - `h1` → text-3xl, bold
 * - `h2` → text-2xl, bold
 * - `h3` → text-xl, semibold, tracking-tight, centered
 * - `h4` → text-lg, semibold, tracking-tight, centered
 * - `h5` → text-base, semibold, tracking-tight, centered
 */
const title = cva(["text-heading", "text-center"], {
  variants: {
    variant: {
      h1: "text-3xl font-bold",
      h2: "text-2xl font-bold",
      h3: "text-xl font-semibold tracking-tight text-heading text-center",
      h4: "text-lg font-semibold tracking-tight text-heading text-center",
      h5: "text-base font-semibold tracking-tight text-heading text-center",
    },
  },
  defaultVariants: {
    variant: "h1",
  },
});

/**
 * Mapping of variant intent to the corresponding heading element.
 */
const headingMap = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
} as const;

/**
 * Props for the {@link Title} component.
 *
 * Extends native {@link React.HTMLAttributes} for `<h1>`–`<h5>` elements.
 */
export interface TitleProps
  extends Omit<React.HTMLAttributes<HTMLHeadingElement>, "className">,
    VariantProps<typeof title> {
  /** Optional custom class name(s) to merge with the default classes. */
  className?: string;
}

/**
 * Title component
 *
 * Renders a heading element (`<h1>`–`<h5>`) with variant-based styles.
 *
 * @example
 * ```tsx
 * // Default (h1)
 * <Title>Hello World</Title>
 *
 * // h2 variant
 * <Title intents="h2">Section Title</Title>
 *
 * // h3 with custom class
 * <Title intents="h3" className="text-red-500">Subsection</Title>
 * ```
 */
export function Title({ className, variant = "h1", ...props }: TitleProps) {
  const Component = headingMap[variant!];
  return <Component className={cn(title({ variant }), className)} {...props} />;
}
