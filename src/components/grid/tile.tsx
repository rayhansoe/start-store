import clsx from 'clsx';
// import Image from 'next/image';
import Label from '../label';
import { mergeProps, type ComponentProps } from 'solid-js';

export function GridTileImage(props: {
  isInteractive?: boolean;
  active?: boolean;
  label?: {
    title: string;
    amount: string;
    currencyCode: string;
    position?: 'bottom' | 'center';
  };
} & ComponentProps<'img'>) {
  const merged = mergeProps({ isInteractive: true}, props);
  return (
    <div
      class={clsx(
        'group flex h-full w-full items-center justify-center overflow-hidden rounded-lg border bg-white hover:border-blue-600 dark:bg-black',
        {
          relative: props.label,
          'border-2 border-blue-600': props.active,
          'border-neutral-200 dark:border-neutral-800': !props.active
        }
      )}
    >
      {props.src ? (
        <picture>
          <source srcset={props.src + '&width=690'} media='(min-width: 1080px)' />
          <source srcset={props.src + '&width=625'} media='(min-width: 950px)' />
          <source srcset={props.src + '&width=600'} media='(min-width: 768px)' />
          <source srcset={props.src + '&width=595'} media='(min-width: 660px)' />
          <source srcset={props.src + '&width=512'} media='(min-width: 635px)' />
          <source srcset={props.src + '&width=386'} media='(min-width: 512px)' />
          <source srcset={props.src + '&width=312'} media='(min-width: 450px)' />
          <source srcset={props.src + '&width=256'} media='(min-width: 300px)' />
          <source srcset={props.src + '&width=152'} media='(min-width: 200px)' />
          <img
            class={clsx('relative h-full w-full object-contain', {
              'transition duration-300 ease-in-out group-hover:scale-105': merged.isInteractive
            })}
            {...props}
            src={props.src + '&width=152'}
          />
        </picture>
      ) : null}
      {props.label ? (
        <Label
          title={props.label.title}
          amount={props.label.amount}
          currencyCode={props.label.currencyCode}
          position={props.label.position}
        />
      ) : null}
    </div>
  );
}
