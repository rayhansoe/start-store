import { A, refetchRouteData } from "solid-start";
import { GridTileImage } from "../grid/tile";
import { createServerData$ } from "solid-start/server";
import { For, Show, createMemo, createSignal, onMount } from "solid-js";
import { Suspense } from "../solid/Suspense";
import { Product } from "~/lib/shopify/types";
import { getProductRecommendations } from "~/lib/shopify";
import { isServer } from "solid-js/web";

export function RelatedProducts(props: {
	id: string;
	relatedProducts?: Product[];
}) {
	// console.log("outside server function, component level", Date.now());
	const [id, setId] = createSignal("");
	const relatedProducts = createServerData$(
		async (id) => {
			// console.log("inside server function, route level", Date.now());
			// console.log("handle: ", handle);

			try {
				const relatedProducts = getProductRecommendations(id);
				return relatedProducts;
			} catch (error) {
				throw new Error("Data not available");
			}
		},
		{
			key: () => id(),
			initialValue: undefined,
			ssrLoadFrom: "initial",
		}
	);

	onMount(() => {
		setId(props.id);
	});

	return (
		<Suspense
			fallback={
				<div class="py-8">
					<h2 class="mb-4 text-2xl font-bold">Related Products</h2>
					<ul class="flex w-full gap-4 overflow-x-auto pt-1">
						<For each={Array(8).fill(0)}>
							{() => (
								<li class="aspect-square w-full flex-none min-[475px]:w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5">
									<span class="relative h-full w-full">
										<div class="group flex h-full w-full items-center animate-pulse justify-center overflow-hidden rounded-lg bg-white dark:bg-black/90"></div>
									</span>
								</li>
							)}
						</For>
					</ul>
				</div>
			}
		>
			<Show when={relatedProducts()}>
				{(relatedProducts) => (
					<>
						<div class="py-8">
							<h2 class="mb-4 text-2xl font-bold">Related Products</h2>
							<ul class="flex w-full gap-4 overflow-x-auto pt-1">
								{relatedProducts().map((product) => (
									<li class="aspect-square w-full flex-none min-[475px]:w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5">
										<A class="relative h-full w-full" href={`/product/${product.handle}`}>
											<GridTileImage
												alt={product.title}
												label={{
													title: product.title,
													amount: product.priceRange.maxVariantPrice.amount,
													currencyCode: product.priceRange.maxVariantPrice.currencyCode,
												}}
												src={product.featuredImage?.url}
												sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
											/>
										</A>
									</li>
								))}
							</ul>
						</div>
					</>
				)}
			</Show>
		</Suspense>
	);
}
