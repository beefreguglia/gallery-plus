import type { ReactNode } from "react";
import { useForm } from "react-hook-form";
import { Alert } from "../../../components/alert";
import { Button } from "../../../components/button";
import {
	Dialog,
	DialogBody,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTrigger,
} from "../../../components/dialog";
import { ImagePreview } from "../../../components/image-preview";
import { InputSingleFile } from "../../../components/input-single-file";
import { InputText } from "../../../components/input-text";
import { Skeleton } from "../../../components/skeleton";
import { Text } from "../../../components/text";

interface PhotoNewDialogProps {
	trigger: ReactNode;
}

export function PhotoNewDialog({ trigger }: PhotoNewDialogProps) {
	const form = useForm();
	const isLoadingAlbum = false;
	const albums = [
		{ id: "1", title: "Title" },
		{ id: "2", title: "Title 2" },
		{ id: "3", title: "Title 3" },
	];

	return (
		<Dialog>
			<DialogTrigger asChild>{trigger}</DialogTrigger>
			<DialogContent>
				<DialogHeader>Adicionar Photo</DialogHeader>
				<DialogBody className="flex flex-col gap-6">
					<InputText placeholder="Adicione um título" />

					<Alert>
						Tamanho máximo: 50MB
						<br />
						Você pode selecionar arquivos em PNG, JPG ou JPEG.
					</Alert>

					<InputSingleFile
						form={form}
						allowedExtensions={["PNG", "JPG", "JPEG"]}
						maxFileSizeInMB={50}
						replaceBy={<ImagePreview className="w-full h-56" />}
					/>

					<div className="space-y-3">
						<Text variant="label-small">Selecionar álbuns</Text>
						<div className="flex flex-wrap gap-3">
							{!isLoadingAlbum &&
								albums.length > 0 &&
								albums.map((album) => (
									<Button
										key={album.id}
										variant="ghost"
										size="sm"
										className="truncate"
									>
										{album.title}
									</Button>
								))}
							{isLoadingAlbum &&
								Array.from({ length: 5 }).map((_, index) => (
									<Skeleton
										key={`album-modal-button-loading-${
											// biome-ignore lint/suspicious/noArrayIndexKey: <Using index with text>
											index
										}`}
										className="h-7 w-20"
									/>
								))}
						</div>
					</div>
				</DialogBody>
				<DialogFooter>
					<DialogClose asChild>
						<Button variant="secondary">Cancelar</Button>
					</DialogClose>
					<Button>Adicionar</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
