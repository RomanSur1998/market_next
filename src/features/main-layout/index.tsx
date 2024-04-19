import classnames from "classnames";
import React from "react";
import styles from "./styles.module.scss";

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className={classnames(styles.container)}>{children}</div>;
};
