"use client";

import clsx from "clsx";
import { Icon } from "solid-heroicons";
import { plusCircle } from "solid-heroicons/outline";
import { createMemo } from "solid-js";
import { useLocation, useSearchParams } from "solid-start";
import { createServerAction$, redirect } from "solid-start/server";
import { Product, ProductVariant } from "~/lib/shopify/types";
import LoadingDots from "../loading-dots";
import { useCartActionContext } from "~/context/CartActionContext";
import CartModalContext from "~/context/CartModalContext";

const status =
	import.meta.env.START_ISLANDS_ROUTER && !import.meta.env.SSR ? false : true;

function AddToCartIslands(props: {
	product: Product;
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

	const { addToCartSubmission, addToCartFn } = useCartActionContext();
	const { setIsCartOpen } = CartModalContext;

	const pathname = () => location.pathname + location.search;

	return (
		<>
			<addToCartFn.Form>
				<input type="hidden" name="variantId" value={selectedVariantId()} />
				<input type="hidden" name="pathname" value={pathname()} />

				<input type="hidden" name="handle" value={props.product.handle} />
				<input type="hidden" name="productId" value={props.product.id} />
				<input type="hidden" name="title" value={props.product.title} />

				{variant()?.title ? (
					<input type="hidden" name="variantTitle" value={variant()!.title} />
				) : null}

				<input
					type="hidden"
					name="imageUrl"
					value={props.product.featuredImage.url}
				/>
				<input
					type="hidden"
					name="amount"
					value={props.product?.priceRange?.maxVariantPrice?.amount}
				/>
				<input
					type="hidden"
					name="currencyCode"
					value={props.product?.priceRange?.maxVariantPrice?.currencyCode}
				/>

				<button
					type="submit"
					aria-label="Add item to cart"
					disabled={
						addToCartSubmission.pending ||
						!props.availableForSale ||
						!selectedVariantId()
					}
					title={title()}
					onClick={() => setIsCartOpen(true)}
					class={clsx(
						"relative flex w-full items-center justify-center rounded-full bg-blue-600 p-4 tracking-wide text-white hover:opacity-90",
						{
							"cursor-not-allowed opacity-60 hover:opacity-60":
								!props.availableForSale || !selectedVariantId(),
							"cursor-not-allowed": addToCartSubmission.pending,
						}
					)}
				>
					<div class="absolute left-0 ml-4">
						{!addToCartSubmission.pending ? (
							<Icon path={plusCircle} class="h-5" />
						) : (
							<LoadingDots class="mb-3 bg-white" />
						)}
					</div>
					<span>{props.availableForSale ? "Add To Cart" : "Out Of Stock"}</span>
				</button>
			</addToCartFn.Form>
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
