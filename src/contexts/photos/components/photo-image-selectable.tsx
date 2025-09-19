/** biome-ignore-all lint/a11y/noLabelWithoutControl: <Not production appliction> */
import { type ComponentProps, useState } from "react";
import { tv } from "tailwind-variants";
import { ImagePreview } from "../../../components/image-preview";
import { InputCheckbox } from "../../../components/input-checkbox";

export const photoImageSelectableVariants = tv({
	base: "cursor-pointer relative rounded-lg",
	variants: {
		select: {
			true: "outline-2 outline-accent-brand",
		},
	},
});

interface PhotoImageSelectableProps
	extends ComponentProps<typeof ImagePreview> {
	selected?: boolean;
	onSelectImage?: (selected: boolean) => void;
}

export function PhotoImageSelectable({
	className,
	selected = false,
	onSelectImage,
	...rest
}: PhotoImageSelectableProps) {
	const [isSelected, setIsSelected] = useState(selected);

	function handleSelect() {
		const newValue = !isSelected;
		onSelectImage?.(newValue);
		setIsSelected(newValue);
	}

	return (
		<label
			className={photoImageSelectableVariants({
				className,
				select: isSelected,
			})}
		>
			<InputCheckbox
				size="sm"
				defaultChecked={isSelected}
				onChange={handleSelect}
				className="absolute top-1 left-1"
			/>
			<ImagePreview {...rest} />
		</label>
	);
}
