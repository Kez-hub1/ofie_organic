import React, { useState } from "react";
import { ArrowLeft, Minus, Plus, Trash, Truck } from "lucide-react";
import image4 from "../assets/image4.jpg";
import image7 from "../assets/image7.jpg";
import image9 from "../assets/image3.jpg";
import { Link } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const initialCartItems = [
  {
    id: 1,
    name: "Melanu Body Butter Cream",
    price: 65.0,
    quantity: 1,
    total: 65.0,
    image: image4,
    alt: "Body Butter Cream",
  },
  {
    id: 2,
    name: "Hair Treatment Oil",
    price: 70.0,
    quantity: 1,
    total: 70.0,
    image: image7,
    alt: "Hair Treatment Oil",
  },
  {
    id: 3,
    name: "Cupid's Glow",
    price: 80.0,
    quantity: 1,
    total: 80.0,
    image: image9,
    alt: "Hair Treatment Oil",
  },
];

export default function Cart() {
  const [cartItems, setCartItems] = useState(initialCartItems);

  const handleQuantityChange = (id, delta) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.max(1, item.quantity + delta),
              total: Math.max(1, item.quantity + delta) * item.price,
            }
          : item
      )
    );
  };
  const handleDelete = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white mt-8">
        <div className="bg-[#F5FBF2]  px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <Link to="/products">
              <button className="flex items-center text-black font-mono mt-8 rounded-2xl bg-white cursor-pointer mb-4">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Continue Shopping
              </button>
            </Link>
            <h1 className="text-4xl font-bold text-black">My Cart</h1>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg p-7 shadow-md"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.alt}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <h3 className="font-medium text-black mb-2">
                        {item.name}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <span className="text-black font-mono text-m">
                          Qty: {item.quantity}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <button
                        className="w-8 h-8 rounded-full cursor-pointer border border-black flex items-center justify-center hover:bg-[#d6d8d5]"
                        onClick={() => handleQuantityChange(item.id, -1)}
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-medium">
                        {item.quantity}
                      </span>
                      <button
                        className="w-8 h-8 rounded-full cursor-pointer border border-black flex items-center justify-center hover:bg-[#d6d8d5]"
                        onClick={() => handleQuantityChange(item.id, 1)}
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="text-right">
                      <div className="font-bold text-lg  rounded-xl px-2 py-2 bg-[#E6FAEE] text-black">
                        GH₵{item.total}
                      </div>
                    </div>

                    <button
                      className="text-black hover:text-amber-800 hover:bg-[#d6d8d5] hover:rounded-lg hover:py-2 px-3 cursor-pointer p-1"
                      onClick={() => handleDelete(item.id)}
                    >
                      <Trash className="w-5 h-5 text-black" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg p-6 shadow-md sticky top-8">
                <h2 className="text-xl font-mono font-bold text-black mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-black">Subtotal</span>
                    <span className="text-black">
                      GH₵
                      {cartItems
                        .reduce((sum, item) => sum + item.total, 0)
                        .toFixed(2)}
                    </span>
                  </div>

                  <div className="flex">
                    <div className="flex items-center space-x-2">
                      {/* <Truck className="w-4 h-4 text-green-600 " /> */}
                      <span className="text-black text-xs">Taxes, discounts and shipping calculated at checkout.</span>
                    </div>
                    {/* <span className="font-medium text-black">GH₵10.00</span> */}
                  </div>

                  <div className="border-t border-amber-500 pt-4">
                    <div className="flex justify-between">
                      <span className="text-lg font-bold text-black">
                        Total
                      </span>
                      <span className="text-xl font-bold text-black">
                        GH₵
                        {cartItems
                          .reduce((sum, item) => sum + item.total, 0)
                          .toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <Link to="/checkout">
                  <button className="w-full bg-green-600 text-white cursor-pointer py-3 rounded-lg font-medium hover:bg-green-800 transition-colors">
                    Proceed to Checkout
                  </button>
                </Link>

                {/* <div className="mt-4 text-center text-sm text-black"> */}
                  {/* <p>Secure checkout with 256-bit SSL encryption</p> */}
                  {/* <p>Free returns within 30 days</p> */}
                {/* </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
