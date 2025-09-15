import {
	Close,
	Content,
	Overlay,
	Portal,
	Root,
	Title,
	Trigger,
} from "@radix-ui/react-dialog";
import type { ComponentProps } from "react";
import { tv } from "tailwind-variants";
import XIcon from "../assets/icons/x.svg?react";
import { ButtonIcon } from "./button-icon";
import { Card } from "./card";
import { Divider } from "./divider";
import { Text } from "./text";

export const Dialog = Root;

export const DialogTrigger = Trigger;

export const DialogClose = Close;

export const dialogOverlayVariants = tv({
	base: `
	  fixed inset-0 z-50 bg-secondary/60
		backdrop-blur-sm
		data-[state=open]:animate-in
    data-[state=open]:fade-in-0
    data-[state=closed]:animate-out
    data-[state=closed]:fade-out-0
	`,
});

export function DialogOverlay({
	className,
	...rest
}: ComponentProps<typeof Overlay>) {
	return <Overlay className={dialogOverlayVariants({ className })} {...rest} />;
}

export const dialogContentVariants = tv({
	base: `
	  fixed left-[50%] top-[50%] w-full max-w-[32rem]
    z-60 -translate-x-[50%] -translate-y-[50%]
    data-[state=open]:animate-in
    data-[state=open]:fade-in-0
    data-[state=open]:slide-in-from-bottom[48%]
    data-[state=closed]:animate-out
    data-[state=closed]:fade-out-0
    data-[state=closed]:slide-out-to-bottom[48%]
	`,
});

export function DialogContent({
	className,
	ref,
	children,
	...rest
}: ComponentProps<typeof Content>) {
	return (
		<Portal>
			<DialogOverlay />
			<Content
				ref={ref}
				className={dialogContentVariants({ className })}
				{...rest}
			>
				<Card size="lg" variant="primary">
					{children}
				</Card>
			</Content>
		</Portal>
	);
}

export const dialogHeaderVariants = tv({
	base: "flex items-center justify-between",
});

export function DialogHeader({
	className,
	children,
	...rest
}: ComponentProps<"div">) {
	return (
		<>
			<header className={dialogHeaderVariants({ className })} {...rest}>
				<Title>
					<Text variant="heading-medium" className="flex-1">
						{children}
					</Text>
				</Title>
				<Close asChild>
					<ButtonIcon icon={XIcon} variant="ghost" />
				</Close>
			</header>
			<Divider className="mt-1.5 mb-5" />
		</>
	);
}

export function DialogBody({ children, ...rest }: ComponentProps<"div">) {
	return <div {...rest}>{children}</div>;
}

export function DialogFooter({ children, ...rest }: ComponentProps<"div">) {
	return (
		<div {...rest}>
			<Divider className="mt-5 mb-1.5" />
			<footer className="flex items-center justify-end gap-3">
				{children}
			</footer>
		</div>
	);
}
