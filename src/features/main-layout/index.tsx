import classnames from "classnames";
import React from "react";
import styles from "./styles.module.scss";
import { Cart } from "@/entities/cart/ui/cart";
import { useUnit } from "effector-react";
import { cartModel } from "@/shared/effector/cart-model";

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const isShowCart = useUnit(cartModel.$isCart);
  console.log(isShowCart);
  return (
    <div className={classnames(styles.container)}>
      {isShowCart && <Cart />}

      {children}
    </div>
  );
};
