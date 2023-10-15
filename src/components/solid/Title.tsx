"use client";

import { JSX, createEffect } from "solid-js";
import { isServer } from "solid-js/web";

export function Title(props) {
	createEffect(() => {
		if (props.title && typeof props.title === "string") {
			console.log("===>", props.title);

			document.title = props.title;
		}
	});

	return <>{props.title}</>;
}
