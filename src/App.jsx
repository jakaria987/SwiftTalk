import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
  },
  {
    path: "*",
    element: <NotFound></NotFound>,
  },
  {
    path: "sign-up",
    element: <SignUp></SignUp>,
  },
  {
    path: "sign-in",
    element: <SignIn></SignIn>,
  },
]);
const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
