import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Mail, Lock, AlertCircle, Eye, EyeOff } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(""); // Clear error when user types
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      console.log("Sending login request with:", { email: formData.email });
      
      const response = await axios.post("https://shubhanya-backend.onrender.com/login.php", 
        JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      
      console.log("Login response:", response.data);

      // Check if the login was successful
      if (response.data.success || response.data.user) {
        // Store the complete user object
        const userData = response.data.user || {
          id: response.data.user_id,
          firstname: response.data.firstname || response.data.first_name,
          lastname: response.data.lastname || response.data.last_name,
          email: response.data.email,
          role: response.data.role
        };
        
        // Store the complete user object in localStorage
        localStorage.setItem("user", JSON.stringify(userData));
        
        // Also store user_id separately for backward compatibility if needed
        localStorage.setItem("user_id", userData.id);
        
        // Determine where to redirect based on user role
        if (userData.role === 'admin') {
          // Redirect admin users to the admin dashboard
          navigate('/admin/dashboard');
        } else {
          // For regular users, always navigate to products page
          console.log("Navigating to products page");
          navigate("/products");
        }
      } else {
        setError(response.data.message || "Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login error details:", error);
      
      if (error.response) {
        console.error("Error response:", error.response.data);
        setError(error.response.data.message || "Login failed. Please check your credentials.");
      } else if (error.request) {
        console.error("No response received:", error.request);
        setError("No response from server. Please check your connection.");
      } else {
        console.error("Error message:", error.message);
        setError("An error occurred. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden border border-[#E9ECEF]">
          <div className="bg-[#0D1B2A] text-white p-6 text-center">
            <h1 className="text-2xl font-bold">Welcome Back</h1>
            <p className="text-blue-50">Log in to your account</p>
          </div>

          {error && (
            <div className="p-4 bg-red-50 text-red-700 flex items-center">
              <AlertCircle size={20} className="mr-2" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="p-6 md:p-8">
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <Mail size={16} className="mr-1.5 text-gray-500" />
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-3 rounded-lg border border-[#778DA9] text-[#1B1B1B] focus:outline-none focus:ring-2 focus:ring-[#0D1B2A]"
                  placeholder="your.email@example.com"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <Lock size={16} className="mr-1.5 text-gray-500" />
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full p-3 rounded-lg border border-[#778DA9] text-[#1B1B1B] focus:outline-none focus:ring-2 focus:ring-[#0D1B2A] pr-10"
                    placeholder="••••••••"
                  />
                  <button 
                    type="button" 
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-[#0D1B2A]"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-[#0D1B2A] border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
                <a href="/forgot-password" className="text-sm font-medium text-[#0D1B2A] hover:text-[#19b3c7]">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 rounded-lg bg-[#0D1B2A] text-white font-medium hover:bg-[#19b3c7] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0D1B2A] disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <div className="h-5 w-5 mr-2 animate-spin rounded-full border-2 border-white border-r-transparent"></div>
                    Logging in...
                  </>
                ) : (
                  "Log In"
                )}
              </button>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <a href="/register" className="font-medium text-[#0D1B2A] hover:text-[#19b3c7]">
                  Register now
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
