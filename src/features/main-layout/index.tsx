import classnames from "classnames";
import React from "react";
import styles from "./styles.module.scss";
import { Cart } from "@/entities/cart/ui/cart";
import { useUnit } from "effector-react";
import { model } from "@/shared/effector/products-list/models";

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const isShowCart = useUnit(model.$isCart);
  return (
    <div className={classnames(styles.container)}>
      {isShowCart && <Cart />}
      {children}
    </div>
  );
};
