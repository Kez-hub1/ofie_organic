import React, { useState, useEffect } from "react";
import { ArrowLeft, Trash } from "lucide-react";
import { Link } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { apiClient, updateCartItem, clearCart } from "../api/client.js";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(null); 
  const [clearingCart, setClearingCart] = useState(false); 

  
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const token = localStorage.getItem("ACCESS_TOKEN");
        const response = await apiClient.get("/api/cart", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCartItems(response.data.items || response.data);
      } catch (error) {
        console.error("Error fetching cart:", error);
        setError("Failed to load cart items");
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  
  const handleQuantityChange = async (cartItemId, newQuantity) => {
    
    const quantity = Math.max(1, parseInt(newQuantity) || 1);
    
    setActionLoading(cartItemId);
    try {
      await updateCartItem(cartItemId, quantity);

      setCartItems((items) =>
        items.map((i) =>
          i._id === cartItemId ? { ...i, quantity: quantity } : i
        )
      );
    } catch (error) {
      console.error("Error updating quantity:", error);
      alert("Failed to update quantity. Please try again.");
    } finally {
      setActionLoading(null);
    }
  };

  const handleQuantityInputChange = (cartItemId, value) => {
    setCartItems((items) =>
      items.map((i) =>
        i._id === cartItemId ? { ...i, quantity: parseInt(value) || 1 } : i
      )
    );
  };


  const handleQuantityInputBlur = (cartItemId, value) => {
    const quantity = Math.max(1, parseInt(value) || 1);
    handleQuantityChange(cartItemId, quantity);
  };

 
  const handleQuantityInputKeyPress = (e, cartItemId, value) => {
    if (e.key === 'Enter') {
      e.target.blur(); // This will trigger the onBlur event
    }
  };

  // Clear entire cart
  const handleClearCart = async () => {
    const confirmClear = window.confirm("Are you sure you want to clear your entire cart? This action cannot be undone.");
    
    if (!confirmClear) return;

    setClearingCart(true);
    try {
      await clearCart();
      setCartItems([]);
      alert("Cart cleared successfully!");
    } catch (error) {
      console.error("Error clearing cart:", error);
      alert("Failed to clear cart. Please try again.");
    } finally {
      setClearingCart(false);
    }
  };

  // Delete item with fallback methods
  const handleDelete = async (cartItemId) => {
    setActionLoading(cartItemId);
    try {
      // Try primary delete method
      await deleteCartItem(cartItemId);
      setCartItems((items) => items.filter((i) => i._id !== cartItemId));
    } catch (error) {
      console.error("Primary delete method failed:", error);
      
      // Try alternative POST method
      try {
        await deleteCartItemPost(cartItemId);
        setCartItems((items) => items.filter((i) => i._id !== cartItemId));
      } catch (postError) {
        console.error("Alternative delete method failed:", postError);
        alert("Failed to remove item. Please try again or contact support.");
      }
    } finally {
      setActionLoading(null);
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
            
            <div className="flex justify-between items-center">
              <h1 className="text-4xl font-bold text-black">My Cart</h1>
              
              {cartItems.length > 0 && (
                <button
                  onClick={handleClearCart}
                  disabled={clearingCart}
                  className="flex items-center bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {clearingCart ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Clearing...
                    </>
                  ) : (
                    <>
                      <Trash className="w-4 h-4 mr-2" />
                      Clear Cart
                    </>
                  )}
                </button>
              )}
            </div>
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
            <>
              {/* Cart Items Count and Clear Button */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">
                  {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
                </h2>
                
                {/* <button
                  onClick={handleClearCart}
                  disabled={clearingCart}
                  className="flex items-center bg-red-100 text-red-700 px-3 py-2 rounded-lg hover:bg-red-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors border border-red-300"
                >
                  {clearingCart ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-700 mr-2"></div>
                      Clearing...
                    </>
                  ) : (
                    <>
                      <Trash className="w-4 h-4 mr-2" />
                      Clear All Items
                    </>
                  )}
                </button> */}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item) => {
                  const itemId = item.id || item._id;
                  const itemPrice = item.price || item.product?.price || 0;
                  const itemTotal = item.total || itemPrice * item.quantity;
                  const isLoading = actionLoading === itemId;

                  return (
                    <div
                      key={itemId}
                      className={`bg-white rounded-lg p-7 shadow-md ${isLoading ? 'opacity-50' : ''}`}
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
                          <div className="flex items-center space-x-4">
                            <span className="text-black font-mono text-sm">
                              Quantity:
                            </span>
                            <div className="flex items-center">
                              <input
                                type="number"
                                min="1"
                                max="99"
                                value={item.quantity}
                                onChange={(e) => handleQuantityInputChange(itemId, e.target.value)}
                                onBlur={(e) => handleQuantityInputBlur(itemId, e.target.value)}
                                onKeyPress={(e) => handleQuantityInputKeyPress(e, itemId, e.target.value)}
                                disabled={isLoading}
                                className="w-16 px-2 py-1 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:opacity-50 disabled:bg-gray-100"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="font-bold text-lg rounded-xl px-2 py-2 bg-[#E6FAEE] text-black">
                            GH₵{itemTotal.toFixed(2)}
                          </div>
                        </div>

                        <button
                          className="text-black hover:text-amber-800 hover:bg-[#d6d8d5] hover:rounded-lg hover:py-2 px-3 cursor-pointer p-1 disabled:opacity-50"
                          onClick={() => handleDelete(itemId)}
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
                          ) : (
                            <Trash className="w-5 h-5 text-black" />
                          )}
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
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}