"use client";

import clsx from "clsx";
import { JSX, createEffect, createMemo, createSignal, useTransition } from "solid-js";
import { useNavigate } from "solid-start";
import server$, { createServerAction$, redirect } from "solid-start/server";
const status = import.meta.env.START_ISLANDS_ROUTER && !import.meta.env.SSR ? false : true

const addToCart = server$(async () => {
	//    console.log("hi server");
	return new Promise((resolve: (value: { msg: string }) => void) => {
		setTimeout(() => {
			//    console.log("hi server delay");

			resolve({ msg: "hi" });
		}, 500);
	});
	// return redirect('/')
});

function AddToCartIslands() {
	const [, startTransition] = useTransition();
	const [isPending, setIsPending] = createSignal(false)

	const navigate = useNavigate();
	function handleSubmit() {
		setIsPending(true)
		startTransition(async () => {
			addToCart().then((r) => {
				setIsPending(false)
				navigate("/");
			});
		});
	}

	createEffect(() => {
		//    console.log(isPending());
	});

	//    console.log(status);
	

	return (
		<>
			<form onSubmit={(e) => e.preventDefault()}>
				<button
					onClick={handleSubmit}
					class={clsx("asdasd", {
						"cursor-not-allowed": isPending(),
					})}
					type="button"
				>
					Add to Cart
				</button>
			</form>
		</>
	);
}

function AddToCartBase() {
	const [incrementing, { Form }] = createServerAction$(async () => {
		//    console.log("hi server");
		function sleep(ms) {
			return new Promise((resolve) =>
				setTimeout(() => {
					//    console.log("hi delay");
					resolve({ msg: "hi" });
				}, ms)
			);
		}
		await sleep(2000);
		return redirect("/");
	});

	//    console.log(status);
	

	return (
		<>
			<Form>
				<button
					class={clsx("asdasd", {
						"cursor-not-allowed": incrementing.pending,
					})}
					type="submit"
				>
					Add to Cart
				</button>
			</Form>
		</>
	);
}

const AddToCart =
	import.meta.env.START_ISLANDS_ROUTER && !import.meta.env.SSR
		? AddToCartIslands
		: AddToCartBase;

export default AddToCart;
