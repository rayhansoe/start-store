import { For, Show } from 'solid-js';
import { A, useLocation, useSearchParams } from 'solid-start';
import { createUrl } from '~/lib/utils';
import { SpanA } from '../SpanA';
import clsx from 'clsx';

export type Combination = {
	id: string;
	availableForSale: boolean;
	[key: string]: string | boolean; // ie. { color: 'Red', size: 'Large', ... }
};

const variants = [
	{
		id: 'variant_01H9F101K4BMKB3Q1FC2NK2SK2',
		created_at: '2023-09-04T02:40:21.912Z',
		updated_at: '2023-09-04T02:40:21.912Z',
		deleted_at: null,
		title: 'S',
		product_id: 'prod_01H9F101JETR2NY9FN4E2YXAGQ',
		sku: null,
		barcode: null,
		ean: null,
		upc: null,
		variant_rank: 0,
		inventory_quantity: 100,
		allow_backorder: false,
		manage_inventory: true,
		hs_code: null,
		origin_country: null,
		mid_code: null,
		material: null,
		weight: null,
		length: null,
		height: null,
		width: null,
		metadata: null,
		// prices: [Array],
		// options: [Array],
		original_price: null,
		calculated_price: null,
		original_price_incl_tax: null,
		calculated_price_incl_tax: null,
		original_tax: null,
		calculated_tax: null,
		tax_rates: null,
		availableForSale: true,
		selectedOptions: [{ name: 'Size', value: 'S' }],
		// price: [Object],
	},
	{
		id: 'variant_01H9F101KVB4N6QTVBZMK70TZT',
		created_at: '2023-09-04T02:40:21.912Z',
		updated_at: '2023-09-04T02:40:21.912Z',
		deleted_at: null,
		title: 'M',
		product_id: 'prod_01H9F101JETR2NY9FN4E2YXAGQ',
		sku: null,
		barcode: null,
		ean: null,
		upc: null,
		variant_rank: 1,
		inventory_quantity: 100,
		allow_backorder: false,
		manage_inventory: true,
		hs_code: null,
		origin_country: null,
		mid_code: null,
		material: null,
		weight: null,
		length: null,
		height: null,
		width: null,
		metadata: null,
		// prices: [Array],
		// options: [Array],
		original_price: null,
		calculated_price: null,
		original_price_incl_tax: null,
		calculated_price_incl_tax: null,
		original_tax: null,
		calculated_tax: null,
		tax_rates: null,
		availableForSale: true,
		selectedOptions: [{ name: 'Size', value: 'M' }],
		// price: [Object],
	},
	{
		id: 'variant_01H9F101MPXDE1F2TDGFEKCFC1',
		created_at: '2023-09-04T02:40:21.912Z',
		updated_at: '2023-09-04T02:40:21.912Z',
		deleted_at: null,
		title: 'L',
		product_id: 'prod_01H9F101JETR2NY9FN4E2YXAGQ',
		sku: null,
		barcode: null,
		ean: null,
		upc: null,
		variant_rank: 2,
		inventory_quantity: 100,
		allow_backorder: false,
		manage_inventory: true,
		hs_code: null,
		origin_country: null,
		mid_code: null,
		material: null,
		weight: null,
		length: null,
		height: null,
		width: null,
		metadata: null,
		// prices: [Array],
		// options: [Array],
		original_price: null,
		calculated_price: null,
		original_price_incl_tax: null,
		calculated_price_incl_tax: null,
		original_tax: null,
		calculated_tax: null,
		tax_rates: null,
		availableForSale: true,
		selectedOptions: [{ name: 'Size', value: 'L' }],
		// price: [Object],
	},
	{
		id: 'variant_01H9F101NKN61MJAWWA70ZZRWX',
		created_at: '2023-09-04T02:40:21.912Z',
		updated_at: '2023-09-04T02:40:21.912Z',
		deleted_at: null,
		title: 'XL',
		product_id: 'prod_01H9F101JETR2NY9FN4E2YXAGQ',
		sku: null,
		barcode: null,
		ean: null,
		upc: null,
		variant_rank: 3,
		inventory_quantity: 100,
		allow_backorder: false,
		manage_inventory: true,
		hs_code: null,
		origin_country: null,
		mid_code: null,
		material: null,
		weight: null,
		length: null,
		height: null,
		width: null,
		metadata: null,
		// prices: [Array],
		// options: [Array],
		original_price: null,
		calculated_price: null,
		original_price_incl_tax: null,
		calculated_price_incl_tax: null,
		original_tax: null,
		calculated_tax: null,
		tax_rates: null,
		availableForSale: true,
		selectedOptions: [{ name: 'Size', value: 'XL' }],
		// price: [Object],
	},
];

