import React, { useState, useEffect } from "react";
import { ArrowLeft, Minus, Plus, Trash } from "lucide-react";
import { Link } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { apiClient } from "../api/client";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch cart items from API
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const token = localStorage.getItem("ACCESS_TOKEN");
        const response = await apiClient.get('/api/cart', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCartItems(response.data.items || response.data);
      } catch (error) {
        console.error('Error fetching cart:', error);
        setError('Failed to load cart items');
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const handleQuantityChange = async (id, delta) => {
    try {
      const item = cartItems.find(item => item.id === id || item._id === id);
      const itemPrice = item.price || item.product?.price || 0;
      const newQuantity = Math.max(1, item.quantity + delta);
      
      const token = localStorage.getItem("ACCESS_TOKEN");
      await apiClient.put(`/api/cart/${id}`, 
        { quantity: newQuantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCartItems((items) =>
        items.map((item) => {
          const itemId = item.id || item._id;
          const currentPrice = item.price || item.product?.price || 0;
          return itemId === id
            ? {
                ...item,
                quantity: newQuantity,
                total: newQuantity * currentPrice,
              }
            : item;
        })
      );
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("ACCESS_TOKEN");
      await apiClient.delete(`/api/cart/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCartItems((items) => items.filter((item) => (item.id || item._id) !== id));
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => {
      const itemPrice = item.price || item.product?.price || 0;
      const itemTotal = item.total || itemPrice * item.quantity;
      return sum + itemTotal;
    }, 0);
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-white mt-8 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p>Loading your cart...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-white mt-8 flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Try Again
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white mt-8">
        <div className="bg-[#F5FBF2] px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <Link to="/products">
              <button className="flex items-center text-black font-mono mt-8 rounded-2xl bg-white cursor-pointer mb-4 px-4 py-2">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Continue Shopping
              </button>
            </Link>
            <h1 className="text-4xl font-bold text-black">My Cart</h1>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-8">
          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg mb-4">Your cart is empty</p>
              <Link to="/products">
                <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700">
                  Start Shopping
                </button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item) => {
                  const itemId = item.id || item._id;
                  const itemPrice = item.price || item.product?.price || 0;
                  const itemTotal = item.total || itemPrice * item.quantity;
                  
                  return (
                    <div
                      key={itemId}
                      className="bg-white rounded-lg p-7 shadow-md"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden">
                          <img
                            src={item.image || item.product?.image}
                            alt={item.name || item.product?.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="flex-1">
                          <h3 className="font-medium text-black mb-2">
                            {item.name || item.product?.name}
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
                            onClick={() => handleQuantityChange(itemId, -1)}
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center font-medium">
                            {item.quantity}
                          </span>
                          <button
                            className="w-8 h-8 rounded-full cursor-pointer border border-black flex items-center justify-center hover:bg-[#d6d8d5]"
                            onClick={() => handleQuantityChange(itemId, 1)}
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="text-right">
                          <div className="font-bold text-lg rounded-xl px-2 py-2 bg-[#E6FAEE] text-black">
                            GH₵{itemTotal.toFixed(2)}
                          </div>
                        </div>

                        <button
                          className="text-black hover:text-amber-800 hover:bg-[#d6d8d5] hover:rounded-lg hover:py-2 px-3 cursor-pointer p-1"
                          onClick={() => handleDelete(itemId)}
                        >
                          <Trash className="w-5 h-5 text-black" />
                        </button>
                      </div>
                    </div>
                  );
                })}
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
                        GH₵{calculateTotal().toFixed(2)}
                      </span>
                    </div>

                    <div className="flex">
                      <div className="flex items-center space-x-2">
                        <span className="text-black text-xs">
                          Taxes, discounts and shipping calculated at checkout.
                        </span>
                      </div>
                    </div>

                    <div className="border-t border-amber-500 pt-4">
                      <div className="flex justify-between">
                        <span className="text-lg font-bold text-black">
                          Total
                        </span>
                        <span className="text-xl font-bold text-black">
                          GH₵{calculateTotal().toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Link to="/checkout">
                    <button className="w-full bg-green-600 text-white cursor-pointer py-3 rounded-lg font-medium hover:bg-green-800 transition-colors">
                      Proceed to Checkout
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}