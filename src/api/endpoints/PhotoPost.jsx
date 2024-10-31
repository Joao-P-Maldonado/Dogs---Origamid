import { useState } from "react";

const PhotoPost = () => {
  const [token, setToken] = useState("");
  const [name, setName] = useState("");
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [img, setImg] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();

    formData.append("nome", name);
    formData.append("peso", weight);
    formData.append("idade", age);
    formData.append("img", img);

    fetch("https://dogsapi.origamid.dev/json/api/photo", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: formData,
    })
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
          placeholder="token"
          value={token}
          onChange={({ target }) => setToken(target.value)}
        />

        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={({ target }) => setName(target.value)}
        />

        <input
          type="text"
          placeholder="weight"
          value={weight}
          onChange={({ target }) => setWeight(target.value)}
        />

        <input
          type="text"
          placeholder="age"
          value={age}
          onChange={({ target }) => setAge(target.value)}
        />

        <input type="file" onChange={({ target }) => setImg(target.files[0])} />

        <button type="submit">Enviar</button>
      </form>
    </>
  );
};

export default PhotoPost;
