import React from "react";
import styles from "./error.module.css";

export const Error = ({ error }) => {
  if (!error) return null;
  return <p className={styles.error}>{error}</p>;
};
