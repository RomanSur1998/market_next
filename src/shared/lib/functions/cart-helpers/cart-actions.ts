import { IProductCart, IProductListCart } from "@/shared/types/props-types";

export function getCountProductsInCart() {
  const cart: IProductListCart = JSON.parse(
    localStorage.getItem("cart") as string
  );
  return cart ? cart.products.length : 0;
}

export const calcSubPrice = (product: IProductCart) => {
  return +product.count * product.item.price;
};

export const calcTotalPrice = (products: IProductCart[]) => {
  return products.reduce((acc, curr) => {
    return (acc += curr.subPrice);
  }, 0);
};
