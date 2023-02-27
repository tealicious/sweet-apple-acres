import { json, LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
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

  function closeAddCartModal(): void {
    setAddingProduct(false);
    focusAddToCartButton();
  }
  function openAddCartModal(): void {
    setAddingProduct(true);
  }
  function focusAddToCartButton(): void {
    if (addToCartButton.current) {
      addToCartButton.current.focus();
    }
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
      <hr />
      {addingProduct && (
        <AddProductModal product={product} onClose={closeAddCartModal} />
      )}
      <ProductCard {...product}>{purchaseButton}</ProductCard>
    </ProductDetails>
  );
}
