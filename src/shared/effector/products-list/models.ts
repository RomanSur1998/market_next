import { api } from "@/shared/api/api";
import { IProduct } from "@/shared/types/props-types";
import { createEffect, createEvent, createStore, sample } from "effector";
import { createGate } from "effector-react";

const HomeGate = createGate();
// !event
const getProductsEvent = createEvent<number>();
const getCategoryEvent = createEvent();

const setLimitEvent = createEvent();
const setCategoryNameEvent = createEvent<string>();
const setSearchValueEvent = createEvent<string>();

// !effect
const getProductsFx = createEffect(api.getProductList);
const getCategoryFx = createEffect(api.getCategory);
const getOneProductFx = createEffect(api.getOneCategoryProducts);

// ! store
const $productsList = createStore<IProduct[]>([]);
const $categoryList = createStore([]);
const $limit = createStore<number>(8);
const $categoryName = createStore<string>("all");
const $searchValue = createStore<string>("");

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
  source: $limit,
  clock: setLimitEvent,
  fn: (source) => {
    return (source += 8);
  },
  target: $limit,
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
  clock: $categoryName,
  fn: () => $categoryName.getState(),
  target: getOneProductFx,
});

sample({
  clock: getOneProductFx.doneData,
  fn: (clock) => {
    return clock.products;
  },
  target: $productsList,
});

export const model = {
  getProductsEvent,
  setLimitEvent,
  setCategoryNameEvent,
  $productsList,
  HomeGate,
  $categoryList,
  $limit,
  $categoryName,
};
