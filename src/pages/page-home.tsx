import { Container } from "../components/container";
import { AlbumsFilter } from "../contexts/albums/components/albums-filter";
import { PhotosList } from "../contexts/photos/components/photo-list";

export function PageHome() {
	return (
		<Container>
			<AlbumsFilter className="mb-9" />
			<PhotosList />
		</Container>
	);
}
