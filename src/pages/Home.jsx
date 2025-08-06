import React from "react";
import Navbar from "../components/Navbar";
import Products from "./Products";
import Card from "../components/Card";
import { ArrowRight, Leaf, Sparkles, Heart } from "lucide-react";
import image1 from "../assets/image.png";
import shea from "../assets/shea.png";
import Footer from "../components/Footer";
import logo from "../assets/itssss.jpg";
import { Link } from "react-router";
import wall from "../assets/wall4.jpeg";

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
        {/* <img src={wall} alt="" className="absolute inset-0 w-full h-full object-cover" /> */}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl about md:text-4xl lg:text-6xl font-bold text-green-600 leading-tight mb-4">
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

          
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-black rounded-full flex justify-center">
            <div className="w-1 h-3 bg-black rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured <span className="text-green-600">Products</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our premium collection of organic beauty products crafted with nature's finest ingredients
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card 
              product={{
                id: 1,
                name: 'Organic Shea Butter Cream',
                price: 45.00,
                originalPrice: 55.00,
                image: shea,
                description: 'Pure organic shea butter cream for smooth, nourished skin',
                isOnSale: true,
                isNew: false,
                category: 'Skincare'
              }}
              onAddToCart={(product) => console.log('Added to cart:', product)}
            />
            
            <Card 
              product={{
                id: 2,
                name: 'Natural Coconut Oil Moisturizer',
                price: 38.00,
                image: image1,
                description: 'Hydrating coconut oil moisturizer for all skin types',
                isOnSale: false,
                isNew: true,
                category: 'Skincare'
              }}
              onAddToCart={(product) => console.log('Added to cart:', product)}
            />
            
            <Card 
              product={{
                id: 3,
                name: 'Organic Honey Face Mask',
                price: 32.00,
                image: logo,
                description: 'Rejuvenating honey face mask for glowing skin',
                isOnSale: false,
                isNew: false,
                category: 'Skincare'
              }}
              onAddToCart={(product) => console.log('Added to cart:', product)}
            />
          </div>
          
          <div className="text-center mt-12">
            <Link to="/products">
              <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full font-semibold transition-colors duration-200 flex items-center gap-2 mx-auto">
                View All Products
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </div>
        </div>
      </section>

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
            </div>

            <div className="relative">
              <img
                src="https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Natural ingredients"
                className="w-full h-96 object-cover rounded-2xl shadow-lg"
              />
              {/* <div className="absolute -bottom-6 -left-6 bg-yellow-400 rounded-2xl p-6 shadow-lg border border-yellow-500"> */}
                {/* <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-1">
                    5+
                  </div>
                  <div className="text-sm text-black">Years Experience</div>
                </div> */}
              {/* </div> */}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Home;
