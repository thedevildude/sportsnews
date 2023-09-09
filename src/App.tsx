import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { MatchListProvider } from "./context/livescore/context";
import { ArticleListProvider } from "./context/articles/context";
import { PreferencesProvider } from "./context/preferences/context";

const App = () => {
  return (
    <PreferencesProvider>
      <MatchListProvider>
        <ArticleListProvider>
          <RouterProvider router={router} />
        </ArticleListProvider>
      </MatchListProvider>
    </PreferencesProvider>
  );
};

export default App;
