import Account from "@Private/user/Account";
import HandleUser from "@Public/HandleUser";
import Home from "@Public/Home";
import React from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login/*" element={<HandleUser />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/account/*" element={<Account />} />
      </Route>
    </Routes>
  );
};
