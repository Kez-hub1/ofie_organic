import React, { useState } from "react";
import { ShoppingCart } from "lucide-react";
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

  const handleAddToCart = async (e) => {
    e.preventDefault();
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
      toast.error("Failed to add product to cart");
    } finally {
      setIsLoading(false);
    }
  };

  const buttonDisabled = isLoading || isCartLoading;

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group max-w-sm mx-auto">
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />

        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button
            onClick={handleAddToCart}
            disabled={buttonDisabled}
            className="bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-2 rounded-full font-semibold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
          >
            <ShoppingCart className="w-4 h-4" />
            {buttonDisabled ? "Adding..." : "Quick Add"}
          </button>
        </div>
      </div>

      <div className="p-5">
        <p className="text-[#F59F26] text-sm font-medium mb-2">
          {product.category}
        </p>

        <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-2 leading-tight">
          <Link to={`/single/${product.id || product._id}`}>{product.name}</Link>
        </h3>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>

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
            disabled={buttonDisabled}
            className="bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200"
          >
            {buttonDisabled ? "Adding..." : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;