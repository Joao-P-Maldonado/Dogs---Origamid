import HeaderAccount from "@Components/layout/account/header";
import { UserContext } from "@Context/UserContext";
import Error404 from "@Public/Error/404";
import Feed from "@Views/feed";
import { PhotoPost } from "@Views/user/account/PhotoPost";
import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";

const Account = () => {
  const { data } = useContext(UserContext);
  return (
    <section className="container">
      <HeaderAccount />
      <Routes>
        <Route path="/" element={<Feed user={data.id} />} />
        <Route path="/post" element={<PhotoPost />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </section>
  );
};

export default Account;
