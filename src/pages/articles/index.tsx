import React, { Suspense } from "react";
import ErrorBoundary from "../../components/ErrorBoundary";
const ArticleModal = React.lazy(() => import("./ArticleModal"));

const Article = () => {
  return (
    <>
      <ErrorBoundary>
        <Suspense fallback={<div className="suspense-loading">Loading...</div>}>
          <ArticleModal />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default Article;
