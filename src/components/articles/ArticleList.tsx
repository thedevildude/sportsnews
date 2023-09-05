import React, { useEffect } from "react";
import { fetchArticles } from "../../context/articles/actions";
import { useArticleListDispatch } from "../../context/articles/context";
import ArticleListItems from "./ArticleListItems";

const ArticleList = () => {
  const articleListDispatch = useArticleListDispatch();
  useEffect(() => {
    fetchArticles(articleListDispatch);
  }, [articleListDispatch]);
  
  return (
    <div className="mt-5">
      <ArticleListItems />
    </div>
  );
};

export default ArticleList;
