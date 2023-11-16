import { Show, createEffect, createMemo, createResource } from "solid-js";
import { createRouteData, useRouteData } from "solid-start";
import server$, {
	createServerData$,
	json,
	useRequest,
} from "solid-start/server";
import { Carousel } from "~/components/carousel";
import { CarouselLoading } from "~/components/carousel-loading";
import { ThreeItemGridLoading } from "~/components/grid/loading";
import { ThreeItemGrid } from "~/components/grid/three-items";
import { Suspense } from "~/components/solid/Suspense";
import { getCollectionProducts } from "~/lib/shopify";
import { Product } from "~/lib/shopify/types";

const getData = server$(async () => {
	const request = useRequest();
	try {
		const homepageItems = await getCollectionProducts({
			collection: "automated-collection",
		});

		if (request.responseHeaders) {
			// Sets headers during page render (ssr)
			request.responseHeaders.append(
				"Cache-Control",
				"max-age=15, stale-while-revalidate"
			);
			request.responseHeaders.set(
				"CDN-Cache-Control",
				"max-age=15, stale-while-revalidate"
			);
			request.responseHeaders.set(
				"Vercel-CDN-Cache-Control",
				"max-age=15, stale-while-revalidate"
			);
		}

		return json(homepageItems, {
			headers: {
				"Cache-Control": "max-age=15, stale-while-revalidate",
				"CDN-Cache-Control": "max-age=15, stale-while-revalidate",
				"Vercel-CDN-Cache-Control": "max-age=15, stale-while-revalidate",
			},
		});
	} catch (error) {
		throw new Error("Data not available");
	}
});

export function routeData() {
	// const data = createServerData$(
	// 	() => {
	// 		const request = useRequest();
	// 		try {
	// 			const homepageItems = getCollectionProducts({
	// 				collection: "automated-collection",
	// 			});

	// 			if (request.responseHeaders) {
	// 				// Sets headers during page render (ssr)
	// 				request.responseHeaders.append('Cache-Control', 'max-age=1, stale-while-revalidate');
	// 			}

	// 			return json('homepageItems', {
	// 				headers: {
	// 					'Cache-Control': 'max-age=1, stale-while-revalidate'
	// 				}
	// 			});

	// 		} catch (error) {
	// 			throw new Error("Data not available");
	// 		}
	// 	},
	// 	{
	// 		deferStream: false,
	// 	}
	// );
	const products = createRouteData(
		 async () => (await fetch('https://start-store.vercel.app/api/getProducts')).json() as  Promise<Product[]>,
		{
			deferStream: true,
		}
	);

	return products;
}

export default function Page() {
	const products = useRouteData<typeof routeData>();
	return (
		<main>
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
