import React from "react";
import { createRoot } from "react-dom/client";
import {
  RouterProvider,
  createBrowserRouter,
  Route,
  Outlet,
  Link,
  createRoutesFromElements,
} from "react-router-dom";
import Listagem from "./Listagem";
import Contato from "./Contato";
import CriarContato from "./CriarContato";

import "./styles.css";

const AppLayout = () => {
  return (
    <main>
      <Outlet />
    </main>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route element={<AppLayout />}>
      <Route
        path="/"
        element={<Listagem />}
        loader={() =>
          fetch("http://localhost:3000/contatos?_sort=nome").then((res) => res.json())
        }
      />
      <Route
        path="/contato/:id"
        element={<Contato />}
        loader={({ params }) =>
          fetch(`http://localhost:3000/contatos/${params.id}`).then((res) =>
            res.json()
          )
        }
      />
      <Route path="/criar" element={<CriarContato />} />
    </Route>,
  ])
);

const container = document.getElementById("app-root")!;
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
