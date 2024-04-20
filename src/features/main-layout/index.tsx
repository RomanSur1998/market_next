import classnames from "classnames";
import React from "react";
import styles from "./styles.module.scss";
import { Cart } from "@/entities/cart/ui/cart";

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={classnames(styles.container)}>
      {/* <Cart /> */}
      {children}
    </div>
  );
};
