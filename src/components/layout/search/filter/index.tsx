import { SortFilterItem } from "~/lib/constants";
import FilterItemDropdown from "./dropdown";
import { FilterItem } from "./item";
import { For, Show } from "solid-js";

export type ListItem = SortFilterItem | PathFilterItem;
export type PathFilterItem = { title: string; path: string };

function FilterItemList(props: { list: ListItem[] }) {
	return (
		<>
			<For each={props.list}>{(item) => <FilterItem item={item} />}</For>
		</>
	);
}

export default function FilterList(props: {
	list: ListItem[];
	title?: string;
}) {
	return (
		<>
			<nav>
				<Show when={props.title}>
					<h3 class="hidden text-xs text-neutral-500 md:block">{props.title}</h3>
				</Show>
				<ul class="hidden md:block">
					<FilterItemList list={props.list} />
				</ul>
				<ul class="md:hidden">
					<FilterItemDropdown list={props.list} />
				</ul>
			</nav>
		</>
	);
}
