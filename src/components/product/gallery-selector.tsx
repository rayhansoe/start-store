"use client";
import { Icon } from 'solid-heroicons';
import { arrowLeft, arrowRight } from 'solid-heroicons/outline';
import { A, useLocation } from 'solid-start';
import { createUrl } from '~/lib/utils';

export default function GallerySelector(props: {
	imageIndex: number;
	imagesLength: number;
	params: Record<string, string>;
	pathname: string;
	images: {
		src: string;
		altText: string;
	}[];
}) {
  const loacation = useLocation()
	const nextImageIndex = () =>
		props.imageIndex + 1 < props.imagesLength ? props.imageIndex + 1 : 0;

	const nextSearchParams = () =>
		new URLSearchParams({ ...props.params, image: nextImageIndex().toString() });

	const nextUrl = () => createUrl(loacation.pathname, nextSearchParams());

	const previousImageIndex = () =>
		props.imageIndex === 0 ? props.imagesLength - 1 : props.imageIndex - 1;

	const previousSearchParams = () =>
		new URLSearchParams({
			...props.params,
			image: previousImageIndex().toString(),
		});

	const previousUrl = () => createUrl(loacation.pathname, previousSearchParams());

	const buttonClass =
		'h-full px-6 transition-all ease-in-out hover:scale-110 hover:text-black dark:hover:text-white flex items-center justify-center';

	return (
    <>
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
    </>
	);
}
