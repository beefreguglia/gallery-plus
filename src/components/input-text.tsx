import { tv } from "tailwind-variants";
import Icon from "./icon";
import Text from "./text";

export const inputTextContainerVariants = tv({
	base: "flex flex-col gap-1",
});

export const inputTextWrapper = tv({
	base: `
    border border-solid border-border-primary
  `,
});

export function InputText() {
	return (
		<div className={inputTextContainerVariants()}>
			<div>
				<Icon svg={null} />
				<input type="text" placeholder="Enter text" />
			</div>
			<Text variant="label-small" className="text-accent-red">
				Erro
			</Text>
		</div>
	);
}
