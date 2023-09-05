import React from "react";
import Matches from "../../components/livescore";
import Article from "../../components/articles";

const Home = () => {
  return (
    <main className="flex flex-col">
      <section>
        <Matches />
      </section>
      <section className="grid grid-cols-2">
        <Article />
      </section>
    </main>
  )
};

export default Home;
