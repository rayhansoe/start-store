import clsx from "clsx";

export function ThreeGridItemsLoading(props) {
	return (
		<div
			class={
				props.size === "full"
					? "md:col-span-4 md:row-span-2"
					: "md:col-span-2 md:row-span-1"
			}
		>
			<span class="relative block aspect-square h-full w-full">
				<div
					class={clsx(
						"group flex h-full w-full items-center animate-pulse justify-center overflow-hidden rounded-lg bg-white dark:bg-black/90",
						
					)}
				></div>
			</span>
		</div>
	);
}
export function ThreeItemGridLoading() {
	return (
		<section class="mx-auto grid max-w-screen-2xl gap-4 px-4 pb-4 md:grid-cols-6 md:grid-rows-2">
			<ThreeGridItemsLoading size="full" loading="eager" />
			<ThreeGridItemsLoading size="half" loading="eager" />
			<ThreeGridItemsLoading size="half" />
		</section>
	);
}
