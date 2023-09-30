"use client";

import { For, Show } from 'solid-js';
import { GridTileImage } from '../grid/tile';
import { A } from 'solid-start';
import { createUrl } from '~/lib/utils';

export default function ImageSelector(props: {
	imagesLength: number;
  searchParams: Record<string, string>,
	images: {
		src: string;
		altText: string;
	}[];
	imageIndex: number;
}) {
	return (
		<>
			<Show when={props.imagesLength > 1}>
				<ul class='my-12 flex items-center justify-center gap-2 overflow-auto py-1 lg:mb-0'>
					<For each={props.images}>
						{(image, index) => {
							const isActive = () => index() === props.imageIndex;
							const imageSearchParams = () =>
								new URLSearchParams({ ...props.searchParams, image: index().toString() });

							// imageSearchParams().set('image', index().toString());

							return (
								<li class='h-auto w-20'>
									<A
										aria-label='Enlarge product image'
										href={createUrl(location.pathname, imageSearchParams())}
										// scroll={false}
										noScroll
										class='h-full w-full'
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
