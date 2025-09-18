import type { ComponentProps } from "react";
import { Link } from "react-router";
import { tv } from "tailwind-variants";
import Logo from "../assets/images/galeria-plus-full-logo.svg?react";
import { AlbumNewDialog } from "../contexts/albums/components/album-new-dialog";
import { PhotoNewDialog } from "../contexts/photos/components/photo-new-dialog";
import { Button } from "./button";
import { Container } from "./container";
import { Divider } from "./divider";
import { PhotosSearch } from "./photos-search";

interface MainHeaderProps extends ComponentProps<typeof Container> {}

export const mainHeaderContainerVariants = tv({
	base: "flex justify-between items-center gap-10",
});

export function MainHeader({ className, ...rest }: MainHeaderProps) {
	return (
		<Container
			as="header"
			className={mainHeaderContainerVariants({ className })}
			{...rest}
		>
			<Link to="/">
				<Logo className="h-5" />
			</Link>
			<PhotosSearch />
			<Divider orientation="vertical" className="h-10" />
			<div className="flex items-center gap-3">
				<PhotoNewDialog trigger={<Button>Nova foto</Button>} />
				<AlbumNewDialog
					trigger={<Button variant="secondary">Criar álbum</Button>}
				/>
			</div>
		</Container>
	);
}
