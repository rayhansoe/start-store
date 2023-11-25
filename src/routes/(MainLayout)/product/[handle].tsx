import { For, Show } from "solid-js";
import {
	A,
	RouteDataArgs,
	Title,
	createRouteData,
	useRouteData,
	useSearchParams,
} from "solid-start";
import { HttpHeader } from "solid-start/server";
import { GridTileImage } from "~/components/grid/tile";
import { GalleryWrapper } from "~/components/product/GalleryWrapper";
import ProductImage from "~/components/product/Image";
import ImageSelector from "~/components/product/image-selector";
import { ProductDescription } from "~/components/product/product-description";
import { Suspense } from "~/components/solid/Suspense";
import { Image, Product } from "~/lib/shopify/types";
import { API_URL } from "~/lib/utils";

export function routeData({ params }: RouteDataArgs) {
	// console.log("outside server function, route level", Date.now());
	const product = createRouteData(
		async ([handle]) =>
			(
				await fetch(`${API_URL}/api/products/${handle}`)
			).json() as Promise<Product>,
		{
			key: () => [params.handle],
			deferStream: true,
		}
	);

	const relatedProducts = createRouteData(
		async ([handle]) =>
			(await fetch(`${API_URL}/api/products/${handle}/related`)).json() as Promise<
				Product[]
			>,
		{
			key: () => [params.handle],
		}
	);

	return { product, relatedProducts };
}

export default function ProductPage() {
	const { product, relatedProducts } = useRouteData<typeof routeData>();
	const [params] = useSearchParams();

	return (
		<>
			<main>
				<Title>{product()?.seo?.title || product()?.title}</Title>
				<HttpHeader
					name="Cache-Control"
					value="max-age=15, stale-while-revalidate"
				/>
				<HttpHeader
					name="CDN-Cache-Control"
					value="max-age=15, stale-while-revalidate"
				/>
				<HttpHeader
					name="Vercel-CDN-Cache-Control"
					value="max-age=15, stale-while-revalidate"
				/>
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
						<Show when={product()}>
							{(product) => (
								<>
									{/* <Title>
										{(product().seo.title || product().title) + " | Start Store"}
									</Title>
									<Meta
										name="description"
										content={product().seo.description || product().description}
									/> */}
									<div class="flex flex-col rounded-lg border border-neutral-200 bg-white p-8 dark:border-neutral-800 dark:bg-black md:p-12 lg:flex-row">
										<div class="h-full w-full basis-full lg:basis-4/6">
											<GalleryWrapper
												images={product()?.images?.map((image: Image) => ({
													src: image.url,
													altText: image.altText,
												}))}
												params={params}
											>
												<ProductImage
													params={params}
													images={product()?.images?.map((image: Image) => ({
														src: image.url,
														altText: image.altText,
													}))}
												/>
											</GalleryWrapper>
											<ImageSelector
												params={params}
												images={product()?.images?.map((image: Image) => ({
													src: image.url,
													altText: image.altText,
												}))}
											/>
										</div>

										<div class="basis-full lg:basis-2/6">
											<ProductDescription product={product()} params={params} />

											{/* Baru */}
										</div>
									</div>
									{/* <RelatedProducts id={product().id} /> */}
								</>
							)}
						</Show>
					</Suspense>
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
						<Show
							when={relatedProducts()}
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
							{(relatedProducts) => (
								<>
									<div class="py-8">
										<h2 class="mb-4 text-2xl font-bold">Related Products</h2>
										<ul class="flex w-full gap-4 overflow-x-auto pt-1 pb-2">
											{relatedProducts().map((product) => (
												<li class="aspect-square w-full flex-none min-[475px]:w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5">
													<A
														class="relative h-full w-full"
														href={`/product/${product.handle}`}
													>
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
				</div>
			</main>
		</>
	);
}
