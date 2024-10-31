import { SubmitButton } from "@Components/buttons/submitButton";
import stylesBtn from "@Components/buttons/submitButton/button.module.css";
import { FormInput } from "@Components/forms/input";
import { Error } from "@Components/helpers/error";
import Head from "@Components/helpers/head/index";
import { UserContext } from "@Context/UserContext";
import { useForm } from "@Hooks/useForm";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styles from "./login.module.css";

export const LoginForm = () => {
  const userName = useForm();
  const password = useForm();

  const { userLogin, error, loading } = useContext(UserContext);

  async function handleSubmit(e) {
    e.preventDefault();

    if (userName.validate && password.validate())
      userLogin(userName.value, password.value);
  }

  return (
    <section className="animeLeft">
      <Head title="Login" />
      <h1 className="title">Login</h1>
      <form className={styles.form} action="" onSubmit={handleSubmit}>
        <FormInput label="Usuário" type="text" name="username" {...userName} />

        <FormInput
          label="Senha"
          type="password"
          name="password"
          {...password}
        />

        {loading ? (
          <SubmitButton disabled>Carregando</SubmitButton>
        ) : (
          <SubmitButton>Entrar</SubmitButton>
        )}

        <Error error={error} />
      </form>

      <Link className={styles.forget} to="/login/lost">
        Perdeu a senha?
      </Link>

      <div className={styles.register}>
        <h2 className={styles.subtitle}>Cadastre-se</h2>
        <p>Ainda não possui conta? Cadastre-se no site.</p>
        <Link className={stylesBtn.button} to="/login/create">
          Cadastro
        </Link>
      </div>
    </section>
  );
};
