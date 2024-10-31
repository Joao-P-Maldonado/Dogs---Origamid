import { useState } from "react";

const UserPost = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    fetch("https://dogsapi.origamid.dev/json/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    })
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        return json;
      });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          placeholder="username"
          onChange={({ target }) => setUsername(target.value)}
        />

        <input
          type="password"
          value={password}
          placeholder="password"
          onChange={({ target }) => setPassword(target.value)}
        />

        <input
          type="email"
          value={email}
          placeholder="email"
          onChange={({ target }) => setEmail(target.value)}
        />

        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default UserPost;
