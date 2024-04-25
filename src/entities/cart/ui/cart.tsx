import React from "react";
import ReactDOM from "react-dom";
import styles from "./styles.module.scss";
import { CancelIcon } from "@/shared/ui/icons";
import { CartIcon } from "@/shared/ui/icons/card-icon";
import { CartCard } from "@/entities/cart-card";
import { useList, useUnit } from "effector-react";
import { IProductCart } from "@/shared/types/props-types";
import { cartModel } from "@/shared/effector/cart-model";
import { useEscListener } from "@/shared/lib/hooks/useEscListener";
export const Cart = () => {
  const modal = document.getElementById("modal") as HTMLDivElement;

  const [cartProductsList, setIsCartEvent, products] = useUnit([
    cartModel.$cartStorage,
    cartModel.setIsCartEvent,
    cartModel.$products,
  ]);

  const list = useList(cartModel.$products, (elem: IProductCart) => {
    return <CartCard elem={elem} />;
  });

  useEscListener(() => setIsCartEvent(false));

  return ReactDOM.createPortal(
    <div className={styles.modal}>
      <div className={styles.container}>
        <div className={styles.contorller}>
          <div className={styles.cart_controller}>
            <CartIcon color={"primary"} />
            <span className={styles.cart}>карточка</span>
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
          <span className={styles.position}> {products.length} позиций</span>
          <span className={styles.totalPrice}>
            ${cartProductsList.totalPrice}
          </span>
        </div>
        <button
          className={styles.product}
          onClick={() => setIsCartEvent(false)}
        >
          Вернуться к продуктам
        </button>
      </div>
    </div>,
    modal
  );
};
