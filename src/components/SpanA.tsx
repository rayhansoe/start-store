import clsx from "clsx"
import type { JSX } from "solid-js"
import type { Combination } from "./product/variant-selector"

export function SpanA(props: {
  children: JSX.Element,
  class: string,
  isActive: boolean,
  isAvailableForSale: Combination | undefined
}) {
  return (
    <span class={clsx(props.class, {
      'cursor-default ring-2 ring-blue-600 pointer-events-none': props.isActive,
      'ring-1 ring-transparent transition duration-300 ease-in-out hover:scale-110 hover:ring-blue-600 ':
        !props.isActive && props.isAvailableForSale,
      'relative z-10 cursor-not-allowed overflow-hidden bg-neutral-100 text-neutral-500 ring-1 ring-neutral-300 before:absolute before:inset-x-0 before:-z-10 before:h-px before:-rotate-45 before:bg-neutral-300 before:transition-transform dark:bg-neutral-900 dark:text-neutral-400 dark:ring-neutral-700 before:dark:bg-neutral-700':
        !props.isAvailableForSale,
    })}>{props.children}</span>
  )
}