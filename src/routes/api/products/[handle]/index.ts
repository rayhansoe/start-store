import { APIEvent, json } from "solid-start";
import { getCollectionProducts, getProduct } from "~/lib/shopify";

export async function GET({ params }: APIEvent) {

	try {
		const product = await getProduct(params.handle);
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
}
