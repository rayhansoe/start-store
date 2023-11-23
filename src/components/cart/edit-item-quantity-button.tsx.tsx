"use client";

import { Cart, CartItem, TypeButton } from "~/lib/shopify/types";
import LoadingDots from "../loading-dots";
import { Icon } from "solid-heroicons";
import { minus, plus } from "solid-heroicons/outline";
import { createServerAction$, redirect } from "solid-start/server";
import { createCart, getCart, removeFromCart, updateCart } from "~/lib/shopify";
import { getCookieObject } from "~/utils/cookie";
import { useLocation } from "solid-start";
import { JSX, Match, Switch } from "solid-js";
import { useCartActionContext } from "~/context/CartActionContext";

export function EditItemQuantityButton(props: {
	item?: CartItem;
	type?: TypeButton;
	lineId?: string;
	variantId?: string;
	directQuantity?: number;
	quantity?: number;
	optimistic: boolean;
}) {
	const location = useLocation();

	const lineId = () => props?.item?.id || props?.lineId;
	const variantId = () => props?.item?.merchandise?.id || props?.variantId;
	const quantity = () =>
		props.type === "plus" ? props.quantity + 1 : props.quantity - 1;

	const pathname = () => location.pathname + location.search;

	return (
		<EditItemForm type={props.type}>
			<input type="hidden" name="pathname" value={pathname()} />
			<input type="hidden" name="type" value={props.type} />
			<input type="hidden" name="lineId" value={lineId()} />
			<input type="hidden" name="itemId" value={lineId()} />
			<input type="hidden" name="variantId" value={variantId()} />
			<input type="hidden" name="quantity" value={quantity()} />
			<SubmitButton type={props.type} optimistic={props.optimistic} />
		</EditItemForm>
	);
}

function EditItemForm(props: {
	type: TypeButton;
	children: JSX.Element;
}) {
	const { updateItemFn } = useCartActionContext();
	const incrementItemForm = () => props.type === "plus";
	const decrementItemForm = () => props.type === "minus";

	return (
		<Switch>
			<Match when={incrementItemForm()}>
				<updateItemFn.Form>
					<input type="hidden" name="type" value={props.type} />
					{/* <input type="hidden" name="quantity" value={props.quantity} /> */}
					{props.children}
				</updateItemFn.Form>
			</Match>
			<Match when={decrementItemForm()}>
				<updateItemFn.Form>
					<input type="hidden" name="type" value={props.type} />
					{/* <input type="hidden" name="quantity" value={props.quantity} /> */}
					{props.children}
				</updateItemFn.Form>
			</Match>
		</Switch>
	);
}

function SubmitButton(props: { type: TypeButton; optimistic: boolean }) {
	const { addToCartSubmission } = useCartActionContext();
	return (
		<button
			type="submit"
			onClick={(e) => {
				if (addToCartSubmission.pending) e.preventDefault();
			}}
			aria-label={
				props.type === "plus" ? "Increase item quantity" : "Reduce item quantity"
			}
			aria-disabled={addToCartSubmission.pending || props.optimistic}
			class="ease flex h-full min-w-[36px] max-w-[36px] flex-none items-center justify-center rounded-full px-2 transition-all duration-200 hover:border-neutral-800 hover:opacity-80"
			classList={{
				"cursor-not-allowed": addToCartSubmission.pending || props.optimistic,
				"ml-auto": props.type === "minus",
			}}
		>
			<Switch>
				<Match when={props.optimistic}>
					<LoadingDots class="bg-black dark:bg-white" />
				</Match>
				<Match when={props.type === "plus"}>
					<Icon path={plus} class="h-4 w-4 dark:text-neutral-500" />
				</Match>
				<Match when={props.type === "minus"}>
					<Icon path={minus} class="h-4 w-4 dark:text-neutral-500" />
				</Match>
			</Switch>
		</button>
	);
}
