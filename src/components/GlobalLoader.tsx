"use client";
import { createSignal, Show } from "solid-js";
import { isServer } from "solid-js/web";

import { useIsRouting } from "solid-start";

function GlobalLoaderIslands () {
  const [isVisible, setVisible] = createSignal();
  if (!isServer) {
    window.router.router.addEventListener("navigation-start", (e) => {
      setVisible(true);
    });

    window.router.router.addEventListener("navigation-end", (e) => {
      setVisible(false);
    });

    window.router.router.addEventListener("navigation-error", (e) => {
      setVisible(false);
    });
  }
  return (
    <Show when={isVisible()}>
      <div class="global-loader is-loading">
        <div class="global-loader-fill" />
      </div>
    </Show>
  );
};

function GlobalLoaderBase () {
  const isVisible = useIsRouting();
  return (
    <Show when={isVisible()}>
      <div class="global-loader is-loading">
        <div class="global-loader-fill" />
      </div>
    </Show>
  );
};

const GlobalLoader = 
import.meta.env.START_ISLANDS_ROUTER && !import.meta.env.SSR
  ? GlobalLoaderIslands
  : GlobalLoaderBase;

export default GlobalLoader