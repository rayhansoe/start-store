/* eslint-disable solid/components-return-once */
/* eslint-disable solid/reactivity */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { For } from "solid-js";

export function CarouselLoading() {
	return (
		<div class=" w-full overflow-x-auto pb-6 pt-1">
			<ul class="flex gap-4">
				<For each={Array(4).fill(0)}>
					{() => (
						<li class="relative aspect-square h-[30vh] max-h-[275px] w-2/3 max-w-[475px] flex-none md:w-1/3">
							<span class="relative h-full w-full">
								<div class="group flex h-full w-full items-center animate-pulse justify-center overflow-hidden rounded-lg bg-white dark:bg-black/90"></div>
							</span>
						</li>
					)}
				</For>
			</ul>
		</div>
	);
}
