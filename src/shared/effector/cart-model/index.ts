import { getCart } from "@/shared/lib/functions/cart-helpers/cart-functions";
import { IProductListCart } from "@/shared/types/props-types";
import { createEffect, createEvent, createStore, sample } from "effector";
import { createGate } from "effector-react";

const CartGate = createGate();

const setCartStorage = createEvent();
const addProductToCartEvent = createEvent<IProductListCart>();
const setIsCartEvent = createEvent<boolean>();

const $isCart = createStore<boolean>(false);
const $cartStorage = createStore<IProductListCart>({
  products: [],
  totalPrice: 0,
});

const $products = $cartStorage.map((storage) => storage.products);

sample({
  source: $isCart,
  clock: setIsCartEvent,
  fn: (source) => {
    return !source;
  },
  target: $isCart,
});

sample({
  clock: CartGate.open,
  target: setCartStorage,
});

sample({
  clock: setCartStorage,
  fn: () => {
    return getCart();
  },
  target: $cartStorage,
});

sample({
  clock: addProductToCartEvent,
  target: $cartStorage,
});

export const cartModel = {
  setCartStorage,
  addProductToCartEvent,
  setIsCartEvent,
  $cartStorage,
  $isCart,
  $products,
  CartGate,
};
