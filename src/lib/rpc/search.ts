import server$, { json, useRequest } from "solid-start/server";
import { defaultSort, sorting } from "../constants";
import { getCollections, getProducts } from "../shopify";

export const getSearchData = server$(async (sort, q) => {
  const event = useRequest()
  try {
    // const url = new URL(event.request.url)
    // const sort = url.searchParams.get('sort')
    // const q = url.searchParams.get('q')
    const { sortKey, reverse } =
      sorting.find((item) => item.slug === sort) || defaultSort;

    const products = await getProducts({ sortKey, reverse, query: q as string });
    if (event.responseHeaders) {
      event.responseHeaders.set(
        "Cache-Control",
        "max-age=15, stale-while-revalidate"
      );
      event.responseHeaders.set(
        "CDN-Cache-Control",
        "max-age=15, stale-while-revalidate"
      );
      event.responseHeaders.set(
        "Vercel-CDN-Cache-Control",
        "max-age=15, stale-while-revalidate"
      );
    }
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
})

export const getCollectionsData = server$(async () => {
  const event = useRequest()
  try {
    const collections = await getCollections()
    if (event.responseHeaders) {
      event.responseHeaders.set(
        "Cache-Control",
        "max-age=15, stale-while-revalidate"
      );
      event.responseHeaders.set(
        "CDN-Cache-Control",
        "max-age=15, stale-while-revalidate"
      );
      event.responseHeaders.set(
        "Vercel-CDN-Cache-Control",
        "max-age=15, stale-while-revalidate"
      );
    }
    return json(collections, {
      headers: {
        "Cache-Control": "max-age=15, stale-while-revalidate",
        "CDN-Cache-Control": "max-age=15, stale-while-revalidate",
        "Vercel-CDN-Cache-Control": "max-age=15, stale-while-revalidate",
      },
    });
  } catch (error) {
    throw new Error("Data not available");
  }
})

