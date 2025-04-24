import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#29353C] text-[#DFEBF6] px-6 py-10 w-full">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mb-6">
        {/* Company Info */}
        <div>
          <h3 className="text-lg font-bold mb-4">Company</h3>
          <p className="mb-1">Shubhanya Enterprises</p>
          <p className="mb-1">Email: <a href="mailto:support@shubhanya.in" className="hover:text-[#AAC7D8]">support@shubhanya.in</a></p>
          <p className="mb-1">Phone: <a href="tel:+919935970521" className="hover:text-[#AAC7D8]">+91 99359 70521</a></p>
          <p>Address: Near Prem Lal Singhania Inter College, Siswa Bazar, Maharajganj, IN</p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-[#AAC7D8]">Home</a></li>
            <li><a href="/services" className="hover:text-[#AAC7D8]">Services</a></li>
            <li><a href="/products" className="hover:text-[#AAC7D8]">Products</a></li>
            <li><a href="/about" className="hover:text-[#AAC7D8]">About</a></li>
            <li><a href="/contact" className="hover:text-[#AAC7D8]">Contact</a></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="text-lg font-bold mb-4">Legal</h3>
          <ul className="space-y-2">
            <li><a href="/legal" className="hover:text-[#AAC7D8]">Terms & Conditions</a></li>
            <li><a href="/legal" className="hover:text-[#AAC7D8]">Cancellation Policy</a></li>
            <li><a href="/legal" className="hover:text-[#AAC7D8]">Refund Policy</a></li>
            <li><a href="/legal" className="hover:text-[#AAC7D8]">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Connect */}
        <div>
          <h3 className="text-lg font-bold mb-4">Connect With Us</h3>
          <div className="flex gap-4 text-white">
            <a href="#" className="bg-[#44576D] hover:bg-[#AAC7D8] p-2 rounded-full transition">
              <FaFacebookF />
            </a>
            <a href="#" className="bg-[#44576D] hover:bg-[#AAC7D8] p-2 rounded-full transition">
              <FaInstagram />
            </a>
            <a href="#" className="bg-[#44576D] hover:bg-[#AAC7D8] p-2 rounded-full transition">
              <FaTwitter />
            </a>
            <a href="#" className="bg-[#44576D] hover:bg-[#AAC7D8] p-2 rounded-full transition">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      <div className="text-center text-sm border-t border-[#44576D] pt-2">
        &copy; {new Date().getFullYear()} Designed with ❤️ by Anuraj Maddhesiya<br/> All rights reserved
      </div>
    </footer>
  );
};

export default Footer;
