export default function ProductImage(props: {
	params: Record<string, string>;
	images: {
		src: string;
		altText: string;
	}[];
}) {
	const imageSearchParam = () => props.params?.image;
	const imageIndex = () =>
		imageSearchParam() ? parseInt(imageSearchParam()) : 0;
	return (
		<>
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
		</>
	);
}
