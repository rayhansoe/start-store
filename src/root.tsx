// @refresh reload
import "./root.css";
import {
	Body,
	ErrorBoundary,
	FileRoutes,
	Head,
	Html,
	Link,
	Meta,
	Routes,
	Scripts,
	Title,
} from "solid-start";
import GlobalLoader from "./components/GlobalLoader";
import { Suspense } from "./components/solid/Suspense";
import ScrollContext from "./context/CartModalContext";

export default function Root() {
	const { isCartOpen } = ScrollContext;
	return (
		<Html lang="en" class="font-inter dark">
			<Head>
				<Title>Start Store</Title>
				<Meta charset="utf-8" />
				<Meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta name="theme-color" content="#026d56" />
				<Meta
					name="description"
					content="High-performance ecommerce store built with SolidStart, Vercel, and Shopify."
				/>
				<Link rel="preconnect" href="https://fonts.googleapis.com" crossorigin="" />
				<Link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
				<Link
					rel="preload"
					href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
					as="style"
					type="text/css"
					crossorigin=""
				/>
				<Link rel="icon" href="/favicon.ico" />
			</Head>
			<Body
				class="bg-neutral-50 text-black selection:bg-teal-300 dark:bg-neutral-900 dark:text-white dark:selection:bg-pink-500 dark:selection:text-white"
				classList={{ "overflow-hidden pr-[7px]": isCartOpen() }}
			>
				<ErrorBoundary>
					<GlobalLoader />
					<Suspense>
							<Routes>
								<FileRoutes />
							</Routes>
					</Suspense>
				</ErrorBoundary>
				<Scripts />
			</Body>
		</Html>
	);
}
