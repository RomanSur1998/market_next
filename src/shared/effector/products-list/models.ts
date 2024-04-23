import { api } from "@/shared/api/api";
import { getCart } from "@/shared/lib/functions/cart-helpers/cart-functions";
import { IProduct, IProductListCart } from "@/shared/types/props-types";
import { createEffect, createEvent, createStore, sample } from "effector";
import { createGate } from "effector-react";

const HomeGate = createGate();
const CartGate = createGate();
// !event
const getProductsEvent = createEvent<number | undefined>();
const getCategoryEvent = createEvent();
const setLimitEvent = createEvent();
const setCategoryNameEvent = createEvent<string>();
const setSearchValueEvent = createEvent<string>();
const setIsCartEvent = createEvent<boolean>();
const getSearchProductsEvent = createEvent<string>();
const setCartStorage = createEvent();
const addProductToCartEvent = createEvent<IProductListCart>();

// !effect
const getProductsFx = createEffect(api.getProductList);
const getCategoryFx = createEffect(api.getCategory);
const getOneProductFx = createEffect(api.getOneCategoryProducts);
const getSearchProductsFx = createEffect(api.searchProducts);

// ! store
const $productsList = createStore<IProduct[]>([]);
const $categoryList = createStore([]);
const $limit = createStore<number>(8);
const $categoryName = createStore<string>("all");
const $searchValue = createStore<string>(" ");
const $isCart = createStore<boolean>(false);
const $isLoading = createStore<boolean>(false);
const $cartStorage = createStore<IProductListCart>({
  products: [],
  totalPrice: 0,
});
const $products = $cartStorage.map((storage) => storage.products);
sample({
  clock: getProductsEvent,
  target: getProductsFx,
});
sample({
  clock: getCategoryEvent,
  target: getCategoryFx,
});

sample({
  clock: getProductsFx.doneData,
  fn: (clock) => {
    return clock.products;
  },
  target: $productsList,
});

sample({
  clock: getCategoryFx.doneData,
  fn: (clock) => {
    return clock;
  },
  target: $categoryList,
});
sample({
  clock: getCategoryFx.pending,
  fn: () => {
    return true;
  },
  target: $isLoading,
});
sample({
  clock: getCategoryFx.done,
  fn: () => {
    return false;
  },
  target: $isLoading,
});

sample({
  source: $limit,
  clock: setLimitEvent,
  fn: (source) => {
    return (source += 8);
  },
  target: $limit,
});

sample({
  clock: getSearchProductsEvent,
  target: getSearchProductsFx,
});

sample({
  clock: getSearchProductsFx.doneData,
  fn: (clock) => {
    return clock.products;
  },
  target: $productsList,
});

sample({
  source: $searchValue,
  fn: () => $searchValue.getState(),
  target: getSearchProductsEvent,
});

sample({
  clock: $limit,
  fn: () => $limit.getState(),
  target: getProductsEvent,
});

sample({
  clock: HomeGate.open,
  fn: () => $limit.getState(),
  target: getProductsEvent,
});
sample({
  clock: HomeGate.open,
  target: getCategoryEvent,
});

sample({
  clock: setCategoryNameEvent,
  target: $categoryName,
});

sample({
  clock: setSearchValueEvent,
  target: $searchValue,
});

sample({
  source: $categoryName,
  clock: $categoryName,
  fn: (source) => {
    return source;
  },
  target: getOneProductFx,
});

sample({
  clock: getOneProductFx.doneData,
  fn: (clock) => {
    return clock.products;
  },
  target: $productsList,
});

sample({
  clock: $categoryName,
  fn: (source) => {
    if (source === "all") {
      return 8;
    }
  },
  target: getProductsEvent,
});

sample({
  source: $isCart,
  clock: setIsCartEvent,
  fn: (source) => {
    return !source;
  },
  target: $isCart,
});

// !local storage

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
// !local storage

export const model = {
  getProductsEvent,
  setLimitEvent,
  setCategoryNameEvent,
  setSearchValueEvent,
  setIsCartEvent,
  setCartStorage,
  addProductToCartEvent,
  HomeGate,
  CartGate,
  $productsList,
  $categoryList,
  $limit,
  $categoryName,
  $isCart,
  $searchValue,
  $isLoading,
  $cartStorage,
  $products,
};
