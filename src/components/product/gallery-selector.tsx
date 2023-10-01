import { Icon } from 'solid-heroicons';
import { arrowLeft, arrowRight } from 'solid-heroicons/outline';
import { useLocation } from 'solid-start';
import { createUrl } from '~/lib/utils';
import { Link } from '../Link';

export default function GallerySelector(props: {
	imageIndex: number;
	imagesLength: number;
	params: Record<string, string>;
	pathname: string;
	previousUrl: string;
	nextUrl: string;
	images: {
		src: string;
		altText: string;
	}[];
}) {
	const loacation = useLocation();
	const imageSearchParam = () => props.params?.image;
	const imageIndex = () =>
		imageSearchParam() ? parseInt(imageSearchParam()) : 0;

	const imagesLength = () => props.images?.length;
	
	const nextImageIndex = () =>
		imageIndex() + 1 < imagesLength() ? imageIndex() + 1 : 0;

	const nextSearchParams = () =>
		new URLSearchParams({ ...props.params, image: nextImageIndex().toString() });

	const nextUrl = () => createUrl(loacation.pathname, nextSearchParams());

	const previousImageIndex = () =>
		imageIndex() === 0 ? imagesLength() - 1 : imageIndex() - 1;

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
			<div class='absolute bottom-[15%] flex w-full justify-center'>
				<div class='mx-auto flex h-11 items-center rounded-full border border-white bg-neutral-50/80 text-neutral-500 backdrop-blur dark:border-black dark:bg-neutral-900/80'>
					<Link
						aria-label='Previous product image'
						href={previousUrl()}
						class={buttonClass}
						noScroll
						// scroll={false}
					>
						<Icon path={arrowLeft} class='h-5' />
					</Link>
					<div class='mx-1 h-6 w-px bg-neutral-500' />
					<Link
						aria-label='Next product image'
						href={nextUrl()}
						class={buttonClass}
						noScroll
						// scroll={false}
					>
						<Icon path={arrowRight} class='h-5' />
					</Link>
				</div>
			</div>
		</>
	);
}
