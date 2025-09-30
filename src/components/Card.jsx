import React, { useState } from "react";
import { ShoppingCart, Heart } from "lucide-react";
import { toast } from "react-toastify";
import { Link } from "react-router";
import { addToCart } from "../api/client.js";

const Card = ({
  product = {
    id: 1,
    name: "Organic Shea Butter Cream",
    price: 30,
    image: "/src/assets/shea.png",
    description: "Pure organic shea butter cream for smooth, nourished skin",
    category: "Skincare",
  },
  onAddToCart,
  isCartLoading = false,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const token = localStorage.getItem("ACCESS_TOKEN");

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLoading(true);
    
    try {
      const productId = product.id || product._id;
      if (!productId) {
        throw new Error('Product ID not found');
      }
      
      await addToCart(productId, 1);
      toast.success("Product added to cart successfully!");
      
      if (onAddToCart) {
        onAddToCart(product, 1);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      if (!token) {
       toast.success("Please log in to add items to your cart.");
      } else {
         toast.error(error.response?.data?.message || "Failed to add product to cart.");
      }
      
    } finally {
      setIsLoading(false);
    }
  };

  const toggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorited(!isFavorited);
  };

  const buttonDisabled = isLoading || isCartLoading;

  return (
    <div className="bg-white rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden group border border-gray-100 hover:border-gray-200 relative">
      {/* Image Container */}
      <div className="relative overflow-hidden bg-gray-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
          <div className="absolute bottom-4 left-4 right-4">
            <button
              onClick={handleAddToCart}
              disabled={buttonDisabled}
              className="w-full bg-white/95 backdrop-blur-sm hover:bg-white text-gray-900 px-6 py-3 rounded-2xl font-semibold flex items-center justify-center gap-2 transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ShoppingCart className="w-5 h-5" />
              {buttonDisabled ? "Adding..." : "Quick Add to Cart"}
            </button>
          </div>
        </div>

        {/* <button
          onClick={toggleFavorite}
          className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all duration-300 shadow-lg"
        >
          <Heart 
            className={`w-5 h-5 transition-colors duration-300 ${
              isFavorited ? 'text-red-500 fill-current' : 'text-gray-600'
            }`} 
          />
        </button> */}

      
        {product.originalPrice && product.originalPrice > product.price && (
          <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
            {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
          </div>
        )}
      </div>

      
      <div className="p-6">
       
        <div className="flex items-center justify-between mb-3">
          <span className="inline-block bg-orange-50 text-[#F59F26] px-3 py-1 rounded-full text-sm font-medium">
            {product.category}
          </span>
        </div>

       
        <h3 className="font-bold text-gray-900 text-xl mb-3 line-clamp-2 leading-tight hover:text-[#F59F26] transition-colors duration-300">
          <Link 
            to={`/single/${product.id || product._id}`}
            className="hover:text-[#F59F26] transition-colors duration-300"
          >
            {product.name}
          </Link>
        </h3>


        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

   
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-gray-900">
              ₵{product.price}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-sm text-gray-400 line-through">
                ₵{product.originalPrice}
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            disabled={buttonDisabled}
            className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:opacity-50 disabled:cursor-not-allowed text-white px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
          >
            {buttonDisabled ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Adding...
              </div>
            ) : (
              "Add to Cart"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;