import { Button } from "../components/button";
import { Container } from "../components/container";
import { ImagePreview } from "../components/image-preview";
import { Skeleton } from "../components/skeleton";
import { Text } from "../components/text";
import { AlbumsListSelectable } from "../contexts/album/components/albums-list-selectable";
import { PhotoNavigator } from "../contexts/photos/components/photo-navigator";

export function PagePhotoDetails() {
	// const { id } = useParams();
	const isLoadingPhoto = false;
	const photo = {
		id: "1",
		albums: [
			{ id: "1", title: "Title" },
			{ id: "2", title: "Title 2" },
			{ id: "3", title: "Title 3" },
		],
		imageId: "portrait-shadow.png",
		title: "title",
	};

	return (
		<Container>
			<header className="flex items-center justify-between gap-8 mb-8">
				{!isLoadingPhoto ? (
					<Text as="h2" variant="heading-large">
						{photo?.title}
					</Text>
				) : (
					<Skeleton className="w-48 h-8" />
				)}
				<PhotoNavigator loading={isLoadingPhoto} />
			</header>
			<div className="grid grid-cols-[21rem_1fr] gap-24">
				<div className="flex flex-col gap-3">
					{!isLoadingPhoto ? (
						<ImagePreview
							src={`/images/${photo.imageId}`}
							title={photo?.title}
							imageClassName="h-[21rem]"
						/>
					) : (
						<Skeleton className="h-[21rem]" />
					)}
					{!isLoadingPhoto ? (
						<Button variant="destructive" className="w-fit">
							Excluir
						</Button>
					) : (
						<Skeleton className="w-20 h-10" />
					)}
				</div>
				<div className="py-3">
					<Text as="h3" variant="heading-medium" className="mb-6">
						Álbuns
					</Text>
					<AlbumsListSelectable
						loading={isLoadingPhoto}
						albums={[
							{ id: "1", title: "Title" },
							{ id: "2", title: "Title 2" },
							{ id: "3", title: "Title 3" },
							{ id: "4", title: "Title" },
							{ id: "5", title: "Title 2" },
							{ id: "6", title: "Title 3" },
							{ id: "7", title: "Title" },
							{ id: "8", title: "Title 2" },
							{ id: "9", title: "Title 3" },
							{ id: "10", title: "Title" },
							{ id: "11", title: "Title 2" },
							{ id: "12", title: "Title 3" },
							{ id: "13", title: "Title" },
							{ id: "14", title: "Title 2" },
							{ id: "15", title: "Title 3" },
						]}
						photo={photo}
					/>
				</div>
			</div>
		</Container>
	);
}
