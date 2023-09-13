import React, { Suspense } from "react";
import ErrorBoundary from "../ErrorBoundary";
const ArticleList = React.lazy(() => import("./ArticleList"));

const Article = () => {
  return (
    <div className="mt-5 col-span-3">
      <h2 className="text-xl font-semibold">Trending News</h2>
      <ErrorBoundary>
        <Suspense fallback={<div className="suspense-loading">Loading...</div>}>
          <ArticleList />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default Article;
