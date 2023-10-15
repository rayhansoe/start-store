import { Show, createMemo } from "solid-js";
import { createRouteData, useRouteData } from "solid-start";
import server$, { createServerData$ } from "solid-start/server";
import { Carousel } from "~/components/carousel";
import { CarouselLoading } from "~/components/carousel-loading";
import { ThreeItemGridLoading } from "~/components/grid/loading";
import { ThreeItemGrid } from "~/components/grid/three-items";
import { Suspense } from "~/components/solid/Suspense";
import { getCollectionProducts } from "~/lib/shopify";

export function routeData() {
	// console.log('outside server function, route level', Date.now());
	const data = createServerData$(
		async () => {
			// console.log('inside server function, route level', Date.now());

			try {
				const homepageItems = await getCollectionProducts({
					collection: "automated-collection",
				});
				// console.log(homepageItems);
				// console.log('inside server function, route level', Date.now());
				return homepageItems;
			} catch (error) {
				throw new Error("Data not available");
			}
		},
		{
			deferStream: false,
		}
	);

	return data;
}

export default function Page() {
	const data = useRouteData<typeof routeData>();
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
				<Show when={data()}>
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
