import React from "react";
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
import { model } from "@/shared/effector/products-list/models";

export const FilterBar = () => {
  useGate(model.HomeGate);

  const categories = useUnit(model.$categoryList);
  console.log(categories);
  const list = useList(model.$categoryList, (elem) => {
    return <FilterButton name={elem} />;
  });
  return (
    <div className={classnames(styles.filter_container)}>
      <button className={classnames(styles.show)}>
        <SearchIcon />
      </button>

      <ScrollContainer className={classnames(styles.cont)}>
        <FilterButton name={"all"} />
        {list}
      </ScrollContainer>

      <button className={styles.card}>
        <CartIcon color={"primary"} /> cart
      </button>
    </div>
  );
};
