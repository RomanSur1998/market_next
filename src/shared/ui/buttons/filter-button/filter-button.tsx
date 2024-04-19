import React from "react";
import styles from "./styles.module.scss";
import classnames from "classnames";

export const FilterButton = ({ name }: { name: string }) => {
  return <button className={classnames(styles.button)}>{name}</button>;
};
