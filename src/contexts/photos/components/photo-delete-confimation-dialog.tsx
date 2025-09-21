import { type ReactNode, useTransition } from "react";
import { Button } from "../../../components/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogTrigger,
} from "../../../components/dialog";
import { Text } from "../../../components/text";
import { usePhoto } from "../hooks/use-photo";

interface PhotoDeleteConfirmationDialogProps {
	trigger: ReactNode;
	photoId: string;
}

export function PhotoDeleteConfirmationDialog({
	trigger,
	photoId,
}: PhotoDeleteConfirmationDialogProps) {
	const [isDeletingPhoto, setIsDeletingPhoto] = useTransition();

	const { deletePhoto } = usePhoto();

	async function handleDeletePhoto() {
		setIsDeletingPhoto(async () => {
			await deletePhoto(photoId);
		});
	}

	return (
		<Dialog>
			<DialogTrigger asChild>{trigger}</DialogTrigger>
			<DialogContent>
				<Text variant="heading-small">Deseja mesmo excluir essa foto?</Text>
				<DialogFooter>
					<DialogClose asChild>
						<Button variant="secondary">Cancelar</Button>
					</DialogClose>
					<Button
						variant="destructive"
						disabled={isDeletingPhoto}
						onClick={handleDeletePhoto}
						handling={isDeletingPhoto}
					>
						{isDeletingPhoto ? "Excluindo..." : "Excluir"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
