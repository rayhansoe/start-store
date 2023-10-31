import { Dialog, DialogPanel, Transition, TransitionChild, DialogOverlay, DialogTitle } from "terracotta";

// import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
// import { Bars3Icon, XMarkIcon } from 'solid-heroicons/outline/';
// import { Menu } from 'lib/shopify/types';
import Search from "./search";
// import { createEffect, createSignal } from 'solid-js';
import { For, createSignal } from "solid-js";
// import { useLocation, useSearchParams } from 'solid-start';
import { Icon } from "solid-heroicons";
import { bars_3, xMark } from "solid-heroicons/outline";
import { isServer } from "solid-js/web";
import { A } from "solid-start";
import { Menu } from "~/lib/shopify/types";

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
	if (isOpen() || (!isOpen() && !isServer)) {
		window.addEventListener("resize", () => {
			if (window.innerWidth > 768) {
				setIsOpen(false);
			}
		});
	}
	// });

	// onCleanup(() => {
	if (isOpen() || (!isOpen() && !isServer)) {
		window.removeEventListener("resize", () => {
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
				<Icon path={bars_3} class="h-4" />
			</button>
			<Transition appear show={isOpen()}>
        <Dialog
          isOpen
          class="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeMobileMenu}
        >
          <div class="min-h-screen w-full h-full">
            <TransitionChild
              enter="transition-all ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-all ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <DialogOverlay class="fixed inset-0 bg-black/30" />
            </TransitionChild>

            <TransitionChild
              enter="transition-all ease-out duration-300"
              enterFrom="translate-x-[-100%] "
              enterTo="translate-x-0"
              leave="transition-all ease-in duration-200"
              leaveFrom="translate-x-0"
              leaveTo="opacity-0 translate-x-[-100%] "
            >
              <DialogPanel class="flex min-h-screen w-full h-full overflow-hidden transition-all transform bg-white pb-6 dark:bg-black ">
              <div class="w-full p-4">
								<button
									class="mb-4 flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors dark:border-neutral-700 dark:text-white"
									onClick={closeMobileMenu}
									aria-label="Close mobile menu"
								>
									{/* <XMarkIcon class="h-6" /> */}
									<Icon path={xMark} class="h-6" />
								</button>

								<div class="mb-4 w-full">
									<Search />
								</div>
								{props.menu.length ? (
									<ul class="flex w-full flex-col">
										<For each={props.menu}>
											{(item) => (
												<li class="py-2 text-xl text-black transition-colors hover:text-neutral-500 dark:text-white">
													<A href={item.path} onClick={closeMobileMenu}>
														{item.title}
													</A>
												</li>
											)}
										</For>
									</ul>
								) : null}
							</div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>
			
		</>
	);
}
