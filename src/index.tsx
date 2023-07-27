import * as React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Vendors from "./pages/vendors";
import "./styles.scss";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Vendors />,
  },
  {
    path: "profile",
    element: <div>My Profile</div>,
  },
]);

const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(
    <main className="container">
      <RouterProvider router={router} />
    </main>
  );
}

if (module.hot) {
  module.hot.accept();
}
