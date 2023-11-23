import {
	Accessor,
	Context,
	JSX,
	ParentComponent,
	Setter,
	createContext,
	createEffect,
	createRoot,
	createSignal,
	useContext,
} from "solid-js";
import { FormProps, refetchRouteData } from "solid-start";
import {
	createServerAction$,
	createServerMultiAction$,
	redirect,
} from "solid-start/server";
import {
	addToCart,
	createCart,
	getCart,
	removeFromCart,
	updateCart,
} from "~/lib/shopify";
import { Cart } from "~/lib/shopify/types";
import { getCookieObject } from "~/utils/cookie";
import ScrollContext from "./CartModalContext";
import { Submission } from "solid-start/data/createRouteAction";

type CartActionContextType = {
	addToCartSubmission: {
		pending: boolean;
		input?: FormData;
		result?:
			| "Missing product variant ID"
			| "Error adding item to cart"
			| Response;
		error?: any;
		clear: () => void;
		retry: () => void;
	};
	addToCartFn: ((
		vars: FormData
	) => Promise<
		"Missing product variant ID" | "Error adding item to cart" | Response
	>) & {
		Form: ParentComponent<FormData | FormProps>;
		url: string;
	};
	removeCartItemSubmission: Submission<
		FormData,
		| Response
		| "Missing cart ID"
		| "Error removing item from cart"
		| "Missing product ID"
	>[] & {
		pending: Submission<
			FormData,
			| Response
			| "Missing cart ID"
			| "Missing product ID"
			| "Error removing item from cart"
		>[];
	};
	removeCartItemFn: ((
		vars: FormData
	) => Promise<
		| Response
		| "Missing cart ID"
		| "Error removing item from cart"
		| "Missing product ID"
	>) & {
		Form: ParentComponent<FormData | FormProps>;
		url: string;
	};
	updateItemSubmission: Submission<
		FormData,
		| "Missing cart ID"
		| "Missing product variant ID"
		| Response
		| "Error updating item quantity"
	>[] & {
		pending: Submission<
			FormData,
			| "Missing product variant ID"
			| Response
			| "Missing cart ID"
			| "Error updating item quantity"
		>[];
	};
	updateItemFn: ((
		vars: FormData
	) => Promise<
		| "Missing product variant ID"
		| Response
		| "Missing cart ID"
		| "Error updating item quantity"
	>) & {
		Form: ParentComponent<FormData | FormProps>;
		url: string;
	};
};

const CartActionContext: Context<CartActionContextType> = createContext();

export function CartProvider(props: { children: JSX.Element }) {
	const [addToCartSubmission, addToCartFn] = createServerAction$(
		async (form: FormData, { request }) => {
			const id = form.get("variantId");
			const pathname = form.get("pathname") as string;
			if (typeof id !== "string") {
				return;
			}
			let cartId = getCookieObject(request.headers.get("Cookie") || "")?.cartId;
			let cart: Cart | undefined;

			if (cartId) {
				cart = await getCart(cartId);
			}

			if (!cartId || !cart) {
				cart = await createCart();
				cartId = cart.id;
			}

			if (!id) {
				return "Missing product variant ID";
			}

			try {
				const cartCookie = `cartId=${cart?.id}; Max-Age=2592000; Path=/; HttpOnly; Secure; SameSite=Lax`;

				await addToCart(cartId, [{ merchandiseId: id, quantity: 1 }]);
				return redirect(pathname, {
					headers: new Headers({
						"set-cookie": cartCookie,
					}),
				});
			} catch (e) {
				return "Error adding item to cart";
			}
		}
	);

	const [removeCartItemSubmission, removeCartItemFn] = createServerMultiAction$(
		async (form: FormData, { request }) => {
			const pathname = form.get("pathname") as string;
			const itemId = form.get("itemId");
			if (typeof itemId !== "string") {
				return;
			}

			let cartId = getCookieObject(request.headers.get("Cookie") || "")?.cartId;

			if (!cartId) {
				return "Missing cart ID";
			}

			if (!itemId) {
				return "Missing product ID";
			}

			try {
				await removeFromCart(cartId, [itemId]);
				return redirect(pathname);
			} catch (e) {
				return "Error removing item from cart";
			}
		},
		{
			invalidate: "cart",
		}
	);

	const [updateItemSubmission, updateItemFn] = createServerMultiAction$(
		async (form: FormData, { request }) => {
			const pathname = form.get("pathname") as string;
			const variantId = form.get("variantId");
			const lineId = form.get("lineId");
			const quantity = form.get("quantity");
			if (
				typeof variantId !== "string" ||
				typeof lineId !== "string" ||
				typeof quantity !== "string"
			) {
				return;
			}
			let cartId = getCookieObject(request.headers.get("Cookie") || "")?.cartId;
			let cart: Cart | undefined;

			if (cartId) {
				cart = await getCart(cartId);
			}

			if (!cartId || !cart) {
				cart = await createCart();
				cartId = cart.id;
			}

			if (!cartId) {
				return "Missing cart ID";
			}

			if (!variantId) {
				return "Missing product variant ID";
			}

			try {
				if (parseInt(quantity) === 0) {
					await removeFromCart(cartId, [lineId]);
					return redirect(pathname);
				}

				await updateCart(cartId, [
					{
						id: lineId,
						merchandiseId: variantId,
						quantity: parseInt(quantity),
					},
				]);
				return redirect(pathname);
			} catch (e) {
				return "Error updating item quantity";
			}
		}
	);

	const context = {
		addToCartSubmission,
		addToCartFn,
		removeCartItemSubmission,
		removeCartItemFn,
		updateItemSubmission,
		updateItemFn,
	};

	return (
		<CartActionContext.Provider value={context}>
			{props.children}
		</CartActionContext.Provider>
	);
}

export function useCartActionContext() {
	return useContext(CartActionContext);
}
