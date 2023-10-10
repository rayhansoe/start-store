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

export default function Root() {
	return (
		<Html lang="en" class="font-inter dark">
			<Head>
				<Title>Start Store</Title>
				<Meta charset="utf-8" />
				<Meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta name="theme-color" content="#026d56" />
				<Meta
					name="description"
					content="High-performance ecommerce store built with SolidStart, Vercel, and NeonDB."
				/>
				<Link rel="icon" href="/favicon.ico" />
			</Head>
			<Body class="bg-neutral-50 text-black selection:bg-teal-300 dark:bg-neutral-900 dark:text-white dark:selection:bg-pink-500 dark:selection:text-white">
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
