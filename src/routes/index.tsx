import { createBrowserRouter } from "react-router-dom";
import AccountLayout from "../layouts/account";
import Home from "../pages/home";
import Signin from "../pages/signin";
import Signup from "../pages/signup";
import Signout from "../pages/signout";
import Article from "../pages/articles";
import Preferences from "../pages/preferences";
import Match from "../pages/match";
import Settings from "../pages/settings";
import ResourceNotFound from "../pages/ResourceNotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AccountLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
        children: [
          { path: "/articles/:id", element: <Article /> },
          { path: "/matches/:id", element: <Match />},
          { path: "/preferences", element: <Preferences /> },
          { path: "/settings", element: <Settings />},
        ],
      },
      { path: "/signin", element: <Signin /> },
      { path: "/signup", element: <Signup /> },
      { path: "/signout", element: <Signout /> },
      { path: "*", element: <ResourceNotFound />}
    ],
  },
]);

export default router;
