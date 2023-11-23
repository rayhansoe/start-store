import { createAutoAnimate } from "@formkit/auto-animate/solid";
import { JSX, createEffect } from "solid-js";
import { useCartActionContext } from "~/context/CartActionContext";

export function CartList(props: { children: JSX.Element }) {
	const [parent, setEnabled] = createAutoAnimate();
	const { addToCartSubmission } = useCartActionContext();
	createEffect(() => {
		if (addToCartSubmission.pending) setEnabled(false);
		if (!addToCartSubmission.pending) setEnabled(true);
	});

	return (
		<>
			<ul
				ref={parent}
				class="flex-grow overflow-auto overflow-x-hidden py-4"
			>
				{props.children}
			</ul>
		</>
	);
}
