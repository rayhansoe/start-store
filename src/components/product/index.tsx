import { For, Show, Suspense } from "solid-js";
import { GalleryWrapper } from "./GalleryWrapper";
import ProductImage from "./Image";
import ImageSelector from "./image-selector";
import { ProductDescription } from "./product-description";
import { Image, Product as ProductType } from "~/lib/shopify/types";
import { useSearchParams } from "solid-start";
import { getProductByHandler } from "~/lib/rpc/products";
import { createServerData$ } from "solid-start/server";

export function Product(props: { handle?: string }) {
	const product = createServerData$(() => getProductByHandler(props.handle))
	const [params] = useSearchParams();
	return (
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
								{/* <ProductDescription product={product()} params={params} /> */}

								{/* Baru */}
							</div>
						</div>
					</>
				)}
			</Show>
		</Suspense>
	);
}
