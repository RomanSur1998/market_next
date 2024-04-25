import { api } from "@/shared/api/api";
import { createEffect, createEvent, createStore, sample } from "effector";

const setSearchValueEvent = createEvent<string>();
const getSearchProductsEvent = createEvent<string>();
const setIsShowSearch = createEvent<boolean>();

const getSearchProductsFx = createEffect(api.searchProducts);

const $searchValue = createStore<string>("");
const $isShowSearch = createStore<boolean>(false);
const $searchProductsList = createStore([]);

sample({
  clock: setIsShowSearch,
  target: $isShowSearch,
});

sample({
  clock: getSearchProductsEvent,
  target: getSearchProductsFx,
});

sample({
  source: $searchValue,
  clock: $searchValue,
  fn: (source) => source,
  target: getSearchProductsEvent,
});

sample({
  clock: setSearchValueEvent,
  target: $searchValue,
});

sample({
  clock: getSearchProductsFx.doneData,
  fn: (clock) => {
    return clock.products;
  },
  target: $searchProductsList,
});

export const searchModel = {
  setIsShowSearch,
  setSearchValueEvent,
  getSearchProductsEvent,
  getSearchProductsFx,
  $searchValue,
  $isShowSearch,
  $searchProductsList,
};
