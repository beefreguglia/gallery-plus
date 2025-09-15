import { type ComponentProps, createElement, type JSX } from "react";
import { tv, type VariantProps } from "tailwind-variants";

export const containerVariants = tv({
	base: "mx-auto",
	variants: {
		size: {
			md: "max-w-[62rem] px-2",
		},
	},
	defaultVariants: {
		size: "md",
	},
});

interface ContainerProps
	extends VariantProps<typeof containerVariants>,
		ComponentProps<"div"> {
	as?: keyof JSX.IntrinsicElements;
}

export function Container({
	as = "div",
	children,
	className,
	...props
}: ContainerProps) {
	return createElement(
		as,
		{
			className: containerVariants({ size: "md", className }),
			...props,
		},
		children,
	);
}
