import React, { useState, useEffect } from "react";
import {
  Leaf,
  ShoppingCart,
  Heart,
  Award,
  CreditCard,
  ArrowLeft,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router";
import { apiClient, makePayment } from "../api/client";
import { useNavigate } from "react-router";

export default function CheckOut() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const navigate = useNavigate();

  // Form states
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  });

  const [selectedCountry, setSelectedCountry] = useState({
    name: "Ghana",
    code: "+233",
    flag: "🇬🇭",
  });

  const countries = [
    { name: "Ghana", code: "+233", flag: "🇬🇭" },
    { name: "Nigeria", code: "+234", flag: "🇳🇬" },
    { name: "United States", code: "+1", flag: "🇺🇸" },
    { name: "United Kingdom", code: "+44", flag: "🇬🇧" },
    { name: "Canada", code: "+1", flag: "🇨🇦" },
    { name: "South Africa", code: "+27", flag: "🇿🇦" },
  ];

  const shippingOptions = [
    {
      id: "within-accra",
      label: "Within Accra",
      price: "₵30.00",
      desc: "Delivery fee for items within Accra",
    },
    {
      id: "tema",
      label: "Tema, Dodowa, Katamanso, Kpone",
      price: "₵50.00",
      desc: "Delivery fee for items to Tema and Beyond",
    },
    {
      id: "outside-greater-accra",
      label: "Outside Greater Accra",
      price: "₵65.00",
      desc: "Delivery fee for items outside Greater Accra",
    },
  ];

  const [shippingMethod, setShippingMethod] = useState("");
  const [selectedOption, setSelectedOption] = useState("same");

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => {
      const itemPrice = item.price || item.product?.price || 0;
      const itemTotal = item.total || itemPrice * item.quantity;
      return sum + itemTotal;
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const shippingCost = shippingMethod
    ? parseFloat(
        shippingOptions
          .find((opt) => opt.label === shippingMethod)
          ?.price.replace("₵", "") || "0"
      )
    : 0;
  const total = subtotal + shippingCost;

  // Handle payment
  const handlePayment = async () => {
    // Validation
    if (!formData.email || !formData.firstName || !formData.lastName || !formData.phone || !formData.address) {
      alert("Please fill in all required fields");
      return;
    }

    if (!shippingMethod) {
      alert("Please select a shipping method");
      return;
    }

    setPaymentLoading(true);

    try {
      const paymentData = {
        email: formData.email,
        amount: total,
        currency: "GHS",
        reference: `order_${Date.now()}`,
        metadata: {
          customer: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            phone: `${selectedCountry.code}${formData.phone}`,
            address: formData.address,
            city: formData.city,
            postalCode: formData.postalCode,
            country: selectedCountry.name,
          },
          shipping: {
            method: shippingMethod,
            cost: shippingCost,
          },
          items: cartItems.map(item => ({
            id: item.id || item._id,
            name: item.name || item.product?.name,
            quantity: item.quantity,
            price: item.price || item.product?.price,
          })),
          subtotal: subtotal,
          total: total,
        }
      };

      console.log('Payment data:', paymentData);

      const response = await makePayment(paymentData);
      console.log('Full Payment response:', response);
      console.log('Response keys:', Object.keys(response));

      // Try multiple possible locations for the authorization URL
      let paystackUrl = null;
      
      // Check common response structures
      if (response.authorization_url) {
        paystackUrl = response.authorization_url;
      } else if (response.data?.authorization_url) {
        paystackUrl = response.data.authorization_url;
      } else if (response.url) {
        paystackUrl = response.url;
      } else if (response.paymentUrl) {
        paystackUrl = response.paymentUrl;
      } else if (response.checkout_url) {
        paystackUrl = response.checkout_url;
      } else {
        // If none of the above, let's check all properties for URLs
        const responseStr = JSON.stringify(response);
        const urlMatch = responseStr.match(/(https:\/\/checkout\.paystack\.com[^\s"]*)/);
        if (urlMatch) {
          paystackUrl = urlMatch[1];
        }
      }

      console.log('Extracted Paystack URL:', paystackUrl);

      if (paystackUrl) {
        console.log('Redirecting to:', paystackUrl);
        window.location.href = paystackUrl; // Redirect to Paystack
      } else {
        console.error('No payment URL found in response:', response);
        throw new Error(`No payment URL found. Response structure: ${JSON.stringify(Object.keys(response))}`);
      }

    } catch (error) {
      console.error('Payment error:', error);
      alert(`Payment failed: ${error.response?.data?.message || error.message}`);
    } finally {
      setPaymentLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p>Loading checkout...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error || cartItems.length === 0) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-white flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600 mb-4">
              {error || "Your cart is empty"}
            </p>
            <Link to="/products">
              <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700">
                Continue Shopping
              </button>
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="bg-white px-4 py-8">
        <div className="max-w-6xl h-[7px] mx-auto">
          <Link to="/cart">
            <button className="flex items-center text-black font-mono mt-5 bg-[#F5FBF2] rounded-2xl px-4 py-2 cursor-pointer mb-4">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Cart
            </button>
          </Link>
        </div>
      </div>

      <div className="min-h-screen bg-gray-50 pt-20 pb-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* LEFT: Delivery Form */}
          <div className="bg-white p-6">
            <h2 className="text-2xl font-semibold mb-4">Delivery Details</h2>

            {/* Country */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Country/Region
              </label>
              <select
                className="w-full border-gray-500 border rounded p-2"
                value={selectedCountry.name}
                onChange={(e) => {
                  const country = countries.find(
                    (c) => c.name === e.target.value
                  );
                  if (country) setSelectedCountry(country);
                }}
              >
                <option value="">Select a country</option>
                {countries.map((country) => (
                  <option key={country.code} value={country.name}>
                    {country.flag} {country.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Name */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  First name *
                </label>
                <input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full border-gray-500 border rounded p-2"
                  placeholder="Enter first name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Last name *
                </label>
                <input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full border border-gray-500 rounded p-2"
                  placeholder="Enter last name"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Email *</label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full border border-gray-500 rounded p-2"
                placeholder="Enter email address"
                required
              />
            </div>

            {/* Address */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Address *</label>
              <input
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full border border-gray-500 rounded p-2"
                placeholder="Enter address"
                required
              />
            </div>

            {/* City + Postal Code */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-1">City</label>
                <input
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full border border-gray-500 rounded p-2"
                  placeholder="Enter city"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Postal code (optional)
                </label>
                <input
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  className="w-full border border-gray-500 rounded p-2"
                  placeholder="Enter postal code"
                />
              </div>
            </div>

            {/* Phone */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Phone *</label>
              <div className="flex">
                <span className="flex items-center px-3 border border-gray-500 border-r-0 rounded-l">
                  {selectedCountry.flag} {selectedCountry.code}
                </span>
                <input
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full border border-gray-500 rounded-r p-2"
                  placeholder="Enter phone number"
                  required
                />
              </div>
            </div>

            {/* Shipping method */}
            <h3 className="text-lg font-semibold mt-6 mb-3">Shipping method *</h3>
            <div className="space-y-3">
              {shippingOptions.map((opt) => (
                <label
                  key={opt.id}
                  className={`flex items-center justify-between border rounded p-3 cursor-pointer ${
                    shippingMethod === opt.label
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="shipping"
                      value={opt.label}
                      checked={shippingMethod === opt.label}
                      onChange={() => setShippingMethod(opt.label)}
                    />
                    <div>
                      <p className="font-medium">{opt.label}</p>
                      {opt.desc && (
                        <p className="text-sm text-gray-500">{opt.desc}</p>
                      )}
                    </div>
                  </div>
                  <span className="font-semibold">{opt.price}</span>
                </label>
              ))}
            </div>

            {/* Payment */}
            <div className="mt-6">
              <h1 className="text-2xl font-semibold">Payment</h1>
              <p className="text-gray-600 mt-3">
                All transactions are secure and encrypted
              </p>
              <div className="flex border rounded-t-xl p-3 border-blue-400">
                <p>PayStack Payment Gateway</p>
              </div>
              <div className="flex bg-gray-100 rounded-b-xl p-3">
                <p className="text-center text-sm">
                  After clicking "Pay now", you will be redirected to PayStack
                  to complete your purchase securely.
                </p>
              </div>
            </div>

            {/* Billing address */}
            <div className="mt-5 font-bold text-lg">
              <p>Billing address</p>
            </div>
            <div className="space-y-4">
              <div className="border border-blue-400 rounded-t-lg p-4 flex items-center gap-2">
                <input
                  type="radio"
                  name="addressOption"
                  value="same"
                  checked={selectedOption === "same"}
                  onChange={() => setSelectedOption("same")}
                  className="w-5 h-5 accent-blue-500"
                />
                <p>Same as shipping address</p>
              </div>

              <div className="border border-blue-400 rounded-lg p-4 flex items-center gap-2">
                <input
                  type="radio"
                  name="addressOption"
                  value="different"
                  checked={selectedOption === "different"}
                  onChange={() => setSelectedOption("different")}
                  className="w-5 h-5 accent-blue-500"
                />
                <p>Use a different address</p>
              </div>

              {selectedOption === "different" && (
                <div className="border border-gray-300 rounded-lg p-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                      type="text"
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">City</label>
                    <input
                      type="text"
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                      placeholder="Enter your city"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Address</label>
                    <input
                      type="text"
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                      placeholder="Street address"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Postal Code</label>
                    <input
                      type="text"
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                      placeholder="Enter postal code"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                    <input
                      type="tel"
                      className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={handlePayment}
              disabled={paymentLoading}
              className="w-full mt-6 bg-green-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {paymentLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Processing Payment...
                </>
              ) : (
                <>
                  <CreditCard className="w-5 h-5" />
                  Pay Now - ₵{total.toFixed(2)}
                </>
              )}
            </button>
          </div>

          {/* RIGHT: Order Summary */}
          <div className="p-6 h-fit sticky top-20 bg-white rounded-lg">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Order Summary
            </h2>

            {/* Items */}
            <div className="space-y-4 mb-6">
              {cartItems.map((item) => {
                const itemId = item.id || item._id;
                const itemPrice = item.price || item.product?.price || 0;
                const itemTotal = item.total || itemPrice * item.quantity;
                const itemImage = item.image || item.product?.image;
                const itemName = item.name || item.product?.name;
                const itemCategory = item.category || item.product?.category;

                return (
                  <div
                    key={itemId}
                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
                  >
                    <img
                      src={itemImage}
                      alt={itemName}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{itemName}</h3>
                      <p className="text-sm text-gray-600">{itemCategory}</p>
                      <p className="text-sm text-gray-600">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        ₵{itemTotal.toFixed(2)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Totals */}
            <div className="border-t border-[#F59F26] pt-4 space-y-3">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>₵{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>
                  {shippingCost ? `₵${shippingCost.toFixed(2)}` : "₵0.00"}
                </span>
              </div>
              <div className="border-t border-[#F59F26] pt-3">
                <div className="flex justify-between text-lg font-bold text-gray-900">
                  <span>Total</span>
                  <span>₵{total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Trust icons */}
            <div className="mt-6 pt-6 border-[#F59F26] border-t">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2 text-green-600">
                  <Award className="w-4 h-4" />
                  <span>Certified Organic</span>
                </div>
                <div className="flex items-center gap-2 text-green-600">
                  <Heart className="w-4 h-4" />
                  <span>Ethically Sourced</span>
                </div>
                <div className="flex items-center gap-2 text-green-600">
                  <Leaf className="w-4 h-4" />
                  <span>100% Natural</span>
                </div>
                <div className="flex items-center gap-2 text-green-600">
                  <ShoppingCart className="w-4 h-4" />
                  <span>Secure Checkout</span>
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