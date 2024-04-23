import React from "react";
import styles from "./styles.module.scss";
import { IProductCart } from "@/shared/types/props-types";
import {
  changeProductCount,
  deleteCartProduct,
} from "@/shared/lib/functions/cart-helpers/cart-functions";

export const CartCard = ({ elem }: { elem: IProductCart }) => {
  return (
    <div className={styles.container}>
      <img src={elem.item.images[0]} className={styles.image} alt="" />
      <div className={styles.block}>
        <div className={styles.textBlock}>
          <span>
            {elem.item.brand} {elem.item.title}
          </span>
          <span>${elem.subPrice}</span>
        </div>
        <div className={styles.buttonBlock}>
          <button
            onClick={() => {
              const newCount = elem.count - 1;
              changeProductCount(newCount, elem.item.id);
            }}
          >
            -
          </button>
          <span>
            {elem.count !== 0
              ? elem.count
              : (deleteCartProduct(elem.item.id), "")}
          </span>
          <button
            onClick={() => {
              const newCount = elem.count + 1;

              changeProductCount(newCount, elem.item.id);
            }}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};
