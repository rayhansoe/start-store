// import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { Icon } from 'solid-heroicons';
import { shoppingCart } from 'solid-heroicons/outline';

export default function OpenCart(
  props
: {
  class?: string;
  quantity?: number;
}) {
  
  return (
    <div class="relative flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors dark:border-neutral-700 dark:text-white">
      <Icon path={shoppingCart}
        class={clsx('h-4 transition-all ease-in-out hover:scale-110 ', props.class)}
      />

      {props.quantity ? (
        <div class="absolute right-0 top-0 -mr-2 -mt-2 h-4 w-4 rounded bg-blue-600 text-[11px] font-medium text-white">
          {props.quantity}
        </div>
      ) : null}
    </div>
  );
}
