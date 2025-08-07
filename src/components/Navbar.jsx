import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  Leaf,
  User,
  TrendingUp,
  BarChart3,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { Link } from "react-router";
import logo from "../assets/logo2.png";
import cart from "../assets/cart.svg";
// import search from "../assets/search.svg";
import admin from "../assets/admin.svg";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Main Navigation */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? "bg-[#E6FAEE] backdrop-blur-md shadow-lg border-b border-gray-100" 
            : "bg-[#E6FAEE] backdrop-blur-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo - Enhanced */}
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center group">
                <img 
                  src={logo} 
                  alt="Ofie Organics" 
                  className="w-32 h-auto transition-transform duration-200 group-hover:scale-105" 
                />
              </Link>
            </div>

            {/* Navigation Links - Enhanced Center Design */}
            <nav className="hidden lg:flex items-center justify-center flex-1">
              <div className="flex items-center bg-white/80 backdrop-blur-sm rounded-full px-8 py-3 shadow-sm border border-gray-100">
                {[
                  { name: "Home", path: "/" },
                  { name: "Products", path: "/products" },
                  { name: "About", path: "/about" },
                  { name: "Contact", path: "/contact" }
                ].map((item, index) => (
                  <div key={item.name} className="flex items-center">
                    <Link to={item.path}>
                      <button
                        onClick={() => scrollToSection(item.name.toLowerCase())}
                        className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-green-600 transition-all duration-200 rounded-full hover:bg-green-50"
                      >
                        {item.name}
                      </button>
                    </Link>
                    {index < 3 && (
                      <div className="w-px h-4 bg-gray-200 mx-2"></div>
                    )}
                  </div>
                ))}
              </div>
            </nav>

            {/* Right Side Actions - Enhanced */}
            <div className="flex items-center space-x-3">
              {/* Search Button */}
              {/* <button className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-gray-50 hover:bg-gray-100 transition-colors duration-200 group"> */}
                {/* <svg className="w-5 h-5 text-gray-600 group-hover:text-green-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"> */}
                  {/* <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /> */}
                {/* </svg> */}
              {/* </button> */}

              {/* Cart with Badge */}
              <Link to="/cart" className="relative group">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-50 hover:bg-green-100 transition-colors duration-200">
                  <img src={cart} alt="Cart" className="w-7 h-7 group-hover:scale-110 transition-transform" />
                </div>
                {/* Cart Badge */}
                <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                  0
                </span>
              </Link>

              {/* Admin Dropdown - Enhanced */}
              <div className="relative">
                <button
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-50 hover:bg-gray-100 transition-colors duration-200 group"
                >
                  <img src={admin} alt="Admin" className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </button>

                {/* Enhanced Dropdown Menu */}
                {showProfileDropdown && (
                  <div className="absolute top-12 right-0 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 animate-in slide-in-from-top-2 duration-200">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-900">Admin Panel</p>
                      <p className="text-xs text-gray-500">Manage your store</p>
                    </div>
                    
                    <div className="py-2">
                      <Link
                        to="/user-profile"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors"
                        onClick={() => setShowProfileDropdown(false)}
                      >
                        <User size={16} />
                        <span>My Profile</span>
                      </Link>
                      <Link
                        to="/dashboard"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors"
                        onClick={() => setShowProfileDropdown(false)}
                      >
                        <BarChart3 size={16} />
                        <span>Dashboard</span>
                      </Link>
                    </div>
                    
                    <div className="border-t border-gray-100 pt-2">
                      <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors">
                        <LogOut size={16} />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
              >
                {isMenuOpen ? (
                  <X className="h-5 w-5 text-gray-600" />
                ) : (
                  <Menu className="h-5 w-5 text-gray-600" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu - Enhanced */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white/95 backdrop-blur-md border-t border-gray-100 shadow-lg">
            <div className="px-4 py-6 space-y-4">
              {[
                { name: "Home", path: "/" },
                { name: "Products", path: "/products" },
                { name: "About", path: "/about" },
                { name: "Contact", path: "/contact" }
              ].map((item) => (
                <Link key={item.name} to={item.path}>
                  <button
                    onClick={() => {
                      scrollToSection(item.name.toLowerCase());
                      setIsMenuOpen(false);
                    }}
                    className="w-full px-4 py-3 text-left text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200 font-medium"
                  >
                    {item.name}
                  </button>
                </Link>
              ))}
              
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="flex items-center justify-center space-x-6">
                  <Link to="/cart" className="flex items-center gap-2 text-gray-600 hover:text-green-600">
                    <img src={cart} alt="Cart" className="w-5 h-5" />
                    <span className="text-sm">Cart</span>
                  </Link>
                  <Link to="/dashboard" className="flex items-center gap-2 text-gray-600 hover:text-green-600">
                    <img src={admin} alt="Admin" className="w-5 h-5" />
                    <span className="text-sm">Admin</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;
