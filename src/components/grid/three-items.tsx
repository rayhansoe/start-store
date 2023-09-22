/* eslint-disable @typescript-eslint/no-explicit-any */
import { A } from 'solid-start';
import { GridTileImage } from './tile';
import { type Product } from '~/lib/types';

function ThreeItemGridItem(props: {
	item: any;
	size: 'full' | 'half';
	loading?: 'eager' | 'lazy';
}) {
	return (
		<div
			class={
				props.size === 'full'
					? 'md:col-span-4 md:row-span-2'
					: 'md:col-span-2 md:row-span-1'
			}
		>
			<A
				class='relative block aspect-square h-full w-full'
				href={`/product/${props.item.slug}`}
			>
				<GridTileImage
					src={props.item.featuredImage.url}
					// fill
					sizes={
						props.size === 'full'
							? '(min-width: 768px) 66vw, 100vw'
							: '(min-width: 768px) 33vw, 100vw'
					}
					loading='eager'
					alt={props.item.title}
					label={{
						position: props.size === 'full' ? 'center' : 'bottom',
						title: props.item.title as string,
						amount: props.item.priceRange.maxVariantPrice.amount,
						currencyCode: props.item.priceRange.maxVariantPrice.currencyCode,
					}}
				/>
			</A>
		</div>
	);
}

export function ThreeItemGrid(props: {
	firstProduct: Product,
	secondProduct: Product,
	thirdProduct: Product,
}) {
	// Collections that start with `hidden-*` are hidden from the search page.
	// const homepageItems = await getCollectionProducts({
	//   collection: 'hidden-homepage-featured-items'
	// });

	// if (!homepageItems[0] || !homepageItems[1] || !homepageItems[2]) return null;

	// const [firstProduct, secondProduct, thirdProduct] = homepageItems;

	return (
		<section class='mx-auto grid max-w-screen-2xl gap-4 px-4 pb-4 md:grid-cols-6 md:grid-rows-2'>
			<ThreeItemGridItem size='full' item={props.firstProduct} loading='eager' />
			<ThreeItemGridItem size='half' item={props.secondProduct} loading='eager' />
			<ThreeItemGridItem size='half' item={props.thirdProduct} />
		</section>
	);
}
