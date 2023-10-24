import { Show } from "solid-js";
import {
	RouteDataArgs,
	useLocation,
	useRouteData,
	useSearchParams,
} from "solid-start";
import { createServerData$ } from "solid-start/server";
import Grid, { GridItem } from "~/components/grid";
import ProductGridItems from "~/components/layout/product-grid-items";
import { Suspense } from "~/components/solid/Suspense";
import { defaultSort, sorting } from "~/lib/constants";
import { getProducts } from "~/lib/shopify";

export function routeData({ params, location }: RouteDataArgs) {
	return createServerData$(
		([sort, q]) => {
			const { sortKey, reverse } =
				sorting.find((item) => item.slug === sort) || defaultSort;

			const products = getProducts({ sortKey, reverse, query: q as string });
			return products;
		},
		{
			key: () => [location.query["sort"], location.query["q"]],
		}
	);
}

export default function SearchPage() {
	// const { sort, q: searchValue } = searchParams as { [key: string]: string };
	// const { sortKey, reverse } = sorting.find((item) => item.slug === sort) || defaultSort;
	// const products = useRouteData<typeof routeData>();
	const [params] = useSearchParams();
	const { query } = useLocation();
	const products = createServerData$(
		([sort, q]) => {
			const { sortKey, reverse } =
				sorting.find((item) => item.slug === sort) || defaultSort;

			const products = getProducts({ sortKey, reverse, query: q as string });
			return products;
		},
		{
			key: () => [params.sort, params.q],
		}
	);

	return (
		<>
			<main >
				<Suspense
					fallback={
						<Grid className="grid-cols-2 lg:grid-cols-3">
							{Array(12)
								.fill(0)
								.map((_, index) => {
									return (
										<GridItem class="animate-pulse bg-neutral-100 dark:bg-neutral-700 rounded-lg" />
									);
								})}
						</Grid>
					}
				>
					<Show when={products()}>
						{(products) => {
							const resultsText = () => (products.length > 1 ? "results" : "result");
							const info = () =>
								products().length === 0
									? "There are no products that match "
									: `Showing ${products().length} ${resultsText()} for `;
							return (
								<>
									<Show when={params.q}>
										<p class="mb-4">
											{info()}
											<span class="font-bold">&quot;{params.q}&quot;</span>
										</p>
									</Show>
									<Show when={products().length > 0} fallback={null}>
										<Grid class="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
											<ProductGridItems products={products()} />
										</Grid>
									</Show>
								</>
							);
						}}
					</Show>
				</Suspense>
			</main>
		</>
	);
}
