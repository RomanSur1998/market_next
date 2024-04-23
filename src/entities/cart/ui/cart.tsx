import React from "react";
import styles from "./styles.module.scss";
import { CancelIcon } from "@/shared/ui/icons";
import { CartIcon } from "@/shared/ui/icons/card-icon";
import { model } from "@/shared/effector/products-list/models";
import { CartCard } from "@/entities/cart-card";
import { useGate, useList, useUnit } from "effector-react";
import { IProductCart } from "@/shared/types/props-types";

export const Cart = () => {
  useGate(model.CartGate);

  const [cartProductsList, setIsCartEvent] = useUnit([
    model.$cartStorage,
    model.setIsCartEvent,
  ]);

  const list = useList(model.$products, (elem: IProductCart) => {
    return <CartCard elem={elem} />;
  });
  console.log(cartProductsList, "local");

  return (
    <div className={styles.modal}>
      <div className={styles.container}>
        <div className={styles.contorller}>
          <div>
            <CartIcon color={"primary"} />
            <span className={styles.cart}>card</span>
          </div>
          <button
            className={styles.button}
            onClick={() => setIsCartEvent(true)}
          >
            <CancelIcon />
          </button>
        </div>
        <div className={styles.block}>{list}</div>
        <div className={styles.total}>
          <span className={styles.position}>1 positions</span>
          <span className={styles.totalPrice}>
            {cartProductsList.totalPrice}
          </span>
        </div>
        <button
          className={styles.product}
          onClick={() => setIsCartEvent(false)}
        >
          back to products
        </button>
      </div>
    </div>
  );
};
