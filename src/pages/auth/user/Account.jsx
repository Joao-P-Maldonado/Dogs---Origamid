import HeaderAccount from "@Components/layout/account/header";
import { Feed } from "@Views/feed";
import { PhotoPost } from "@Views/user/account/PhotoPost";
import { Statics } from "@Views/user/account/statics";
import React from "react";
import { Route, Routes } from "react-router-dom";

const Account = () => {
  return (
    <section className="container">
      <HeaderAccount />
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/post" element={<PhotoPost />} />
        <Route path="/statics" element={<Statics />} />
      </Routes>
    </section>
  );
};

export default Account;
