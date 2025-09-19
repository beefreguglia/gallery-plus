import { zodResolver } from "@hookform/resolvers/zod";
import { type ReactNode, useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";

import SelectCheckboxIllustration from "../../../assets/images/select-checkbox.svg?react";
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
import { InputText } from "../../../components/input-text";
import { Skeleton } from "../../../components/skeleton";
import { Text } from "../../../components/text";
import { PhotoImageSelectable } from "../../photos/components/photo-image-selectable";
import { usePhotos } from "../../photos/hooks/use-photos";
import { useAlbum } from "../hooks/use-album";
import { type AlbumNewFormSchema, albumNewFormSchema } from "../schemas";

interface AlbumNewDialogProps {
	trigger: ReactNode;
}

export function AlbumNewDialog({ trigger }: AlbumNewDialogProps) {
	const [modalOpen, setModalOpen] = useState(false);
	const [isCreatingAlbum, setIsCreatingAlbum] = useTransition();

	const form = useForm<AlbumNewFormSchema>({
		resolver: zodResolver(albumNewFormSchema),
	});

	const { isLoadingPhotos, photos } = usePhotos();
	const { createAlbum } = useAlbum();

	function handleTogglePhoto(selected: boolean, photoId: string) {
		const photosIds = form.getValues("photosIds") || [];
		let newValue = [];

		if (selected) {
			newValue = [...photosIds, photoId];
		} else {
			newValue = photosIds.filter((photo) => photo !== photoId);
		}

		form.setValue("photosIds", newValue);
	}

	function handleSubmit(payload: AlbumNewFormSchema) {
		setIsCreatingAlbum(async () => {
			await createAlbum(payload);
			setModalOpen(false);
		});
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
					<DialogHeader>Criar Álbum</DialogHeader>

					<DialogBody className="flex flex-col gap-5">
						<InputText
							placeholder="Adicione um título"
							error={form.formState.errors.title?.message}
							{...form.register("title")}
						/>

						<div className="space-y-3">
							<Text variant="label-small" className="mb-3 inline-flex">
								Fotos cadastradas
							</Text>
							{!isLoadingPhotos && (
								<div className="flex flex-wrap gap-2">
									{photos.length > 0 &&
										photos.map((photo) => (
											<PhotoImageSelectable
												key={photo.id}
												src={`${import.meta.env.VITE_IMAGES_URL}/${photo.imageId}`}
												imageClassName="w-20 h-20"
												onSelectImage={(selected) =>
													handleTogglePhoto(selected, photo.id)
												}
											/>
										))}
								</div>
							)}
							{isLoadingPhotos && (
								<div className="flex flex-wrap gap-2">
									{Array.from({ length: 4 }).map((_, index) => (
										<Skeleton
											key={`photo-loading-${
												// biome-ignore lint/suspicious/noArrayIndexKey: <Using text and index>
												index
											}`}
											className="w-20 h-20 rounded-lg"
										/>
									))}
								</div>
							)}
							{!isLoadingPhotos && photos.length === 0 && (
								<div className="w-full flex flex-col justify-center items-center gap-3">
									<SelectCheckboxIllustration className="w-20 h-20" />
									<Text variant="paragraph-medium" className="text-center">
										Nenhuma foto disponível para seleção
									</Text>
								</div>
							)}
						</div>
					</DialogBody>

					<DialogFooter>
						<DialogClose asChild>
							<Button
								type="button"
								variant="secondary"
								disabled={isCreatingAlbum}
							>
								Cancelar
							</Button>
						</DialogClose>

						<Button
							type="submit"
							disabled={isCreatingAlbum}
							handling={isCreatingAlbum}
						>
							{isCreatingAlbum ? "Criando..." : "Criar"}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
