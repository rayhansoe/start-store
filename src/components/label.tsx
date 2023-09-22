import clsx from 'clsx';
import Price from './price';

const Label = (props: {
  title: string;
  amount: string;
  currencyCode: string;
  position?: 'bottom' | 'center';
}) => {
  return (
    <div
      class={clsx('absolute bottom-0 left-0 flex w-full px-4 pb-4 @container/label', {
        'lg:px-20 lg:pb-[35%]': props.position === 'center'
      })}
    >
      <div class="flex items-center rounded-full border bg-white/70 p-1 text-xs font-semibold text-black backdrop-blur-md dark:border-neutral-800 dark:bg-black/70 dark:text-white">
        <h3 class="mr-4 line-clamp-2 flex-grow pl-2 leading-none tracking-tight">{props.title}</h3>
        <Price
          class="flex-none rounded-full bg-blue-600 p-2 text-white"
          amount={props.amount}
          currencyCode={props.currencyCode}
          currencyCodeClass="hidden @[275px]/label:inline"
        />
      </div>
    </div>
  );
};

export default Label;
