import { StarIcon } from "@/shared/ui/icons/star";
import styles from "./styles.module.scss";
import React from "react";

export const Loader = () => {
  return (
    <div className={styles.container}>
      <div className={styles.loaderIcon}>
        <StarIcon />
      </div>
      <span>Loading....</span>
    </div>
  );
};
