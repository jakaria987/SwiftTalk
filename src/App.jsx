import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
  },
  {
    path: "/not-found",
    element: <NotFound></NotFound>,
  },
]);
const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
