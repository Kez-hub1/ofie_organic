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
import { Link } from "react-router"; // FIXED: Correct import
import logo from "../assets/logo2.png";
import cart from "../assets/cart.svg";
import search from "../assets/search.svg";
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
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-lg" : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/">
            <img src={logo} alt="logoofie" className="w-28 mt-4 h-full" />
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            {["Home", "Products", "About", "Contact"].map((item) => (
              <Link
                key={item}
                to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              >
                <button
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`text-sm font-medium hover:text-yellow-500 transition-colors ${
                    isScrolled ? "text-black" : "text-black"
                  }`}
                >
                  {item}
                </button>
              </Link>
            ))}

            <div>
              <div className="flex items-center ml-6 space-x-4 relative">
                <Link to="/cart">
                  <img src={cart} alt="Cart" className="w-8 h-8" />
                </Link>

                <div
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                  className="cursor-pointer flex items-center"
                >
                  <img src={admin} alt="Admin" className="w-6 h-6" />
                  <ChevronDown size={16} className="ml-1" />
                </div>
              </div>
              {showProfileDropdown && (
                <div className="absolute top-13 right-0 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <div className="px-4 py-2 border-b">
                    <p className="text-sm font-medium text-gray-900">
                      Account Menu
                    </p>
                  </div>
                  <Link
                    to="/user-profile"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <User size={16} />
                    My Profile
                  </Link>
                  <Link
                    to="/investor"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <TrendingUp size={16} />
                    Become an Investor
                  </Link>
                  <Link
                    to="/board"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <BarChart3 size={16} />
                    Dashboard
                  </Link>
                  <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2">
                    <LogOut size={16} />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </nav>

          <div className="flex items-center md:hidden space-x-3">
            <img src={search} alt="Search" className="w-5 h-5" />
            <Link to="/cart">
              <img src={cart} alt="Cart" className="w-8 h-8" />
            </Link>
            <img src={admin} alt="Admin" className="w-6 h-6" />
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-black"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-3 space-y-2">
            {["Home", "Products", "Contact"].map((item) => (
              <Link
                key={item}
                to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              >
                <button
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="block w-full text-left px-4 py-2 text-sm font-medium text-black hover:text-yellow-500 hover:bg-yellow-50"
                >
                  {item}
                </button>
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
