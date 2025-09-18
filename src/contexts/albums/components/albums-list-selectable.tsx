import { Divider } from "../../../components/divider";
import { InputCheckbox } from "../../../components/input-checkbox";
import { Skeleton } from "../../../components/skeleton";
import { Text } from "../../../components/text";
import type { Photo } from "../../photos/models/photo";
import { useAlbums } from "../hooks/use-albums";

interface AlbumsListSelectableProps {
	photo: Photo;
}

export function AlbumsListSelectable({ photo }: AlbumsListSelectableProps) {
	const { albums, isLoadingAlbums } = useAlbums();

	function isChecked(albumId: string) {
		return photo?.albums.some((album) => album.id === albumId);
	}

	function handlePhotoOnAlbum(albumId: string) {
		let albumsIds: string[] = [];

		if (!isChecked(albumId)) {
			albumsIds = photo.albums
				.filter((album) => album.id !== albumId)
				.map((album) => album.id);
		} else {
			albumsIds = [...photo.albums.map((album) => album.id), albumId];
		}

		console.log(albumsIds);
	}

	return (
		<ul className="flex flex-col gap-4">
			{!isLoadingAlbums &&
				albums.length > 0 &&
				albums.map((album, index) => (
					<li key={album.id}>
						<div className="flex items-center justify-between gap-1">
							<Text variant="paragraph-large" className="truncate">
								{album.title}
							</Text>
							<InputCheckbox
								defaultChecked={isChecked(album.id)}
								onClick={() => handlePhotoOnAlbum(album.id)}
							/>
						</div>
						{index !== albums.length - 1 && <Divider className="mt-4" />}
					</li>
				))}
			{isLoadingAlbums &&
				Array.from({ length: 5 }).map((_, index) => (
					<li
						key={`albums-list-${
							// biome-ignore lint/suspicious/noArrayIndexKey: <Using index with text>
							index
						}`}
					>
						<Skeleton className="h-[2.5rem]" />
					</li>
				))}
		</ul>
	);
}
