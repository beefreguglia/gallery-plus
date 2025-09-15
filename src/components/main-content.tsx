import type { ComponentProps } from "react";
import { tv } from "tailwind-variants";

interface MainContentProps extends ComponentProps<"main"> {}

export const mainContentVariants = tv({
	base: "mt-20 pb-20",
});

export function MainContent({
	children,
	className,
	...rest
}: MainContentProps) {
	return (
		<main className={mainContentVariants({ className })} {...rest}>
			{children}
		</main>
	);
}
