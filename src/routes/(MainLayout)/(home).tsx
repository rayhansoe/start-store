import { Show, Suspense } from 'solid-js';
import { useRouteData } from 'solid-start';
import { createServerData$ } from 'solid-start/server';
import { Carousel } from '~/components/carousel';
import { ThreeItemGrid } from '~/components/grid/three-items';

export function routeData() {
	const data = createServerData$(
		async () => {
			return {
				products: [
					{
						slug: 'product-1',
						featuredImage: {
							url: 'https://cdn.shopify.com/s/files/1/0614/5753/1058/products/mesh-back-trucker-cap-navy-front-62cd94b2acb05.png?v=1657640123',
						},
						title: 'Acme Circles T-Shirt',
						priceRange: { maxVariantPrice: { amount: '', currencyCode: 'USD' } },
					},
					{
						slug: 'product-2',
						featuredImage: {
							url: 'https://cdn.shopify.com/s/files/1/0614/5753/1058/products/womens-cropped-sweatshirt-navy-front-62cf042c4ceaa.png?v=1657734192',
						},
						title: 'Acme Drawstring Bag',
						priceRange: { maxVariantPrice: { amount: '', currencyCode: 'USD' } },
					},
					{
						slug: 'product-3',
						featuredImage: {
							url: 'https://cdn.shopify.com/s/files/1/0614/5753/1058/products/unisex-crew-neck-sweatshirt-navy-front-62cf0830c76a1.png?v=1657735233',
						},
						title: 'Acme Cup',
						priceRange: { maxVariantPrice: { amount: '', currencyCode: 'USD' } },
					},
				],
			};
		},
		{
			deferStream: true,
		}
	);
	return data;
}

export default function Home() {
	const data = useRouteData<typeof routeData>();
	return (
		<>
			<Suspense fallback={<h1>Loading...</h1>}>
				<Show when={data()}>
					{(products) => (
						<>
							<ThreeItemGrid
								firstProduct={products().products[0]}
								secondProduct={products().products[1]}
								thirdProduct={products().products[2]}
							/>
							<Carousel products={products().products} />
						</>
					)}
				</Show>
			</Suspense>
			{/* <Suspense>
				<Suspense>
					<Footer />
				</Suspense>
			</Suspense> */}
		</>
	);
}
