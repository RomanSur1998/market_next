import React from "react";
import styles from "./styles.module.scss";
import classnames from "classnames";
import { model } from "@/shared/effector/products-list/models";
import { useUnit } from "effector-react";

export const FilterButton = ({ name }: { name: string }) => {
  const categoryName = useUnit(model.$categoryName);
  return (
    <button
      className={classnames(styles.button, {
        [styles.active]: categoryName === name,
      })}
      onClick={() => {
        model.setCategoryNameEvent(name);
      }}
    >
      {name === categoryName && (
        <span className={classnames(styles.rounded)}></span>
      )}

      {name}
    </button>
  );
};
