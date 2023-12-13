import { Show } from "solid-js";
import {
	RouteDataArgs,
	createRouteData,
	useLocation,
	useRouteData,
	useSearchParams,
} from "solid-start";
import { createServerData$ } from "solid-start/server";
import Grid, { GridItem } from "~/components/grid";
import ProductGridItems from "~/components/layout/product-grid-items";
import { Suspense } from "~/components/solid/Suspense";
import { defaultSort, sorting } from "~/lib/constants";
import { getSearchData } from "~/lib/rpc/search";
import { getProducts } from "~/lib/shopify";
import { Product } from "~/lib/shopify/types";
import { API_URL, createUrl } from "~/lib/utils";

export function routeData({ params, location }: RouteDataArgs) {
	const search = createRouteData<Product[], string[]>(
		async ([sort, q]) => {
			const res = (await getSearchData(sort, q)) as Response | Product[];
			if (res instanceof Response) {
				return await res.json();
			}
			return res;
		},
		{
			key: () => [location.query["sort"], location.query["q"]],
		}
	);
	return search;
}

export default function SearchPage() {
	const products = useRouteData<typeof routeData>();
	const [params] = useSearchParams();

	return (
		<>
			<main>
				<Suspense
					fallback={
						<Grid className="grid grid-flow-row gap-4 grid-cols-2 lg:grid-cols-3 ">
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
										<Grid class="grid-cols-1 sm:grid grid-flow-row gap-4 lg:grid-cols-3 ">
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
