import { json, LoaderArgs } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { FetchedProduct } from "~/types/services";
import ProductCard from "~/components/Product/ProductCard";
import SearchForm from "~/components/Product/SearchForm";
import { ProductSearchResults } from "~/components/UI/UI";

import { getProducts } from "~/models/product.server";

export const loader = async ({ request }: LoaderArgs) => {
  const url = new URL(request.url);
  const searchQuery = url.search;
  const searchParams = Object.fromEntries(url.searchParams);
  return json({ products: await getProducts(searchQuery), searchParams: searchParams });
};

export default function Index() {
  const { products, searchParams } = useLoaderData<typeof loader>();

  let productList;
  if (products.length > 0) {
    productList = products.map((product: FetchedProduct) => {
      return (
        <li key={product.id}>
          <Link
            to={`/product/${product.id}`}
            aria-label={`Click to view product details for ${product.name}`}
          >
            <ProductCard {...product}>
              <p className="button">View Product Details</p>
            </ProductCard>
          </Link>
        </li>
      );
    });
  } else {
    productList = <h2>Sorry, no products match your search parameters :(</h2>;
  }

  return (
    <>
      <h1>Search Products</h1>
      <SearchForm searchParams={searchParams}/>
      <ProductSearchResults>{productList}</ProductSearchResults>
    </>
  );
}
