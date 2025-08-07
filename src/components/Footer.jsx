import React from 'react';
import { Mail, Phone, Facebook, Instagram, Twitter, Leaf } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-green-800 via-green-700 to-green-900 text-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-green-300 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-yellow-300 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-green-400 rounded-full blur-lg"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="md:col-span-1 space-y-6">
            <div className="flex items-center space-x-2">
              {/* <Leaf className="h-8 w-8 text-yellow-400" /> */}
              <h2 className="text-2xl font-bold text-white">Ofie Organics</h2>
            </div>
            <p className="text-green-100 leading-relaxed text-sm">
              Premium organic skincare products crafted with love and natural ingredients 
              for your skin's health and radiant beauty.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-green-600 hover:bg-yellow-500 p-2 rounded-full transition-all duration-300 transform hover:scale-110">
                <Facebook className="h-5 w-5 text-white" />
              </a>
              <a href="#" className="bg-green-600 hover:bg-yellow-500 p-2 rounded-full transition-all duration-300 transform hover:scale-110">
                <Instagram className="h-5 w-5 text-white" />
              </a>
              <a href="#" className="bg-green-600 hover:bg-yellow-500 p-2 rounded-full transition-all duration-300 transform hover:scale-110">
                <Twitter className="h-5 w-5 text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-yellow-400 border-b border-green-600 pb-2 inline-block">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="#home" className="text-green-100 hover:text-yellow-400 transition-colors duration-200 flex items-center group">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-3 group-hover:bg-yellow-400 transition-colors"></span>
                Home
              </a></li>
              <li><a href="#products" className="text-green-100 hover:text-yellow-400 transition-colors duration-200 flex items-center group">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-3 group-hover:bg-yellow-400 transition-colors"></span>
                Products
              </a></li>
              <li><a href="#about" className="text-green-100 hover:text-yellow-400 transition-colors duration-200 flex items-center group">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-3 group-hover:bg-yellow-400 transition-colors"></span>
                About Us
              </a></li>
              <li><a href="#contact" className="text-green-100 hover:text-yellow-400 transition-colors duration-200 flex items-center group">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-3 group-hover:bg-yellow-400 transition-colors"></span>
                Contact
              </a></li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-yellow-400 border-b border-green-600 pb-2 inline-block">Our Products</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-green-100 hover:text-yellow-400 transition-colors duration-200 flex items-center group">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-3 group-hover:bg-yellow-400 transition-colors"></span>
                Body Oils
              </a></li>
              <li><a href="#" className="text-green-100 hover:text-yellow-400 transition-colors duration-200 flex items-center group">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-3 group-hover:bg-yellow-400 transition-colors"></span>
                Shea Butter
              </a></li>
              <li><a href="#" className="text-green-100 hover:text-yellow-400 transition-colors duration-200 flex items-center group">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-3 group-hover:bg-yellow-400 transition-colors"></span>
                Hair Care
              </a></li>
              <li><a href="#" className="text-green-100 hover:text-yellow-400 transition-colors duration-200 flex items-center group">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-3 group-hover:bg-yellow-400 transition-colors"></span>
                Organic Soaps
              </a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-yellow-400 border-b border-green-600 pb-2 inline-block">Get In Touch</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 group">
                <div className="bg-green-600 p-2 rounded-full group-hover:bg-yellow-500 transition-colors">
                  <Mail className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-green-100 text-sm">Email us at</p>
                  <a href="mailto:ofieorganics@gmail.com" className="text-white hover:text-yellow-400 transition-colors font-medium">
                    ofieorganics@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-3 group">
                <div className="bg-green-600 p-2 rounded-full group-hover:bg-yellow-500 transition-colors">
                  <Phone className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-green-100 text-sm">Call us at</p>
                  <a href="tel:+233072429" className="text-white hover:text-yellow-400 transition-colors font-medium">
                    +233 072 4290
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-green-600 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              {/* <Leaf className="h-5 w-5 text-yellow-400" /> */}
              <p className="text-green-200 text-sm">
                2025 Ofie Organics & Botanicals. Naturally crafted with love.
              </p>
            </div>
            <div className="flex flex-wrap justify-center md:justify-end space-x-6">
              <a href="#" className="text-green-200 hover:text-yellow-400 text-sm transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#" className="text-green-200 hover:text-yellow-400 text-sm transition-colors duration-200">
                Terms of Service
              </a>
              <a href="#" className="text-green-200 hover:text-yellow-400 text-sm transition-colors duration-200">
                Shipping Info
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;