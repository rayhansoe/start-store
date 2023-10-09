import { json } from "solid-start";

export function GET() {
  return json({
    products: [
      {
        slug: "product-1",
        featuredImage: {
          url: "https://cdn.shopify.com/s/files/1/0614/5753/1058/products/mesh-back-trucker-cap-navy-front-62cd94b2acb05.png?v=1657640123",
        },
        title: "Acme Circles T-Shirt",
        priceRange: { maxVariantPrice: { amount: "", currencyCode: "USD" } },
      },
      {
        slug: "product-2",
        featuredImage: {
          url: "https://cdn.shopify.com/s/files/1/0614/5753/1058/products/womens-cropped-sweatshirt-navy-front-62cf042c4ceaa.png?v=1657734192",
        },
        title: "Acme Drawstring Bag",
        priceRange: { maxVariantPrice: { amount: "", currencyCode: "USD" } },
      },
      {
        slug: "product-3",
        featuredImage: {
          url: "https://cdn.shopify.com/s/files/1/0614/5753/1058/products/unisex-crew-neck-sweatshirt-navy-front-62cf0830c76a1.png?v=1657735233",
        },
        title: "Acme Cup",
        priceRange: { maxVariantPrice: { amount: "", currencyCode: "USD" } },
      },
    ],
  })
}