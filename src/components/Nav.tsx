import { For, Show, Suspense } from "solid-js";
import { A } from "solid-start";
import { createServerData$, useRequest } from "solid-start/server";
import CartModal from "~/components/cart/modal";
import OpenCart from "~/components/cart/open-cart";
import MobileMenu from "~/components/layout/navbar/mobile-menu";
import Search from "~/components/layout/navbar/search";
import LogoSquare from "~/components/logo-square";
import { getCartData } from "~/lib/rpc/cart";
import { createCart, getCart } from "~/lib/shopify";
import { getCookieObject } from "~/utils/cookie";

export default function Nav() {
	const cart = createServerData$(
		async (_, { request }) => {
			const event = useRequest();

			let cartId: string | undefined | null;
			// let cart: Cart | undefined;

			if (event.responseHeaders) {
				cartId = getCookieObject(event.request.headers.get("Cookie") || "")?.cartId;

				if (cartId) {
					const cart = await getCart(cartId);
					event.responseHeaders.append(
						"set-cookie",
						`cartId=${cart?.id}; Max-Age=2592000; Path=/; HttpOnly; Secure; SameSite=Lax`
					);

					return cart;
				}

				if (!cartId) {
					const cart = await createCart();

					return cart;
				}
			}

			cartId = getCookieObject(request.headers.get("Cookie") || "")?.cartId;

			if (cartId) {
				const cart = await getCart(cartId);

				return cart;
			}

			if (!cartId) {
				const cart = await createCart();

				return cart;
			}
		},
		{
			key: () => "cart",
		}
	);

	
	const navMenu = [{ title: "All", path: "/search" }];

	return (
		<nav class="relative flex items-center justify-between p-4 lg:px-6">
			<div class="block flex-none md:hidden">
				<MobileMenu menu={navMenu} />
			</div>
			<div class="flex w-full items-center">
				<div class="flex w-full md:w-1/3">
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
						<ul class="hidden gap-6 text-sm md:flex md:items-center">
							<For each={navMenu}>
								{(item) => (
									<li>
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
				<div class="hidden justify-center md:flex md:w-1/3">
					<Search />
				</div>
				<div class="flex justify-end md:w-1/3">
					<Suspense fallback={<OpenCart />}>
						<Show when={cart()}>{(cart) => <CartModal cart={cart()} />}</Show>
					</Suspense>
				</div>
			</div>
		</nav>
	);
}
