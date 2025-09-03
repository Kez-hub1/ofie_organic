import React from 'react';
import { Mail, Phone, Facebook, Instagram, Music2 } from 'lucide-react';
import logo from '../assets/logo1.png';

const Footer = () => {
  return (
    <footer className="bg-[#008236] text-white relative overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="md:col-span-1 space-y-6">
            <div className="flex items-center space-x-2">
              <img src={logo} alt="Ofie Organics" className="h-26 ml-8 border-4 border-yellow-500 rounded w-auto"/>
            </div>
            <p className="text-green-100 leading-relaxed text-m">
              Premium organic skincare products crafted with love and natural ingredients 
              for your skin's health and radiant beauty.
            </p>
           
          </div>

          {/* Quick Links */}
          <div className='md:ml-7'>
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
                Skincare
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
                <div className="bg-yellow-500 p-2 rounded-full group-hover:bg-green-600 transition-all duration-300 transform hover:scale-110">
                  <Mail className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-green-100 text-sm">Email us at</p>
                  <a href="mailto:ofieorganics@gmail.com" className="text-white hover:text-yellow-400 transition-colors font-medium">
                    ofieorganics@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-3 group">
                <div className="bg-yellow-500 p-2 rounded-full hover:bg-green-600 transition-all duration-300 transform hover:scale-110">
                  <Phone className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-green-100 text-sm">Call us at</p>
                  <a href="tel:+233200724290" className="text-white hover:text-yellow-400 transition-colors font-medium">
                    +233 20072 4290
                  </a>
                </div>
              </div>
               <div className="flex space-x-4">
              <a href="https://www.facebook.com/tinatulip.danquah?mibextid=ZbWKwL" className="bg-yellow-500 hover:bg-green-600 p-2 rounded-full transition-all duration-300 transform hover:scale-110">
                <Facebook className="h-5 w-5 text-white" />
              </a>
              <a href="https://www.instagram.com/ofieorganics?igsh=MTN4bzZuNXhocDlnbw==" className="bg-yellow-500 hover:bg-green-600 p-2 rounded-full transition-all duration-300 transform hover:scale-110">
                <Instagram className="h-5 w-5 text-white" />
              </a>
              <a href="https://www.tiktok.com/@ofie.organics?_t=ZM-8zC95ltvMo9&_r=1" className="bg-yellow-500 hover:bg-green-600 p-2 rounded-full transition-all duration-300 transform hover:scale-110">
                <Music2 className="h-5 w-5 text-white" />
              </a>
            </div>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-green-600 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-wrap justify-center  md:justify-end space-x-6">
              <a href="#" className="text-green-200 hover:text-yellow-400 text-sm transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#" className="text-green-200 hover:text-yellow-400 text-sm transition-colors duration-200">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;