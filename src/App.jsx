import React from 'react'
import { createBrowserRouter, Form, RouterProvider } from "react-router";
import Navbar from './components/Navbar';
// import { Home } from 'lucide-react';
import Home from "./pages/Home";
import Products from './pages/Products';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Card from './components/Card';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/products",
    element: <Products/>,
  },
  {
    path: "/contact",
    element:<Contact/>
  },
  {
    path: "/cart",
    element: <Cart/>
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/card",
    element: <Card/>
  }

]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
