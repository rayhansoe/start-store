import { A } from 'solid-start';
import Grid from '~/components/grid';
import { GridTileImage } from '~/components/grid/tile';
import { Product } from '~/lib/shopify/types';

export default function ProductGridItems({ products }: { products: Product[] }) {
  return (
    <>
      {products.map((product) => (
        <Grid.Item class="animate-fadeIn">
          <A class="relative inline-block h-full w-full" href={`/product/${product.handle}`}>
            <GridTileImage
              alt={product.title}
              label={{
                title: product.title,
                amount: product.priceRange.maxVariantPrice.amount,
                currencyCode: product.priceRange.maxVariantPrice.currencyCode
              }}
              src={product.featuredImage?.url}
              sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
            />
          </A>
        </Grid.Item>
      ))}
    </>
  );
}
