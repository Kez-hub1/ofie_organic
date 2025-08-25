import React, { useState } from "react";
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
import image4 from "../assets/image4.jpg";
import image7 from "../assets/image7.jpg";
import image9 from "../assets/image3.jpg";
import { Link } from "react-router"; 

export default function CheckOut() {
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

  // Cart Items
  const [cartItems] = useState([
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
  ]);

  const subtotal = cartItems.reduce((sum, item) => sum + item.total, 0);
  const shippingCost = shippingMethod
    ? parseFloat(
        shippingOptions
          .find((opt) => opt.label === shippingMethod)
          ?.price.replace("₵", "")
      )
    : 0;
  const total = subtotal + shippingCost;

  return (
    <>
      <div className="bg-white px-4 py-8">
        <div className="max-w-6xl h-[7px] mx-auto">
          <Link to="/cart">
            <button className="flex items-center text-black font-mono mt-5 bg-[#F5FBF2] rounded-2xl px-4 cursor-pointer mb-4">
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
                  First name
                </label>
                <input
                  className="w-full border-gray-500 border rounded p-2"
                  placeholder="Enter first name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Last name
                </label>
                <input
                  className="w-full border border-gray-500 rounded p-2"
                  placeholder="Enter last name"
                />
              </div>
            </div>

            {/* Address */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Address</label>
              <input
                className="w-full border border-gray-500 rounded p-2"
                placeholder="Enter address"
              />
            </div>

            {/* City + Postal Code */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-1">City</label>
                <input
                  className="w-full border border-gray-500 rounded p-2"
                  placeholder="Enter city"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Postal code (optional)
                </label>
                <input
                  className="w-full border border-gray-500 rounded p-2"
                  placeholder="Enter postal code"
                />
              </div>
            </div>

            {/* Phone */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Phone</label>
              <div className="flex">
                <span className="flex items-center px-3 border border-gray-500 border-r-0 rounded-l">
                  {selectedCountry.flag} {selectedCountry.code}
                </span>
                <input
                  type="tel"
                  className="w-full border border-gray-500 rounded-r p-2"
                  placeholder="Enter phone number"
                />
              </div>
            </div>

            {/* Shipping method */}
            <h3 className="text-lg font-semibold mt-6 mb-3">Shipping method</h3>
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
                <p>Leashpay</p>
              </div>
              <div className="flex bg-gray-100 rounded-b-xl p-3">
                <p className="text-center text-sm">
                  After clicking “Pay now”, you will be redirected to PayStack
                  to complete your purchase securely.
                </p>
              </div>
            </div>

            {/* Billing address */}
            <div className="mt-5 font-bold text-lg">
              <p>Billing address</p>
            </div>
            <div className="space-y-4">
              {/* Same as shipping address */}
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

              {/* Use different address */}
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

              {/* Conditional Form */}
              {selectedOption === "different" && (
                <form className="border border-gray-300 rounded-lg p-4 space-y-4">
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
                </form>
              )}
            </div>
            <Link to="/payment" >
             <button className="w-full mt-6 bg-green-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200 flex items-center justify-center gap-2">
              Pay Now
            </button>
            </Link>
          </div> {/* ✅ CLOSE LEFT COLUMN */}

          {/* RIGHT: Order Summary */}
          <div className="p-6 h-fit sticky top-20 bg-white rounded-lg">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Order Summary
            </h2>

            {/* Items */}
            <div className="space-y-4 mb-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
                >
                  <img
                    src={item.image}
                    alt={item.alt}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-600">{item.category}</p>
                    <p className="text-sm text-gray-600">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      ₵{item.total.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
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
                  {shippingCost ? `₵${shippingCost.toFixed(2)}` : "₵20.00"}
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

            {/* Place Order Button */}
            {/* <button className="w-full mt-6 bg-green-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200 flex items-center justify-center gap-2">
              <CreditCard className="w-5 h-5" />
              Place Order - ₵{total.toFixed(2)}
            </button> */}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
