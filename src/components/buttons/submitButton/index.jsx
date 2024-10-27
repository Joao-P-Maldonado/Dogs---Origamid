import React from "react";
import styles from "./button.module.css";

export const SubmitButton = ({ children, ...props }) => {
  return (
    <button {...props} className={styles.button}>
      {children}
    </button>
  );
};
