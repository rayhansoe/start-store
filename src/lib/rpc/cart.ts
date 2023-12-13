import server$, { useRequest } from "solid-start/server";
import { getCookieObject } from "~/utils/cookie";
import { createCart, getCart } from "../shopify";
import { Cart } from "../shopify/types";
import { useServerContext } from "solid-start";
import { API_URL } from './../utils';

export const cartFetcher = server$(async () => {
  const event = useRequest();
  const server = useServerContext();

  let cartId: string | undefined | null;
  // let cart: Cart | undefined;
  console.log('START');


  if (event.responseHeaders) {
    console.log('HIT 1');
    cartId = getCookieObject(event.request.headers.get("Cookie") || "")?.cartId;

    if (cartId) {
      console.log('HIT 2');
      const cart = await getCart(cartId);
      event.responseHeaders.append(
        "set-cookie",
        `cartId=${cart?.id}; Max-Age=2592000; Path=/; HttpOnly; Secure; SameSite=Lax`
      );

      return new Response(JSON.stringify(cart), {
        headers: {
          "set-cookie": `cartId=${cart?.id}; Max-Age=2592000; Path=/; HttpOnly; Secure; SameSite=Lax`
        }
      });
    }

    console.log('HIT 3');
    if (!cartId) {
      console.log('HIT 4');
      const cart = await createCart();

      return new Response(JSON.stringify(cart), {
        headers: {
          "set-cookie": `cartId=${cart?.id}; Max-Age=2592000; Path=/; HttpOnly; Secure; SameSite=Lax`
        }
      });
    }
  }
  console.log('HIT 5');

  console.log(event.request);
  console.log(server.request);
  

  cartId = getCookieObject(server.request?.headers.get("cookie") || "")?.cartId;

  if (cartId) {
    console.log('HIT 6');
    const cart = await getCart(cartId);

    return new Response(JSON.stringify(cart), {
      headers: {
        "set-cookie": `cartId=${cart?.id}; Max-Age=2592000; Path=/; HttpOnly; Secure; SameSite=Lax`
      }
    });
  }

  if (!cartId) {
    console.log('HIT 7');
    const cart = await createCart();

    return new Response(JSON.stringify(cart), {
      headers: {
        "set-cookie": `cartId=${cart?.id}; Max-Age=2592000; Path=/; HttpOnly; Secure; SameSite=Lax`
      }
    });
  }
})


export const getCartData = async () => (await fetch(`${API_URL}/api/cart`)).json() as Promise<Cart>