import { APIEvent, json } from "solid-start";
import {
	getProduct,
	getProductRecommendations,
} from "~/lib/shopify";
import { Product } from "~/lib/shopify/types";
import { API_URL } from "~/lib/utils";

export async function GET({ params, request }: APIEvent) {
	try {
		const res = await fetch(`${API_URL}/api/products/${params.handle}`)
		const product = await res.json() as Product

		const relatedProducts = await getProductRecommendations(product.id);
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
}
