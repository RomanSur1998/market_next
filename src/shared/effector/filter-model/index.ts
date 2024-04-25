import { api } from "@/shared/api/api";
import { IProduct } from "@/shared/types/props-types";
import { createEffect, createEvent, createStore, sample } from "effector";
import { status } from "patronum";

const getCategoryEvent = createEvent();
const setCategoryNameEvent = createEvent<string>();
const getOneCategoryListEvent = createEvent<string>();

const getCategoryFx = createEffect(api.getCategory);
const getOneProductFx = createEffect(api.getOneCategoryProducts);

const $categoryList = createStore([]);
const $categoryName = createStore<string>("all");
const $productsInCategory = createStore([]);

sample({
  clock: getCategoryEvent,
  target: getCategoryFx,
});

sample({
  clock: getCategoryFx.doneData,
  fn: (clock) => {
    return clock;
  },
  target: $categoryList,
});

sample({
  clock: getOneProductFx.doneData,
  fn: (clock) => {
    return clock.products;
  },
  target: $productsInCategory,
});

sample({
  clock: setCategoryNameEvent,
  target: $categoryName,
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
  clock: getOneCategoryListEvent,
  target: getOneProductFx,
});

const $filterStatus = status(getCategoryFx);
const $filterProductsStatus = status(getOneProductFx);

export const filterModel = {
  $categoryList,
  $categoryName,
  getCategoryEvent,
  setCategoryNameEvent,
  getOneCategoryListEvent,
  getCategoryFx,
  getOneProductFx,
  $productsInCategory,
  $filterStatus,
  $filterProductsStatus,
};
