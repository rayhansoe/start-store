import { For, Show } from 'solid-js';
import { A } from 'solid-start';
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
	const imageSearchParam = () => props.params?.image;
	const imageIndex = () =>
		imageSearchParam() ? parseInt(imageSearchParam()) : 0;

	const imagesLength = () => props.images?.length;

	return (
		<>
			<GallerySelector
				imageIndex={imageIndex()}
				imagesLength={imagesLength()}
				images={props.images}
				params={props.params}
			/>

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
