import React, { CSSProperties } from "react";

import classNames from "classnames";

import styles from "./styles.module.scss";

interface SkeletonProps extends CSSProperties {
  className?: string;
}

export const Skeleton = ({ className, ...props }: SkeletonProps) => (
  <div
    className={classNames(styles.skeleton, className)}
    style={{ ...props }}
  />
);
