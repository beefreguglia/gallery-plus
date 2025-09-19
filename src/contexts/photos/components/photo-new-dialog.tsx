import { zodResolver } from "@hookform/resolvers/zod";
import { type ReactNode, useEffect, useState, useTransition } from "react";
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
import { useAlbums } from "../../albums/hooks/use-albums";
import { usePhoto } from "../hooks/use-photo";
import { type PhotoNewFormSchema, photoNewFormSchema } from "../schemas";

interface PhotoNewDialogProps {
	trigger: ReactNode;
}

export function PhotoNewDialog({ trigger }: PhotoNewDialogProps) {
	const [modalOpen, setModalOpen] = useState(false);
	const [isCreatingPhoto, setIsCreatingPhoto] = useTransition();

	const form = useForm<PhotoNewFormSchema>({
		resolver: zodResolver(photoNewFormSchema),
	});

	const { albums, isLoadingAlbums } = useAlbums();
	const { createPhoto } = usePhoto();

	const file = form.watch("file");
	const fileSource = file?.[0] ? URL.createObjectURL(file[0]) : undefined;

	const albumsIds = form.watch("albumsIds");

	function handleSubmit(payload: PhotoNewFormSchema) {
		console.log(payload);
		setIsCreatingPhoto(async () => {
			await createPhoto(payload);
			setModalOpen(false);
		});
	}

	function handleToggleAlbum(albumId: string) {
		const albumsIds = form.getValues("albumsIds");
		const albumsSet = new Set(albumsIds);

		if (albumsSet.has(albumId)) {
			albumsSet.delete(albumId);
		} else {
			albumsSet.add(albumId);
		}

		form.setValue("albumsIds", Array.from(albumsSet));
	}

	useEffect(() => {
		if (!modalOpen) {
			form.reset();
		}
	}, [modalOpen, form]);

	return (
		<Dialog open={modalOpen} onOpenChange={setModalOpen}>
			<DialogTrigger asChild>{trigger}</DialogTrigger>
			<DialogContent>
				<form onSubmit={form.handleSubmit(handleSubmit)}>
					<DialogHeader>Adicionar Photo</DialogHeader>
					<DialogBody className="flex flex-col gap-6">
						<InputText
							placeholder="Adicione um título"
							maxLength={255}
							error={form.formState.errors.title?.message}
							{...form.register("title")}
						/>

						<Alert>
							Tamanho máximo: 50MB
							<br />
							Você pode selecionar arquivos em PNG, JPG ou JPEG.
						</Alert>

						<InputSingleFile
							form={form}
							allowedExtensions={["png", "jpg", "jpeg"]}
							maxFileSizeInMB={50}
							replaceBy={
								<ImagePreview src={fileSource} className="w-full h-56" />
							}
							error={form.formState.errors.file?.message}
							{...form.register("file")}
						/>

						<div className="space-y-3">
							<Text variant="label-small">Selecionar álbuns</Text>
							<div className="flex flex-wrap gap-3">
								{!isLoadingAlbums &&
									albums.length > 0 &&
									albums.map((album) => (
										<Button
											key={album.id}
											variant={
												albumsIds?.includes(album.id) ? "primary" : "ghost"
											}
											size="sm"
											className="truncate"
											onClick={() => handleToggleAlbum(album.id)}
										>
											{album.title}
										</Button>
									))}
								{isLoadingAlbums &&
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
							<Button
								disabled={isCreatingPhoto}
								type="button"
								variant="secondary"
							>
								Cancelar
							</Button>
						</DialogClose>
						<Button
							type="submit"
							handling={isCreatingPhoto}
							disabled={isCreatingPhoto}
						>
							{isCreatingPhoto ? "Adicionando..." : "Adicionar"}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
