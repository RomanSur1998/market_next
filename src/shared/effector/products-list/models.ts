import { api } from "@/shared/api/api";
import { IProduct } from "@/shared/types/props-types";
import { createEffect, createEvent, createStore, sample } from "effector";
import { createGate } from "effector-react";

const HomeGate = createGate();
// !event
const getProductsEvent = createEvent();
const getCategoryEvent = createEvent();

// !effect
const getProductsFx = createEffect(api.getProductList);
const getCategoryFx = createEffect(api.getCategory);

// ! store
const $productsList = createStore<IProduct[]>([]);
const $categoryList = createStore([]);
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
    console.log(clock);
    return clock.products;
  },
  target: $productsList,
});
sample({
  clock: getCategoryFx.doneData,
  fn: (clock) => {
    console.log(clock);
    return clock;
  },
  target: $categoryList,
});

export const model = {
  getProductsEvent,
  $productsList,
  HomeGate,
  $categoryList,
};

sample({
  clock: HomeGate.open,
  target: getProductsEvent,
});
sample({
  clock: HomeGate.open,
  target: getCategoryEvent,
});
