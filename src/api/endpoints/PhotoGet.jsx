import { useState } from "react";

const PhotoGet = () => {
  const [imgId, setImgId] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    fetch(`https://dogsapi.origamid.dev/json/api/photo/${imgId ?? ""}`)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        return json;
      });
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={imgId}
          onChange={({ target }) => setImgId(target.value)}
        />
        <button type="submit">Enviar</button>
      </form>
    </>
  );
};

export default PhotoGet;
