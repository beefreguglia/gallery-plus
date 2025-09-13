import type { ComponentProps, ReactNode } from "react";
import { tv, type VariantProps } from "tailwind-variants";
import Icon from "./icon";
import Text from "./text";

export const inputTextContainerVariants = tv({
	base: "flex flex-col gap-1",
});

export const inputTextWrapper = tv({
	base: `
    border border-solid border-border-primary
    focus:border-border-active bg-transparent
    rounded flex items-center gap-3
  `,
	variants: {
		size: {
			md: "h-10 px-3",
		},
		disabled: {
			true: "pointer-events-none",
		},
	},
	defaultVariants: {
		size: "md",
		disabled: false,
	},
});

export const inputTextVariants = tv({
	base: `
	  bg-transparent, outline-none placeholder:text-placeholder text-accent-paragraph
	`,
});

export const inputTextIconVariants = tv({
	base: "fill-placeholder",
	variants: {
		size: {
			md: "w-6 h-6",
		},
	},
	defaultVariants: {
		size: "md",
	},
});

interface InputTextProps
	extends VariantProps<typeof inputTextWrapper>,
		Omit<ComponentProps<"input">, "size" | "disabled"> {
	icon?: ComponentProps<typeof Icon>["svg"];
	error?: ReactNode;
}

export function InputText({
	size,
	className,
	disabled,
	icon,
	error,
	...rest
}: InputTextProps) {
	return (
		<div className={inputTextContainerVariants({ className })}>
			<div className={inputTextWrapper({ size, disabled })}>
				{icon && (
					<Icon className={inputTextIconVariants({ size })} svg={icon} />
				)}
				<input
					className={inputTextVariants()}
					disabled={disabled as boolean}
					{...rest}
				/>
			</div>
			{error && (
				<Text variant="label-small" className="text-accent-red">
					{error}
				</Text>
			)}
		</div>
	);
}
