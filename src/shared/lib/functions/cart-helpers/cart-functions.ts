import {
  IProductCart,
  IProduct,
  IProductListCart,
} from "@/shared/types/props-types";
import { calcSubPrice, calcTotalPrice } from "./cart-actions";
import { model } from "@/shared/effector/products-list/models";

export const getCart = () => {
  let cart = JSON.parse(localStorage.getItem("cart") as string);
  if (!cart) {
    localStorage.setItem(
      "cart",
      JSON.stringify({
        products: [],
        totalPrice: 0,
      })
    );
  } else {
    return cart;
  }
};

export const addProductToLoaclStorage = (product: IProduct) => {
  let cart = JSON.parse(localStorage.getItem("cart") as string);
  if (!cart) {
    cart = { products: [], totalPrice: 0 };
  }
  let newProduct = {
    item: product,
    count: 1,
    subPrice: +product.price,
  };
  let productToFind = cart.products.filter(
    (elem: IProductCart) => elem.item.id === product.id
  );

  if (productToFind.length === 0) {
    cart.products.push(newProduct);
  } else {
    cart.products = cart.products.filter(
      (elem: IProductCart) => elem.item.id != product.id
    );
  }

  cart.totalPrice = calcTotalPrice(cart.products);

  localStorage.setItem("cart", JSON.stringify(cart));
  model.addProductToCartEvent(cart);
};

export const changeProductCount = (count: number, id: number) => {
  let cart = JSON.parse(localStorage.getItem("cart") as string);

  cart.products = cart.products.map((product: IProductCart) => {
    if (product.item.id == id) {
      product.count = count;
      product.subPrice = calcSubPrice(product);
    }
    return product;
  });
  cart.totalPrice = calcTotalPrice(cart.products);

  localStorage.setItem("cart", JSON.stringify(cart));
  model.addProductToCartEvent(cart);
};

export const deleteCartProduct = (id: number) => {
  let cart = JSON.parse(localStorage.getItem("cart") as string);

  cart.products = cart.products.filter(
    (elem: IProductCart) => elem.item.id !== id
  );

  cart.totalPrice = calcTotalPrice(cart.products);

  localStorage.setItem("cart", JSON.stringify(cart));
  model.addProductToCartEvent(cart);
};
