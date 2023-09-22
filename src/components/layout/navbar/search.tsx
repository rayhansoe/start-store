// import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Icon } from 'solid-heroicons';
import { magnifyingGlass } from 'solid-heroicons/outline';
// import { createUrl } from 'lib/utils';

import { createEffect, createSignal } from "solid-js";
import { useNavigate, useSearchParams } from "solid-start";
import { createUrl } from "~/lib/utils";

export default function Search() {
  const router = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchValue, setSearchValue] = createSignal('');

  createEffect(() => {
    setSearchValue(searchParams.q || '');
  });

  function onSubmit(e: Event & {
    submitter: HTMLElement;
} & {
    currentTarget: HTMLFormElement;
    target: Element;
}) {
    e.preventDefault();

    const val = e.target as HTMLFormElement;
    const search = val.search as HTMLInputElement;
    const newParams = new URLSearchParams(searchParams.toString());

    if (search.value) {
      newParams.set('q', search.value);
    } else {
      newParams.delete('q');
    }

    router(createUrl('/search', newParams));
  }

  return (
    <form onSubmit={onSubmit} class="w-max-[550px] relative w-full lg:w-80 xl:w-full">
      <input
        type="text"
        name="search"
        placeholder="Search for products..."
        autocomplete="off"
        value={searchValue()}
        onInput={(e) => setSearchValue(e.target.value)}
        class="w-full rounded-lg border bg-white px-4 py-2 text-sm text-black placeholder:text-neutral-500 dark:border-neutral-800 dark:bg-transparent dark:text-white dark:placeholder:text-neutral-400"
      />
      <div class="absolute right-0 top-0 mr-3 flex h-full items-center">
        <Icon path={magnifyingGlass} class='h-4' />
      </div>
    </form>
  );
}