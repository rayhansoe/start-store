import { Show, createEffect, createResource } from "solid-js";
import { createRouteData, useRouteData } from "solid-start";
import server$, {
	HttpHeader,
	createServerData$,
	json,
	useRequest,
} from "solid-start/server";
import { Carousel } from "~/components/carousel";
import { CarouselLoading } from "~/components/carousel-loading";
import { ThreeItemGridLoading } from "~/components/grid/loading";
import { ThreeItemGrid } from "~/components/grid/three-items";
import { Suspense } from "~/components/solid/Suspense";
import { productsFetcher } from "~/lib/rpc/products";
import { getCollectionProducts } from "~/lib/shopify";
import { Product } from "~/lib/shopify/types";
import { API_URL } from "~/lib/utils";

const products = server$(async () => {
	try {
		const event = useRequest();
		// const res = await fetch(`${API_URL}/api/products`);
		// const products = (await res.json()) as Product[];
		const products = await getCollectionProducts({
			collection: "automated-collection",
		});

		if (event.responseHeaders) {
			event.responseHeaders.set(
				"Cache-Control",
				"max-age=15, stale-while-revalidate"
			);
			event.responseHeaders.set(
				"CDN-Cache-Control",
				"max-age=15, stale-while-revalidate"
			);
			event.responseHeaders.set(
				"Vercel-CDN-Cache-Control",
				"max-age=15, stale-while-revalidate"
			);
		}

		return json(products, {
			headers: new Headers({
				"Cache-Control": "max-age=15, stale-while-revalidate",
				"CDN-Cache-Control": "max-age=15, stale-while-revalidate",
				"Vercel-CDN-Cache-Control": "max-age=15, stale-while-revalidate",
			}),
		});
	} catch (error) {
		throw new Error("Data not available");
	}
});

export function routeData() {
	const getProducts = createRouteData<Product[], true>(
		async () => {
			const res = (await productsFetcher()) as Response | Product[];
			if (res instanceof Response) {
				return await res.json();
			}
			return res;
		},
		{
			deferStream: false,
		}
	);

	return getProducts;
}

export default function Page() {
	const products = useRouteData<typeof routeData>();
	return (
		<main>
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
			<Suspense
				fallback={
					<>
						<ThreeItemGridLoading />
						<CarouselLoading />
					</>
				}
			>
				<Show when={products()}>
					{(products) => (
						<>
							<ThreeItemGrid
								firstProduct={products()[0]}
								secondProduct={products()[1]}
								thirdProduct={products()[2]}
							/>
							<Carousel products={products()} />
						</>
					)}
				</Show>
			</Suspense>
		</main>
	);
}
