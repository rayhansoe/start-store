import { For, Show } from 'solid-js';
import { A, useLocation } from 'solid-start';
import { GridTileImage } from '../grid/tile';
import { createUrl } from '~/lib/utils';

export default function ImageSelector(props: {
	images: {
		src: string;
		altText: string;
	}[];
	params: Record<string, string>;
}) {
	const location = useLocation();
	const imageSearchParam = () => new URLSearchParams(location.search).get('image');
	const imageIndex = () =>
		imageSearchParam() ? parseInt(imageSearchParam()) : 0;

	const imagesLength = () => props.images?.length;
	return (
		<>
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
