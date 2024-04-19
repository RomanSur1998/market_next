import React, { useEffect } from "react";
import styles from "./styles.module.scss";
import classnames from "classnames";
import { ProductCard } from "@/entities/product-card";
import { useGate, useList } from "effector-react";
import { IProduct } from "@/shared/types/props-types";
import { model } from "@/shared/effector/products-list/models";

export default function Home() {
  useGate(model.HomeGate);

  const list = useList(model.$productsList, (elem: IProduct) => {
    return <ProductCard elem={elem} />;
  });
  return <main className={classnames(styles.container)}>{list}</main>;
}
