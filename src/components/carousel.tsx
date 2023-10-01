/* eslint-disable solid/components-return-once */
/* eslint-disable solid/reactivity */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { For } from 'solid-js';
import { GridTileImage } from './grid/tile';
import { Link } from './Link';

export function Carousel(props: { products: any[] }) {

	if (!props.products?.length) return null;

	// Purposefully duplicating products to make the carousel loop and not run out of products on wide screens.
	const carouselProducts = [
		...props.products,
		...props.products,
		...props.products,
	];

	return (
		<div class=' w-full overflow-x-auto pb-6 pt-1'>
			<ul class='flex animate-carousel gap-4'>
				<For each={carouselProducts}>
					{(product) => (
						<li class='relative aspect-square h-[30vh] max-h-[275px] w-2/3 max-w-[475px] flex-none md:w-1/3'>
							<Link href={`/product/${product.handle}`} class='relative h-full w-full'>
								<GridTileImage
									alt={product.title}
									label={{
										title: product.title,
										amount: product.priceRange.maxVariantPrice.amount,
										currencyCode: product.priceRange.maxVariantPrice.currencyCode,
									}}
									src={product.featuredImage?.url}
									sizes='(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw'
								/>
							</Link>
						</li>
					)}
				</For>
			</ul>
		</div>
	);
}
