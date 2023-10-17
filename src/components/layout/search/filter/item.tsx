"use client";

import clsx from "clsx";
import { SortFilterItem as SortFilterItemType } from "~/lib/constants";
import { createUrl } from "~/lib/utils";
import type { ListItem, PathFilterItem } from ".";
import { A, useLocation, useSearchParams } from "solid-start";
import { Show, createMemo } from "solid-js";

function PathFilterItem(props: { item: PathFilterItem }) {
	const { pathname, query } = useLocation();
	// const [params, setParams] = useSearchParams();
	const active = () => pathname === props.item.path;
	const newParams = createMemo(() => {
		const newParams = new URLSearchParams(query.toString());
		newParams.delete("q");
		return newParams;
	});
	// const DynamicTag = active ? "p" : A;

	// newParams.delete("q");
	// setParams()

	return (
		<li class="mt-2 flex text-black dark:text-white">
			{/* <DynamicTag
				href={createUrl(item.path, newParams)}
				class={clsx(
					"w-full text-sm underline-offset-4 hover:underline dark:hover:text-neutral-100",
					{
						"underline underline-offset-4": active,
					}
				)}
			>
				{item.title}
			</DynamicTag> */}
			<Show when={active()}>
				<A
					href={createUrl(props.item.path, newParams())}
					class={clsx(
						"w-full text-sm underline-offset-4 hover:underline dark:hover:text-neutral-100",
						{
							"underline underline-offset-4": active,
						}
					)}
				>
					{props.item.title}
				</A>
			</Show>
		</li>
	);
}

function SortFilterItem(props: { item: SortFilterItemType }) {
	const { pathname, query } = useLocation();
	// const [params] = useSearchParams();
	const active = () => query['sort'] === props.item.slug;
	const q = () => query['q'];
	const href = () => createUrl(
		pathname,
		new URLSearchParams({
			...(q() && { q: q() }),
			...(props.item.slug && props.item.slug.length && { sort: props.item.slug }),
		})
	);

	return (
		<li class="mt-2 flex text-sm text-black dark:text-white">
			<Show
				when={active()}
				fallback={
					<A
						href={href()}
						class={clsx("w-full hover:underline hover:underline-offset-4", {
							"underline underline-offset-4": active(),
						})}
					>
						{props.item.title}
					</A>
				}
			>
				<p
					class={clsx("w-full hover:underline hover:underline-offset-4", {
						"underline underline-offset-4": active(),
					})}
				>
					{props.item.title}
				</p>
			</Show>
		</li>
	);
}

export function FilterItem(props: { item: ListItem }) {
	return "path" in props.item ? (
		<PathFilterItem item={props.item} />
	) : (
		<SortFilterItem item={props.item} />
	);
}
