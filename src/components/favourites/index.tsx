import React, { Suspense } from "react";
import ErrorBoundary from "../ErrorBoundary";
const FavouriteNews = React.lazy(() => import("./FavouriteNews"));

const Favourites = () => {
  return (
    <div className="mt-5">
      <h2 className="text-xl font-semibold">Favourites</h2>
      <ErrorBoundary>
        <Suspense fallback={<div className="suspense-loading">Loading...</div>}>
          <FavouriteNews />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default Favourites;
