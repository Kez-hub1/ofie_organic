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
  LogIn,
} from "lucide-react";
import { Link, useNavigate } from "react-router";
import logo from "../assets/logo2.png";
import cart from "../assets/cart.svg";
import admin from "../assets/admin.svg";
import { logoutUser } from "../api/client.js";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check if user is logged in on component mount
  useEffect(() => {
    const token = localStorage.getItem("ACCESS_TOKEN");
    setIsLoggedIn(!!token);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logoutUser();
      setIsLoggedIn(false);
      setShowProfileDropdown(false);
      // Redirect to home page or login page after logout
      navigate("/");
      // You can also show a success message here if you have a toast system
      console.log("Logout successful");
    } catch (error) {
      console.error("Logout failed:", error);
      // Even if logout fails, we've cleared the token
      setIsLoggedIn(false);
      setShowProfileDropdown(false);
      navigate("/");
    } finally {
      setIsLoggingOut(false);
    }
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
              <div className="flex items-center">
                {[
                  { name: "Home", path: "/" },
                  { name: "About", path: "/#about" },
                  { name: "Products", path: "/#products" },
                  { name: "Contact", path: "/contact" }
                ].map((item, index) => (
                  <div key={item.name} className="flex items-center">
                    <Link to={item.path}>
                      <button
                        onClick={() => scrollToSection(item.name.toLowerCase())}
                        className="px-4 py-2 text-md font-medium text-gray-700 hover:text-green-600 transition-all duration-200 rounded-full hover:bg-green-50"
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

              {/* Cart with Badge */}
              <Link to="/cart" className="relative group">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-50 hover:bg-green-100 transition-colors duration-200">
                  <img src={cart} alt="Cart" className="w-7 h-7 group-hover:scale-110 transition-transform" />
                </div>
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
                      <p className="text-xs text-gray-500">
                        {isLoggedIn ? "Manage your store" : "Access your account"}
                      </p>
                    </div>
                    
                    <div className="py-2">
                      {!isLoggedIn ? (
                        <Link
                          to="/login"
                          className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors"
                          onClick={() => setShowProfileDropdown(false)}
                        >
                          <LogIn size={16} />
                          <span>Login</span>
                        </Link>
                      ) : (
                        <>
                          {/* <Link
                            to="/dashboard"
                            className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors"
                            onClick={() => setShowProfileDropdown(false)}
                          >
                            <Settings size={16} />
                            <span>Dashboard</span>
                          </Link> */}
                          {/* <Link
                            to="/profile"
                            className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors"
                            onClick={() => setShowProfileDropdown(false)}
                          >
                            <User size={16} />
                            <span>Profile</span>
                          </Link> */}
                        </>
                      )}
                    </div>
                    
                    {isLoggedIn && (
                      <div className="border-t border-gray-100 pt-2">
                        <button 
                          onClick={handleLogout}
                          disabled={isLoggingOut}
                          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <LogOut size={16} />
                          <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
                        </button>
                      </div>
                    )}
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
                  
                  {isLoggedIn ? (
                    <button 
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                      className="flex items-center gap-2 text-red-600 hover:text-red-700 disabled:opacity-50"
                    >
                      <LogOut className="w-5 h-5" />
                      <span className="text-sm">{isLoggingOut ? "Logging out..." : "Logout"}</span>
                    </button>
                  ) : (
                    <Link to="/login" className="flex items-center gap-2 text-gray-600 hover:text-green-600">
                      <LogIn className="w-5 h-5" />
                      <span className="text-sm">Login</span>
                    </Link>
                  )}
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