import React, {Suspense} from "react";
import ErrorBoundary from "../ErrorBoundary";
const MatchList = React.lazy(() => import("./MatchList"));

const Matches = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold">Live Score</h2>
      <ErrorBoundary>
        <Suspense fallback={<div className="suspense-loading">Loading...</div>}>
          <MatchList />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default Matches;
