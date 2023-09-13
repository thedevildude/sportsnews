import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { MatchListProvider } from "./context/livescore/context";
import { ArticleListProvider } from "./context/articles/context";
import { PreferencesProvider } from "./context/preferences/context";
import { AuthenticationProvider } from "./context/authentication/context";

const App = () => {
  return (
    <AuthenticationProvider>
      <PreferencesProvider>
        <MatchListProvider>
          <ArticleListProvider>
            <RouterProvider router={router} />
          </ArticleListProvider>
        </MatchListProvider>
      </PreferencesProvider>
    </AuthenticationProvider>
  );
};

export default App;
