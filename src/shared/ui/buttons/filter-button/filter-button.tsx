import React from "react";
import styles from "./styles.module.scss";
import classnames from "classnames";
import { useUnit } from "effector-react";
import { filterModel } from "@/shared/effector/filter-model";

export const FilterButton = ({ name }: { name: string }) => {
  const categoryName = useUnit(filterModel.$categoryName);
  return (
    <button
      className={classnames(styles.button, {
        [styles.active]: categoryName === name,
      })}
      onClick={() => {
        filterModel.setCategoryNameEvent(name);
      }}
    >
      {name === categoryName && (
        <span className={classnames(styles.rounded)}></span>
      )}

      {name}
    </button>
  );
};
