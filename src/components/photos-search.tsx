/** biome-ignore-all lint/correctness/useExhaustiveDependencies: <> */
import { type ChangeEvent, useCallback, useState } from "react";
import SearchIcon from "../assets/icons/search.svg?react";
import { usePhotos } from "../contexts/photos/hooks/use-photos";
import { debounce } from "../helpers/utils";
import { InputText } from "./input-text";

export function PhotosSearch() {
	const [inputValue, setInputValue] = useState("");
	const { filters } = usePhotos();

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const debouncedSetValue = useCallback(
		debounce((value: string) => {
			filters.setQ(value);
		}, 300),
		[filters.setQ],
	);

	function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
		const value = e.target.value;
		setInputValue(value);
		debouncedSetValue(value);
	}

	return (
		<InputText
			icon={SearchIcon}
			placeholder="Buscar fotos"
			className="flex-1"
			onChange={handleInputChange}
			value={inputValue}
		/>
	);
}
