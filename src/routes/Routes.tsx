import React from "react";
import { createBrowserRouter } from "react-router-dom";

const SignUp = React.lazy(() => import("../pages/sign-up/SignUp"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Home</div>,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
]);
