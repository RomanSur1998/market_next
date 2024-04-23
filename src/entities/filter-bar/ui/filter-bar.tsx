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
import { useList, useUnit } from "effector-react";
import { model } from "@/shared/effector/products-list/models";
import { CancelIcon } from "@/shared/ui/icons";
import useDebounce from "@/shared/lib/hooks/useDebounce/useDebounce";
import { Skeleton } from "@/shared/ui/atoms/sckeleton";

export const FilterBar = () => {
  const [isShowSearch, setIsShowSearch] = useState(false);

  const [searchValue, isLoading] = useUnit([
    model.$searchValue,
    model.$isLoading,
  ]);

  const debonce = useDebounce(searchValue, 500);
  console.log(debonce, "search");

  const list = useList(model.$categoryList, (elem) => {
    return <FilterButton name={elem} />;
  });
  return (
    <div className={classnames(styles.filter_container)}>
      {isShowSearch ? (
        <form action="" className={styles.form}>
          <label htmlFor="">
            <button className={styles.show} type="button">
              <SearchIcon />
            </button>
            <input
              type="text"
              placeholder="Search..."
              onChange={(e) => model.setSearchValueEvent(e.target.value)}
            />
          </label>
          <button
            className={styles.cancel}
            onClick={() => {
              setIsShowSearch((prev) => !prev);
              model.setSearchValueEvent("");
            }}
          >
            <CancelIcon />
          </button>
        </form>
      ) : (
        <>
          {isLoading ? (
            <Skeleton width={"100%"} height={28} />
          ) : (
            <>
              <button
                className={classnames(styles.show)}
                onClick={() => {
                  setIsShowSearch((prev) => !prev);
                }}
              >
                <SearchIcon />
              </button>

              <ScrollContainer className={classnames(styles.cont)}>
                <FilterButton name={"all"} />
                {list}
              </ScrollContainer>
            </>
          )}
        </>
      )}

      <button className={styles.card} onClick={model.setIsCartEvent}>
        <CartIcon color={"primary"} /> cart
      </button>
    </div>
  );
};
