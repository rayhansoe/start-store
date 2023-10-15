import solid from "solid-start/vite";
import icons from "unplugin-icons/vite";
import { defineConfig } from "vite";
import vercel from "solid-start-vercel";

export default defineConfig({
  plugins: [
    icons({
      compiler: "solid",
    }),
    solid({
      experimental: { islands: false, islandsRouter: false },
      adapter: vercel({ edge: true }),
      ssr: true,
    }),
  ],
});
