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

export type { ProductSearchQueryParams, FetchedProduct };
