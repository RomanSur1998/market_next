import React from "react";
import styles from "./styles.module.scss";
import { StarIcon } from "@/shared/ui/icons/star";

export const Footer = () => {
  return (
    <footer className={styles.footerContainer}>
      <span>nonameshop©2024</span>
      <StarIcon />
      <span>made in red collar</span>
    </footer>
  );
};
