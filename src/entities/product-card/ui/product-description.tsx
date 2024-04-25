import React from "react";
import styles from "./style.module.scss";

export const ProductsDescription = ({
  description,
  isShowFullDescr,
  setIsShowFullDescr,
}: {
  description: string;
  isShowFullDescr: boolean;
  setIsShowFullDescr: Function;
}) => {
  if (description?.length > 20 && !isShowFullDescr) {
    return (
      <p className={styles.description}>
        {`${description.slice(0, 25)}... `}
        <button
          className={styles.moreButton}
          onClick={() => {
            setIsShowFullDescr(true);
          }}
        >
          Read more
        </button>
      </p>
    );
  }
};
