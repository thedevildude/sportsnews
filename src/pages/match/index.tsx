import React, { Suspense } from "react";
import ErrorBoundary from "../../components/ErrorBoundary";
const MatchModal = React.lazy(() => import("./MatchModal"));

const Article = () => {
  return (
    <>
      <ErrorBoundary>
        <Suspense fallback={<div className="suspense-loading">Loading...</div>}>
          <MatchModal />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default Article;