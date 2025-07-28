import React from "react";
import Navbar from "../components/Navbar";
import Products from "./Products";
import { ArrowRight, Leaf, Sparkles, Heart } from "lucide-react";
import image1 from "../assets/image.png";
import shea from "../assets/shea.png";
import Footer from "../components/Footer";
import logo from "../assets/itssss.jpg";
import { Link } from "react-router";

const Home = () => {
  const scrollToProducts = () => {
    const element = document.getElementById("products");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center bg-[#F5FBF2] overflow-hidden"
      >
        <div className="absolute inset-0">
          {/* <div className="absolute top-20 left-10 opacity-20">
            <Leaf className="h-24 w-24 text-green-600 transform rotate-12" />
          </div> */}
          <div className="absolute bottom-20 right-10 opacity-20">
            <Sparkles className="h-32 w-32 text-green-600 transform -rotate-12" />
          </div>
          <div className="absolute top-1/2 left-1/4 opacity-10">
            <Heart className="h-20 w-20 text-green-500" />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl about md:text-4xl lg:text-6xl font-bold text-black leading-tight mb-4">
                Welcome to <br /><span className="text-green-600">Ofie Organics</span>
              </h1>
              <p className="text-base font-medium italic text-green-900 mt-[-1rem] mb-4">
                Nature’s touch, bottled for your beauty.
              </p>
              <p className="text-m md:text-md disk text-black mb-4 max-w-2xl opacity-90">
                Discover our premium collection of organic beauty products
                crafted with the finest natural ingredients. Nourish your skin
                with pure shea butter, revitalize with avocado body oil, and
                cleanse with our gentle organic formulas.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/products">
                <button
                  onClick={scrollToProducts}
                  className="bg-green-600 text-white px-8 py-4 rounded-full hover:bg-green-700 transition-colors flex items-center justify-center space-x-2 text-lg mt-6 font-medium shadow-lg"
                >
                  <span>Shop Now</span>
                  <ArrowRight className="h-5 w-5" />
                </button>
                </Link>
                {/* <button className="border-2 border-black text-black px-8 py-4 rounded-full hover:bg-black hover:text-white transition-colors text-lg font-medium">
                  Learn More
                </button> */}
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-3xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <img
                  src={shea}
                  alt="Organic beauty products"
                  className="w-full h-80 object-cover rounded-2xl"
                />
                <div className="absolute -top-4 -right-4 bg-yellow-400 rounded-full p-4 shadow-lg">
                  <Leaf className="h-8 w-8 text-green-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <img src={logo} alt="" /> */}

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-black rounded-full flex justify-center">
            <div className="w-1 h-3 bg-black rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Product Section */}
      {/* <Products /> */}

      {/* About Section */}
      <section
        id="about"
        className="py-20 bg-gradient-to-br from-yellow-50 to-yellow-100"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
                About Us
              </h2>
              {/* <p className="text-m disk text-black mb-8 leading-relaxed opacity-90">
                At Ofie Organics & Botanicals, we believe that nature provides
                the best ingredients for healthy, beautiful skin. Our commitment
                to organic, sustainable practices ensures that every product we
                create is not only effective but also environmentally
                responsible.
              </p> */}
              <p className="text-m disk text-black mb-8 leading-relaxed opacity-90">
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
              {/* <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium shadow-md">
                  Learn More
                </button>
                <button className="border-2 border-black text-black px-8 py-3 rounded-lg hover:bg-black hover:text-white transition-colors font-medium">
                  Our Story
                </button>
              </div> */}
            </div>

            <div className="relative">
              <img
                src="https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Natural ingredients"
                className="w-full h-96 object-cover rounded-2xl shadow-lg"
              />
              <div className="absolute -bottom-6 -left-6 bg-yellow-400 rounded-2xl p-6 shadow-lg border border-yellow-500">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-1">
                    5+
                  </div>
                  <div className="text-sm text-black">Years Experience</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Home;
