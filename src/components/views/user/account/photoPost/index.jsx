import { PHOTO_POST } from "@Api/Api";
import { SubmitButton } from "@Components/buttons/submitButton/index";
import { FormInput } from "@Components/forms/input";
import { Error } from "@Components/helpers/error";
import useFetch from "@Hooks/useFetch";
import { useForm } from "@Hooks/useForm";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./photoPost.module.css";

export const PhotoPost = () => {
  const { data, error, loading, request } = useFetch();
  const [img, setImg] = useState({});
  const navigate = useNavigate();

  const name = useForm();
  const weight = useForm("number");
  const age = useForm("number");

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("img", img.raw);
    formData.append("nome", name.value);
    formData.append("peso", weight.value);
    formData.append("idade", age.value);

    const token = window.localStorage.getItem("token");
    const { url, options } = PHOTO_POST(formData, token);

    request(url, options);
  }

  function handleImgChange({ target }) {
    setImg({
      preview: URL.createObjectURL(target.files[0]),
      raw: target.files[0],
    });
  }

  useEffect(() => {
    console.log(data);
    if (data) navigate("/account");
  }, [data, navigate]);

  return (
    <section className={`${styles.photoPost} animeLeft`}>
      <form onSubmit={handleSubmit}>
        <FormInput {...name} label="Nome" type="text" name="name" />
        <FormInput {...weight} label="Peso" type="number" name="weight" />
        <FormInput {...age} label="Idade" type="number" name="age" />

        <input
          className={styles.file}
          type="file"
          name="img"
          id="img"
          onChange={handleImgChange}
        />

        {loading ? (
          <SubmitButton disabled>Carregando</SubmitButton>
        ) : (
          <SubmitButton>Enviar</SubmitButton>
        )}

        <Error error={error} />
      </form>
      <div>
        {img.preview && (
          <div
            className={styles.preview}
            style={{ backgroundImage: `url('${img.preview}')` }}
          ></div>
        )}
      </div>
    </section>
  );
};
