import React, { useState } from "react";
import {
  ArrowLeft,
  Minus,
  Plus,
  Trash,
  Truck,
  ShoppingBag,
  Heart,
  Shield,
  Leaf,
} from "lucide-react";
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
    category: "Body Care",
  },
  {
    id: 2,
    name: "Hair Treatment Oil",
    price: 70.0,
    quantity: 1,
    total: 70.0,
    image: image7,
    alt: "Hair Treatment Oil",
    category: "Hair Care",
  },
  {
    id: 3,
    name: "Cupid's Glow Face Serum",
    price: 80.0,
    quantity: 1,
    total: 80.0,
    image: image9,
    alt: "Face Serum",
    category: "Skincare",
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

  const subtotal = cartItems.reduce((sum, item) => sum + item.total, 0);
  const shipping = subtotal > 100 ? 0 : 10;
  const total = subtotal + shipping;

  if (cartItems.length === 0) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50">
          <div className="max-w-4xl mx-auto px-4 py-16 text-center">
            <div className="bg-white rounded-2xl shadow-lg p-12">
              <ShoppingBag className="w-24 h-24 text-green-300 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Your Cart is Empty
              </h2>
              <p className="text-gray-600 mb-8 text-lg">
                Discover our organic beauty products and start your natural
                skincare journey.
              </p>
              <Link to="/products">
                <button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                  Shop Our Products
                </button>
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-yellow-50">
        {/* Header Section */}
        <div className="bg-green-500 text-white">
          <div className="max-w-7xl mx-auto px-4 py-12">
            <Link to="/products">
              <button className="flex items-center text-white/90 hover:text-white mt-5 group transition-all duration-200">
                <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                Continue Shopping
              </button>
            </Link>
            <div className="flex items-center space-x-4">
              <ShoppingBag className="w-10 h-8 text-yellow-400" />
              <div>
                <h1 className="text-4xl font-bold">Shopping Cart</h1>
                <p className="text-green-100  mt-2">
                  {cartItems.length} item{cartItems.length !== 1 ? "s" : ""} in
                  your cart
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="xl:col-span-2 space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-green-100"
                >
                  <div className="p-6">
                    <div className="flex items-center space-x-6">
                      {/* Product Image */}
                      <div className="w-32 h-32 bg-gradient-to-br from-green-100 to-yellow-100 rounded-xl overflow-hidden flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.alt}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <span className="inline-block bg-green-100 text-green-700 text-xs font-medium px-3 py-1 rounded-full mb-2">
                              {item.category}
                            </span>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                              {item.name}
                            </h3>
                            <p className="text-gray-600 text-sm mb-4">
                              Premium organic ingredients • Cruelty-free
                            </p>
                          </div>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="text-gray-400 hover:text-red-500 p-2 hover:bg-red-50 rounded-full transition-all duration-200 group"
                            title="Remove item"
                          >
                            <Trash className="w-5 h-5 group-hover:scale-110 transition-transform" />
                          </button>
                        </div>

                        {/* Quantity and Price */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <span className="text-sm font-medium text-gray-700">
                              Quantity:
                            </span>
                            <div className="flex items-center space-x-3 bg-gray-50 rounded-full px-4 py-2">
                              <button
                                className="w-8 h-8 rounded-full bg-white border-2 border-green-200 hover:border-green-400 flex items-center justify-center transition-all duration-200 hover:scale-105"
                                onClick={() =>
                                  handleQuantityChange(item.id, -1)
                                }
                                disabled={item.quantity <= 1}
                              >
                                <Minus className="w-4 h-4 text-green-600" />
                              </button>
                              <span className="w-8 text-center font-bold text-lg text-gray-800">
                                {item.quantity}
                              </span>
                              <button
                                className="w-8 h-8 rounded-full bg-white border-2 border-green-200 hover:border-green-400 flex items-center justify-center transition-all duration-200 hover:scale-105"
                                onClick={() => handleQuantityChange(item.id, 1)}
                              >
                                <Plus className="w-4 h-4 text-green-600" />
                              </button>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-500">
                              ₵{item.price.toFixed(2)} each
                            </p>
                            <p className="text-2xl font-bold text-green-600">
                              ₵{item.total.toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="xl:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg border border-green-100 sticky top-8">
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                    <Leaf className="w-6 h-6 text-green-600 mr-2" />
                    Order Summary
                  </h2>
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">
                      Subtotal ({cartItems.length} items)
                    </span>
                    <span className="font-semibold text-gray-900">
                      ₵{subtotal.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <Truck className="w-4 h-4 text-green-600" />
                      <span className="text-gray-700">Shipping</span>
                    </div>
                    <div className="text-right">
                      {shipping === 0 ? (
                        <span className="font-semibold text-green-600">
                          FREE
                        </span>
                      ) : (
                        <span className="font-semibold text-gray-900">
                          ₵{shipping.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>

                  {shipping === 0 && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                      <p className="text-sm text-green-700 font-medium">
                        🎉 You qualify for free shipping!
                      </p>
                    </div>
                  )}

                  {shipping > 0 && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                      <p className="text-sm text-yellow-700">
                        Add ₵{(100 - subtotal).toFixed(2)} more for free
                        shipping
                      </p>
                    </div>
                  )}

                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-gray-900">
                        Total
                      </span>
                      <span className="text-2xl font-bold text-green-600">
                        ₵{total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-6 border-t border-gray-100">
                  <Link to="/checkout">
                    <button className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                      Proceed to Checkout
                    </button>
                  </Link>

                  <div className="mt-6 space-y-3">
                    <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                      <Shield className="w-4 h-4 text-green-600" />
                      <span>Secure 256-bit SSL encryption</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                      <Heart className="w-4 h-4 text-green-600" />
                      <span>30-day satisfaction guarantee</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                      <Leaf className="w-4 h-4 text-green-600" />
                      <span>100% organic & cruelty-free</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
