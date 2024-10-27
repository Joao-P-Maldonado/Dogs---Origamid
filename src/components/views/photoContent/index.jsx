import { PHOTO_DELETE } from "@Api/Api";
import { UserContext } from "@Context/UserContext";
import useFetch from "@Hooks/useFetch";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Comments from "./comments";
import styles from "./photoContent.module.css";

const PhotoContent = ({ photo, comments }) => {
  const user = useContext(UserContext);
  const { data, error, loading, request } = useFetch();

  async function handleDelete(photoId) {
    const token = window.localStorage.getItem("token");

    const { url, options } = PHOTO_DELETE(photoId, token);
    const { response, json } = await request(url, options);
  }

  return (
    <div className={styles.photo}>
      <div className={styles.img}>
        <img src={photo.src} alt={photo.title} />
      </div>

      <div className={styles.details}>
        <p className={styles.author}>
          {user?.data && user?.data?.username === photo.author ? (
            <div>
              <button onClick={() => handleDelete(photo.id)}>Deletar</button>
            </div>
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

      <Comments photoId={photo.id} oldComments={comments} />
    </div>
  );
};

export default PhotoContent;
