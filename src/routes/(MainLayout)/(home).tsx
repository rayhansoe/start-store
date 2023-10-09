import { Show, Suspense, createMemo } from "solid-js";
import { createRouteData, useRouteData } from "solid-start";
import server$, { createServerData$ } from "solid-start/server";
import { Carousel } from "~/components/carousel";
import { ThreeItemGrid } from "~/components/grid/three-items";

export function routeData() {
	// const data = createRouteData(server$(async () => {
	// 	try {
	// 		// const data = await fetch('http://localhost:3000/api/getProducts')
	// 		// const products = await data.json()

	// 		// if (!products.products) {
	// 		//   throw new Error("Data not available");
	// 		// } else {
	// 		//   console.log('DATA: ',products);

	// 		//   return products;
	// 		// }

	// 		// return new Promise(
	// 		// 	(
	// 		// 		resolve: (value: {
	// 		// 			products: [
	// 		// 				{
	// 		// 					slug: "product-1";
	// 		// 					featuredImage: {
	// 		// 						url: "https://cdn.shopify.com/s/files/1/0614/5753/1058/products/mesh-back-trucker-cap-navy-front-62cd94b2acb05.png?v=1657640123";
	// 		// 					};
	// 		// 					title: "Acme Circles T-Shirt";
	// 		// 					priceRange: { maxVariantPrice: { amount: ""; currencyCode: "USD" } };
	// 		// 				},
	// 		// 				{
	// 		// 					slug: "product-2";
	// 		// 					featuredImage: {
	// 		// 						url: "https://cdn.shopify.com/s/files/1/0614/5753/1058/products/womens-cropped-sweatshirt-navy-front-62cf042c4ceaa.png?v=1657734192";
	// 		// 					};
	// 		// 					title: "Acme Drawstring Bag";
	// 		// 					priceRange: { maxVariantPrice: { amount: ""; currencyCode: "USD" } };
	// 		// 				},
	// 		// 				{
	// 		// 					slug: "product-3";
	// 		// 					featuredImage: {
	// 		// 						url: "https://cdn.shopify.com/s/files/1/0614/5753/1058/products/unisex-crew-neck-sweatshirt-navy-front-62cf0830c76a1.png?v=1657735233";
	// 		// 					};
	// 		// 					title: "Acme Cup";
	// 		// 					priceRange: { maxVariantPrice: { amount: ""; currencyCode: "USD" } };
	// 		// 				},
	// 		// 			];
	// 		// 		}) => void
	// 		// 	) => {
	// 		// 		setTimeout(
	// 		// 			() =>
	// 		// 				resolve({
	// 		// 					products: [
	// 		// 						{
	// 		// 							slug: "product-1",
	// 		// 							featuredImage: {
	// 		// 								url: "https://cdn.shopify.com/s/files/1/0614/5753/1058/products/mesh-back-trucker-cap-navy-front-62cd94b2acb05.png?v=1657640123",
	// 		// 							},
	// 		// 							title: "Acme Circles T-Shirt",
	// 		// 							priceRange: { maxVariantPrice: { amount: "", currencyCode: "USD" } },
	// 		// 						},
	// 		// 						{
	// 		// 							slug: "product-2",
	// 		// 							featuredImage: {
	// 		// 								url: "https://cdn.shopify.com/s/files/1/0614/5753/1058/products/womens-cropped-sweatshirt-navy-front-62cf042c4ceaa.png?v=1657734192",
	// 		// 							},
	// 		// 							title: "Acme Drawstring Bag",
	// 		// 							priceRange: { maxVariantPrice: { amount: "", currencyCode: "USD" } },
	// 		// 						},
	// 		// 						{
	// 		// 							slug: "product-3",
	// 		// 							featuredImage: {
	// 		// 								url: "https://cdn.shopify.com/s/files/1/0614/5753/1058/products/unisex-crew-neck-sweatshirt-navy-front-62cf0830c76a1.png?v=1657735233",
	// 		// 							},
	// 		// 							title: "Acme Cup",
	// 		// 							priceRange: { maxVariantPrice: { amount: "", currencyCode: "USD" } },
	// 		// 						},
	// 		// 					],
	// 		// 				}),
	// 		// 			500
	// 		// 		);
	// 		// 	}
	// 		// );
	// 		return {
	// 			products: [
	// 				{
	// 					slug: "product-1",
	// 					featuredImage: {
	// 						url: "https://cdn.shopify.com/s/files/1/0614/5753/1058/products/mesh-back-trucker-cap-navy-front-62cd94b2acb05.png?v=1657640123",
	// 					},
	// 					title: "Acme Circles T-Shirt",
	// 					priceRange: { maxVariantPrice: { amount: "", currencyCode: "USD" } },
	// 				},
	// 				{
	// 					slug: "product-2",
	// 					featuredImage: {
	// 						url: "https://cdn.shopify.com/s/files/1/0614/5753/1058/products/womens-cropped-sweatshirt-navy-front-62cf042c4ceaa.png?v=1657734192",
	// 					},
	// 					title: "Acme Drawstring Bag",
	// 					priceRange: { maxVariantPrice: { amount: "", currencyCode: "USD" } },
	// 				},
	// 				{
	// 					slug: "product-3",
	// 					featuredImage: {
	// 						url: "https://cdn.shopify.com/s/files/1/0614/5753/1058/products/unisex-crew-neck-sweatshirt-navy-front-62cf0830c76a1.png?v=1657735233",
	// 					},
	// 					title: "Acme Cup",
	// 					priceRange: { maxVariantPrice: { amount: "", currencyCode: "USD" } },
	// 				},
	// 			],
	// 		}
	// 	} catch (error) {
	// 		throw new Error("Data not available");
	// 	}
	// }));
	const status = createMemo(() => import.meta.env.START_ISLANDS_ROUTER && !import.meta.env.SSR ? false : true)
	const data = createServerData$(async () => {
		try {
			// const data = await fetch('http://localhost:3000/api/getProducts')
			// const products = await data.json()

			// if (!products.products) {
			//   throw new Error("Data not available");
			// } else {
			//   console.log('DATA: ',products);

			//   return products;
			// }

			// return new Promise(
			// 	(
			// 		resolve: (value: {
			// 			products: [
			// 				{
			// 					slug: "product-1";
			// 					featuredImage: {
			// 						url: "https://cdn.shopify.com/s/files/1/0614/5753/1058/products/mesh-back-trucker-cap-navy-front-62cd94b2acb05.png?v=1657640123";
			// 					};
			// 					title: "Acme Circles T-Shirt";
			// 					priceRange: { maxVariantPrice: { amount: ""; currencyCode: "USD" } };
			// 				},
			// 				{
			// 					slug: "product-2";
			// 					featuredImage: {
			// 						url: "https://cdn.shopify.com/s/files/1/0614/5753/1058/products/womens-cropped-sweatshirt-navy-front-62cf042c4ceaa.png?v=1657734192";
			// 					};
			// 					title: "Acme Drawstring Bag";
			// 					priceRange: { maxVariantPrice: { amount: ""; currencyCode: "USD" } };
			// 				},
			// 				{
			// 					slug: "product-3";
			// 					featuredImage: {
			// 						url: "https://cdn.shopify.com/s/files/1/0614/5753/1058/products/unisex-crew-neck-sweatshirt-navy-front-62cf0830c76a1.png?v=1657735233";
			// 					};
			// 					title: "Acme Cup";
			// 					priceRange: { maxVariantPrice: { amount: ""; currencyCode: "USD" } };
			// 				},
			// 			];
			// 		}) => void
			// 	) => {
			// 		setTimeout(
			// 			() =>
			// 				resolve({
			// 					products: [
			// 						{
			// 							slug: "product-1",
			// 							featuredImage: {
			// 								url: "https://cdn.shopify.com/s/files/1/0614/5753/1058/products/mesh-back-trucker-cap-navy-front-62cd94b2acb05.png?v=1657640123",
			// 							},
			// 							title: "Acme Circles T-Shirt",
			// 							priceRange: { maxVariantPrice: { amount: "", currencyCode: "USD" } },
			// 						},
			// 						{
			// 							slug: "product-2",
			// 							featuredImage: {
			// 								url: "https://cdn.shopify.com/s/files/1/0614/5753/1058/products/womens-cropped-sweatshirt-navy-front-62cf042c4ceaa.png?v=1657734192",
			// 							},
			// 							title: "Acme Drawstring Bag",
			// 							priceRange: { maxVariantPrice: { amount: "", currencyCode: "USD" } },
			// 						},
			// 						{
			// 							slug: "product-3",
			// 							featuredImage: {
			// 								url: "https://cdn.shopify.com/s/files/1/0614/5753/1058/products/unisex-crew-neck-sweatshirt-navy-front-62cf0830c76a1.png?v=1657735233",
			// 							},
			// 							title: "Acme Cup",
			// 							priceRange: { maxVariantPrice: { amount: "", currencyCode: "USD" } },
			// 						},
			// 					],
			// 				}),
			// 			500
			// 		);
			// 	}
			// );
			return {
				products: [
					{
						slug: "product-1",
						featuredImage: {
							url: "https://cdn.shopify.com/s/files/1/0614/5753/1058/products/mesh-back-trucker-cap-navy-front-62cd94b2acb05.png?v=1657640123",
						},
						title: "Acme Circles T-Shirt",
						priceRange: { maxVariantPrice: { amount: "", currencyCode: "USD" } },
					},
					{
						slug: "product-2",
						featuredImage: {
							url: "https://cdn.shopify.com/s/files/1/0614/5753/1058/products/womens-cropped-sweatshirt-navy-front-62cf042c4ceaa.png?v=1657734192",
						},
						title: "Acme Drawstring Bag",
						priceRange: { maxVariantPrice: { amount: "", currencyCode: "USD" } },
					},
					{
						slug: "product-3",
						featuredImage: {
							url: "https://cdn.shopify.com/s/files/1/0614/5753/1058/products/unisex-crew-neck-sweatshirt-navy-front-62cf0830c76a1.png?v=1657735233",
						},
						title: "Acme Cup",
						priceRange: { maxVariantPrice: { amount: "", currencyCode: "USD" } },
					},
				],
			}
		} catch (error) {
			throw new Error("Data not available");
		}
	}, {
		// deferStream: import.meta.env.START_ISLANDS_ROUTER && !import.meta.env.SSR ? false : true,
		deferStream: false,
	});
	console.log(status());
	
	return data;
}

export default function Page() {
	const data = useRouteData<typeof routeData>();
	return (
		<main  >
			<Suspense fallback={<div>Loading...</div>}>
				<Show when={data()}>
					{(products) => (
						<>
							<ThreeItemGrid
								firstProduct={products()?.products[0]}
								secondProduct={products()?.products[1]}
								thirdProduct={products()?.products[2]}
							/>
							<Carousel products={data()?.products} />
						</>
					)}
				</Show>
				{/* <Show when={trendingMoviesShown}></Show> */}
			</Suspense>
		</main>
	);
}
