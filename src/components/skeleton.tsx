import type { ComponentProps } from "react";
import { tv, type VariantProps } from "tailwind-variants";

export const skeletonVariants = tv({
	base: "animate-pulse bg-background-secondary pointer-events-none",
	variants: {
		rounded: {
			sm: "rounded-sm",
			lg: "rounded-lg",
			full: "rounded-full",
		},
	},
	defaultVariants: {
		rounded: "lg",
	},
});

interface SkeletonProps
	extends VariantProps<typeof skeletonVariants>,
		ComponentProps<"div"> {}

export function Skeleton({ rounded, className, ...props }: SkeletonProps) {
	return (
		<div className={skeletonVariants({ rounded, className })} {...props} />
	);
}
