import { json, LoaderArgs } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import ProductCard from "~/components/Product/ProductCard";
import AddProductModal from "~/components/Product/AddProductModal";
import invariant from "tiny-invariant";
import { ProductDetails } from "~/components/UI/UI";

import { getUniqueProduct } from "~/models/product.server";
import React from "react";

export const loader = async ({ params }: LoaderArgs) => {
  invariant(params.slug, `params.slug is required`);
  const product = await getUniqueProduct(params.slug);
  invariant(product, `product not found: ${params.slug}`);

  return json({ product });
};

export default function ProductSlug() {
  const { product } = useLoaderData<typeof loader>();
  const [addingProduct, setAddingProduct] = React.useState(false);
  const addToCartButton = React.useRef<HTMLButtonElement>(null);

  function closeAddCartModal() {
    setAddingProduct(false);
    focusAddToCartButton();
  }
  function openAddCartModal() {
    setAddingProduct(true);
  }
  function focusAddToCartButton() {
    if (addToCartButton.current) {
      addToCartButton.current.focus();
    }
  }
  const clickHandler = (e: React.MouseEvent) => {
      e.preventDefault();
      // history.go preserves any prior search query params
      history.go(-1)
      // to do: check that current origin and prior window's origin match. if not, push router to the homepage rather than simulating back button
  }

  let purchaseButton;
  if (product.isAvailable) {
    purchaseButton = (
      <button onClick={openAddCartModal} ref={addToCartButton}>
        Add to Cart
      </button>
    );
  } else {
    purchaseButton = (
      <p>We're sorry, this product is currently unavailable for purchase.</p>
    );
  }

  return (
    <ProductDetails>
      <h1>{product.name} Product Details</h1>
      <a href={"/"} aria-label="Go to homepage" onClick={clickHandler}>
        &lt; Back to all products
      </a>
      <hr />
      {addingProduct && (
        <AddProductModal {...product} onClose={closeAddCartModal} />
      )}
      <ProductCard {...product}>{purchaseButton}</ProductCard>
    </ProductDetails>
  );
}
