import React from "react";
import { createBrowserRouter } from "react-router-dom";

const SignUp = React.lazy(() => import("../pages/sign-up/SignUp"));
const Home = React.lazy(() => import("../pages/home/Home"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/sign-up/step/:stepId",
    element: <SignUp />,
  },
]);
