import type { ComponentProps, FC } from "react";
import { tv, type VariantProps } from "tailwind-variants";

export const iconVariants = tv({
	variants: {
		animate: {
			false: "",
			true: "animate-spin",
		},
	},
	defaultVariants: {
		animate: false,
	},
});

interface IconProps
	extends ComponentProps<"svg">,
		VariantProps<typeof iconVariants> {
	svg: FC<ComponentProps<"svg">>;
}

export function Icon({
	svg: SvgComponent,
	animate,
	className,
	...props
}: IconProps) {
	return (
		<SvgComponent className={iconVariants({ animate, className })} {...props} />
	);
}
