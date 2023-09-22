import solid from "solid-start/vite";
import { defineConfig } from "vite";
import node from "solid-start-node";

export default defineConfig(() => {
  return {
    plugins: [solid({ ssr: true, adapter: node(), experimental: {
      islands: true, islandsRouter: true
    } })],
  };
});
