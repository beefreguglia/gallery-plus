import type { ComponentProps } from "react";
import { tv } from "tailwind-variants";

export const imageFilePreviewVariant = tv({
	base: `
    rounded-lg overflow-hidden
  `,
});

export const imageFilePreviewImageVariant = tv({
	base: "w-full object-cover",
});

interface ImageFilePreviewProps extends ComponentProps<"img"> {
	imageClassName?: string;
}

export function ImageFilePreview({
	className,
	imageClassName,
	...rest
}: ImageFilePreviewProps) {
	return (
		<div className={imageFilePreviewVariant({ className })}>
			{/** biome-ignore lint/a11y/useAltText: <explanation> */}
			<img
				className={imageFilePreviewImageVariant({ className: imageClassName })}
				{...rest}
			/>
		</div>
	);
}
