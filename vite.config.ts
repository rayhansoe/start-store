import solid from "solid-start/vite";
import { defineConfig } from "vite";

import node from "solid-start-node";
import vercel from "solid-start-vercel";
import netlify from "solid-start-netlify";

import dotenv from 'dotenv'

dotenv.config()

const adapaters = ["node", "vercel", "netlify"];
type adapatersType = "node" | "vercel" | "netlify";



export default defineConfig({
  plugins: [
    solid({
      experimental: { islands: false, islandsRouter: false },
      adapter: Adapter({ adapterName: process.env.ADAPTER, edge: true }),
      ssr: true,
    }),
  ],
});



function Adapter({
  adapterName,
  edge,
}: {
  adapterName: "node" | "vercel" | "netlify" | unknown;
  edge: boolean;
}) {
  if (typeof adapterName !== "string") {
    throw Error("adapter is string");
  }

  if (!adapaters.includes(adapterName.toLowerCase())) {
    throw Error("there is no adapter.");
  }

  switch (adapterName.toLowerCase() as adapatersType) {
    case "node":
      return node();

    case "netlify":
      return netlify({ edge });

    case "vercel":

      return vercel({ edge });
  }
}