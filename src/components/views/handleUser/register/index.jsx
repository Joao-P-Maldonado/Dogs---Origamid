import { USER_POST } from "@Api/Api";
import { SubmitButton } from "@Components/buttons/submitButton";
import { FormInput } from "@Components/forms/input";
import { Error } from "@Components/helpers/error";
import { UserContext } from "@Context/UserContext";
import useFetch from "@Hooks/useFetch";
import { useForm } from "@Hooks/useForm";
import React, { useContext } from "react";

export const Register = () => {
  const username = useForm();
  const email = useForm("email");
  const password = useForm();

  const { userLogin } = useContext(UserContext);
  const { loading, error, request } = useFetch();

  async function handleSubmit(e) {
    e.preventDefault();
    const { url, options } = USER_POST({
      username: username.value,
      email: email.value,
      password: password.value,
    });

    const { response } = await request(url, options);

    if (response.ok) userLogin(username.value, password.value);
  }

  return (
    <section className="animeLeft">
      <h1 className="title">Cadastre-se</h1>
      <form onSubmit={handleSubmit}>
        <FormInput label="Usuário" type="text" name="username" {...username} />

        <FormInput label="Email" type="email" name="email" {...email} />

        <FormInput
          label="Senha"
          type="password"
          name="password"
          {...password}
        />

        {loading ? (
          <SubmitButton disabled>Cadastrando...</SubmitButton>
        ) : (
          <SubmitButton>Cadastrar</SubmitButton>
        )}

        <Error error={error} />
      </form>
    </section>
  );
};
