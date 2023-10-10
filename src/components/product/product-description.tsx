import { VariantSelector } from "./variant-selector";
import Price from "../price";
import Prose from "../prose";
import { Show } from "solid-js";
import type { Data } from "~/lib/data";
import AddToCart from "./AddToCart";
import { Product } from "~/lib/shopify/types";

export function ProductDescription(props: {
	product: Product;
	params: Record<string, string>;
}) {
	return (
		<>
			<div class="mb-6 flex flex-col border-b pb-6 dark:border-neutral-700">
				<h1 class="mb-2 text-5xl font-medium">{props.product.title}</h1>
				<div class="mr-auto w-auto rounded-full bg-blue-600 p-2 text-sm text-white">
					<Price
						amount={props.product?.priceRange?.maxVariantPrice?.amount || "20"}
						currencyCode={
							props.product?.priceRange?.maxVariantPrice?.currencyCode || "USD"
						}
					/>
				</div>
			</div>
			<VariantSelector
				options={props.product.options}
				variants={props.product.variants}
				params={props.params}
			/>

			<Show when={props.product.descriptionHtml}>
				<Prose
					class="mb-6 text-sm leading-tight dark:text-white/[60%]"
					html={props.product.descriptionHtml}
				/>
			</Show>

			<AddToCart />
			{/* <AddToCart variants={props.product.variants} availableForSale={props.product.availableForSale} /> */}
		</>
	);
}
