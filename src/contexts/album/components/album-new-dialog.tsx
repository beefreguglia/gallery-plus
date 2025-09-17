import type { ReactNode } from "react";
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
import type { Photo } from "../../photos/models/photo";

interface AlbumNewDialogProps {
	trigger: ReactNode;
}

export function AlbumNewDialog({ trigger }: AlbumNewDialogProps) {
	const isLoadingPhotos = false;
	const photos: Photo[] = [
		{
			id: "1",
			albums: [
				{ id: "1", title: "Title" },
				{ id: "2", title: "Title 2" },
				{ id: "3", title: "Title 3" },
			],
			imageId: "portrait-shadow.png",
			title: "title",
		},
	];

	function handleTogglePhoto(selected: boolean, photoId: string) {
		console.log(selected, photoId);
	}

	return (
		<Dialog>
			<DialogTrigger asChild>{trigger}</DialogTrigger>
			<DialogContent>
				<DialogHeader>Criar Álbum</DialogHeader>

				<DialogBody className="flex flex-col gap-5">
					<InputText placeholder="Adicione um título" />

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
											src={`/images/${photo.imageId}`}
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
					<DialogClose>
						<Button variant="secondary">Cancelar</Button>
					</DialogClose>

					<Button>Criar</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
