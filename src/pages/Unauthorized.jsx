import React from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden border border-[#E9ECEF] text-center p-8">
          <div className="flex justify-center mb-6">
            <AlertTriangle size={64} className="text-red-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Access Denied
          </h1>
          <p className="text-gray-600 mb-6">
            You don't have permission to access this page. Please contact an administrator if you believe this is an error.
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => navigate("/")}
              className="px-4 py-2 bg-[#0D1B2A] text-white rounded-lg hover:bg-[#19b3c7] transition-colors"
            >
              Return to Home
            </button>
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Unauthorized;