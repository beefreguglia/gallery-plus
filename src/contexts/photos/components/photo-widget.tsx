import { Link } from "react-router";
import { Badge } from "../../../components/badge";
import { buttonTextVariants, buttonVariants } from "../../../components/button";
import { ImagePreview } from "../../../components/image-preview";
import { Skeleton } from "../../../components/skeleton";
import { Text } from "../../../components/text";
import type { Photo } from "../models/photo";

interface PhotoWidgetProps {
	photo: Photo;
	loading?: boolean;
}

const BADGE_NUMBERS = 1;

export function PhotoWidget({ photo, loading }: PhotoWidgetProps) {
	return (
		<div className="flex flex-col gap-4">
			{!loading ? (
				<ImagePreview
					src={`/images/${photo.imageId}`}
					title={photo.title}
					imageClassName="w-[10.875rem] h-[10.875rem] rounded-lg"
				/>
			) : (
				<Skeleton className="w-[10.875rem] h-[10.875rem] rounded-lg" />
			)}
			<div className="flex flex-col gap-2">
				{!loading ? (
					<Text variant="paragraph-large" className="truncate">
						{photo.title}
					</Text>
				) : (
					<Skeleton className="w-full h-6" />
				)}

				<div className="flex gap-1 min-h-[1.375rem]">
					{!loading ? (
						<>
							{photo.albums.slice(0, BADGE_NUMBERS).map((album) => (
								<Badge className="truncate" size="xs" key={album.id}>
									{album.title}
								</Badge>
							))}
							{photo.albums.length > BADGE_NUMBERS && (
								<Badge size="xs">+{photo.albums.length - BADGE_NUMBERS}</Badge>
							)}
						</>
					) : (
						// biome-ignore lint/complexity/noUselessFragments: <Need Fragment for array from>
						<>
							{Array.from({ length: 2 }).map((_, i) => (
								<Skeleton
									key={`album-${
										// biome-ignore lint/suspicious/noArrayIndexKey: <use index with album>
										i
									}`}
									className="w-full h-4 rounded-sm"
								/>
							))}
						</>
					)}
				</div>
			</div>
			{!loading ? (
				<Link
					className={buttonVariants({
						variant: "secondary",
						className: "px-2 py-2",
					})}
					to={`/photo/${photo.id}`}
				>
					<Text
						className={buttonTextVariants({ variant: "secondary", size: "sm" })}
					>
						Detalhes da imagem
					</Text>
				</Link>
			) : (
				<Skeleton className="w-full h-10" />
			)}
		</div>
	);
}
