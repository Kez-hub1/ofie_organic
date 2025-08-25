import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router"; // <-- FIXED: use react-router-dom
import {
  ArrowLeft,
  ShoppingCart,
} from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { fetchSingleProduct } from "../api/client";

const TOKEN = "<token>"; // <-- Replace with your real token

const SingleProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getProduct() {
      try {
        const data = await fetchSingleProduct(id, TOKEN);
        setProduct(data);
      } catch (error) {
        setProduct(null);
      } finally {
        setLoading(false);
      }
    }
    getProduct();
  }, [id]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-[#F5FBF2]">
          <div className="text-center text-lg">Loading...</div>
        </div>
        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-[#F5FBF2] flex items-center justify-center">
          <div className="text-center bg-white rounded-2xl p-8 shadow-lg">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Product Not Found
            </h1>
            <p className="text-gray-600 mb-6">
              The product you're looking for doesn't exist.
            </p>
            <button
              onClick={() => navigate("/products")}
              className="bg-[#008236] text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
            >
              Back to Products
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const handleAddToCart = () => {
    console.log("Adding to cart:", product);
    // Add your cart logic here
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#F5FBF2] py-8 mt-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <button
            onClick={() => navigate("/products")}
            className="flex items-center gap-2 text-[#008236] hover:text-green-700 mb-8 transition-colors font-medium"
          >
            <ArrowLeft size={20} />
            Back to Products
          </button>

          <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 lg:p-12">
              {/* Product Image */}
              <div className="relative">
                <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl overflow-hidden">
                  <img
                    src={product?.image}
                    alt={product?.name}
                    className="w-full h-96 lg:h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>

              {/* Product Details */}
              <div className="flex flex-col justify-between">
                <div>
                  {/* Category Badge */}
                  <div className="mb-4">
                    <span className="text-sm font-medium text-[#008236] bg-green-50 px-4 py-2 rounded-full border border-green-200">
                      {product?.category}
                    </span>
                  </div>

                  {/* Product Name */}
                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                    {product?.name}
                  </h1>

                  {/* Price */}
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-[#008236]">
                      GH₵{product?.price}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 text-lg leading-relaxed mb-6">
                    {product?.description}
                  </p>
                </div>

                {/* Add to Cart Section */}
                <div className="space-y-4">
                  <button
                    onClick={handleAddToCart}
                    className="w-full text-white py-4 px-8 rounded-xl font-semibold text-lg bg-[#008236] transition-colors flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
                  >
                    <ShoppingCart size={24} />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SingleProduct;