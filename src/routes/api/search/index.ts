import { APIEvent, json } from "solid-start";
import { defaultSort, sorting } from "~/lib/constants";
import { getCollectionProducts, getCollections, getProduct, getProducts } from "~/lib/shopify";

export async function GET({ request }: APIEvent) {

  try {
    const url = new URL(request.url)
    const sort = url.searchParams.get('sort')
    const q = url.searchParams.get('q')
    const { sortKey, reverse } =
      sorting.find((item) => item.slug === sort) || defaultSort;

    const products = await getProducts({ sortKey, reverse, query: q as string });
    return json(products, {
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
