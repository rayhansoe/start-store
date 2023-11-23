import { A } from "solid-start";
import { DeleteItemButton } from "./remove-item-button";
import Price from "../price";
import { EditItemQuantityButton } from "./edit-item-quantity-button.tsx";
import { DEFAULT_OPTION } from "~/lib/constants";
import CartModalContext from "~/context/CartModalContext";
import { Item } from "~/lib/shopify/types";

export const CartItem = (props: {
  isPending: boolean,
  optimistic: boolean,
  quantity: number,
  item: Item
}) => {
	const { closeCartModal } = CartModalContext;
	return (
		<>
			<li class="flex w-full flex-col border-b border-neutral-300 dark:border-neutral-700">
				<div class="relative flex w-full flex-row justify-between px-1 py-4">
					<div class="absolute z-40 -mt-2 ml-[55px]">
						<DeleteItemButton itemId={props.item.productId} optimistic={props.optimistic} />
					</div>
					<A
						href={props.item.merchandiseUrl}
						onClick={closeCartModal}
						class="z-30 flex flex-row space-x-4"
            classList={{
              "cursor-not-allowed" : props.optimistic || props.isPending
            }}
					>
						<div class="relative h-16 w-16 cursor-pointer overflow-hidden rounded-md border border-neutral-300 bg-neutral-300 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-800">
							<img
								class="h-full w-full object-cover"
								width={64}
								height={64}
								alt={props.item.title}
								src={props.item.imageUrl + "&width=100"}
							/>
						</div>

						<div class="flex flex-1 flex-col text-base">
							<span class="leading-tight">{props.item.title}</span>
							{props.item.variantTitle !== DEFAULT_OPTION ? (
								<p class="text-sm text-neutral-500 dark:text-neutral-400">
									{props.item.variantTitle}
								</p>
							) : null}
						</div>
					</A>
					<div class="flex h-16 flex-col justify-between">
						<Price
							class="flex justify-end space-y-2 text-right text-sm"
							amount={props.item.amount}
							currencyCode={props.item.currencyCode}
						/>
						<div class="ml-auto flex h-9 flex-row items-center rounded-full border border-neutral-200 dark:border-neutral-700">
							<EditItemQuantityButton
								directQuantity={props.item.quantity}
								quantity={props.quantity}
								optimistic={props.optimistic}
								lineId={props.item.productId}
								variantId={props.item.variantId}
								type="minus"
							/>
							<p class="w-6 text-center">
								<span class="w-full text-sm">{props.item.quantity}</span>
							</p>
							<EditItemQuantityButton
								directQuantity={props.item.quantity}
								quantity={props.quantity}
								optimistic={props.optimistic}
								lineId={props.item.productId}
								variantId={props.item.variantId}
								type="plus"
							/>
						</div>
					</div>
				</div>
			</li>
		</>
	);
};
