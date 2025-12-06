import React from 'react'
import { Mail, Phone, Linkedin, Twitter, Facebook, MapPin } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Vandana Mishra
            </h3>
            <p className="text-sm text-gray-400">
              Professional Legal Advocate & Consultant dedicated to protecting your rights.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-lg">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/" className="hover:text-purple-400 transition duration-300">Home</a></li>
              <li><a href="/about" className="hover:text-purple-400 transition duration-300">About</a></li>
              <li><a href="/portfolio" className="hover:text-purple-400 transition duration-300">Portfolio</a></li>
              <li><a href="/contact" className="hover:text-purple-400 transition duration-300">Contact</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-lg">Contact</h4>
            <div className="space-y-3">
              <a href="mailto:vm962428@gmail.com" className="flex items-center space-x-3 hover:text-purple-400 transition duration-300">
                <Mail size={18} />
                <span className="text-sm break-all">vm962428@gmail.com</span>
              </a>
              <a href="tel:+917999363251" className="flex items-center space-x-3 hover:text-purple-400 transition duration-300">
                <Phone size={18} />
                <span className="text-sm">+91 79993 63251</span>
              </a>
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-lg">Follow Me</h4>
            <div className="flex space-x-4">
              <a href="#" className="bg-purple-600 p-3 rounded-full hover:bg-purple-700 transition duration-300">
                <Linkedin size={18} />
              </a>
              <a href="#" className="bg-purple-600 p-3 rounded-full hover:bg-purple-700 transition duration-300">
                <Twitter size={18} />
              </a>
              <a href="#" className="bg-purple-600 p-3 rounded-full hover:bg-purple-700 transition duration-300">
                <Facebook size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-800"></div>

      {/* Copyright Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-400">
          <p>&copy; {currentYear} Vandana Mishra. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <a href="#" className="hover:text-purple-400 transition duration-300">Privacy Policy</a>
            <a href="#" className="hover:text-purple-400 transition duration-300">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer