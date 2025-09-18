import type { ComponentProps } from "react";
import { tv } from "tailwind-variants";
import { Button } from "../../../components/button";
import { Skeleton } from "../../../components/skeleton";
import { Text } from "../../../components/text";
import { useAlbums } from "../hooks/use-albums";

interface AlbumsFilterProps extends ComponentProps<"div"> {}

export const albumsFilterVariant = tv({
	base: "flex items-center gap-3.5 overflow-x-auto",
});

export function AlbumsFilter({ className, ...rest }: AlbumsFilterProps) {
	const { albums, isLoadingAlbums } = useAlbums();

	return (
		<div className={albumsFilterVariant({ className })} {...rest}>
			<Text variant="heading-small">Álbuns</Text>
			<div className="flex items-center gap-3">
				{!isLoadingAlbums && (
					<>
						<Button size="sm" className="cursor-pointer">
							Todos
						</Button>
						{albums.map((album) => (
							<Button
								key={album.id}
								variant="ghost"
								size="sm"
								className="cursor-pointer shrink-0"
							>
								{album.title}
							</Button>
						))}
					</>
				)}

				{isLoadingAlbums &&
					Array.from({ length: 5 }).map((_, index) => (
						<Skeleton
							className="w-28 h-7"
							key={`loading-album-${
								// biome-ignore lint/suspicious/noArrayIndexKey: <use index with text>
								index
							}`}
						/>
					))}
			</div>
		</div>
	);
}
