type ProductSearchQueryParams = {
  search?: string;
  minRating?: string;
  maxRating?: string;
  minPrice?: string;
  maxPrice?: string;
  isAvailable?: string;
  limit?: string;
  offset?: string;
  orderBy?: string;
  sort?: string;
};

interface FetchedProduct {
  description: string;
  id: string;
  image: string;
  isAvailable: boolean;
  name: string;
  price: number;
  rating: number;
}

interface CartProduct extends FetchedProduct {
  quantity: number;
}

interface ProductAsPayload {
  productId: string;
  quantity: number;
}

interface PurchasePayload {
  name: string;
  deliveryAddress: string;
  items: ProductAsPayload[];
}

export type {
  ProductSearchQueryParams,
  FetchedProduct,
  CartProduct,
  ProductAsPayload,
  PurchasePayload,
};
