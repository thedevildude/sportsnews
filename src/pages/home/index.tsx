import React from "react";
import Matches from "../../components/livescore";
import Article from "../../components/articles";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <main className="flex flex-col">
      <section>
        <Matches />
      </section>
      <section className="">
        <Article />
      </section>
      <Outlet />
    </main>
  )
};

export default Home;
