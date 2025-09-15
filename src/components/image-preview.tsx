import type { ComponentProps } from "react";
import { tv } from "tailwind-variants";

export const imagePreviewVariant = tv({
	base: `
    rounded-lg overflow-hidden
  `,
});

export const imagePreviewImageVariant = tv({
	base: "w-full object-cover",
});

interface ImagePreviewProps extends ComponentProps<"img"> {
	imageClassName?: string;
}

export function ImagePreview({
	className,
	imageClassName,
	...rest
}: ImagePreviewProps) {
	return (
		<div className={imagePreviewVariant({ className })}>
			{/** biome-ignore lint/a11y/useAltText: <explanation> */}
			<img
				className={imagePreviewImageVariant({ className: imageClassName })}
				{...rest}
			/>
		</div>
	);
}
