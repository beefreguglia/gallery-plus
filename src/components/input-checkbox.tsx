import type { ComponentProps } from "react";
import { tv, type VariantProps } from "tailwind-variants";
import CheckIcon from "../assets/icons/check.svg?react";
import { Icon } from "./icon";

export const inputCheckboxWrapperVariants = tv({
	base: `
    inline-flex items-center justify-center relative group
  `,
	variants: {
		disabled: {
			true: "pointer-events-none",
		},
	},
	defaultVariants: {
		disabled: false,
	},
});

export const inputCheckboxVariants = tv({
	base: `
    appearance-none peer flex items-center justify-center
    cursor-pointer transition overflow-hidden
  `,
	variants: {
		variant: {
			default: `
			  border-2 border-solid
				border-border-primary hover:border-border-active
				checked:border-accent-brand checked:bg-accent-brand
				group-hover:checked:border-accent-brand-light
				group-hover:checked:bg-accent-brand-light
			`,
		},
		size: {
			sm: "h-3 w-3 rounded-sm",
			md: "w-5 h-5 rounded-sm",
		},
	},
	defaultVariants: {
		variant: "default",
		size: "md",
	},
});

export const inputCheckboxIconVariants = tv({
	base: `
		absolute top-1/2 transform -translate-y-1/2
		hidden peer-checked:block fill-white
		cursor-pointer
	`,
	variants: {
		size: {
			sm: "w-3 h-3 left-px",
			md: "w-4 h-4 left-0.5",
		},
	},
	defaultVariants: {
		size: "md",
	},
});

interface InputCheckboxProps
	extends VariantProps<typeof inputCheckboxVariants>,
		Omit<ComponentProps<"input">, "size"> {}

export function InputCheckbox({
	variant,
	size,
	disabled,
	className,
	...rest
}: InputCheckboxProps) {
	return (
		<label className={inputCheckboxWrapperVariants({ className, disabled })}>
			<input
				type="checkbox"
				className={inputCheckboxVariants({ variant, size })}
				{...rest}
			/>
			<Icon svg={CheckIcon} className={inputCheckboxIconVariants({ size })} />
		</label>
	);
}
