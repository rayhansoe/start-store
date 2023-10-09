import { A, Outlet } from "solid-start";
import LogoSquare from "./logo-square";
import { For, Suspense } from "solid-js";
import clsx from "clsx";

export default function Footer() {
	const currentYear = () => new Date().getFullYear();
	const copyrightDate = () =>
		2023 + (currentYear() > 2023 ? `-${currentYear()}` : '');
	const skeleton =
		'w-full h-6 animate-pulse rounded bg-neutral-200 dark:bg-neutral-700';
	const copyrightName = import.meta.env.VITE_COMPANY_NAME || import.meta.env.VITE_SITE_NAME || '';

	const footerMenu = [
		{ title: 'About Medusa', path: 'https://medusajs.com/' },
		{ title: 'Medusa Docs', path: 'https://docs.medusajs.com/' },
		{ title: 'Medusa Blog', path: 'https://medusajs.com/blog' },
	];
	return (
		<footer class="text-sm text-neutral-500 dark:text-neutral-400"  >
			<div class="mx-auto flex w-full max-w-7xl flex-col gap-6 border-t border-neutral-200 px-6 py-12 text-sm dark:border-neutral-700 md:flex-row md:gap-12 md:px-4 min-[1320px]:px-0">
				<div>
					<A
						class="flex items-center gap-2 text-black dark:text-white md:pt-1"
						href="/"
					>
						<LogoSquare size="sm" />
						<span class="uppercase">{import.meta.env.VITE_SITE_NAME}</span>
					</A>
				</div>
				{/* <Suspense
					fallback={
						<div class="flex h-[188px] w-[200px] flex-col gap-2">
							<div class={skeleton} />
							<div class={skeleton} />
							<div class={skeleton} />
							<div class={skeleton} />
							<div class={skeleton} />
							<div class={skeleton} />
						</div>
					}
				> */}
					<nav>
						<ul>
							<For each={footerMenu}>
								{(item) => (
									<li>
										<A
											href={item.path}
											class={clsx(
												"block p-2 text-lg underline-offset-4 hover:text-black hover:underline dark:hover:text-neutral-300 md:inline-block md:text-sm",
												{
													"text-black dark:text-neutral-300": true,
												}
											)}
										>
											{item.title}
										</A>
									</li>
								)}
							</For>
						</ul>
					</nav>
				{/* </Suspense> */}
				<div class="md:ml-auto">
					<A
						class="flex h-8 w-max flex-none items-center justify-center rounded-md border border-neutral-200 bg-white text-xs text-black dark:border-neutral-700 dark:bg-black dark:text-white"
						aria-label="Deploy on Vercel"
						href="https://vercel.com/templates/next.js/nextjs-commerce"
					>
						<span class="px-3">▲</span>
						<hr class="h-full border-r border-neutral-200 dark:border-neutral-700" />
						<span class="px-3">Deploy</span>
					</A>
				</div>
			</div>
			<div class="border-t border-neutral-200 py-6 text-sm dark:border-neutral-700">
				<div class="mx-auto flex w-full max-w-7xl flex-col items-center gap-1 px-4 md:flex-row md:gap-0 md:px-4 min-[1320px]:px-0">
					<p>
						&copy; {copyrightDate()} {copyrightName}
						{copyrightName.length && !copyrightName.endsWith(".") ? "." : ""} All
						rights reserved.
					</p>
					<hr class="mx-4 hidden h-4 w-[1px] border-l border-neutral-400 md:inline-block" />
					<p>Designed in California</p>
					<p class="md:ml-auto">
						Crafted by{" "}
						<A href="https://vercel.com" class="text-black dark:text-white">
							▲ Vercel
						</A>
					</p>
				</div>
			</div>
		</footer>
	);
}
