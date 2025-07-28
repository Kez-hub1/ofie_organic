import React, { useState, useEffect } from 'react';
import { Menu, X, Leaf } from 'lucide-react';
import logo from "../assets/logo2.png";
import { Link } from 'react-router';
import cart from "../assets/cart.svg";
import search from "../assets/search.svg";
import admin from "../assets/admin.svg";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };
  return (
  <div>
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-lg' : 'bg-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Link to="/">
              <img src={logo} alt="logoofie" className='w-28 mt-4 h-full' />
            </Link>
        </div>
          <div className="flex items-center justify-center">
          <nav className="hidden md:flex space-x-8 items-center">
            {['Home', 'Products', 'Contact'].map((item) => (
              <Link to={item === 'Home' ? '/' : `/${item.toLowerCase()}`} key={item}>
              <button
                // key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className={`text-sm font-medium transition-colors hover:text-yellow-500 ${
                  isScrolled ? 'text-black' : 'text-black'
                }`}
              >
                {item}
              </button>
              </Link>
            ))}
             <div className='flex items-center w-30 ml-10 '>
            {/* <img src={search} alt="" className='w-9 h-5' /> */}
            <Link to="/cart">
              <img src={cart} alt="" className='w-20 h-10' />
            </Link>
            <img src={admin} alt="" className='w-10 h-5' />
          </div>

          </nav>
         </div>
           <div className='flex items-center w-30 ml-10 md:hidden '>
            <img src={search} alt="" className='w-9 h-5' />
            <Link to="/cart">
              <img src={cart} alt="" className='w-20 h-10' />
            </Link>
            <img src={admin} alt="" className='w-10 h-5' />
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden ${isScrolled ? 'text-black' : 'text-black'}`}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* small screens nav links */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {['Home', 'Products', 'Contact'].map((item) => (
              <Link to={item === 'Home' ? '/' : `/${item.toLowerCase()}`} key={item}>
              <button
                // key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="block px-3 py-2 text-base font-medium text-black hover:text-yellow-500 hover:bg-yellow-50 w-full text-left"
              >
                {item}
              </button>
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
    </div>
  );
};

export default Navbar;
