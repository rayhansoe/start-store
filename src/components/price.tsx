import clsx from 'clsx';
import { Show, mergeProps } from 'solid-js';

const Price = (props: {
	amount: string;
	class?: string;
	currencyCode: string;
	currencyCodeClass?: string;
}) => {
	const derived = () => props;
	const merged = mergeProps({ currencyCode: 'USD' }, derived());
	const price = () =>
		`${new Intl.NumberFormat(undefined, {
			style: 'currency',
			currency: merged.currencyCode,
			currencyDisplay: 'narrowSymbol',
		}).format(parseFloat(merged.amount))}`;
	return (
		<Show when={price() && merged.currencyCode}>
			<p class={merged.class}>
				{price()}
				<span
					class={clsx('ml-1 inline', merged.currencyCodeClass)}
				>{`${merged.currencyCode}`}</span>
			</p>
		</Show>
	);
};

export default Price;