export function VariantSelector(props: {
	options: {
		id: string;
		created_at: string;
		updated_at: string;
		deleted_at: null;
		title: string;
		product_id: string;
		metadata: null;
		values: string[];
		availableForSale: boolean;
		name: string;
	}[];
	variants: typeof variants;
}) {
	const location = useLocation();
	const [searchParams] = useSearchParams();

	const options = () => props.options;
	const variants = () => props.variants;

	const hasNoOptionsOrJustOneOption = () =>
		!options()?.length ||
		(options()?.length === 1 && options()[0]?.values?.length === 1);

	const combinations: () => Combination[] = () =>
		variants()?.map((variant) => ({
			id: variant.id,
			availableForSale: variant.availableForSale,
			// Adds key / value pairs for each variant (ie. "color": "Black" and "size": 'M").
			...variant.selectedOptions.reduce(
				(accumulator, option) => ({
					...accumulator,
					[option.name.toLowerCase()]: option.value,
				}),
				{}
			),
		}));

	return (
		<Show when={!hasNoOptionsOrJustOneOption()}>
			<For each={options()}>
				{(option) => (
					<dl class='mb-8'>
						<dt class='mb-4 text-sm uppercase tracking-wide'>{option.name}</dt>
						<dd class='flex flex-wrap gap-3'>
							<For each={option.values}>
								{(value) => {
									const optionNameLowerCase = () => option.name.toLowerCase();
									const optionSearchParams = () =>
										new URLSearchParams({
											...searchParams,
											[optionNameLowerCase()]: value,
										});
									const optionUrl = () =>
										createUrl(location.pathname, optionSearchParams());

									// Base option params on current params so we can preserve any other param state in the url.
									// const optionSearchParams = new URLSearchParams(
									// 	searchParams.toString()
									// );

									// Update the option params using the current option to reflect how the url *would* change,
									// if the option was clicked.
									// optionSearchParams.set(optionNameLowerCase, value);
									// const optionUrl = createUrl(location.pathname, optionSearchParams);

									// In order to determine if an option is available for sale, we need to:
									//
									// 1. Filter out all other param state
									// 2. Filter out invalid options
									// 3. Check if the option combination is available for sale
									//
									// This is the "magic" that will cross check possible variant combinations and preemptively
									// disable combinations that are not available. For example, if the color gray is only available in size medium,
									// then all other sizes should be disabled.
									const filtered = () =>
										Array.from(optionSearchParams().entries()).filter(([key, value]) =>
											options().find(
												(option) =>
													optionNameLowerCase() === key && option.values.includes(value)
											)
										);

									const isAvailableForSale = () =>
										combinations().find((combination) =>
											filtered().every(
												([key, value]) =>
													combination[key] === value && combination.availableForSale
											)
										);

									// The option is active if it's in the url params.
									const isActive = () => searchParams[optionNameLowerCase()] === value;

									// You can't disable a link, so we need to render something that isn't clickable.
									// const DynamicTag = isAvailableForSale ? A : 'p';
									const dynamicProps = {
										...(isAvailableForSale() && { noScroll: true }),
									};

									return (
										<Show
											when={isAvailableForSale()}
											fallback={
												<p class='flex min-w-[48px] items-center justify-center rounded-full border px-2 py-1 text-sm dark:border-neutral-800 relative z-10 cursor-not-allowed overflow-hidden bg-neutral-100 text-neutral-500 ring-1 ring-neutral-300 before:absolute before:inset-x-0 before:-z-10 before:h-px before:-rotate-45 before:bg-neutral-300 before:transition-transform dark:bg-neutral-900 dark:text-neutral-400 dark:ring-neutral-700 before:dark:bg-neutral-700'>
													{value}
												</p>
											}
										>
											<A
												aria-disabled={!isAvailableForSale()}
												href={optionUrl()}
												title={`${option.name} ${value}${
													!isAvailableForSale() ? ' (Out of Stock)' : ''
												}`}
												{...dynamicProps}
												class={clsx('h-full w-full', {'pointer-events-none': isActive()})}
											>
												<SpanA
													class='flex min-w-[48px] items-center justify-center rounded-full border bg-neutral-100 px-2 py-1 text-sm dark:border-neutral-800 dark:bg-neutral-900'
													isActive={isActive()}
													isAvailableForSale={isAvailableForSale()}
												>
													{value}
												</SpanA>
											</A>
										</Show>
									);
								}}
							</For>
						</dd>
					</dl>
				)}
			</For>
		</Show>
	);
}
