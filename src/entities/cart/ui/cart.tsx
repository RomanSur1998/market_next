import React from "react";
import styles from "./styles.module.scss";
import { CancelIcon } from "@/shared/ui/icons";
import { CartIcon } from "@/shared/ui/icons/card-icon";

export const Cart = () => {
  return (
    <div className={styles.modal}>
      <div className={styles.container}>
        <div className={styles.contorller}>
          <div>
            <CartIcon color={"primary"} />
            <span>card</span>
          </div>
          <button className={styles.button}>
            <CancelIcon />
          </button>
        </div>
        <div className={styles.block}>
          <span> 232 </span>
          {/* {cart?.products.map((elem) => {
        return (
          <CartCard elem={elem} key={elem.id} products={cart.products} />
        );
      })} */}
        </div>
        <div className={styles.total}>
          <span className={styles.position}>1 positions</span>
          <span className={styles.totalPrice}>$400</span>
        </div>
        <button className={styles.product}>back to products</button>
      </div>
    </div>
  );
};
