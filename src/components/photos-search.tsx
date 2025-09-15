import { type ChangeEvent, useCallback, useState } from "react";
import SearchIcon from "../assets/icons/search.svg?react";
import { debounce } from "../helpers/utils";
import { InputText } from "./input-text";

export function PhotosSearch() {
	const [inputValue, setInputValue] = useState("");

	const debouncedSetValue = useCallback(
		debounce((value: string) => {
			console.log("valor", value);
		}, 300),
		[],
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
