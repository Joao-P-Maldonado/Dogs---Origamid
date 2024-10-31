import Head from "@Components/helpers/head/index";
import Feed from "@Views/feed";
import React from "react";
import { useParams } from "react-router-dom";

const Profile = () => {
  const { username } = useParams();

  return (
    <div className="container mainContainer">
      <Head title={username} />
      <h1 className="title">{username}</h1>
      <Feed user={username} />
    </div>
  );
};

export default Profile;
