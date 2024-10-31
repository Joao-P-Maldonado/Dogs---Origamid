import { RECOVERY_PASSWORD } from "@Api/Api";
import { SubmitButton } from "@Components/buttons/submitButton";
import { FormInput } from "@Components/forms/input";
import { Error } from "@Components/helpers/error";
import Head from "@Components/helpers/head";
import useFetch from "@Hooks/useFetch";
import { useForm } from "@Hooks/useForm";
import React from "react";

export const PasswordLost = () => {
  const login = useForm();
  const { data, loading, error, request } = useFetch();

  async function handleSubmit(e) {
    e.preventDefault();

    if (login.validate) {
      const { url, options } = RECOVERY_PASSWORD({
        login: login.value,
        url: window.location.href.replace("lost", "reset"),
      });
      await request(url, options);
    }
  }

  return (
    <section className="animeLeft">
      <Head title="Perdeu a senha ?" />
      <h1 className="title">Perdeu a senha ?</h1>
      {data ? (
        <p className={{ color: "#4c1" }}>{data}</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <FormInput
            label="Email / Usuário"
            type="text"
            name="login"
            {...login}
          />
          {loading ? (
            <SubmitButton disabled>Enviando...</SubmitButton>
          ) : (
            <SubmitButton>Enviar Email</SubmitButton>
          )}
        </form>
      )}
      <Error error={error} />
    </section>
  );
};
