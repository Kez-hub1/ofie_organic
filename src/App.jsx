import React from "react";
import { createBrowserRouter, Form, RouterProvider } from "react-router";
import Navbar from "./components/Navbar";
// import { Home } from 'lucide-react';
import Home from "./pages/Home";
import Products from "./pages/Products";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Card from "./components/Card";
import CheckOut from "./pages/CheckOut";
import Otp from "./pages/Otp";
import SingleProduct from "./components/Singleproduct";
import { ToastContainer } from "react-toastify";
import Profile from "./pages/Profile";
import PaymentPage from "./pages/Paymentpage";
import NotFound from "./pages/NotFound";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/products",
    element: <Products />,
  },
  {
    path: "/singleproduct",
    element: <SingleProduct />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/card",
    element: <Card />,
  },
  {
    path: "/checkout",
    element: <CheckOut />,
  },
  {
    path: "/otp",
    element: <Otp />,
  },
  {
    path: "/single/:id",
    element: <SingleProduct />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/payment",
    element: <PaymentPage />,
  },
  {
    path:"/notfound",
    element: <NotFound/>
  },
]);

const App = () => {
  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
