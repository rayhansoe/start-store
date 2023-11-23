import { APIEvent, json } from "solid-start";
import {
	getProductRecommendations,
} from "~/lib/shopify";

export async function GET({ params, request }: APIEvent) {
	try {
		const url = new URL(request.url);
		const productId = url.searchParams.get("productId");

		const relatedProducts = await getProductRecommendations(productId);
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
