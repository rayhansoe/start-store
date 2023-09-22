import clsx from 'clsx';

const Price = (props: {
	amount: string;
	class?: string;
	currencyCode: string;
	currencyCodeClass?: string;
}) => {
	const price = () =>
		`${new Intl.NumberFormat(undefined, {
			style: 'currency',
			currency: props.currencyCode,
			currencyDisplay: 'narrowSymbol',
		}).format(parseFloat(props.amount))}`;
	return (
		<p class={props.class}>
			{price()}
			<span
				class={clsx('ml-1 inline', props.currencyCodeClass)}
			>{`${props.currencyCode}`}</span>
		</p>
	);
};

export default Price;
