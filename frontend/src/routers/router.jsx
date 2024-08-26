import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../RootLayout";
import Contact from "../pages/Contact";
import SignIn from "../pages/SignIn";
import About from "../pages/About";
import Home from "../pages/Home";
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
        path: "contact",
        element: <Contact />,
      },
    ],
  },
]);

export default router;
