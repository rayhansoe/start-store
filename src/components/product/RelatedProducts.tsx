import { A } from "solid-start";
import { GridTileImage } from "../grid/tile";
import { createServerData$ } from "solid-start/server";
import { Show } from "solid-js";
import { Suspense } from "../solid/Suspense";
import { Product } from "~/lib/shopify/types";

export function RelatedProducts(props: {
	id?: string;
	relatedProducts?: Product[];
}) {
	// console.log("outside server function, component level", Date.now());
	// const relatedProducts = createServerData$(
	// 	async ([id]) => {
	// 		console.log("inside server function, component level", Date.now());
	// 		console.log(id);

	// 		try {
	// 			return new Promise(
	// 				(
	// 					res: (value: {
	// 						products: [
	// 							{
	// 								slug: "product-1";
	// 								featuredImage: {
	// 									url: "https://cdn.shopify.com/s/files/1/0614/5753/1058/products/mesh-back-trucker-cap-navy-front-62cd94b2acb05.png?v=1657640123";
	// 								};
	// 								title: "Acme Circles T-Shirt";
	// 								priceRange: { maxVariantPrice: { amount: ""; currencyCode: "USD" } };
	// 							},
	// 							{
	// 								slug: "product-2";
	// 								featuredImage: {
	// 									url: "https://cdn.shopify.com/s/files/1/0614/5753/1058/products/womens-cropped-sweatshirt-navy-front-62cf042c4ceaa.png?v=1657734192";
	// 								};
	// 								title: "Acme Drawstring Bag";
	// 								priceRange: { maxVariantPrice: { amount: ""; currencyCode: "USD" } };
	// 							},
	// 							{
	// 								slug: "product-3";
	// 								featuredImage: {
	// 									url: "https://cdn.shopify.com/s/files/1/0614/5753/1058/products/unisex-crew-neck-sweatshirt-navy-front-62cf0830c76a1.png?v=1657735233";
	// 								};
	// 								title: "Acme Cup";
	// 								priceRange: { maxVariantPrice: { amount: ""; currencyCode: "USD" } };
	// 							},
	// 						];
	// 					}) => void
	// 				) => {
	// 					setTimeout(
	// 						() =>
	// 							res({
	// 								products: [
	// 									{
	// 										slug: "product-1",
	// 										featuredImage: {
	// 											url: "https://cdn.shopify.com/s/files/1/0614/5753/1058/products/mesh-back-trucker-cap-navy-front-62cd94b2acb05.png?v=1657640123",
	// 										},
	// 										title: "Acme Circles T-Shirt",
	// 										priceRange: { maxVariantPrice: { amount: "", currencyCode: "USD" } },
	// 									},
	// 									{
	// 										slug: "product-2",
	// 										featuredImage: {
	// 											url: "https://cdn.shopify.com/s/files/1/0614/5753/1058/products/womens-cropped-sweatshirt-navy-front-62cf042c4ceaa.png?v=1657734192",
	// 										},
	// 										title: "Acme Drawstring Bag",
	// 										priceRange: { maxVariantPrice: { amount: "", currencyCode: "USD" } },
	// 									},
	// 									{
	// 										slug: "product-3",
	// 										featuredImage: {
	// 											url: "https://cdn.shopify.com/s/files/1/0614/5753/1058/products/unisex-crew-neck-sweatshirt-navy-front-62cf0830c76a1.png?v=1657735233",
	// 										},
	// 										title: "Acme Cup",
	// 										priceRange: { maxVariantPrice: { amount: "", currencyCode: "USD" } },
	// 									},
	// 								],
	// 							}),
  //               2000
	// 					);
	// 				}
	// 			);
	// 		} catch (error) {
	// 			throw new Error("Data not available");
	// 		}
	// 	},
	// 	{
	// 		key: () => ["product", props.id],
  //     // initialValue: {products: props.relatedProducts},
  //     // ssrLoadFrom: "initial"
	// 	}
	// );

	return (
		<Suspense fallback={<h1>Loading related products</h1>}>
			<Show when={props.relatedProducts}>
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
