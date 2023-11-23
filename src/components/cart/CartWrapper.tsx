import { createAutoAnimate } from "@formkit/auto-animate/solid";
import { JSX, createEffect } from "solid-js";
import { DialogPanel } from "terracotta";
import { useCartActionContext } from "~/context/CartActionContext";

export function CartWrapper(props: { children: JSX.Element }) {
	const [parent, setEnabled] = createAutoAnimate();
	const { addToCartSubmission } = useCartActionContext();
	createEffect(() => {
		if (addToCartSubmission.pending) setEnabled(false);
		if (!addToCartSubmission.pending) setEnabled(true);
	});

	return (
		<>
			<div class="flex flex-col h-full" ref={parent}>{props.children}</div>
		</>
	);
}
