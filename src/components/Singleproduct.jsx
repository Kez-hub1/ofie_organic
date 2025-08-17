import React from "react";
import { useParams, useNavigate } from "react-router";
import {
  ArrowLeft,
  ShoppingCart,
  Star,
  Heart,
  Plus,
  Minus,
} from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import shea from "../assets/shea.png";
import image1 from "../assets/image1.jpg";
import image3 from "../assets/image3.jpg";

const SingleProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Product data - in a real app, this would come from a context, API, or database
  const products = [
    {
      id: 1,
      name: "Pure Shea Butter",
      price: 24.99,
      image: shea,
      description:
        "Raw, unrefined shea butter sourced directly from Ghana. Rich in vitamins A and E, perfect for moisturizing and healing dry skin. This premium quality shea butter is handcrafted using traditional methods to preserve its natural healing properties.",
      rating: 4.9,
      reviews: 156,
      category: "Skincare",
      ingredients: ["Pure Shea Butter", "Vitamin E", "Natural Oils"],
      benefits: [
        "Deep Moisturizing",
        "Anti-aging",
        "Healing Properties",
        "Natural Protection",
      ],
      usage:
        "Apply a small amount to clean skin and massage gently. Use daily for best results.",
    },
    {
      id: 2,
      name: "Organic Herbal Shampoo",
      price: 18.99,
      image: image1,
      description:
        "Gentle, sulfate-free shampoo infused with organic herbs and essential oils. Cleanses without stripping natural oils, leaving your hair soft, shiny, and healthy.",
      rating: 4.8,
      reviews: 89,
      category: "Hair Care",
      ingredients: ["Organic Herbs", "Essential Oils", "Natural Cleansers"],
      benefits: [
        "Gentle Cleansing",
        "Natural Shine",
        "Scalp Health",
        "Chemical-Free",
      ],
      usage:
        "Apply to wet hair, massage into scalp, and rinse thoroughly. Follow with conditioner if needed.",
    },
    {
      id: 3,
      name: "Avocado Body Oil",
      price: 32.99,
      image: image3,
      description:
        "Luxurious body oil made from premium avocado oil. Deeply nourishes and repairs damaged skin with essential fatty acids and vitamins.",
      rating: 4.9,
      reviews: 203,
      category: "Body Care",
      ingredients: [
        "Premium Avocado Oil",
        "Vitamin E",
        "Essential Fatty Acids",
      ],
      benefits: ["Deep Nourishment", "Skin Repair", "Anti-aging", "Hydration"],
      usage:
        "Apply to damp skin after shower. Massage gently until absorbed. Use daily for optimal results.",
    },
    {
      id: 4,
      name: "Gentle Body Wash",
      price: 21.99,
      image:
        "https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=600",
      description:
        "Creamy, moisturizing body wash with organic aloe vera and chamomile. Perfect for sensitive skin and daily use.",
      rating: 4.7,
      reviews: 134,
      category: "Body Care",
      ingredients: [
        "Organic Aloe Vera",
        "Chamomile Extract",
        "Natural Moisturizers",
      ],
      benefits: [
        "Gentle Cleansing",
        "Soothing",
        "Moisturizing",
        "Sensitive Skin Safe",
      ],
      usage:
        "Apply to wet skin, lather gently, and rinse thoroughly. Safe for daily use.",
    },
  ];

  const product = products.find((p) => p.id === parseInt(id));

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

                {/* Wishlist Button */}
                <button className="absolute top-4 right-4 bg-white p-3 rounded-full shadow-md hover:shadow-lg transition-shadow group">
                  <Heart
                    size={20}
                    className="text-gray-600 group-hover:text-red-500 transition-colors"
                  />
                </button>
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

                  {/* Rating */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={18}
                          className={`${
                            i < Math.floor(product?.rating)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {product?.rating}
                    </span>
                    <span className="text-sm text-gray-500">
                      ({product?.reviews} reviews)
                    </span>
                  </div>

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

                  {/* Key Benefits */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Key Benefits:
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      {product?.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-[#008236] rounded-full"></div>
                          <span className="text-sm text-gray-600">
                            {benefit}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Ingredients */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Main Ingredients:
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {product?.ingredients.map((ingredient, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                        >
                          {ingredient}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Usage Instructions */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      How to Use:
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {product?.usage}
                    </p>
                  </div>
                </div>

                {/* Add to Cart Section */}
                <div className="space-y-4">
                  <button
                    onClick={handleAddToCart}
                    className="w-full bg-[#F59F26] text-white py-4 px-8 rounded-xl font-semibold text-lg hover:bg-orange-600 transition-colors flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
                  >
                    <ShoppingCart size={24} />
                    Add to Cart
                  </button>

                  <div className="text-center text-sm text-gray-500">
                    Free shipping on orders over GH₵50 • 30-day return policy
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
};

export default SingleProduct;
