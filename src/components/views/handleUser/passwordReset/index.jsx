import { PASSWORD_RESET } from "@Api/Api";
import { SubmitButton } from "@Components/buttons/submitButton";
import { FormInput } from "@Components/forms/input";
import { Error } from "@Components/helpers/error";
import Head from "@Components/helpers/head";
import useFetch from "@Hooks/useFetch";
import { useForm } from "@Hooks/useForm";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const PasswordReset = () => {
  const password = useForm();

  const [login, setLogin] = useState();
  const [key, setKey] = useState();
  const navigate = useNavigate();

  const { data, loading, error, request } = useFetch();

  async function handleSubmit(e) {
    e.preventDefault();

    const { url, options } = PASSWORD_RESET({
      login,
      key,
      password: password.value,
    });

    const { response } = await request(url, options);
    if (response.ok) navigate("/login");
  }

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const key = params.get("key");
    const login = params.get("login");

    if (key) setKey(key);
    if (login) setLogin(login);
  }, []);

  return (
    <div>
      <Head title="Resete a senha" />
      <h1 className="title">Resete a senha</h1>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Nova senha"
          type="password"
          name="password"
          {...password}
        />

        {loading ? (
          <SubmitButton disabled> Resetando </SubmitButton>
        ) : (
          <SubmitButton> Resetar </SubmitButton>
        )}
      </form>
      <Error error={error} />
    </div>
  );
};
