"use client";
import {
	For,
	Match,
	Switch,
	createEffect,
	createMemo,
	createSignal,
} from "solid-js";
import OpenCart from "./open-cart";
import { Icon } from "solid-heroicons";
import { shoppingCart } from "solid-heroicons/outline";
import { createUrl } from "~/lib/utils";
import Price from "../price";
import { DEFAULT_OPTION } from "~/lib/constants";
import {
	DialogOverlay,
	Dialog,
	DialogPanel,
	Transition,
	TransitionChild,
} from "terracotta";
import { Cart, Item, TypeButton } from "~/lib/shopify/types";
import CloseCart from "./close-cart";
import { useCartActionContext } from "~/context/CartActionContext";
import CartModalContext from "~/context/CartModalContext";
import { Show } from "solid-js";
import LoadingDots from "../loading-dots";
import { CartItem } from "./CartItem";
import { CartList } from "./CartList";
import { CartWrapper } from "./CartWrapper";
import { createStore } from "solid-js/store";

type MerchandiseSearchParams = {
	[key: string]: string;
};

export default function CartModal(props: { cart: Cart }) {
	const { addToCartSubmission, removeCartItemSubmission, updateItemSubmission } =
		useCartActionContext();
	const { isCartOpen, openCartModal, closeCartModal } = CartModalContext;

	const isNewDataNotNew = () => {
		return props.cart.lines.find(
			(i) =>
				i.merchandise.id ===
				(addToCartSubmission?.input?.get("variantId") as string)
		);
	};

	const removingItems = () => {
		return removeCartItemSubmission.pending.map(
			(item) => item.input.get("itemId") as string
		);
	};

	const updatingItems = () => {
		return updateItemSubmission.pending.map((item) => ({
			itemId: item.input.get("itemId") as string,
			type: item.input.get("type") as TypeButton,
			newQuantity: item.input.get("quantity") as TypeButton,
		}));
	};

	const totalQuantity = createMemo(() => {
		const [newQuantity, setNewQuantity] = createSignal(props.cart?.totalQuantity);
		if (updatingItems().length) {
			updatingItems().forEach((_item) =>
				_item.type === "plus"
					? setNewQuantity((prev) => prev + 1)
					: setNewQuantity((prev) => prev - 1)
			);
		}
		if (addToCartSubmission.input) {
			setNewQuantity((prev) => prev + 1);
		}
		return newQuantity();
	});

	const filterCart = () => {
		return props.cart.lines.filter((item) => {
			return item.id !== removingItems().find((itemId) => itemId === item.id);
		});
	};

	const EmptyCart = () => !props.cart || filterCart().length === 0;
	const EmptyCartButAddingNewItem = () =>
		EmptyCart() && addToCartSubmission.input;
	const FilledCart = () => !EmptyCart();
	const TotallyEmptyCart = () => {
		return (
			!props.cart ||
			(filterCart().length === 0 &&
				!isNewDataNotNew() &&
				!addToCartSubmission.input) ||
			!totalQuantity()
		);
	};

	const isPending = () => {
		return Boolean(
			addToCartSubmission.pending ||
				removeCartItemSubmission.pending.length ||
				updateItemSubmission.pending.length
		);
	};

	return (
		<>
			<button aria-label="Open cart" onClick={openCartModal}>
				<OpenCart quantity={totalQuantity()} />
			</button>
			<Transition appear show={isCartOpen()}>
				<Dialog
					isOpen
					class="fixed inset-0 z-10 overflow-y-auto"
					onClose={closeCartModal}
				>
					<div class="min-h-screen w-full h-full overflow-hidden md:flex md:flex-row-reverse">
						<TransitionChild
							enter="transition-all ease-in-out duration-300"
							enterFrom="opacity-0 backdrop-blur-none"
							enterTo="opacity-100 backdrop-blur-[.5px]"
							leave="transition-all ease-in-out duration-200"
							leaveFrom="opacity-100 backdrop-blur-[.5px]"
							leaveTo="opacity-0 backdrop-blur-none"
						>
							<DialogOverlay
								class="fixed inset-0 bg-black/30 overflow-hidden"
								aria-hidden="true"
							/>
						</TransitionChild>

						<TransitionChild
							enter="transition-all ease-in-out duration-300"
							enterFrom="translate-x-full"
							enterTo="translate-x-0"
							leave="transition-all ease-in-out duration-200"
							leaveFrom="translate-x-0"
							leaveTo="translate-x-full"
						>
							<DialogPanel class="flex flex-col min-h-screen w-full h-full overflow-hidden border-l border-neutral-200 bg-white/80 p-6 text-black backdrop-blur-xl dark:border-neutral-700 dark:bg-black/80 dark:text-white md:w-[390px]">
								<CartWrapper>
									<div class="flex items-center justify-between">
										<p class="text-lg font-semibold">My Cart</p>

										<button aria-label="Close cart" onClick={closeCartModal}>
											<CloseCart />
										</button>
									</div>
									<Switch>
										<Match when={TotallyEmptyCart()}>
											<div class="mt-20 flex w-full flex-col items-center justify-center overflow-hidden">
												<Icon path={shoppingCart} class="h-16" />
												<p class="mt-6 text-center text-2xl font-bold">
													Your cart is empty.
												</p>
											</div>
										</Match>
										<Match when={FilledCart()}>
											<div class="flex h-full flex-col justify-between overflow-hidden p-1">
												<CartList>
													<For each={props.cart.lines}>
														{(item, i) => {
															const [merchandiseSearchParams, setMerchandiseSearchParams] =
																createStore<MerchandiseSearchParams>({});

															item.merchandise.selectedOptions.forEach(({ name, value }) => {
																if (value !== DEFAULT_OPTION) {
																	setMerchandiseSearchParams(() => ({
																		[name.toLowerCase()]: value,
																	}));
																}
															});

															const merchandiseUrl = createUrl(
																`/product/${item.merchandise.product.handle}`,
																new URLSearchParams(merchandiseSearchParams)
															);

															const isDataUpdating = () => item.id === isNewDataNotNew()?.id;

															const itemUpdates = () =>
																updatingItems().filter((_item) => _item.itemId === item.id);

															// const quantity = createMemo(() => {
															// 	const [newQuantity, setNewQuantity] = createSignal(
															// 		item.quantity
															// 	);
															// 	if (itemUpdates().length) {
															// 		itemUpdates().forEach((_item) =>
															// 			_item.type === "plus"
															// 				? setNewQuantity((prev) => prev + 1)
															// 				: setNewQuantity((prev) => prev - 1)
															// 		);
															// 	}
															// 	if (isDataUpdating()) {
															// 		setNewQuantity((prev) => prev + 1);
															// 	}
															// 	return newQuantity();
															// });

															const latestUpdate = () =>
																itemUpdates()[itemUpdates().length - 1];

															const quantity = createMemo(() => {
																if (itemUpdates().length && latestUpdate()?.newQuantity) {
																	return parseInt(latestUpdate()?.newQuantity);
																}
																return item.quantity;
															});

															const cartItem: () => Item = () => ({
																amount: item.cost.totalAmount.amount,
																currencyCode: item.cost.totalAmount.currencyCode,
																imageAlt: item.merchandise.product.featuredImage.altText,
																imageUrl: item.merchandise.product.featuredImage.url,
																merchandiseUrl: merchandiseUrl,
																productId: item.id,
																quantity: quantity(),
																title: item.merchandise.product.title,
																variantId: item.merchandise.id,
																variantTitle: item.merchandise.title,
															});

															const isShow = createMemo(
																() =>
																	!removingItems().includes(item.id) ||
																	!(quantity() === 0), 0,{
																		
																	}
															);

															createEffect(() => {
																console.log("product => ", quantity());
															});

															createEffect(() => {
																console.log(
																	"is show =>",
																	isShow()
																);
															});

															return (
																<Show
																	when={isShow()}
																>
																	<CartItem
																		quantity={quantity()}
																		isPending={isPending()}
																		optimistic={false}
																		item={cartItem()}
																	/>
																</Show>
															);
														}}
													</For>
													<Show
														when={
															addToCartSubmission.pending &&
															!isNewDataNotNew() &&
															addToCartSubmission.input
														}
													>
														{(form) => {
															const merchandiseSearchParams = () =>
																({}) as MerchandiseSearchParams;

															const merchandiseUrl = createUrl(
																`/product/${form().get("handle")}`,
																new URLSearchParams(merchandiseSearchParams())
															);

															const productId = () => form().get("productId") as string;
															const variantId = () => form().get("variantId") as string;
															const title = () => form().get("title") as string;
															const imageUrl = () => form().get("imageUrl") as string;
															const variantTitle = () => form().get("variantTitle") as string;
															const amount = () => form().get("amount") as string;
															const currencyCode = () => form().get("currencyCode") as string;

															const cartItem: () => Item = () => ({
																amount: amount(),
																currencyCode: currencyCode(),
																imageAlt: title(),
																imageUrl: imageUrl(),
																merchandiseUrl: merchandiseUrl,
																productId: productId(),
																quantity: 1,
																title: title(),
																variantId: variantId(),
																variantTitle: variantTitle(),
															});

															return (
																<CartItem
																	quantity={1}
																	isPending={isPending()}
																	optimistic={true}
																	item={cartItem()}
																/>
															);
														}}
													</Show>
												</CartList>
												<div class="py-4 text-sm text-neutral-500 dark:text-neutral-400">
													<div class="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 dark:border-neutral-700">
														<p>Taxes</p>
														<div class="flex gap-1 items-center">
															<Show when={isPending()}>
																<LoadingDots class="my-[10px] bg-black dark:bg-white" />
															</Show>
															<Price
																class={`text-right text-base text-black dark:text-white ${
																	isPending() ? "opacity-50" : ""
																}`}
																amount={props.cart.cost.totalTaxAmount.amount}
																currencyCode={props.cart.cost.totalTaxAmount.currencyCode}
															/>
														</div>
													</div>
													<div class="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 dark:border-neutral-700">
														<p>Shipping</p>
														<p class="text-right">Calculated at checkout</p>
													</div>
													<div class="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 dark:border-neutral-700">
														<p>Total</p>
														<div class="flex gap-1 items-center">
															<Show when={isPending()}>
																<LoadingDots class="my-[10px] bg-black dark:bg-white" />
															</Show>
															<Price
																class={`text-right text-base text-black dark:text-white ${
																	isPending() ? "opacity-50" : ""
																}`}
																amount={props.cart.cost.totalAmount.amount}
																currencyCode={props.cart.cost.totalAmount.currencyCode}
															/>
														</div>
													</div>
												</div>
												<a
													aria-disabled={isPending()}
													href={props.cart.checkoutUrl}
													classList={{
														"cursor-not-allowed opacity-50": isPending(),
													}}
													class="block w-full rounded-full bg-blue-600 p-3 text-center text-sm font-medium text-white opacity-90 hover:opacity-100"
												>
													Proceed to Checkout
												</a>
											</div>
										</Match>
										<Match when={EmptyCartButAddingNewItem()}>
											{(form) => {
												const merchandiseSearchParams = () =>
													({}) as MerchandiseSearchParams;

												const merchandiseUrl = createUrl(
													`/product/${form().get("handle")}`,
													new URLSearchParams(merchandiseSearchParams())
												);

												const productId = () => form().get("productId") as string;
												const variantId = () => form().get("variantId") as string;
												const title = () => form().get("title") as string;
												const imageUrl = () => form().get("imageUrl") as string;
												const variantTitle = () => form().get("variantTitle") as string;
												const amount = () => form().get("amount") as string;
												const currencyCode = () => form().get("currencyCode") as string;

												const cartItem: () => Item = () => ({
													amount: amount(),
													currencyCode: currencyCode(),
													imageAlt: title(),
													imageUrl: imageUrl(),
													merchandiseUrl: merchandiseUrl,
													productId: productId(),
													quantity: 1,
													title: title(),
													variantId: variantId(),
													variantTitle: variantTitle(),
												});

												return (
													<div class="flex h-full flex-col justify-between overflow-hidden p-1">
														<CartList>
															<CartItem
																quantity={1}
																isPending={isPending()}
																optimistic={true}
																item={cartItem()}
															/>
														</CartList>
														<div class="py-4 text-sm text-neutral-500 dark:text-neutral-400">
															<div class="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 dark:border-neutral-700">
																<p>Taxes</p>
																<LoadingDots class="my-[10px] bg-black dark:bg-white" />
															</div>
															<div class="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 dark:border-neutral-700">
																<p>Shipping</p>
																<p class="text-right">Calculated at checkout</p>
															</div>
															<div class="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 dark:border-neutral-700">
																<p>Total</p>

																<LoadingDots class="my-[10px] bg-black dark:bg-white" />
															</div>
														</div>
														<a
															aria-disabled={addToCartSubmission.pending}
															href={props.cart.checkoutUrl}
															classList={{
																"cursor-not-allowed opacity-90": addToCartSubmission.pending,
															}}
															class="block w-full rounded-full bg-blue-600 p-3 text-center text-sm font-medium text-white opacity-90 hover:opacity-100"
														>
															Proceed to Checkout
														</a>
													</div>
												);
											}}
										</Match>
									</Switch>
								</CartWrapper>
							</DialogPanel>
						</TransitionChild>
					</div>
				</Dialog>
			</Transition>
		</>
	);
}
