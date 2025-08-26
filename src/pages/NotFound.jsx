import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SEO from '../components/SEO';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <>
      <SEO 
        title="Page Not Found - 404 Error | Shubhanya Enterprises"
        description="The page you're looking for doesn't exist. Return to Shubhanya Enterprises homepage for networking, surveillance, and solar solutions in Uttar Pradesh East."
        keywords="shubhanya,shubhanya siswa, shubhanya enterprises siswa, Shubhanya, siswa bazar, siswa bazar shubhanya, shubhanya enterprises siswa bazar , siswa bazar shubhanya enterprises, shubhanya Siswa , shubhanya enterprises siswa, Shubhanya Enterprises, networking solutions, surveillance systems, solar power, internet services, electrical wiring, Uttar Pradesh East, technology solutions, network tower installation, static IP services, security cameras, solar installation, broadband services, electrical contractors, IT infrastructure, network cabling, wireless networks, CCTV installation, renewable energy, Havells, D-Link, Hikvision, CP Plus, Mikrotik, Ubiquiti, Netsathi Networks, Airtel, Railwire"
        image="https://shubhanya.cybernetic.co.in/assets/cover_hero.webp"
        url="https://shubhanya.cybernetic.co.in/404"
        type="website"
      />
      <Navbar />
      <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden border border-[#E9ECEF] text-center p-8">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
              </svg>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            404 - Page Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            Oops! The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
            <button
              onClick={() => navigate("/")}
              className="px-6 py-3 bg-[#0D1B2A] text-white rounded-lg hover:bg-[#19b3c7] transition-colors font-medium"
            >
              Return to Home
            </button>
            <button
              onClick={() => navigate(-1)}
              className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors font-medium"
            >
              Go Back
            </button>
          </div>
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-3">Looking for our services?</p>
            <div className="flex flex-wrap justify-center gap-2">
              <button
                onClick={() => navigate("/services")}
                className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors"
              >
                Services
              </button>
              <button
                onClick={() => navigate("/products")}
                className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-full hover:bg-green-200 transition-colors"
              >
                Products
              </button>
              <button
                onClick={() => navigate("/contact")}
                className="px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded-full hover:bg-purple-200 transition-colors"
              >
                Contact
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NotFound;
