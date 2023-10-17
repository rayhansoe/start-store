"use client";
import { debounce } from "@solid-primitives/scheduled";
// import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Icon } from "solid-heroicons";
import { magnifyingGlass } from "solid-heroicons/outline";
// import { createUrl } from 'lib/utils';

import { createEffect, createSignal } from "solid-js";
import { useNavigate, useSearchParams } from "solid-start";
import { createUrl } from "~/lib/utils";

export default function Search() {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const [searchValue, setSearchValue] = createSignal("");

	// createEffect(() => {
	//   setSearchValue(searchParams.q || '');
	// });

	function update(newValue: string) {
		if (newValue.length && newValue !== searchValue()) {
			setSearchValue(newValue);
			const newParams = new URLSearchParams({ ...searchParams, q: searchValue() });
			navigate(createUrl("/search", newParams));
		}
	}

	const debouncedUpdate = debounce(update, 500);

	return (
		<form
			autocomplete="off"
			onSubmit={(e) => e.preventDefault()}
			class="w-max-[550px] relative w-full lg:w-80 xl:w-full"
		>
			<input
				type="text"
				name="q"
				placeholder="Search for products..."
				autocomplete="off"
				value={searchValue()}
				onInput={(e) => debouncedUpdate(e.currentTarget.value)}
				onKeyUp={(e) => {
					e.preventDefault();
					if (e.key === "Enter") {
						debouncedUpdate.clear();
						update(e.currentTarget.value);
					}
				}}
				class="w-full rounded-lg border bg-white px-4 py-2 text-sm text-black placeholder:text-neutral-500 dark:border-neutral-800 dark:bg-transparent dark:text-white dark:placeholder:text-neutral-400"
			/>
			<div class="absolute right-0 top-0 mr-3 flex h-full items-center">
				<Icon path={magnifyingGlass} class="h-4" />
			</div>
		</form>
	);
}
