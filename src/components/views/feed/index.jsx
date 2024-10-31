import { PHOTOS_GET } from "@Api/Api";
import { Error } from "@Components/helpers/error";
import Loading from "@Components/helpers/loading";
import ImageSkeleton from "@Components/image/skeleton";
import useFetch from "@Hooks/useFetch";
import PhotoModal from "@Modals/photoModal";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import styles from "./feed.module.css";

const Feed = ({ user = 0 }) => {
  const [modalPhoto, setModalPhoto] = useState();
  const [pages, setPages] = useState([1]);
  const [ignore, setIgnore] = useState([]);
  const [items, setItems] = useState([]);
  const [infinite, setInfinite] = useState(true);

  const { loading, error, request } = useFetch();

  function infiniteScroll() {
    if (!infinite) return;

    let wait = false;
    const scroll = window.scrollY;
    const height = document.body.offsetHeight - window.innerHeight;

    if (scroll > height * 0.75 && !wait) {
      setPages((pages) => [...pages, pages.length + 1]);

      wait = true;

      setTimeout(() => {
        wait = false;
      }, 500);
    }
  }

  async function fetchPhotos() {
    pages.map(async (page) => {
      if (ignore.find((value) => value === page)) return;

      const { url, options } = PHOTOS_GET({
        page: page,
        total: 3,
        user: user,
      });

      const { response, json } = await request(url, options);
      if (response && response.ok && json.length < 3) setInfinite(false);

      setItems((prev) => [...prev, ...json]);
    });

    setIgnore((ignore) => [...ignore, ignore.length + 1]);
  }

  useEffect(() => {
    window.addEventListener("wheel", infiniteScroll);
    window.addEventListener("scroll", infiniteScroll);

    return () => {
      window.removeEventListener("wheel", infiniteScroll);
      window.removeEventListener("scroll", infiniteScroll);
    };
  }, [infinite]);

  useEffect(() => {
    fetchPhotos();
  }, [request, pages]);

  if (error) return <Error error={error} />;
  if (loading) return <Loading />;
  if (!items) return null;
  return (
    <>
      {modalPhoto && (
        <PhotoModal photo={modalPhoto} setModalPhoto={setModalPhoto} />
      )}

      <ul className={`${styles.feed} animeLeft`}>
        {items.map((photo) => (
          <li
            className={styles.photo}
            key={photo.id}
            onClick={() => setModalPhoto(photo.id)}
          >
            <ImageSkeleton src={photo.src} alt={photo.title} />
            <span className={styles.visualize}>{photo.acessos}</span>
          </li>
        ))}
      </ul>

      {!infinite && (
        <div>
          <span> Não existem mais postagens. </span>
        </div>
      )}
    </>
  );
};

Feed.propTypes = {
  user: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired,
  ]),
};

export default Feed;
