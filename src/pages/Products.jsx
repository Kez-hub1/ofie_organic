import React from 'react';
import { useState, useEffect } from 'react';
import { ShoppingCart, Star, Leaf, Droplets } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import shea from '../assets/shea.png';
import image1 from '../assets/image1.jpg';
import image3 from '../assets/image3.jpg';

const Products = () => {
  // const [search, setSearch] = useState("");
  // if (search && search.trim()) {
  //       results = results.filter(
  //         (ad) =>
  //           ad.name?.toLowerCase().includes(search.toLowerCase()) ||
  //           ad.title?.toLowerCase().includes(search.toLowerCase()) ||
  //           ad.description?.toLowerCase().includes(search.toLowerCase())
  //       );
  //       console.log("After search filter:", results.length);
  //     }

  const products = [
    {
      id: 1,
      name: "Pure Shea Butter",
      price: "$24.99",
      image: shea,
      description: "Raw, unrefined shea butter sourced directly from Ghana. Rich in vitamins A and E, perfect for moisturizing and healing dry skin.",
      benefits: ["100% Pure", "Anti-inflammatory", "Deep Moisturizing"],
      rating: 4.9,
      icon: <Leaf className="h-6 w-6" />
    },
    {
      id: 2,
      name: "Organic Herbal Shampoo",
      price: "$18.99",
      image: image1,
      description: "Gentle, sulfate-free shampoo infused with organic herbs and essential oils. Cleanses without stripping natural oils.",
      benefits: ["Sulfate-Free", "Herbal Infused", "pH Balanced"],
      rating: 4.8,
      icon: <Droplets className="h-6 w-6" />
    },
    {
      id: 3,
      name: "Avocado Body Oil",
      price: "$32.99",
      image: image3,
      description: "Luxurious body oil made from premium avocado oil. Deeply nourishes and repairs damaged skin with essential fatty acids.",
      benefits: ["Rich in Vitamins", "Fast Absorbing", "Anti-Aging"],
      rating: 4.9,
      icon: <Droplets className="h-6 w-6" />
    },
    {
      id: 4,
      name: "Gentle Body Wash",
      price: "$21.99",
      image: "https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: "Creamy, moisturizing body wash with organic aloe vera and chamomile. Perfect for sensitive skin and daily use.",
      benefits: ["Hypoallergenic", "Moisturizing", "Natural Fragrance"],
      rating: 4.7,
      icon: <Leaf className="h-6 w-6" />
    },
    {
      id: 5,
      name: "Gentle Body Wash",
      price: "$21.99",
      image: "https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: "Creamy, moisturizing body wash with organic aloe vera and chamomile. Perfect for sensitive skin and daily use.",
      benefits: ["Hypoallergenic", "Moisturizing", "Natural Fragrance"],
      rating: 4.7,
      icon: <Leaf className="h-6 w-6" />
    },
    {
      id: 6,
      name: "Gentle Body Wash",
      price: "$21.99",
      image: "https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: "Creamy, moisturizing body wash with organic aloe vera and chamomile. Perfect for sensitive skin and daily use.",
      benefits: ["Hypoallergenic", "Moisturizing", "Natural Fragrance"],
      rating: 4.7,
      icon: <Leaf className="h-6 w-6" />
    },
     {
      id: 7,
      name: "Gentle Body Wash",
      price: "$21.99",
      image: "https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: "Creamy, moisturizing body wash with organic aloe vera and chamomile. Perfect for sensitive skin and daily use.",
      benefits: ["Hypoallergenic", "Moisturizing", "Natural Fragrance"],
      rating: 4.7,
      icon: <Leaf className="h-6 w-6" />
    },
     {
      id: 8,
      name: "Gentle Body Wash",
      price: "$21.99",
      image: "https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: "Creamy, moisturizing body wash with organic aloe vera and chamomile. Perfect for sensitive skin and daily use.",
      benefits: ["Hypoallergenic", "Moisturizing", "Natural Fragrance"],
      rating: 4.7,
      icon: <Leaf className="h-6 w-6" />
    },
  ];

  return (
    <>
    <Navbar />
    <section id="products" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
            Our Premium Products
          </h2>
          <p className="text-lg text-black max-w-2xl mx-auto opacity-80">
            Each product is carefully crafted with organic ingredients to deliver 
            exceptional results while being gentle on your skin and the environment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl shadow-lg border border-yellow-200 overflow-hidden hover:shadow-xl hover:border-yellow-400 transition-all duration-300 group">
              <div className="relative overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300 z-10"
                />
                <div className="absolute top-4 left-4 bg-yellow-400 text-green-600 p-2 rounded-full shadow-lg">
                  {product.icon}
                </div>
                <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-10 transition-opacity duration-300"></div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-black">{product.name}</h3>
                  <span className="text-2xl font-bold text-green-600">{product.price}</span>
                </div>
                
                <div className="flex items-center mb-3">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                    ))}
                  </div>
                  <span className="text-sm text-black opacity-70 ml-2">({product.rating})</span>
                </div>
                
                <p className="text-black opacity-80 mb-4 text-sm leading-relaxed">{product.description}</p>
                
                <div className="space-y-2 mb-6">
                  {product.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      <span className="text-sm text-black opacity-80">{benefit}</span>
                    </div>
                  ))}
                </div>
                
                <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2 font-medium shadow-md">
                  <ShoppingCart className="h-5 w-5" />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    <Footer/>
    </>
  );
};

export default Products;