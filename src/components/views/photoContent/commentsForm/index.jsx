import { COMMENT_POST } from "@Api/Api";
import Send from "@Assets/images/enviar.svg?react";
import { Error } from "@Components/helpers/error";
import useFetch from "@Hooks/useFetch";
import React, { useState } from "react";
import styles from "./commentsForm.module.css";

const CommentsForm = ({ photoId, setComments }) => {
  const [comment, setComment] = useState("");
  const { request, loading, error } = useFetch();

  async function handleSubmit(e) {
    e.preventDefault();
    const token = window.localStorage.getItem("token");

    const { url, options } = COMMENT_POST(photoId, { comment }, token);
    const { response, json } = await request(url, options);

    if (response.ok) {
      setComment("");
      setComments((prev) => [...prev, json]);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <textarea
        className={styles.textarea}
        id="comment"
        name="comment"
        placeholder="Comente..."
        value={comment}
        onChange={({ target }) => setComment(target.value)}
      />

      {loading ? (
        <button disabled className={styles.button}>
          <Send />
        </button>
      ) : (
        <button className={styles.button}>
          <Send />
        </button>
      )}

      <Error error={error} />
    </form>
  );
};

export default CommentsForm;
