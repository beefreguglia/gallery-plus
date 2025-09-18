import { useQuery } from "@tanstack/react-query";
import { fetcher } from "../../../helpers/api";
import type { Photo } from "../models/photo";

interface PhotoDetailResponse extends Photo {
	nextPhotoId?: string;
	previousPhotoId?: string;
}

export function usePhoto(id?: string) {
	const { data, isLoading } = useQuery<PhotoDetailResponse>({
		queryKey: ["photo", id],
		queryFn: () => fetcher(`photos/${id}`),
		enabled: !!id,
	});

	return {
		photo: {
			albums: data?.albums || [],
			id: data?.id || "",
			imageId: data?.imageId || "",
			title: data?.title || "",
		} as Photo,
		nextPhotoId: data?.nextPhotoId,
		previousPhotoId: data?.previousPhotoId,
		isLoadingPhoto: isLoading,
	};
}
