import { PHOTO_GET } from "@Api/Api";
import { Error } from "@Components/helpers/error";
import Head from "@Components/helpers/head/index";
import Loading from "@Components/helpers/loading";
import useFetch from "@Hooks/useFetch";
import PhotoContent from "@Views/photoContent";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const Photo = () => {
  const { id } = useParams();

  const { data, loading, error, request } = useFetch();

  useEffect(() => {
    const { url, options } = PHOTO_GET(id);

    request(url, options);
  }, [request, id]);

  if (error) return <Error error={error} />;
  if (loading) return <Loading />;
  if (!data) return null;
  return (
    <div className="container mainContainer">
      <Head title={data.photo.title} />
      <PhotoContent {...data} single />
    </div>
  );
};

export default Photo;
