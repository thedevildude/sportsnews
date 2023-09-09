import { createBrowserRouter } from "react-router-dom";
import AccountLayout from "../layouts/account";
import Home from "../pages/home";
import Signin from "../pages/signin";
import Signup from "../pages/signup";
import Signout from "../pages/signout";
import Article from "../pages/articles";
import Preferences from "../pages/preferences";

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
          { path: "/preferences", element: <Preferences /> },
        ],
      },
      { path: "/signin", element: <Signin /> },
      { path: "/signup", element: <Signup /> },
      { path: "/signout", element: <Signout /> },
    ],
  },
]);

export default router;
