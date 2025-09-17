import { Container } from "../components/container";
import { AlbumsFilter } from "../contexts/album/components/albums-filter";
import { PhotosList } from "../contexts/photos/components/photo-list";

export function PageHome() {
	return (
		<Container>
			<AlbumsFilter
				albums={[
					{ id: "1", title: "Title" },
					{ id: "2", title: "Title 2" },
					{ id: "3", title: "Title 3" },
				]}
				className="mb-9"
			/>
			<PhotosList
				photos={[
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
				]}
			/>
		</Container>
	);
}
