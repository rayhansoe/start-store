import { Icon } from 'solid-heroicons';
import { arrowLeft, arrowRight } from 'solid-heroicons/outline';
import { A } from 'solid-start';

export default function GallerySelector(props: {
	imageIndex: number;
	imagesLength: number;
	params: Record<string, string>;
	pathname: string;
	previousUrl: string,
	nextUrl: string,
	images: {
		src: string;
		altText: string;
	}[];
}) {

	const buttonClass =
		'h-full px-6 transition-all ease-in-out hover:scale-110 hover:text-black dark:hover:text-white flex items-center justify-center';

	return (
    <>
					<A
						aria-label='Previous product image'
						href={props.previousUrl}
						class={buttonClass}
						noScroll
						// scroll={false}
					>
						<Icon path={arrowLeft} class='h-5' />
					</A>
					<div class='mx-1 h-6 w-px bg-neutral-500' />
					<A
						aria-label='Next product image'
						href={props.nextUrl}
						class={buttonClass}
						noScroll
						// scroll={false}
					>
						<Icon path={arrowRight} class='h-5' />
					</A>
    </>
	);
}
