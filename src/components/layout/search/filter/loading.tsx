import clsx from "clsx";

export default function Loading() {
	const skeleton = "mb-3 h-4 w-5/6 animate-pulse rounded";
	const activeAndTitles = "bg-neutral-800 dark:bg-neutral-300";
	const items = "bg-neutral-400 dark:bg-neutral-700";

	return (
		<div class="col-span-2 hidden h-[400px] w-full flex-none py-4 lg:block">
			<div class={clsx(skeleton, activeAndTitles)} />
			<div class={clsx(skeleton, activeAndTitles)} />
			<div class={clsx(skeleton, items)} />
			<div class={clsx(skeleton, items)} />
			<div class={clsx(skeleton, items)} />
			<div class={clsx(skeleton, items)} />
			<div class={clsx(skeleton, items)} />
			<div class={clsx(skeleton, items)} />
			<div class={clsx(skeleton, items)} />
			<div class={clsx(skeleton, items)} />
		</div>
	);
}
