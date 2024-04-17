import { api } from "@/shared/api/api";
import { createEffect, createEvent, createStore, sample } from "effector";

// ! store
export const $productsList = createStore(null);

// !event
const getProductsEvent = createEvent();

// !effect
const getProductsFx = createEffect(api.getProductList);

sample({
  clock: getProductsEvent,
  target: getProductsFx,
});

sample({
  clock: getProductsFx.doneData,
  fn: (clock) => {
    return clock.data;
  },
  target: $productsList,
});
