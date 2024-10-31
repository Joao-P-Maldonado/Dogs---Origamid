import Account from "@Private/user/Account";
import Error404 from "@Public/Error/404";
import HandleUser from "@Public/HandleUser";
import Home from "@Public/Home";
import Photo from "@Public/photo";
import Profile from "@Public/user/Profile";
import React from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login/*" element={<HandleUser />} />
      <Route path="/photo/:id" element={<Photo />} />
      <Route path="/profile/:username" element={<Profile />} />
      <Route path="*" element={<Error404 />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/account/*" element={<Account />} />
      </Route>
    </Routes>
  );
};
