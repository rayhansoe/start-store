"use client";

import clsx from "clsx";
import LoadingDots from "../loading-dots";
import { Icon } from "solid-heroicons";
import { xMark } from "solid-heroicons/outline";
import { CartItem } from "~/lib/shopify/types";
import { useCartActionContext } from "~/context/CartActionContext";

function SubmitButton(props: { pending: boolean; optimistic?: boolean }) {
	return (
		<button
			type="submit"
			onClick={(e) => {
				if (props.optimistic) e.preventDefault();
			}}
			aria-label="Remove cart item"
			aria-disabled={props.optimistic}
			class={clsx(
				"ease flex h-[17px] w-[17px] items-center justify-center rounded-full bg-neutral-500 transition-all duration-200",
				{
					"cursor-not-allowed px-0": props.optimistic,
				}
			)}
		>
			{props.optimistic ? (
				<LoadingDots class="bg-white" />
			) : (
				<Icon
					path={xMark}
					class="hover:text-accent-3 mx-[1px] h-4 w-4 text-white dark:text-black"
				/>
			)}
		</button>
	);
}

export function DeleteItemButton(props: {
	itemId: string;
	optimistic?: boolean;
}) {
	const { removeCartItemFn } = useCartActionContext();
	return (
		<removeCartItemFn.Form>
			<SubmitButton pending={false} optimistic={props.optimistic} />
			<input type="hidden" name="itemId" value={props.itemId} />
			<p aria-live="polite" class="sr-only" role="status"></p>
		</removeCartItemFn.Form>
	);
}
