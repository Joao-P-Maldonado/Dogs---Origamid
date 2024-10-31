import { PHOTO_DELETE } from "@Api/Api";
import ImageSkeleton from "@Components/image/skeleton";
import { UserContext } from "@Context/UserContext";
import useFetch from "@Hooks/useFetch";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Comments from "./comments";
import styles from "./photoContent.module.css";

const PhotoContent = ({ photo, comments, single }) => {
  const user = useContext(UserContext);
  const { request } = useFetch();

  async function handleDelete() {
    const confirm = window.confirm("Certeza que deseja deletar esta foto ? ");
    if (!confirm) return;

    const token = window.localStorage.getItem("token");

    const { url, options } = PHOTO_DELETE(photo.id, token);
    const { response, json } = await request(url, options);

    if (response.ok) window.location.reload();
  }

  return (
    <div className={`${styles.photo} ${single ? styles.single : ""}`}>
      <div className={styles.img}>
        <ImageSkeleton src={photo.src} alt={photo.title} />
      </div>

      <div className={styles.details}>
        <p className={styles.author}>
          {user?.data && user?.data?.username === photo.author ? (
            <button className={styles.delete} onClick={() => handleDelete}>
              Deletar
            </button>
          ) : (
            <Link to={`/profile/${photo.author}`}>@{photo.author}</Link>
          )}

          <span className={styles.visualizes}>{photo.acessos}</span>
        </p>
        <h1 className="title">
          <Link to={`/photo/${photo.id}`}>{photo.title}</Link>
        </h1>
        <ul className={styles.attributes}>
          <li>{photo.peso} kg</li>
          <li>
            {photo.idade} Ano{photo.idade > 1 && "s"}
          </li>
        </ul>
      </div>

      <Comments single photoId={photo.id} oldComments={comments} />
    </div>
  );
};

export default PhotoContent;
