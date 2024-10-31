import React, { useState } from "react";
import styles from "./skeleton.module.css";

const ImageSkeleton = ({ alt, ...props }) => {
  const [skeleton, setSkeleton] = useState(true);

  function handleLoad({ target }) {
    target.style.opacity = 1;
    setSkeleton(false);
  }

  return (
    <div className={styles.wrapper}>
      {skeleton && <div className={styles.skeleton}></div>}
      <img onLoad={handleLoad} className={styles.img} {...props} alt={alt} />
    </div>
  );
};

export default ImageSkeleton;
