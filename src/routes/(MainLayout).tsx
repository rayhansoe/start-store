import { For, Show } from "solid-js";
import { A, Outlet, createRouteData, useRouteData } from "solid-start";
import server$, { createServerData$ } from "solid-start/server";
import Footer from "~/components/Footer";
import MobileMenu from "~/components/layout/navbar/mobile-menu";
import LogoSquare from "~/components/logo-square";
import CartModal from "~/components/cart/modal";
import OpenCart from "~/components/cart/open-cart";
import Search from "~/components/layout/navbar/search";
import { SuspenseList } from "~/components/solid/SuspenseList";
import { Suspense } from "~/components/solid/Suspense";

export function routeData() {
	// console.log(
	// 	"Cart Data Log",
	// 	"outside server function, route level",
	// 	Date.now()
	// );

	const data = createServerData$(
		async () => {
			// console.log(
			// 	"Cart Data Log",
			// 	"inside server function, route level",
			// 	Date.now()
			// );
			return {
				cart: {
					totalQuantity: 12,
					checkoutUrl: "/cart",
					cost: {
						subtotalAmount: { amount: "0", currencyCode: "EUR" },
						totalAmount: { amount: "0", currencyCode: "EUR" },
						totalTaxAmount: { amount: "0", currencyCode: "EUR" },
					},
				},
			};
		},
		{
			deferStream: false,
		}
	);
	return data;
}

export default function MainLayout() {
	const data = useRouteData<typeof routeData>();
	const navMenu = [
		{ title: "All", path: "/search" },
		// { title: "Shirts", path: "/search/shirts" },
		// { title: "Merch", path: "/search/merch" },
	];
	return (
		<>
			<nav class="relative flex items-center justify-between p-4 lg:px-6" >
				<div class="block flex-none md:hidden" >
					<MobileMenu menu={navMenu} />
				</div>
				<div class="flex w-full items-center" >
					<div class="flex w-full md:w-1/3" >
						<A
							href="/"
							class="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6"
						>
							<LogoSquare />
							<div class="ml-2 flex-none text-sm font-medium uppercase md:hidden lg:block">
								{import.meta.env.VITE_SITE_NAME}
							</div>
						</A>
						<Show when={navMenu.length}>
							<ul class="hidden gap-6 text-sm md:flex md:items-center" >
								<For each={navMenu}>
									{(item) => (
										<li >
											<A
												href={item.path}
												class="text-neutral-500 underline-offset-4 hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-neutral-300"
											>
												{item.title}
											</A>
										</li>
									)}
								</For>
							</ul>
						</Show>
					</div>
					<div class="hidden justify-center md:flex md:w-1/3" >
						<Search />
					</div>
					<div class="flex justify-end md:w-1/3" >
						<Suspense fallback={<OpenCart />}>
							<Show when={data()}>
								<CartModal cart={data()?.cart} />
							</Show>
						</Suspense>
					</div>
				</div>
			</nav>
			{/* <SuspenseList revealOrder="together"> */}
			<Suspense fallback={<h1>Loading...</h1>}>
				<Outlet />
			</Suspense>
			{/* </SuspenseList> */}
			<Footer />
		</>
	);
}
