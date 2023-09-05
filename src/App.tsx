import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { MatchListProvider } from "./context/livescore/context";
import { ArticleListProvider } from "./context/articles/context";

const App = () => {
  return (
    <MatchListProvider>
      <ArticleListProvider>
        <RouterProvider router={router} />
      </ArticleListProvider>
    </MatchListProvider>
  );
};

export default App;
