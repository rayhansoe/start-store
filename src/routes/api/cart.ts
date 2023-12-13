import { APIEvent } from "solid-start";
import { json, useRequest } from "solid-start/server";
import { createCart, getCart } from "~/lib/shopify";
import { getCookieObject } from "~/utils/cookie";

export async function GET({request}: APIEvent) {
  
  // const event = useRequest();

  let cartId: string | undefined | null;

  // server rendered
  // if (event.responseHeaders) {
  //   cartId = getCookieObject(event.request.headers.get("Cookie") || "")?.cartId;

  //   if (cartId) {
  //     const cart = await getCart(cartId);
  //     event.responseHeaders.append(
  //       "set-cookie",
  //       `cartId=${cart?.id}; Max-Age=2592000; Path=/; HttpOnly; Secure; SameSite=Lax`
  //     );

  //     return json({cart}, {
  //       headers: new Headers({
  //         "set-cookie": `cartId=${cart?.id}; Max-Age=2592000; Path=/; HttpOnly; Secure; SameSite=Lax`,
  //         "Cache-Control": "max-age=1, s-maxage=2, stale-while-revalidate",
  //         "CDN-Cache-Control": "max-age=1, s-maxage=2, stale-while-revalidate",
  //         "Vercel-CDN-Cache-Control": "max-age=1, s-maxage=2, stale-while-revalidate",
  //       })
  //     });
  //   }

  //   if (!cartId) {
  //     const cart = await createCart();
  //     console.log("hit no cartId and cart");
  //     console.log(cart.id);

  //     return json({cart}, {
  //       headers: new Headers({
  //         "set-cookie": `cartId=${cart?.id}; Max-Age=2592000; Path=/; HttpOnly; Secure; SameSite=Lax`,
  //         "Cache-Control": "max-age=1, s-maxage=2, stale-while-revalidate",
  //         "CDN-Cache-Control": "max-age=1, s-maxage=2, stale-while-revalidate",
  //         "Vercel-CDN-Cache-Control": "max-age=1, s-maxage=2, stale-while-revalidate",
  //       }),
  //     });
  //   }
  // }

  cartId = getCookieObject(request.headers.get("Cookie") || "")?.cartId;

  if (cartId) {
    const cart = await getCart(cartId);

    return json({cart}, {
      headers: new Headers({
          "set-cookie": `cartId=${cart?.id}; Max-Age=2592000; Path=/; HttpOnly; Secure; SameSite=Lax`,
          "Cache-Control": "max-age=1, s-maxage=2, stale-while-revalidate",
          "CDN-Cache-Control": "max-age=1, s-maxage=2, stale-while-revalidate",
          "Vercel-CDN-Cache-Control": "max-age=1, s-maxage=2, stale-while-revalidate",
        })
    });
  }

  if (!cartId) {
    const cart = await createCart();

    return json({cart}, {
      headers: new Headers({
          "set-cookie": `cartId=${cart?.id}; Max-Age=2592000; Path=/; HttpOnly; Secure; SameSite=Lax`,
          "Cache-Control": "max-age=1, s-maxage=2, stale-while-revalidate",
          "CDN-Cache-Control": "max-age=1, s-maxage=2, stale-while-revalidate",
          "Vercel-CDN-Cache-Control": "max-age=1, s-maxage=2, stale-while-revalidate",
        })
    });
  }

}