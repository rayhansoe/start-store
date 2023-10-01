"use client";

import { A as BaseA } from "@solidjs/router";
import type { ComponentProps} from "solid-js";
import { splitProps } from "solid-js";
import { useLocation } from "./useLocation";

export function IslandsA(props: ComponentProps<typeof BaseA>) {
  const [, rest] = splitProps(props, ["state", "activeClass", "inactiveClass", "end"]);
  const location = useLocation();
  const isActive = () => {
    return props.href.startsWith("#")
      ? location.hash === props.href
      : location.pathname === props.href;
  };

  return (
    <a
      link
      {...rest}
      state={JSON.stringify(props.state)}
      classList={{
        [props.inactiveClass || "inactive"]: !isActive(),
        [props.activeClass || "active"]: isActive(),
        ...rest.classList
      }}
      aria-current={isActive() ? "page" : undefined}
    >
      {rest.children}
    </a>
  );
}

export const Link = import.meta.env.START_ISLANDS_ROUTER ? IslandsA : BaseA;
