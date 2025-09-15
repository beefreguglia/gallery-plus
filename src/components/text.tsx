import { createElement, type JSX, type ReactNode } from "react";
import { tv, type VariantProps } from "tailwind-variants";

export const textVariants = tv({
	base: "font-sans text-white",
	variants: {
		variant: {
			"heading-large": "text-2xl leading-[130%] font-bold",
			"heading-medium": "text-xl leading-[130%] font-bold",
			"heading-small": "text-base leading-[130%] font-bold",
			"paragraph-large": "text-base leading-[150%] font-medium",
			"paragraph-medium": "text-sm leading-[150%] font-medium",
			"paragraph-small": "text-xs leading-[150%] font-medium",
			"label-medium": "text-base leading-[150%] font-semibold",
			"label-small": "text-xs leading-[150%] font-semibold",
		},
	},
	defaultVariants: {
		variant: "paragraph-medium",
	},
});

interface TextProps extends VariantProps<typeof textVariants> {
	as?: keyof JSX.IntrinsicElements;
	className?: string;
	children?: ReactNode;
}

export function Text({
	as = "span",
	variant,
	className,
	children,
	...props
}: TextProps) {
	return createElement(
		as,
		{
			className: textVariants({ variant, className }),
			...props,
		},
		children,
	);
}
