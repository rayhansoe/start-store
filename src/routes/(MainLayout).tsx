import { For, Show } from "solid-js";
import { A, Outlet, useRouteData } from "solid-start";
import { createServerData$, useRequest } from "solid-start/server";
import Footer from "~/components/Footer";
import MobileMenu from "~/components/layout/navbar/mobile-menu";
import LogoSquare from "~/components/logo-square";
import CartModal from "~/components/cart/modal";
import OpenCart from "~/components/cart/open-cart";
import Search from "~/components/layout/navbar/search";
import { Suspense } from "~/components/solid/Suspense";
import { createCart, getCart } from "~/lib/shopify";
import { getCookieObject } from "~/utils/cookie";
import { CartProvider } from "~/context/CartActionContext";
import Nav from "~/components/Nav";

// export function routeData() {
// 	const cart = createServerData$(
// 		async (_, { request }) => {
// 			const event = useRequest();

// 			let cartId: string | undefined | null;
// 			// let cart: Cart | undefined;

// 			if (event.responseHeaders) {
// 				cartId = getCookieObject(event.request.headers.get("Cookie") || "")?.cartId;

// 				if (cartId) {
// 					const cart = await getCart(cartId);
// 					event.responseHeaders.append(
// 						"set-cookie",
// 						`cartId=${cart?.id}; Max-Age=2592000; Path=/; HttpOnly; Secure; SameSite=Lax`
// 					);

// 					return cart;
// 				}

// 				if (!cartId) {
// 					const cart = await createCart();

// 					return cart;
// 				}
// 			}

// 			cartId = getCookieObject(request.headers.get("Cookie") || "")?.cartId;

// 			if (cartId) {
// 				const cart = await getCart(cartId);

// 				return cart;
// 			}

// 			if (!cartId) {
// 				const cart = await createCart();

// 				return cart;
// 			}
// 		},
// 		{
// 			key: () => "cart",
// 		}
// 	);

// 	return { cart };
// }

export default function MainLayout() {
	const navMenu = [{ title: "All", path: "/search" }];

	return (
		<>
			<CartProvider>
				<Nav />
				{/* <SuspenseList revealOrder="together"> */}
				<Suspense fallback={<h1>Loading...</h1>}>
					<Outlet />
				</Suspense>
				{/* </SuspenseList> */}
				<Footer />
			</CartProvider>
		</>
	);
}
