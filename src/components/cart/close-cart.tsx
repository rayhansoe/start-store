import clsx from 'clsx';
import { Icon } from 'solid-heroicons';
import { xMark } from 'solid-heroicons/outline';

export default function CloseCart(props: { class?: string }) {
  return (
    <div class="relative flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors dark:border-neutral-700 dark:text-white">
      <Icon path={xMark} class={clsx('h-6 transition-all ease-in-out hover:scale-110 ', props.class)} />
    </div>
  );
}