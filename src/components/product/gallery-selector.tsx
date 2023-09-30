"use client";

import { Icon } from 'solid-heroicons';
import { arrowLeft, arrowRight } from 'solid-heroicons/outline';
import { Show } from 'solid-js';
import { A, useLocation } from 'solid-start';
import { createUrl } from '~/lib/utils';

export default function GallerySelector(props: {
	imageIndex: number;
	imagesLength: number;
	params: Record<string, string>;
	images: {
		src: string;
		altText: string;
	}[];
}) {
	const location = useLocation();
	const nextImageIndex = () =>
		props.imageIndex + 1 < props.imagesLength ? props.imageIndex + 1 : 0;

	const nextSearchParams = () =>
		new URLSearchParams({ ...props.params, image: nextImageIndex().toString() });

	const nextUrl = () => createUrl(location.pathname, nextSearchParams());

	const previousImageIndex = () =>
		props.imageIndex === 0 ? props.imagesLength - 1 : props.imageIndex - 1;

	const previousSearchParams = () =>
		new URLSearchParams({
			...props.params,
			image: previousImageIndex().toString(),
		});

	const previousUrl = () => createUrl(location.pathname, previousSearchParams());

	const buttonClass =
		'h-full px-6 transition-all ease-in-out hover:scale-110 hover:text-black dark:hover:text-white flex items-center justify-center';

	return (
		<Show when={props?.images}>
			<div class='relative aspect-square h-full max-h-[550px] w-full overflow-hidden'>
				{props?.images[props.imageIndex] && (
					<img
						class='h-full w-full object-contain'
						// fill
						sizes='(min-width: 1024px) 66vw, 100vw'
						alt={props.images[props.imageIndex]?.altText as string}
						src={props.images[props.imageIndex]?.src as string}
						// priority={true}
						loading='eager'
					/>
				)}

				<Show when={props.imagesLength > 1}>
					<div class='absolute bottom-[15%] flex w-full justify-center'>
						<div class='mx-auto flex h-11 items-center rounded-full border border-white bg-neutral-50/80 text-neutral-500 backdrop-blur dark:border-black dark:bg-neutral-900/80'>
							<A
								aria-label='Previous product image'
								href={previousUrl()}
								class={buttonClass}
								noScroll
								// scroll={false}
							>
								<Icon path={arrowLeft} class='h-5' />
							</A>
							<div class='mx-1 h-6 w-px bg-neutral-500' />
							<A
								aria-label='Next product image'
								href={nextUrl()}
								class={buttonClass}
								noScroll
								// scroll={false}
							>
								<Icon path={arrowRight} class='h-5' />
							</A>
						</div>
					</div>
				</Show>
			</div>
		</Show>
	);
}
