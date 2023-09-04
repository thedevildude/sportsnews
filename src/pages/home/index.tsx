import React from "react";
import Matches from "../../components/livescore";

const Home = () => {
  return (
    <main className="flex flex-col">
      <section>
        <Matches />
      </section>
      <section>
        Trending News
      </section>
    </main>
  )
};

export default Home;
