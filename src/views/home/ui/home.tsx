import React from "react";
import styles from "./styles.module.scss";
import classnames from "classnames";
import { ProductCard } from "@/entities/product-card";

export const Home = () => {
  return (
    <div className={classnames(styles.container)}>
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
    </div>
  );
};
