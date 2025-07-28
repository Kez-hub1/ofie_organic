import React from 'react';
import { Mail, Phone, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-1">
            {/* <img 
              src="/logo11.png" 
              alt="Ofei Organics" 
              className="h-16 w-auto filter brightness-0 invert"
            /> */}
            <p className="text-gray-300 font-extralight leading-relaxed">
              Premium organic skincare products crafted with love and natural ingredients 
              for your skin's health and beauty.
            </p>
            <div className="flex  mt-5 space-x-4">
              <a href="#" className="text-[#FDC700] hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-[#FDC700] hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-[#FDC700] hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className='md:ml-17 '>
              <h3 className="text-lg font-semibold mb-4 ">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#home" className="text-gray-300 hover:text-[#FDC700] transition-colors">Home</a></li>
              <li><a href="#products" className="text-gray-300 hover:text-[#FDC700] transition-colors">Products</a></li>
              <li><a href="#about" className="text-gray-300 hover:text-[#FDC700] transition-colors">About Us</a></li>
              <li><a href="#contact" className="text-gray-300 hover:text-[#FDC700] transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Products */}
          <div className='md:ml-10 '>
            <h3 className="text-lg font-semibold mb-4">Products</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-[#FDC700] transition-colors">Body Oils</a></li>
              <li><a href="#" className="text-gray-300 hover:text-[#FDC700] transition-colors">Body Creams</a></li>
              <li><a href="#" className="text-gray-300 hover:text-[#FDC700] transition-colors">Shower Gels</a></li>
              <li><a href="#" className="text-gray-300 hover:text-[#FDC700] transition-colors">Organic Soaps</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-[#FDC700]" />
                <span className="text-gray-300">ofieorganics@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-[#FDC700]" />
                <span className="text-gray-300">+233 072 4290</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12  pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 Ofei Organics & Botanicals. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Shipping Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;