"use client"

import { Show } from "solid-js";
import { useLocation } from "solid-start";
import { createUrl } from "~/lib/utils";
import GallerySelector from "./gallery-selector";
import type { JSX } from "solid-js";

export function GalleryWrapper(props:{
	images: {
		src: string;
		altText: string;
	}[];
	params: Record<string, string>;
  children: JSX.Element
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

	const nextUrl = () => createUrl(loacation.pathname, nextSearchParams());

	const previousImageIndex = () =>
		imageIndex() === 0 ? imagesLength() - 1 : imageIndex() - 1;

	const previousSearchParams = () =>
		new URLSearchParams({
			...props.params,
			image: previousImageIndex().toString(),
		});

	const previousUrl = () => createUrl(loacation.pathname, previousSearchParams());

  return (
    <>
    
			<Show when={props?.images}>
				<div class='relative aspect-square h-full max-h-[550px] w-full overflow-hidden'>
          {props.children}
					
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

      {/* {props.imageSelector} */}
			{/* <Show when={imagesLength() > 1}>
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
			</Show> */}
    </>
  )
}