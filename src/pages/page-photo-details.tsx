import { useParams } from "react-router";

export function PagePhotoDetails() {
	const { id } = useParams();

	return (
		<div>
			<h1>Photo Details {id}</h1>
		</div>
	);
}
