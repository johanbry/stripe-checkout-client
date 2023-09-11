import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import Root from "./layouts/Root";
import Cart from "./pages/Cart/Cart";
import Confirmation from "./pages/Confirmation/Confirmation";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import UserProfile from "./pages/UserProfile/UserProfile";

import "./index.css";
import UserProvider from "./context/UserContext";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="cart" element={<Cart />} />
      <Route path="confirmation" element={<Confirmation />} />
      <Route path="userprofile" element={<UserProfile />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>
);
