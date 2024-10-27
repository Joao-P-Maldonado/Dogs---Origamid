import { PHOTO_GET } from "@Api/Api";
import { Error } from "@Components/helpers/error";
import Loading from "@Components/helpers/loading";
import useFetch from "@Hooks/useFetch";
import PhotoContent from "@Views/photoContent";
import React, { useEffect } from "react";
import styles from "./photoModal.module.css";

const PhotoModal = ({ photo, setModalPhoto }) => {
  const { data, error, loading, request } = useFetch();

  function closeModal(e) {
    if (e.target === e.currentTarget) setModalPhoto(null);
  }

  useEffect(() => {
    const { url, options } = PHOTO_GET(photo);
    request(url, options);
  }, [photo, request]);

  return (
    <div className={styles.modal} onClick={closeModal}>
      <Error error={error} />
      {loading && <Loading />}
      {data && <PhotoContent {...data} />}
    </div>
  );
};

export default PhotoModal;
