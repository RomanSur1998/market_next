import React, { useEffect } from "react";
import styles from "./styles.module.scss";
import classnames from "classnames";
import { ProductCard } from "@/entities/product-card";
import { useGate, useUnit } from "effector-react";
import { InView, useInView } from "react-intersection-observer";
import { model } from "@/widgets/effector/data-model";
import { filterModel } from "@/shared/effector/filter-model";
import { Loader } from "@/shared/ui/atoms/loader";
import { searchModel } from "@/shared/effector/search-model";

export default function Home() {
  useGate(model.HomeGate);

  const [status, productsList, setLimitEvent] = useUnit([
    model.$status,
    model.$productsList,
    model.setLimitEvent,
  ]);

  const { ref, inView } = useInView({
    threshold: 0.7,
  });

  const [name, filterProductsStatus] = useUnit([
    filterModel.$categoryName,
    filterModel.$filterProductsStatus,
  ]);
  const [isShowSearch] = useUnit([searchModel.$isShowSearch]);

  useEffect(() => {
    if (inView && name === "all") {
      setLimitEvent();
    }
  }, [inView]);

  return (
    <>
      <main className={classnames(styles.container)}>
        {productsList.map((product) => {
          return (
            <ProductCard
              elem={product}
              loading={status == "pending"}
              key={product.id}
            />
          );
        })}
        {isShowSearch ? null : <div ref={ref}></div>}
      </main>
      {status || filterProductsStatus == "pending" ? <Loader /> : null}
    </>
  );
}
