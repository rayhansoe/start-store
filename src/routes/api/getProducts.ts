import { json } from "solid-start";
import { getCollectionProducts } from "~/lib/shopify";

export async function GET() {
  try {
  const homepageItems = await getCollectionProducts({
    collection: "automated-collection",
  });

  return json(homepageItems, {
    headers: {
      "Cache-Control": "max-age=15, stale-while-revalidate",
      "CDN-Cache-Control": "max-age=15, stale-while-revalidate",
      "Vercel-CDN-Cache-Control": "max-age=15, stale-while-revalidate",
    },
  });
} catch (error) {
  throw new Error("Data not available");
}
}