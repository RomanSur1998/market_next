import React, { useState } from "react";
import styles from "./styles.module.scss";
import classnames from "classnames";
import { SearchIcon } from "@/shared/ui/icons/search";
import { CartIcon } from "@/shared/ui/icons/card-icon";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FilterButton } from "@/shared/ui/buttons";
import ScrollContainer from "react-indiana-drag-scroll";
import { useGate, useList, useUnit } from "effector-react";
import { CancelIcon } from "@/shared/ui/icons";
import useDebounce from "@/shared/lib/hooks/useDebounce/useDebounce";
import { Skeleton } from "@/shared/ui/atoms/sckeleton";
import { cartModel } from "@/shared/effector/cart-model";
import { filterModel } from "@/shared/effector/filter-model";
import { searchModel } from "@/shared/effector/search-model";

export const FilterBar = () => {
  const [searchValue, isShowSearch] = useUnit([
    searchModel.$searchValue,
    searchModel.$isShowSearch,
  ]);
  const [filterStatus] = useUnit([filterModel.$filterStatus]);
  const [products] = useUnit([cartModel.$products]);
  console.log(products.length, "products");

  useGate(cartModel.CartGate);

  const debonce = useDebounce(searchValue, 500);
  console.log(debonce, "search");

  const productsInCart = products.length > 0;

  const list = useList(filterModel.$categoryList, (elem) => {
    return <FilterButton name={elem} />;
  });
  return (
    <div className={classnames(styles.filter_container)}>
      {isShowSearch ? (
        <form className={styles.form}>
          <label className={styles.label}>
            <button className={styles.show} type="button">
              <SearchIcon />
            </button>
            <input
              className={styles.input}
              type="text"
              placeholder="Search..."
              onChange={(e) => searchModel.setSearchValueEvent(e.target.value)}
            />
          </label>
          <button
            className={styles.cancel}
            onClick={() => {
              searchModel.setIsShowSearch(false);
              searchModel.setSearchValueEvent("");
            }}
          >
            <CancelIcon />
          </button>
        </form>
      ) : (
        <>
          <button
            className={classnames(styles.show)}
            onClick={() => {
              searchModel.setIsShowSearch(true);
            }}
          >
            <SearchIcon />
          </button>
          {filterStatus === "pending" ? (
            <Skeleton width={"100%"} height={28} />
          ) : (
            <>
              <ScrollContainer className={classnames(styles.cont)}>
                <FilterButton name={"all"} />
                {list}
              </ScrollContainer>
            </>
          )}
        </>
      )}

      <button
        className={classnames(styles.cart, {
          [styles.active]: productsInCart,
        })}
        onClick={() => cartModel.setIsCartEvent(true)}
      >
        <CartIcon color={productsInCart ? "white" : "primary"} /> cart
      </button>
    </div>
  );
};
