import clsx from 'clsx';
import { Show, For, Suspense } from 'solid-js';
import { Outlet, useRouteData } from 'solid-start';
import { createServerData$ } from 'solid-start/server';
import { Link } from '~/components/Link';
import CartModal from '~/components/cart/modal';
import OpenCart from '~/components/cart/open-cart';
import MobileMenu from '~/components/layout/navbar/mobile-menu';
import Search from '~/components/layout/navbar/search';
import LogoSquare from '~/components/logo-square';

export function routeData() {
	const data = createServerData$(
		async () => {
			return {
				cart: {
					totalQuantity: 12,
					checkoutUrl: '/cart',
					cost: {
						subtotalAmount: { amount: '0', currencyCode: 'EUR' },
						totalAmount: { amount: '0', currencyCode: 'EUR' },
						totalTaxAmount: { amount: '0', currencyCode: 'EUR' },
					},
				},
			};
		},
		{
			deferStream: true,
		}
	);
	return data;
}

const MainLayout = () => {
	const data = useRouteData<typeof routeData>();
	const currentYear = () => new Date().getFullYear();
	const copyrightDate = () =>
		2023 + (currentYear() > 2023 ? `-${currentYear()}` : '');
	const skeleton =
		'w-full h-6 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700';
	const copyrightName = import.meta.env.VITE_COMPANY_NAME || import.meta.env.VITE_SITE_NAME || '';

	const navMenu = [
		{ title: 'Pants', path: '/search/pants' },
		{ title: 'Shirts', path: '/search/shirts' },
		{ title: 'Merch', path: '/search/merch' },
	];

	const footerMenu = [
		{ title: 'About Medusa', path: 'https://medusajs.com/' },
		{ title: 'Medusa Docs', path: 'https://docs.medusajs.com/' },
		{ title: 'Medusa Blog', path: 'https://medusajs.com/blog' },
	];

	return (
		<>
			{/* Navbar */}
			<nav class='relative flex items-center justify-between p-4 lg:px-6'>
				<div class='block flex-none md:hidden'>
					<MobileMenu menu={navMenu} />
				</div>
				<div class='flex w-full items-center'>
					<div class='flex w-full md:w-1/3'>
						<Link
							href='/'
							class='mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6'
						>
							<LogoSquare />
							<div class='ml-2 flex-none text-sm font-medium uppercase md:hidden lg:block'>
								{import.meta.env.VITE_SITE_NAME}
							</div>
						</Link>
						<Show when={navMenu.length}>
							<ul class='hidden gap-6 text-sm md:flex md:items-center'>
								<For each={navMenu}>
									{(item) => (
										<li>
											<Link
												href={item.path}
												class='text-neutral-500 underline-offset-4 hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-neutral-300'
											>
												{item.title}
											</Link>
										</li>
									)}
								</For>
							</ul>
						</Show>
					</div>
					<div class='hidden justify-center md:flex md:w-1/3'>
						<Search />
					</div>
					<div class='flex justify-end md:w-1/3'>
						<Suspense fallback={<OpenCart />}>
							<Show when={data()}>
								{cart => <CartModal cart={cart().cart} />}
							</Show>
						</Suspense>
					</div>
				</div>
			</nav>
			<main>
				<Outlet />
			</main>
			{/* Footer */}
			<footer class='text-sm text-neutral-500 dark:text-neutral-400'>
				<div class='mx-auto flex w-full max-w-7xl flex-col gap-6 border-t border-neutral-200 px-6 py-12 text-sm dark:border-neutral-700 md:flex-row md:gap-12 md:px-4 min-[1320px]:px-0'>
					<div>
						<Link
							class='flex items-center gap-2 text-black dark:text-white md:pt-1'
							href='/'
						>
							<LogoSquare size='sm' />
							<span class='uppercase'>{import.meta.env.VITE_SITE_NAME}</span>
						</Link>
					</div>
					<Suspense
						fallback={
							<div class='flex h-[188px] w-[200px] flex-col gap-2'>
								<div class={skeleton} />
								<div class={skeleton} />
								<div class={skeleton} />
								<div class={skeleton} />
								<div class={skeleton} />
								<div class={skeleton} />
							</div>
						}
					>
						<nav>
							<ul>
								<For each={footerMenu}>
									{(item) => (
										<li>
											<Link
												href={item.path}
												class={clsx(
													'block p-2 text-lg underline-offset-4 hover:text-black hover:underline dark:hover:text-neutral-300 md:inline-block md:text-sm',
													{
														'text-black dark:text-neutral-300': true,
													}
												)}
											>
												{item.title}
											</Link>
										</li>
									)}
								</For>
							</ul>
						</nav>
					</Suspense>
					<div class='md:ml-auto'>
						<Link
							class='flex h-8 w-max flex-none items-center justify-center rounded-md border border-neutral-200 bg-white text-xs text-black dark:border-neutral-700 dark:bg-black dark:text-white'
							aria-label='Deploy on Vercel'
							href='https://vercel.com/templates/next.js/nextjs-commerce'
						>
							<span class='px-3'>▲</span>
							<hr class='h-full border-r border-neutral-200 dark:border-neutral-700' />
							<span class='px-3'>Deploy</span>
						</Link>
					</div>
				</div>
				<div class='border-t border-neutral-200 py-6 text-sm dark:border-neutral-700'>
					<div class='mx-auto flex w-full max-w-7xl flex-col items-center gap-1 px-4 md:flex-row md:gap-0 md:px-4 min-[1320px]:px-0'>
						<p>
							&copy; {copyrightDate()} {copyrightName}
							{copyrightName.length && !copyrightName.endsWith('.') ? '.' : ''} All
							rights reserved.
						</p>
						<hr class='mx-4 hidden h-4 w-[1px] border-l border-neutral-400 md:inline-block' />
						<p>Designed in California</p>
						<p class='md:ml-auto'>
							Crafted by{' '}
							<Link href='https://vercel.com' class='text-black dark:text-white'>
								▲ Vercel
							</Link>
						</p>
					</div>
				</div>
			</footer>
		</>
	);
};

export default MainLayout;
