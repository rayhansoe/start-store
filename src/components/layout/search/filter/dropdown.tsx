"use client";

import { Icon } from "solid-heroicons";
// import { ChevronDownIcon } from '@heroicons/react/24/outline';
import type { ListItem } from ".";
import { FilterItem } from "./item";
import { For, Show, createEffect, createMemo, createSignal } from "solid-js";
import { useLocation } from "solid-start";
import { chevronDown } from "solid-heroicons/outline";

export default function FilterItemDropdown(props: { list: ListItem[] }) {
	const { pathname, query } = useLocation();
	const [active, setActive] = createSignal("");
	const [openSelect, setOpenSelect] = createSignal(false);
	let ref: HTMLDivElement;

	createEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (ref && !ref.contains(event.target as Node)) {
				setOpenSelect(false);
			}
		};

		window.addEventListener("click", handleClickOutside);
		return () => window.removeEventListener("click", handleClickOutside);
	});

	const titleActive = createMemo(() => {
		props.list.forEach((listItem: ListItem) => {
			if (("slug" in listItem && !query["sort"] && !listItem.slug)) {
				setActive(listItem.title)
			}
			if (
				("path" in listItem && pathname === listItem.path) ||
				("slug" in listItem && query["sort"] === listItem.slug)
			) {
				// console.log(props.list);
				// console.log(listItem.title);
				// console.log(listItem);

				setActive(listItem.title);
			}
		});
		return active();
	});

	return (
		<div class="relative" ref={ref}>
			<div
				onClick={() => {
					setOpenSelect(!openSelect());
				}}
				class="flex w-full items-center justify-between rounded border border-black/30 px-4 py-2 text-sm dark:border-white/30"
			>
				<div>{titleActive()}</div>
				<Icon path={chevronDown} class="h-4" />
			</div>
			<Show when={openSelect()}>
				<div
					onClick={() => {
						setOpenSelect(false);
					}}
					class="absolute z-40 w-full rounded-b-md bg-white p-4 shadow-md dark:bg-black"
				>
					<For each={props.list}>{(item) => <FilterItem item={item} />}</For>
				</div>
			</Show>
		</div>
	);
}
