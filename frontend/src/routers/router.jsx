import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../RootLayout";
import SignIn from "../pages/SignIn";
import About from "../pages/About";
import Home from "../pages/Home/Home";
import Help from "../pages/Help";
// import SignUp from "../pages/SignUp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "signin",
        element: <SignIn />,
      },
      // {
      //   path: "signup",
      //   element: <SignUp />,
      // },
      {
        path: "help",
        element: <Help />,
      },
    ],
  },
]);

export default router;
