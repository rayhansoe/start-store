import { APIEvent, json } from "solid-start";
import { getCollectionProducts, getCollections, getProduct } from "~/lib/shopify";

export async function GET() {

	try {
		const collections = await getCollections()
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
}
