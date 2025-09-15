import { type ComponentProps, type ReactNode, useMemo } from "react";
import { useWatch } from "react-hook-form";
import { tv, type VariantProps } from "tailwind-variants";
import FileImageIcon from "../assets/icons/image.svg?react";
import UploadFileIcon from "../assets/icons/upload-file.svg?react";
import { Icon } from "./icon";
import { Text, textVariants } from "./text";

export const inputSingleFileVariants = tv({
	base: `
    flex flex-col items-center justify-center w-full
    border border-solid border-border-primary
    group-hover:border-border-active
    rounded-lg gap-1 transition
  `,
	variants: {
		size: {
			md: "px-5 py-6",
		},
	},
	defaultVariants: {
		size: "md",
	},
});

export const inputSingleFileIconVariants = tv({
	base: "fill-placeholder",
	variants: {
		size: {
			md: "h-8 w-8",
		},
	},
	defaultVariants: {
		size: "md",
	},
});

interface InputSingleFileProps
	extends VariantProps<typeof inputSingleFileVariants>,
		Omit<ComponentProps<"input">, "size"> {
	error?: ReactNode;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	form: any;
	allowedExtensions: string[];
	replaceBy: ReactNode;
	maxFileSizeInMB: number;
}

export function InputSingleFile({
	size,
	error,
	form,
	allowedExtensions,
	maxFileSizeInMB,
	replaceBy,
	...rest
}: InputSingleFileProps) {
	const formValues = useWatch({ control: form.control });

	const name = rest.name || "";

	const formFile: File = useMemo(
		() => formValues[name]?.[0],
		[formValues, name],
	);

	const { fileExtension, fileSize } = useMemo(
		() => ({
			fileExtension: formFile?.name?.split(".")?.pop()?.toLowerCase() || "",
			fileSize: formFile?.size || 0,
		}),
		[formFile],
	);

	function isValidExtension() {
		return allowedExtensions.includes(fileExtension);
	}

	function isValidSize() {
		return fileSize <= maxFileSizeInMB * 1024 * 1024;
	}

	function isValidFile() {
		return isValidExtension() && isValidSize();
	}

	return (
		<div>
			{!formFile || !isValidFile() ? (
				<>
					<div className="w-full relative group cursor-pointer">
						<input
							type="file"
							className={`
  				  absolute top-0 right-0 w-full h-full
  					opacity-0 cursor-pointer
					  `}
							{...rest}
						/>
						<div className={inputSingleFileVariants({ size })}>
							<Icon
								svg={UploadFileIcon}
								className={inputSingleFileIconVariants({ size })}
							/>
							<Text
								variant="label-medium"
								className="text-placeholder text-center"
							>
								Arraste o arquivo aqui <br />
								ou clique para selecionar
							</Text>
						</div>
					</div>
					<div className="flex flex-col gap-1 mt-1">
						{formFile && !isValidExtension() && (
							<Text variant="label-small" className="text-accent-red">
								Tipo de arquivo inválido.
							</Text>
						)}
						{formFile && !isValidSize() && (
							<Text variant="label-small" className="text-accent-red">
								O tamanho do arquivo ultrapassa o máximo permitido.
							</Text>
						)}
						{error && (
							<Text variant="label-small" className="text-accent-red">
								{error}
							</Text>
						)}
					</div>
				</>
			) : (
				<>
					{replaceBy}
					<div
						className={`
				  flex gap-3 items-center
					border border-solid border-border-primary
					mt-5 p-3 rounded
				`}
					>
						<Icon svg={FileImageIcon} className="fill-white w-6 h-6" />
						<div className="flex flex-col">
							<div className="truncate max-w-80">
								<Text variant="label-medium" className="text-placeholder">
									{formFile.name}
								</Text>
							</div>
							<div className="flex">
								<button
									type="button"
									onClick={() => {
										form.setValue(name, undefined);
									}}
									className={textVariants({
										variant: "label-small",
										className: "text-accent-red cursor-pointer hover:underline",
									})}
								>
									Remover
								</button>
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
}
