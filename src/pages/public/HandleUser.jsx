import { UserContext } from "@Context/UserContext";
import styles from "@CssPages/handleUser.module.css";
import Error404 from "@Public/Error/404";
import { LoginForm } from "@Views/handleUser/login";
import { PasswordLost } from "@Views/handleUser/passwordLost";
import { PasswordReset } from "@Views/handleUser/passwordReset";
import { Register } from "@Views/handleUser/register";
import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

const HandleUser = () => {
  const { login } = useContext(UserContext);

  if (login === true) return <Navigate to="/account" />;
  return (
    <section className={styles.login}>
      <div className={styles.form}>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="create" element={<Register />} />
          <Route path="lost" element={<PasswordLost />} />
          <Route path="reset" element={<PasswordReset />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </div>
    </section>
  );
};

export default HandleUser;
