import React, { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { toast } from "react-toastify";
import { Link } from "react-router";
import axios from "axios";

const Card = ({
  product = {
    id: 1,
    name: "Organic Shea Butter Cream",
    price: 30,
    // originalPrice: 35,
    image: "/src/assets/shea.png",
    // rating: 4.5,
    // reviews: 128,
    description: "Pure organic shea butter cream for smooth, nourished skin",
    // isOnSale: true,
    // isNew: false,
    category: "Skincare",
  },
  onAddToCart,
}) => {
  const [cartCount, setCartCount] = useState(0);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    // setCartCount((prevCount) => prevCount + 1);
    const data = {
      productId: product.id,
      quantity: cartCount + 1,
    };
    try {
      const response = await axios.post(
        "https://keziah-api.onrender.com/api/cart/add",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  console.log("Access token:", localStorage.getItem("ACCESS_TOKEN"));

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group max-w-sm mx-auto">
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Badges */}
        {/* <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isOnSale && (
            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
              SALE
            </span>
          )}
          {product.isNew && (
            <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
              NEW
            </span>
          )}
        </div> */}

        {/* Quick Add to Cart Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button
            onClick={handleAddToCart}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full font-semibold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
          >
            <ShoppingCart className="w-4 h-4" />
            Quick Add
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Category */}
        <p className="text-[#F59F26] text-sm font-medium mb-2">
          {product.category}
        </p>

        {/* Product Name */}
        <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-2 leading-tight">
          <Link to={`/single/${product.id}`}>{product.name}</Link>
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-gray-900">
              ₵{product.price}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-sm text-gray-500 line-through">
                ₵{product.originalPrice}
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
