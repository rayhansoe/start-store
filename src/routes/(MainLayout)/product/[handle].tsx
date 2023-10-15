import { For, Show } from "solid-js";
import {
	ErrorBoundary,
	RouteDataArgs,
	Title,
	createRouteData,
	useRouteData,
	useSearchParams,
} from "solid-start";
import server$, { createServerData$ } from "solid-start/server";
import { CarouselLoading } from "~/components/carousel-loading";
import { GalleryWrapper } from "~/components/product/GalleryWrapper";
import ProductImage from "~/components/product/Image";
import { RelatedProducts } from "~/components/product/RelatedProducts";
import { Gallery } from "~/components/product/gallery";
import ImageSelector from "~/components/product/image-selector";
import { ProductDescription } from "~/components/product/product-description";
import { Suspense } from "~/components/solid/Suspense";
import { getProduct, getProductRecommendations } from "~/lib/shopify";
import { Image } from "~/lib/shopify/types";

export function routeData({ params }: RouteDataArgs) {
	// console.log("outside server function, route level", Date.now());
	const data = createServerData$(
		async ([handle]) => {
			// console.log("inside server function, route level", Date.now());
			// console.log("handle: ", handle);

			try {
				const product = await getProduct(handle);
				const relatedProducts = await getProductRecommendations(product.id);
				return { product, relatedProducts };
			} catch (error) {
				throw new Error("Data not available");
			}
		},
		{
			deferStream: false,
			key: () => [params?.handle],
		}
	);

	return data;
}

export default function ProductPage() {
	const data = useRouteData<typeof routeData>();
	const [params] = useSearchParams();

	return (
		<>
			<main>
				<div class="mx-auto max-w-screen-2xl px-4">
					<Suspense
						fallback={
							<>
								<div class="flex flex-col rounded-lg border animate-pulse border-neutral-200 bg-white p-8 dark:border-neutral-800 dark:bg-black md:p-12 lg:flex-row">
									<div class="h-full w-full basis-full lg:basis-4/6">
										<div class="relative aspect-square h-full max-h-[550px] w-full overflow-hidden"></div>
									</div>
									<div class="basis-full lg:basis-2/6"></div>
								</div>
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
							</>
						}
					>
						<Show when={data()}>
							{(data) => (
								<>
									{/* <Title title={data().product.title} /> */}
									<div class="flex flex-col rounded-lg border border-neutral-200 bg-white p-8 dark:border-neutral-800 dark:bg-black md:p-12 lg:flex-row">
										<div class="h-full w-full basis-full lg:basis-4/6">
											<GalleryWrapper
												images={data()?.product.images?.map((image: Image) => ({
													src: image.url,
													altText: image.altText,
												}))}
												params={params}
											>
												<ProductImage
													params={params}
													images={data()?.product.images?.map((image: Image) => ({
														src: image.url,
														altText: image.altText,
													}))}
												/>
											</GalleryWrapper>
											<ImageSelector
												params={params}
												images={data()?.product.images?.map((image: Image) => ({
													src: image.url,
													altText: image.altText,
												}))}
											/>
										</div>

										<div class="basis-full lg:basis-2/6">
											<ProductDescription product={data().product} params={params} />

											{/* Baru */}
										</div>
									</div>
									<RelatedProducts relatedProducts={data().relatedProducts} />
								</>
							)}
						</Show>
					</Suspense>
				</div>
			</main>
		</>
	);
}
