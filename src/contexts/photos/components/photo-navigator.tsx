import type { ComponentProps } from "react";
import { useNavigate } from "react-router";
import { tv } from "tailwind-variants";
import ArrowLeftIcon from "../../../assets/icons/chevron-left.svg?react";
import ArrowRightIcon from "../../../assets/icons/chevron-right.svg?react";
import { Button } from "../../../components/button";
import { ButtonIcon } from "../../../components/button-icon";
import { Skeleton } from "../../../components/skeleton";

interface PhotoNavigatorProps extends ComponentProps<"div"> {
	previousPhotoId?: string;
	nextPhotoId?: string;
	loading?: boolean;
}

const photonavigatorVariants = tv({
	base: "flex gap-2",
});

export function PhotoNavigator({
	loading,
	nextPhotoId,
	previousPhotoId,
	className,
	...rest
}: PhotoNavigatorProps) {
	const navigate = useNavigate();

	return (
		<div className={photonavigatorVariants({ className })} {...rest}>
			{!loading ? (
				<>
					<ButtonIcon
						icon={ArrowLeftIcon}
						variant="secondary"
						disabled={!previousPhotoId}
						onClick={() => navigate(`/photos/${previousPhotoId}`)}
					/>
					<Button
						icon={ArrowRightIcon}
						variant="secondary"
						disabled={!nextPhotoId}
						onClick={() => navigate(`/photos/${nextPhotoId}`)}
					>
						Próxima imagem
					</Button>
				</>
			) : (
				<>
					<Skeleton className="w-10 h-10" />
					<Skeleton className="w-20 h-10" />
				</>
			)}
		</div>
	);
}
