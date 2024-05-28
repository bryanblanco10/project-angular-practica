export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: Rating;
  taxes?: number;
}

export interface Rating {
  rate: number;
  count: number;
}

export interface CreateProductDTO
  extends Omit<Product, 'id' | 'category' | 'rating'> {
  categoryId: number;
}

export type UpdateProductDTO = Partial<CreateProductDTO>;
