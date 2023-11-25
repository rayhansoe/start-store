import { Show } from "solid-js";
import { createRouteData, useRouteData } from "solid-start";
import { HttpHeader } from "solid-start/server";
import { Carousel } from "~/components/carousel";
import { CarouselLoading } from "~/components/carousel-loading";
import { ThreeItemGridLoading } from "~/components/grid/loading";
import { ThreeItemGrid } from "~/components/grid/three-items";
import { Suspense } from "~/components/solid/Suspense";
import { Product } from "~/lib/shopify/types";
import { API_URL } from "~/lib/utils";

export function routeData() {
	const products = createRouteData(
		async () =>
			(await fetch(`${API_URL}/api/products`)).json() as Promise<Product[]>,
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
