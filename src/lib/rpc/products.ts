import server$, { json, useRequest } from "solid-start/server";
import { getCollectionProducts, getProduct, getProductRecommendations } from "../shopify";
import { API_URL } from "../utils";
import { Product } from "../shopify/types";

export const productsFetcher = server$(async () => {
  try {
    const event = useRequest();
    const homepageItems = await getCollectionProducts({
      collection: "automated-collection",
    });

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
})

export const productByHandleFetcher = server$(async (handle: string) => {
  try {
    const event = useRequest();
    const product = await getProduct(handle);
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
    return json(product, {
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

export const relatedProductsByHandleFetcher = server$(async (handle: string) => {
  try {
    const event = useRequest();
    const res = await fetch(`${API_URL}/api/products/${handle}`)
    const product = await res.json() as Product

    const relatedProducts = await getProductRecommendations(product.id);
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
    return json(relatedProducts, {
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


export const getProductsData = async () => (await productsFetcher()).json() as Promise<Product[]>

export const getProductByHandler = async (handle: string) => (await productByHandleFetcher(handle)).json() as Promise<Product>

export const getRelatedProductsByHandle = async (handle: string) => (await relatedProductsByHandleFetcher(handle)).json() as Promise<Product[]>