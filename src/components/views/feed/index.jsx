import { PHOTOS_GET } from "@Api/Api";
import { Error } from "@Components/helpers/error";
import Loading from "@Components/helpers/loading";
import useFetch from "@Hooks/useFetch";
import PhotoModal from "@Modals/photoModal";
import React, { useEffect, useState } from "react";
import styles from "./feed.module.css";

export const Feed = () => {
  const [modalPhoto, setModalPhoto] = useState();
  const { data, loading, error, request } = useFetch();

  useEffect(() => {
    async function fetchPhotos() {
      const { url, options } = PHOTOS_GET({ page: 1, total: 6, user: 0 });
      await request(url, options);
    }

    fetchPhotos();
  }, [request]);

  if (error) return <Error error={error} />;
  if (loading) return <Loading />;
  if (!data) return null;
  return (
    <>
      {modalPhoto && (
        <PhotoModal photo={modalPhoto} setModalPhoto={setModalPhoto} />
      )}

      <ul className={`${styles.feed} animeLeft`}>
        {data.map((photo) => (
          <li
            className={styles.photo}
            key={photo.id}
            onClick={() => setModalPhoto(photo.id)}
          >
            <img src={photo.src} alt={photo.title} />
            <span className={styles.visualize}>{photo.acessos}</span>
          </li>
        ))}
      </ul>
    </>
  );
};
