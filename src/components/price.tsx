import clsx from 'clsx';
import { mergeProps } from 'solid-js';

const Price = (props: {
	amount: string;
	class?: string;
	currencyCode: string;
	currencyCodeClass?: string;
}) => {
  const merged = mergeProps({ currencyCode: "USD" }, props);
	const price = () =>
		`${new Intl.NumberFormat(undefined, {
			style: 'currency',
			currency: merged.currencyCode,
			currencyDisplay: 'narrowSymbol',
		}).format(parseFloat(merged.amount))}`;
	return (
		<p class={merged.class}>
			{price()}
			<span
				class={clsx('ml-1 inline', merged.currencyCodeClass)}
			>{`${merged.currencyCode}`}</span>
		</p>
	);
};

export default Price;
