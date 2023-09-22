import clsx from 'clsx';
import LogoIcon from './icons/logo';

export default function LogoSquare(props: { size?: 'sm' | undefined }) {
  return (
    <div
      class={clsx(
        'flex flex-none items-center justify-center border border-neutral-200 bg-white dark:border-slate-800 dark:bg-slate-900',
        {
          'h-[40px] w-[40px] rounded-xl': !props.size,
          'h-[30px] w-[30px] rounded-lg': props.size === 'sm'
        }
      )}
    >
      <LogoIcon
        class={clsx({
          'h-[16px] w-[16px]': !props.size,
          'h-[10px] w-[10px]': props.size === 'sm'
        })}
      />
    </div>
  );
}
