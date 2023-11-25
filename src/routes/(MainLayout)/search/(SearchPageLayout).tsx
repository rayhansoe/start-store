import { Show } from "solid-js";
import { Outlet, Title, createRouteData, useRouteData } from "solid-start";
import { HttpHeader, createServerData$ } from "solid-start/server";
import FilterList from "~/components/layout/search/filter";
import Loading from "~/components/layout/search/filter/loading";
import { Suspense } from "~/components/solid/Suspense";
import { sorting } from "~/lib/constants";
import { Collection } from "~/lib/shopify/types";
import { API_URL } from "~/lib/utils";

export function routeData() {
	const collections = createRouteData(
		async () =>
			(await fetch(`${API_URL}/api/search/collections`)).json() as Promise<
				Collection[]
			>,
		{
			deferStream: true,
		}
	);
	return collections;
}

export default function SearchLayout() {
	const collections = useRouteData<typeof routeData>();
	return (
		<>
			<Title>Search | Start Store</Title>

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
			<div class="mx-auto flex max-w-screen-2xl flex-col gap-8 px-4 pb-4 text-black dark:text-white md:flex-row">
				<div class="order-first w-full flex-none md:max-w-[125px]">
					<Suspense fallback={<Loading />}>
						<Show when={collections()}>
							{(collections) => (
								<FilterList list={collections()} title="Collections" />
							)}
						</Show>
					</Suspense>
				</div>
				<div class="order-last min-h-screen w-full md:order-none">
					<Outlet />
				</div>
				<div class="order-none flex-none md:order-last md:w-[125px]">
					<FilterList list={sorting} title="Sort by" />
				</div>
			</div>
		</>
	);
}
