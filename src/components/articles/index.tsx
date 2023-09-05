import React from "react";
import ArticleList from "./ArticleList";

const Article = () => {
  return (
    <div className="mt-5">
      <h2 className="text-xl font-semibold">Trending News</h2>
      <ArticleList />
    </div>
  );
};

export default Article;
