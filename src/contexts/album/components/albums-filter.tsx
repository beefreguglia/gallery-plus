import type { ComponentProps } from "react";
import { tv } from "tailwind-variants";
import { Button } from "../../../components/button";
import { Skeleton } from "../../../components/skeleton";
import { Text } from "../../../components/text";
import type { Album } from "../models/album";

interface AlbumsFilterProps extends ComponentProps<"div"> {
	albums: Album[];
	loading?: boolean;
}

export const albumsFilterVariant = tv({
	base: "flex items-center gap-3.5 overflow-x-auto",
});

export function AlbumsFilter({
	albums,
	loading = false,
	className,
	...rest
}: AlbumsFilterProps) {
	return (
		<div className={albumsFilterVariant({ className })} {...rest}>
			<Text variant="heading-small">Álbuns</Text>
			<div className="flex items-center gap-3">
				{!loading && (
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
				{loading &&
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
