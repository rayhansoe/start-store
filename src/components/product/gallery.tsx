"use client";

import { For, Show, createEffect, createMemo } from 'solid-js';
import { A, useLocation } from 'solid-start';
import { createUrl } from '~/lib/utils';
import { GridTileImage } from '../grid/tile';
import GallerySelector from './gallery-selector';

export function Gallery(props: {
	images: {
		src: string;
		altText: string;
	}[];
	params: Record<string, string>;
}) {
	const loacation = useLocation();
	const imageSearchParam = () => new URLSearchParams(loacation.search).get('image');
	const imageIndex = () =>
		imageSearchParam() ? parseInt(imageSearchParam()) : 0;

	const imagesLength = () => props.images?.length;

	
	const nextImageIndex = () =>
		imageIndex() + 1 < imagesLength() ? imageIndex() + 1 : 0;

	const nextSearchParams = () =>
		new URLSearchParams({ ...props.params, image: nextImageIndex().toString() });

	const nextUrl = createMemo(() => createUrl(loacation.pathname, nextSearchParams()));

	const previousImageIndex = () =>
		imageIndex() === 0 ? imagesLength() - 1 : imageIndex() - 1;

	const previousSearchParams = () =>
		new URLSearchParams({
			...props.params,
			image: previousImageIndex().toString(),
		});

	const previousUrl = createMemo(() => createUrl(loacation.pathname, previousSearchParams()));

	return (
		<>
			<Show when={props?.images}>
				<div class='relative aspect-square h-full max-h-[550px] w-full overflow-hidden'>
					{props?.images[imageIndex()] && (
						<img
							class='h-full w-full object-contain'
							// fill
							sizes='(min-width: 1024px) 66vw, 100vw'
							alt={props.images[imageIndex()]?.altText as string}
							src={props.images[imageIndex()]?.src as string}
							// priority={true}
							loading='eager'
						/>
					)}
					<Show when={imagesLength() > 1}>
						{/* <div class='absolute bottom-[15%] flex w-full justify-center'>
							<div class='mx-auto flex h-11 items-center rounded-full border border-white bg-neutral-50/80 text-neutral-500 backdrop-blur dark:border-black dark:bg-neutral-900/80'> */}
								<GallerySelector
									imageIndex={imageIndex()}
									imagesLength={imagesLength()}
									images={props.images}
									params={props.params}
									pathname={loacation.pathname}
									nextUrl={nextUrl()}
									previousUrl={previousUrl()}
								/>
							{/* </div>
						</div> */}
					</Show>
				</div>
			</Show>

			<Show when={imagesLength() > 1}>
				<ul class='my-12 flex items-center justify-center gap-2 overflow-auto py-1 lg:mb-0'>
					<For each={props.images}>
						{(image, index) => {
							const isActive = () => index() === imageIndex();
							const imageSearchParams = () =>
								new URLSearchParams({ ...props.params, image: index().toString() });

							// imageSearchParams().set('image', index().toString());

							return (
								<li class='h-auto w-20'>
									<A
										aria-label='Enlarge product image'
										href={createUrl(loacation.pathname, imageSearchParams())}
										// scroll={false}
										noScroll
										class={'h-full w-full ' + (isActive() ? 'pointer-events-none' : '')}
									>
										<GridTileImage
											alt={image?.altText}
											src={image?.src}
											width={80}
											height={80}
											active={isActive()}
										/>
									</A>
								</li>
							);
						}}
					</For>
				</ul>
			</Show>
		</>
	);
}
