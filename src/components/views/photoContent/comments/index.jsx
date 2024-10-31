import { UserContext } from "@Context/UserContext";
import CommentsForm from "@Views/photoContent/commentsForm/index";
import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./comments.module.css";

const Comments = ({ photoId, oldComments, single }) => {
  const [comments, setComments] = useState(() => oldComments);
  const { login } = useContext(UserContext);
  const commentsSection = useRef();

  useEffect(() => {
    commentsSection.current.scrollTop = commentsSection.current.scrollHeight;
  }, [comments]);

  return (
    <>
      <ul
        ref={commentsSection}
        className={`${styles.comments} ${single ? styles.single : ""}`}
      >
        {comments.map((comment) => (
          <li key={comment.comment_ID}>
            <b>{comment.author}:</b>
            <span>{comment.comment_content}</span>
          </li>
        ))}
      </ul>
      {login && <CommentsForm single photoId={photoId} setComments={setComments} />}
    </>
  );
};

export default Comments;
