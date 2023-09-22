/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable solid/reactivity */
/* eslint-disable @typescript-eslint/no-explicit-any */
// import { Dialog, Transition } from '@headlessui/react';
// import { ShoppingCartIcon } from '@heroicons/react/24/outline';
// import Price from 'components/price';
// import { DEFAULT_OPTION } from 'lib/constants';
// import type { Cart } from 'lib/shopify/types';
// import { createUrl } from 'lib/utils';
// import Image from 'next/image';
// import A from 'next/A';
// import { Fragment, useEffect, useRef, useState } from 'react';
import { For, createEffect, createMemo, createSignal } from 'solid-js';
// import CloseCart from './close-cart';
// import DeleteItemButton from './delete-item-button';
// import EditItemQuantityButton from './edit-item-quantity-button';
import OpenCart from './open-cart';
import {
	Dialog,
	DialogPanel,
	Transition,
	TransitionChild,
} from 'solid-headless';
import { Icon } from 'solid-heroicons';
import { shoppingCart } from 'solid-heroicons/outline';
import { createUrl } from '~/lib/utils';
import { A } from 'solid-start';
import Price from '../price';
import { DEFAULT_OPTION } from '~/lib/constants';

type MerchandiseSearchParams = {
	[key: string]: string;
};

export default function CartModal(props: {
	cart:
		| { checkoutUrl: string;
      totalQuantity: number;
      cost: {
          subtotalAmount: { amount: string, currencyCode: string };
          totalAmount: { amount: string, currencyCode: string };
          totalTaxAmount: { amount: string, currencyCode: string };
      }; };
}) {
	const [isOpen, setIsOpen] = createSignal(false);
	const [quantityRef, setQuantityRef] = createSignal(props.cart?.totalQuantity);
	const openCart = () => setIsOpen(true);
	const closeCart = () => setIsOpen(false);

	const y = () => {
		// Open cart modal when quantity changes.
		if (props.cart?.totalQuantity !== quantityRef()) {
			// But only if it's not already open (quantity also changes when editing items in cart).
			if (!isOpen) {
				setIsOpen(true);
			}

			// Always update the quantity reference
			setQuantityRef(props.cart?.totalQuantity);
		}
		return quantityRef();
	};

	createEffect(() => {
		console.log(y());
	});

	return (
		<>
			<button aria-label='Open cart' onClick={openCart}>
				<OpenCart quantity={props.cart?.totalQuantity} />
			</button>
			{/* <Transition show={isOpen()}>
				<Dialog isOpen onClose={closeCart} class='relative z-50'>
					<TransitionChild
						as='div'
						enter='transition-all ease-in-out duration-300'
						enterFrom='opacity-0 backdrop-blur-none'
						enterTo='opacity-100 backdrop-blur-[.5px]'
						leave='transition-all ease-in-out duration-200'
						leaveFrom='opacity-100 backdrop-blur-[.5px]'
						leaveTo='opacity-0 backdrop-blur-none'
					>
						<div class='fixed inset-0 bg-black/30' aria-hidden='true' />
					</TransitionChild>
					<TransitionChild
						as='div'
						enter='transition-all ease-in-out duration-300'
						enterFrom='translate-x-full'
						enterTo='translate-x-0'
						leave='transition-all ease-in-out duration-200'
						leaveFrom='translate-x-0'
						leaveTo='translate-x-full'
					>
						<DialogPanel class='fixed bottom-0 right-0 top-0 flex h-full w-full flex-col border-l border-neutral-200 bg-white/80 p-6 text-black backdrop-blur-xl dark:border-neutral-700 dark:bg-black/80 dark:text-white md:w-[390px]'>
							<div class='flex items-center justify-between'>
								<p class='text-lg font-semibold'>My Cart</p>

								<button aria-label='Close cart' onClick={closeCart}>
									<CloseCart />
								</button>
							</div>

							{!props.cart || props.cart.lines.length === 0 ? (
								<div class='mt-20 flex w-full flex-col items-center justify-center overflow-hidden'>
									<Icon path={shoppingCart} class='h-16' />
									<p class='mt-6 text-center text-2xl font-bold'>Your cart is empty.</p>
								</div>
							) : (
								<div class='flex h-full flex-col justify-between overflow-hidden p-1'>
									<ul class='flex-grow overflow-auto py-4'>
										<For each={props.cart.lines}>
											{(item) => {
												const merchandiseSearchParams = {} as MerchandiseSearchParams;

												item.merchandise.selectedOptions.forEach(({ name, value }: any) => {
													if (value !== DEFAULT_OPTION) {
														merchandiseSearchParams[name.toLowerCase()] = value;
													}
												});

												const merchandiseUrl = createUrl(
													`/product/${item.merchandise.product.handle}`,
													new URLSearchParams(merchandiseSearchParams)
												);

												return (
													<li class='flex w-full flex-col border-b border-neutral-300 dark:border-neutral-700'>
														<div class='relative flex w-full flex-row justify-between px-1 py-4'>
															<div class='absolute z-40 -mt-2 ml-[55px]'>
																<DeleteItemButton item={item} />
															</div>
															<A
																href={merchandiseUrl}
																onClick={closeCart}
																class='z-30 flex flex-row space-x-4'
															>
																<div class='relative h-16 w-16 cursor-pointer overflow-hidden rounded-md border border-neutral-300 bg-neutral-300 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-800'>
																	<img
																		class='h-full w-full object-cover'
																		width={64}
																		height={64}
																		alt={
																			item.merchandise.product.featuredImage.altText ||
																			item.merchandise.product.title
																		}
																		src={item.merchandise.product.featuredImage.url}
																	/>
																</div>

																<div class='flex flex-1 flex-col text-base'>
																	<span class='leading-tight'>
																		{item.merchandise.product.title}
																	</span>
																	{item.merchandise.title !== DEFAULT_OPTION ? (
																		<p class='text-sm text-neutral-500 dark:text-neutral-400'>
																			{item.merchandise.title}
																		</p>
																	) : null}
																</div>
															</A>
															<div class='flex h-16 flex-col justify-between'>
																<Price
																	class='flex justify-end space-y-2 text-right text-sm'
																	amount={item.cost.totalAmount.amount}
																	currencyCode={item.cost.totalAmount.currencyCode}
																/>
																<div class='ml-auto flex h-9 flex-row items-center rounded-full border border-neutral-200 dark:border-neutral-700'>
																	<EditItemQuantityButton item={item} type='minus' />
																	<p class='w-6 text-center'>
																		<span class='w-full text-sm'>{item.quantity}</span>
																	</p>
																	<EditItemQuantityButton item={item} type='plus' />
																</div>
															</div>
														</div>
													</li>
												);
											}}
										</For>
									</ul>
									<div class='py-4 text-sm text-neutral-500 dark:text-neutral-400'>
										<div class='mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 dark:border-neutral-700'>
											<p>Taxes</p>
											<Price
												class='text-right text-base text-black dark:text-white'
												amount={props.cart.cost.totalTaxAmount.amount}
												currencyCode={props.cart.cost.totalTaxAmount.currencyCode}
											/>
										</div>
										<div class='mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 dark:border-neutral-700'>
											<p>Shipping</p>
											<p class='text-right'>Calculated at checkout</p>
										</div>
										<div class='mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 dark:border-neutral-700'>
											<p>Total</p>
											<Price
												class='text-right text-base text-black dark:text-white'
												amount={props.cart.cost.totalAmount.amount}
												currencyCode={props.cart.cost.totalAmount.currencyCode}
											/>
										</div>
									</div>
									<a
										href={props.cart.checkoutUrl}
										class='block w-full rounded-full bg-blue-600 p-3 text-center text-sm font-medium text-white opacity-90 hover:opacity-100'
									>
										Proceed to Checkout
									</a>
								</div>
							)}
						</DialogPanel>
					</TransitionChild>
				</Dialog>
			</Transition> */}
		</>
	);
}
