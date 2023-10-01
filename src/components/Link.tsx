"use client";

import { A as BaseA } from "@solidjs/router";
import type { ComponentProps} from "solid-js";
import { createEffect, splitProps } from "solid-js";
import { useLocation } from "solid-start";

export function IslandsA(props: ComponentProps<typeof BaseA>) {
  const [, rest] = splitProps(props, ["state", "activeClass", "inactiveClass", "end"]);
  const location = useLocation();
  const isActive = () => {
    return props.href.startsWith("#")
      ? location.hash === props.href
      : location.pathname === props.href;
  };
  const isActiveX = () => location.pathname + location.search === props.href;

  createEffect(() => {
    console.log(location);
    console.log(location.pathname);
    console.log(props.href);
    console.log(isActive());
    console.log(isActiveX());
    
  })

  return (
    <a
      link
      {...rest}
      state={JSON.stringify(props.state)}
      classList={{
        [props.activeClass || "active"]: isActiveX(),
        ...rest.classList
      }}
      aria-current={isActiveX() ? "page" : undefined}
    >
      {rest.children}
    </a>
  );
}

export const Link = import.meta.env.START_ISLANDS_ROUTER ? IslandsA : BaseA;
