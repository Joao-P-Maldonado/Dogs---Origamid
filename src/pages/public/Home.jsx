import Head from "@Components/helpers/head/index";
import Feed from "@Views/feed";

const Home = () => {
  return (
    <section className="container mainContainer">
      <Head title="Feed" />
      <Feed />
    </section>
  );
};

export default Home;
