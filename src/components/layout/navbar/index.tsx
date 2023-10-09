// import Cart from 'components/cart';
// import OpenCart from 'components/cart/open-cart';
// import LogoSquare from 'components/logo-square';
// import MobileMenu from './mobile-menu';
import Search from './search';
// import { For, Show, Suspense } from 'solid-js';
import { For, Show } from 'solid-js';
import { A } from 'solid-start';
import { Menu } from '~/lib/types';

export default function Navbar(props: {menu: Menu[]}) {
  // const menu = await getMenu('next-js-frontend-header-menu');

  return (
    <nav class="relative flex items-center justify-between p-4 lg:px-6">
      <div class="block flex-none md:hidden">
        {/* <MobileMenu menu={props.menu} /> */}
      </div>
      <div class="flex w-full items-center">
        <div class="flex w-full md:w-1/3">
          <A href="/" class="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6">
            {/* <LogoSquare /> */}
            <div class="ml-2 flex-none text-sm font-medium uppercase md:hidden lg:block">
              {import.meta.env.VITE_SITE_NAME}
            </div>
          </A>
          <Show when={props.menu.length}>
            <ul class="hidden gap-6 text-sm md:flex md:items-center">
              <For each={props.menu}>
                {(item) => (
                  <li>
                  <A
                    href={item.path}
                    class="text-neutral-500 underline-offset-4 hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-neutral-300"
                  >
                    {item.title}
                  </A>
                </li>
                )}
              </For>
            </ul>
          </Show>
        </div>
        <div class="hidden justify-center md:flex md:w-1/3">
          <Search />
        </div>
        <div class="flex justify-end md:w-1/3">
          {/* <Suspense fallback={<OpenCart />}>
            <Cart />
          </Suspense> */}
        </div>
      </div>
    </nav>
  );
}