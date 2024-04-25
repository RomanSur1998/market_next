import { api } from "@/shared/api/api";
import { filterModel } from "@/shared/effector/filter-model";
import { searchModel } from "@/shared/effector/search-model";
import { IProduct, IProductListCart } from "@/shared/types/props-types";
import { createEffect, createEvent, createStore, sample } from "effector";
import { createGate } from "effector-react";
import { condition, status } from "patronum";

const HomeGate = createGate();

// !event

const getProductsEvent = createEvent<number>();
const setLimitEvent = createEvent();

// !effect
const getProductsFx = createEffect(api.getProductList);

// ! store
const $productsList = createStore<IProduct[]>([]);
const $limit = createStore<number>(8);
const $isLoadingProducts = createStore<boolean>(false);

sample({
  clock: getProductsEvent,
  target: getProductsFx,
});

sample({
  clock: getProductsFx.doneData,
  fn: (clock) => {
    return clock.products;
  },
  target: $productsList,
});

const $status = status(getProductsFx);

sample({
  source: $limit,
  clock: setLimitEvent,
  fn: (source) => {
    return (source += 8);
  },
  target: $limit,
});

sample({
  source: $limit,
  clock: $limit,
  fn: (source) => {
    return source;
  },
  target: getProductsEvent,
});

condition({
  source: filterModel.$categoryName,
  if: "all",
  then: setLimitEvent,
  else: filterModel.getOneCategoryListEvent,
});

sample({
  clock: filterModel.$productsInCategory,
  target: $productsList,
});

sample({
  clock: HomeGate.open,
  target: filterModel.getCategoryEvent,
});

sample({
  clock: searchModel.$searchProductsList,
  target: $productsList,
});

export const model = {
  setLimitEvent,
  HomeGate,
  $productsList,
  $limit,
  $isLoadingProducts,
  $status,
};
