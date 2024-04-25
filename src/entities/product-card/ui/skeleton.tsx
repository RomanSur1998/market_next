import React from "react";
import styles from "./style.module.scss";
import classnames from "classnames";
import { Skeleton } from "@/shared/ui/atoms/sckeleton";

export const SkeletonCard = () => {
  return (
    <div className={classnames(styles.flex, styles.card_container)}>
      <div>
        <Skeleton width={200} height={30} />
        <div>
          <Skeleton width={"100%"} height={288} />
        </div>
      </div>
      <div>
        <Skeleton width={"100%"} height={30} />

        <Skeleton width={"100%"} height={30} />
        <div className={styles.priceContainer}>
          <Skeleton width={200} height={30} />
        </div>
      </div>
    </div>
  );
};
