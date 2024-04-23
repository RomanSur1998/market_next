export interface HomePapeProp {
  name: string;
}

export interface IProduct {
  brand: string;
  category: string;
  description: string;
  discountPercentage: number;
  id: number;
  images: string[];
  price: number;
  rating: number;
  stock?: number;
  thumbnail?: string;
  title: string;
}

export interface IProductCart {
  item: IProduct;
  count: number;
  subPrice: number;
}

export interface IProductListCart {
  products: IProductCart[];
  totalPrice: number;
}
