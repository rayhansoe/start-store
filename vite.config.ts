import solid from "solid-start/vite";
import { defineConfig } from "vite";
import vercel from "solid-start-vercel";

export default defineConfig({
  plugins: [
    solid({
      experimental: { islands: false, islandsRouter: false },
      adapter: vercel({ edge: true }),
      ssr: true,
    }),
  ],
});
