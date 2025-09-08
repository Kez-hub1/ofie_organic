import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import { ArrowRight, Leaf, Heart, Award, Shield } from "lucide-react";
import Footer from "../components/Footer";
import { Link } from "react-router"; 
import wall from "../assets/wall4.jpeg";
import { fetchProducts } from "../api/client"; 

const TOKEN = localStorage.getItem("ACCESS_TOKEN");

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const scrollToProducts = () => {
    const element = document.getElementById("products");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const features = [
    {
      icon: <Leaf className="h-8 w-8 disk" />,
      title: "100% Organic",
      description: "All our products are certified organic and free from harmful chemicals, pesticides, and synthetic additives."
    },
    {
      icon: <Award className="h-8 w-8 disk" />,
      title: "Premium Quality",
      description: "We source the finest ingredients from trusted suppliers and maintain the highest quality standards in production."
    },
    {
      icon: <Heart className="h-8 w-8 disk" />,
      title: "Skin Loving",
      description: "Our formulations are designed to nourish and protect your skin while delivering visible results."
    },
    {
      icon: <Shield className="h-8 w-8 disk" />,
      title: "Cruelty Free",
      description: "We never test on animals and are committed to ethical and sustainable business practices."
    }
  ];

  useEffect(() => {
    async function getProducts() {
      try {
        const data = await fetchProducts(TOKEN);
        setProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    getProducts();
  }, []);

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center bg-[#F5FBF2] overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center mt-20 lg:text-left">
              <h1 className="text-4xl about md:text-6xl font-bold text-[#008236] leading-tight mb-4">
                Welcome to <br /><span className="text-[#008236]">Ofie Organics</span>
                <br /><span className="text-[#008236]">& Botanicals</span>
              </h1>
              <p className="text-base font-medium italic text-[#F59F26]  mt-[-1rem] mb-4">
                Nature’s touch, bottled for your beauty.
              </p>
              <p className="text-xl md:text-md disk text-black mb-4 max-w-2xl opacity-90">
                Discover our premium collection of organic beauty products
                crafted with the finest natural ingredients. Nourish your skin
                with pure shea butter, revitalize with avocado body oil, and
                cleanse with our gentle organic formulas.
              </p>
              <div className="flex flex-col items-center sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/products">
                  <button
                    onClick={scrollToProducts}
                    className="bg-[#F59F26] text-white px-8 py-4 rounded-full hover:bg-[#008236] transition-colors cursor-pointer flex items-center justify-center space-x-2 text-lg mt-6 font-medium shadow-lg"
                  >
                    <span>Shop Now</span>
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-3xl shadow-2xl p-8 transform  transition-transform duration-300">
                <img
                  src={wall}
                  alt="Organic beauty products"
                  className="w-full h-80 object-cover rounded-2xl"
                />
                <div className="absolute -top-4 -right-4 bg-green-100 rounded-full p-4"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="about"
        className="py-8 bg-[#E6FAEE]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl about md:text-4xl lg:text-6xl font-bold text-center  mb-4 justify-center mx-auto text-black ">
            About Us
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xl md:text-md disk text-black mb-8 leading-relaxed opacity-90">
                Introducing the Ofie brand Home of natural hand crafted and
                Eco-friendly Body Care Skincare, Haircare and choices of foods
                for healthy living. Our Vegan Bath Gels, Cake Soaps,
                Moisturizers, Scrubs, Wash are made to feed your skin and hair
                for Beauty, Enhancement, Treatment and Maintenance We have a
                wild range products from baths, facials, aromatherapy,
                treatments etc. We take customized orders, Hampers orders,
                Wholesale orders for health shops, super markets etc You can
                also call us for counseling tips
              </p>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Natural ingredients"
                className="w-full h-96 object-cover rounded-2xl shadow-lg"
              />
            </div>
          </div>
          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="bg-green-100 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                  <div className="text-[#008236]">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section id="products" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl about md:text-4xl lg:text-6xl font-bold text-gray-900 mb-4">
              Products
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our collection of organic products crafted with nature's finest ingredients
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              <div className="col-span-full text-center text-lg">Loading...</div>
            ) : (
              products.slice(0, 3).map((product) => (
                <Card
                  key={product.id || product._id}
                  product={product}
                  onAddToCart={() => console.log("Added to cart:", product)}
                />
              ))
            )}
          </div>

          <div className="text-center mt-12">
            <Link to="/products">
              <button className="bg-[#F59F26] hover:bg-[#008236]  text-white px-8 py-3 rounded-full font-semibold transition-colors duration-200 flex items-center gap-2 cursor-pointer mx-auto">
                View All Products
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-7 md:h-90 bg-white">
        <div className="mt-0  text-center">
          <div className="bg-[#F5FBF2] backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white/50 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 ">
              Ready to Transform Your Beauty Routine?
            </h3>
            <p className="text-gray-600 mb-6 text-lg">
              Join thousands of satisfied customers who've discovered the power of natural beauty.
              We offer custom orders, wholesale solutions, and personalized beauty consultations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/products">
                <button className="bg-[#F59F26] text-white px-8 py-3 rounded-full hover:bg-[#008236] cursor-pointer transition-colors font-semibold shadow-md hover:shadow-lg">
                  Shop Now
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Home;