import { Show } from "solid-js";
import {
	ErrorBoundary,
	RouteDataArgs,
	createRouteData,
	useRouteData,
	useSearchParams,
} from "solid-start";
import server$, { createServerData$ } from "solid-start/server";
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
				// console.log(product);
				// console.log("inside server function, route level", Date.now());
				return {product, relatedProducts: await getProductRecommendations(product.id)};
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
		<main>
			<div class="mx-auto max-w-screen-2xl px-4">
				<ErrorBoundary fallback={(e) => <span>{e}</span>}>
					<Suspense fallback={<h1>Loading product data...</h1>}>
						<Show when={data()}>
							{(data) => (
								<div class="flex flex-col rounded-lg border border-neutral-200 bg-white p-8 dark:border-neutral-800 dark:bg-black md:p-12 lg:flex-row">
									<div class="h-full w-full basis-full lg:basis-4/6">
									<GalleryWrapper
										images={data()?.product.images?.map(
											(image: Image) => ({
												src: image.url,
												altText: image.altText,
											})
										)}
										params={params}
									>
										<ProductImage
											params={params}
											images={data()?.product.images?.map(
												(image: Image) => ({
													src: image.url,
													altText: image.altText,
												})
											)}
										/>
									</GalleryWrapper>
									<ImageSelector
										params={params}
										images={data()?.product.images?.map(
											(image: Image) => ({
												src: image.url,
												altText: image.altText,
											})
										)}
									/>
								</div>

								<div class='basis-full lg:basis-2/6'>
									<ProductDescription product={data().product} params={params} />

									{/* Baru */}
								</div>
								</div>
							)}
						</Show>
					</Suspense>
				</ErrorBoundary>
				<Suspense fallback={<h1>Loading Related Products Data...</h1>}>
					<Show when={data()}>
						{(relatedProducts) => (
							<RelatedProducts
								relatedProducts={relatedProducts().relatedProducts}
							/>
						)}
					</Show>
				</Suspense>
			</div>
		</main>
	);
}
