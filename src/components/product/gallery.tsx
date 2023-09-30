import { Icon } from 'solid-heroicons';
import { arrowLeft, arrowRight } from 'solid-heroicons/outline';
import { For, Show } from 'solid-js';
import { A, useLocation } from 'solid-start';
import { createUrl } from '~/lib/utils';
import { GridTileImage } from '../grid/tile';

export function Gallery(props: {
	images: {
		src: string;
		altText: string;
	}[];
	params: Record<string, string>
}) {
	const location = useLocation();
	const imageSearchParam = () => props.params?.image;
	const imageIndex = () =>
		imageSearchParam() ? parseInt(imageSearchParam()) : 0;

	const imagesLength = () => props.images?.length;

	const nextImageIndex = () =>
		imageIndex() + 1 < imagesLength() ? imageIndex() + 1 : 0;

	const nextSearchParams = () =>
		new URLSearchParams({ ...props.params, image: nextImageIndex().toString() });

	const nextUrl = () => createUrl(location.pathname, nextSearchParams());

	const previousImageIndex = () =>
		imageIndex() === 0 ? imagesLength() - 1 : imageIndex() - 1;

	const previousSearchParams = () =>
		new URLSearchParams({
			...props.params,
			image: previousImageIndex().toString(),
		});

	const previousUrl = () => createUrl(location.pathname, previousSearchParams());

	const buttonClass =
		'h-full px-6 transition-all ease-in-out hover:scale-110 hover:text-black dark:hover:text-white flex items-center justify-center';

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
										href={createUrl(location.pathname, imageSearchParams())}
										// scroll={false}
										noScroll
										activeClass='pointer-events-none'
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
