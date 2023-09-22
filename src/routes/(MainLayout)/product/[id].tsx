import { Show, Suspense } from 'solid-js';
import { createRouteData, useRouteData } from 'solid-start';
import server$ from 'solid-start/server';
import { Gallery } from '~/components/product/gallery';
import { ProductDescription } from '~/components/product/product-description';

export function routeData() {
	const data = createRouteData(
		server$(async () => {
			const data = {
				id: 'prod_01H9F101JETR2NY9FN4E2YXAGQ',
				title: 'Medusa Hoodie',
				subtitle: null,
				status: 'published',
				external_id: null,
				description:
					'Reimagine the feeling of a classic hoodie. With our cotton hoodie, everyday essentials no longer have to be ordinary.',
				handle: 'hoodie',
				is_giftcard: false,
				discountable: true,
				thumbnail:
					'https://medusa-public-images.s3.eu-west-1.amazonaws.com/black_hoodie_front.png',
				profile_id: 'sp_01H9F1008V726SJSZM7H2GVMM1',
				collection_id: null,
				type_id: null,
				weight: 400,
				length: null,
				height: null,
				width: null,
				hs_code: null,
				origin_country: null,
				mid_code: null,
				material: null,
				created_at: '2023-09-04T02:40:21.912Z',
				updated_at: '2023-09-04T02:40:21.912Z',
				deleted_at: null,
				metadata: null,
				variants: [
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
						prices: [Array],
						options: [Array],
						original_price: null,
						calculated_price: null,
						original_price_incl_tax: null,
						calculated_price_incl_tax: null,
						original_tax: null,
						calculated_tax: null,
						tax_rates: null,
						availableForSale: true,
						selectedOptions: [{ name: 'Size', value: 'S' }],
						price: [Object],
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
						prices: [Array],
						options: [Array],
						original_price: null,
						calculated_price: null,
						original_price_incl_tax: null,
						calculated_price_incl_tax: null,
						original_tax: null,
						calculated_tax: null,
						tax_rates: null,
						availableForSale: true,
						selectedOptions: [{ name: 'Size', value: 'M' }],
						price: [Object],
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
						prices: [Array],
						options: [Array],
						original_price: null,
						calculated_price: null,
						original_price_incl_tax: null,
						calculated_price_incl_tax: null,
						original_tax: null,
						calculated_tax: null,
						tax_rates: null,
						availableForSale: true,
						selectedOptions: [{ name: 'Size', value: 'L' }],
						price: [Object],
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
						prices: [Array],
						options: [Array],
						original_price: null,
						calculated_price: null,
						original_price_incl_tax: null,
						calculated_price_incl_tax: null,
						original_tax: null,
						calculated_tax: null,
						tax_rates: null,
						availableForSale: true,
						selectedOptions: [{ name: 'Size', value: 'XL' }],
						price: [Object],
					},
				],
				options: [
					{
						id: 'opt_01H9F101JN7WT7K6TJWXZEHB1D',
						created_at: '2023-09-04T02:40:21.912Z',
						updated_at: '2023-09-04T02:40:21.912Z',
						deleted_at: null,
						title: 'Size',
						product_id: 'prod_01H9F101JETR2NY9FN4E2YXAGQ',
						metadata: null,
						values: ['S', 'M', 'L', 'XL'],
						availableForSale: true,
						name: 'Size',
					},
				],
				images: [
					{
						id: 'img_01H9F101J9Z5M2S6Y9XCM7PGQT',
						created_at: '2023-09-04T02:40:21.912Z',
						updated_at: '2023-09-04T02:40:21.912Z',
						deleted_at: null,
						url: 'https://medusa-public-images.s3.eu-west-1.amazonaws.com/black_hoodie_front.png',
						metadata: null,
						altText: 'Medusa Hoodie - black_hoodie_front',
					},
					{
						id: 'img_01H9F101JA1GT0EP9R38A9CSJY',
						created_at: '2023-09-04T02:40:21.912Z',
						updated_at: '2023-09-04T02:40:21.912Z',
						deleted_at: null,
						url: 'https://medusa-public-images.s3.eu-west-1.amazonaws.com/black_hoodie_back.png',
						metadata: null,
						altText: 'Medusa Hoodie - black_hoodie_back',
					},
				],
				tags: [],
				collection: null,
				type: null,
				featuredImage: {
					url: 'https://medusa-public-images.s3.eu-west-1.amazonaws.com/black_hoodie_front.png',
					altText: 'Medusa Hoodie - black_hoodie_front',
				},
				priceRange: { maxVariantPrice: { amount: '36.5', currencyCode: 'EUR' } },
				updatedAt: '2023-09-04T02:40:21.912Z',
				createdAt: '2023-09-04T02:40:21.912Z',
				descriptionHtml:
					'Reimagine the feeling of a classic hoodie. With our cotton hoodie, everyday essentials no longer have to be ordinary.',
				availableForSale: true,
			};
			type Data = typeof data;
			return new Promise((resolve: (value: Data) => void) => {
				setTimeout(() => resolve(data));
			});
		}),
		{
			deferStream: true,
		}
	);

	return data;
}

export default function ProductPage() {
	const data = useRouteData<typeof routeData>();

	return (
		<Suspense fallback={<h1>Loading...</h1>}>
			<Show when={data()}>
				{(product) => (
					<div class='mx-auto max-w-screen-2xl px-4'>
						<div class='flex flex-col rounded-lg border border-neutral-200 bg-white p-8 dark:border-neutral-800 dark:bg-black md:p-12 lg:flex-row'>
							<div class='h-full w-full basis-full lg:basis-4/6'>
								<Gallery
									images={product()?.images?.map(
										(image: { id: string; url: string; altText: string }) => ({
											src: image.url,
											altText: image.altText,
										})
									)}
								/>
							</div>

							<div class='basis-full lg:basis-2/6'>
								<ProductDescription product={product()} />

								{/* Baru */}
							</div>
						</div>
						{/* <Suspense>
					<RelatedProducts id={product.id!} />
				</Suspense> */}
					</div>
				)}
			</Show>
		</Suspense>
	);
}
