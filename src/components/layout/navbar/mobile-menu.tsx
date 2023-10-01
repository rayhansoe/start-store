import { Dialog, DialogPanel, Transition, TransitionChild } from 'solid-headless';

// import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
// import { Bars3Icon, XMarkIcon } from 'solid-heroicons/outline/';
// import { Menu } from 'lib/shopify/types';
import Search from './search';
// import { createEffect, createSignal } from 'solid-js';
import { For, createSignal } from 'solid-js';
// import { useLocation, useSearchParams } from 'solid-start';
import { Icon } from 'solid-heroicons';
import { bars_3, xMark } from 'solid-heroicons/outline';
import type { Menu } from '~/lib/types';
import { isServer } from 'solid-js/web';
import { Link } from '~/components/Link';

export default function MobileMenu(props: { menu: Menu[] }) {
  // const location = useLocation();
  // const [searchParams] = useSearchParams();
  const [isOpen, setIsOpen] = createSignal(false);
  const openMobileMenu = () => setIsOpen(true);
  const closeMobileMenu = () => setIsOpen(false);

  // createEffect(() => {
  //   const handleResize = () => {
  //     if (window.innerWidth > 768) {
  //       setIsOpen(false);
  //     }
  //   };
  //   window.addEventListener('resize', handleResize);
  //   return () => window.removeEventListener('resize', handleResize);
  // });

  // createEffect(() => {
    if (isOpen() || !isOpen() && !isServer) {
      window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
          setIsOpen(false);
        }
      });
    }
  // });

  // onCleanup(() => {
    if (isOpen() || !isOpen() && !isServer) {
    window.removeEventListener('resize', () => {
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    });
  }
  // })

  // createSignal(() => {
  //   setIsOpen(false);
  // }, [pathname, searchParams]);

  return (
    <>
      <button
        onClick={openMobileMenu}
        aria-label="Open mobile menu"
        class="flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors dark:border-neutral-700 dark:text-white md:hidden"
      >
        {/* <Bars3Icon class="h-4" /> */}
        <Icon path={bars_3} class='h-4' />
      </button>
      <Transition show={isOpen()}>
        <Dialog isOpen onClose={closeMobileMenu} class="relative z-50">
          <TransitionChild
            enter="transition-all ease-in-out duration-300"
            enterFrom="opacity-0 backdrop-blur-none"
            enterTo="opacity-100 backdrop-blur-[.5px]"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="opacity-100 backdrop-blur-[.5px]"
            leaveTo="opacity-0 backdrop-blur-none"
          >
            <div class="fixed inset-0 bg-black/30" aria-hidden="true" />
          </TransitionChild>
          <TransitionChild
            enter="transition-all ease-in-out duration-300"
            enterFrom="translate-x-[-100%]"
            enterTo="translate-x-0"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-[-100%]"
          >
            <DialogPanel class="fixed bottom-0 left-0 right-0 top-0 flex h-full w-full flex-col bg-white pb-6 dark:bg-black">
              <div class="p-4">
                <button
                  class="mb-4 flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors dark:border-neutral-700 dark:text-white"
                  onClick={closeMobileMenu}
                  aria-label="Close mobile menu"
                >
                  {/* <XMarkIcon class="h-6" /> */}
                  <Icon path={xMark} class='h-6' />
                </button>

                <div class="mb-4 w-full">
                  <Search />
                </div>
                {props.menu.length ? (
                  <ul class="flex w-full flex-col">
                    <For each={props.menu}>
                      {(item) => (
                        <li
                        class="py-2 text-xl text-black transition-colors hover:text-neutral-500 dark:text-white"
                      >
                        <Link href={item.path} onClick={closeMobileMenu}>
                          {item.title}
                        </Link>
                      </li>
                      )}
                    </For>
                  </ul>
                ) : null}
              </div>
            </DialogPanel>
          </TransitionChild>
        </Dialog>
      </Transition>
    </>
  );
}