"use client";

import clsx from "clsx";
import { Icon } from "solid-heroicons";
import { plusCircle } from "solid-heroicons/outline";
import { createMemo } from "solid-js";
import { useLocation, useSearchParams } from "solid-start";
import {
	createServerAction$,
	createServerMultiAction$,
	redirect,
} from "solid-start/server";
import { Cart, ProductVariant } from "~/lib/shopify/types";
import LoadingDots from "../loading-dots";
import { addToCart, createCart, getCart } from "~/lib/shopify";
import { getCookieObject } from "~/utils/cookie";
const status =
	import.meta.env.START_ISLANDS_ROUTER && !import.meta.env.SSR ? false : true;

function AddToCartIslands(props: {
	variants: ProductVariant[];
	availableForSale: boolean;
}) {
	const [searchParams] = useSearchParams();
	const defaultVariantId = () =>
		props.variants.length === 1 ? props.variants[0]?.id : undefined;
	const variant = createMemo(() =>
		props.variants.find((variant: ProductVariant) =>
			variant.selectedOptions.every(
				(option) => option.value === searchParams[option.name.toLowerCase()]
			)
		)
	);
	const selectedVariantId = () => variant()?.id || defaultVariantId();
	const title = () =>
		!props.availableForSale
			? "Out of stock"
			: !selectedVariantId
			? "Please select options"
			: undefined;
	const location = useLocation();
	const [adding, { Form }] = createServerMultiAction$(
		async (form: FormData, { request }) => {
			const id = form.get("selectedVariantId");
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

	return (
		<>
			<Form>
				<input type="hidden" name="selectedVariantId" value={selectedVariantId()} />
				<input type="hidden" name="pathname" value={location.pathname} />
				<button
					type="submit"
					aria-label="Add item to cart"
					disabled={
						Boolean(adding.pending.length) ||
						!props.availableForSale ||
						!selectedVariantId()
					}
					title={title()}
					class={clsx(
						"relative flex w-full items-center justify-center rounded-full bg-blue-600 p-4 tracking-wide text-white hover:opacity-90",
						{
							"cursor-not-allowed opacity-60 hover:opacity-60":
								!props.availableForSale || !selectedVariantId(),
							"cursor-not-allowed": Boolean(adding.pending.length),
						}
					)}
				>
					<div class="absolute left-0 ml-4">
						{!Boolean(adding.pending.length) ? (
							<Icon path={plusCircle} class="h-5" />
						) : (
							<LoadingDots class="mb-3 bg-white" />
						)}
					</div>
					<span>{props.availableForSale ? "Add To Cart" : "Out Of Stock"}</span>
				</button>
			</Form>
		</>
	);
}

function AddToCartBase() {
	const [incrementing, { Form }] = createServerAction$(async () => {
		//    console.log("hi server");
		function sleep(ms) {
			return new Promise((resolve) =>
				setTimeout(() => {
					//    console.log("hi delay");
					resolve({ msg: "hi" });
				}, ms)
			);
		}
		await sleep(2000);
		return redirect("/");
	});

	//    console.log(status);

	return (
		<>
			<Form>
				<button
					class={clsx("asdasd", {
						"cursor-not-allowed": incrementing.pending,
					})}
					type="submit"
				>
					Add to Cart
				</button>
			</Form>
		</>
	);
}

// const AddToCart =
// 	import.meta.env.START_ISLANDS_ROUTER && !import.meta.env.SSR
// 		? AddToCartIslands
// 		: AddToCartBase;

const AddToCart = AddToCartIslands;

export default AddToCart;
