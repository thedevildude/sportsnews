import React, { Suspense } from "react";
import ErrorBoundary from "../../components/ErrorBoundary";
const PreferencesModal = React.lazy(() => import("./PreferencesModal"));

const Preferences = () => {
  return (
    <>
      <ErrorBoundary>
        <Suspense fallback={<div className="suspense-loading">Loading...</div>}>
          <PreferencesModal />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default Preferences;
