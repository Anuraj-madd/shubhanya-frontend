import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { User, Mail, Lock, Eye, EyeOff, AlertCircle, X } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [modal, setModal] = useState({
    show: false,
    type: "", // "success", "error", "info"
    message: "",
  });
  const [googleModal, setGoogleModal] = useState(false);

  // Redirect after successful registration
  useEffect(() => {
    let timer;
    if (modal.show && modal.type === "success") {
      timer = setTimeout(() => {
        navigate("/login");
      }, 3000);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [modal, navigate]);

  const validateField = (name, value) => {
    switch (name) {
      case "firstName":
      case "lastName":
        return value.trim() === "" ? "Required" : "";
      case "email":
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? ""
          : "Invalid email address";
      case "password":
        return value.length < 6 ? "Password must be at least 6 characters" : "";
      case "confirmPassword":
        return value !== formData.password ? "Passwords do not match" : "";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (touched[name]) {
      setErrors({ ...errors, [name]: validateField(name, value) });
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched({ ...touched, [name]: true });
    setErrors({ ...errors, [name]: validateField(name, value) });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const closeModal = () => {
    setModal({ ...modal, show: false });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const currentErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) currentErrors[key] = error;
    });

    setErrors(currentErrors);
    setTouched({
      firstName: true,
      lastName: true,
      email: true,
      password: true,
      confirmPassword: true,
    });

    if (Object.keys(currentErrors).length > 0) return;

    setLoading(true);

    try {
      const formattedData = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        password: formData.password,
        role: "user",
      };

      const res = await axios.post(
        "https://shubhanya-backend.onrender.com/register.php",
        formattedData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setModal({
        show: true,
        type: "success",
        message: res.data.message || "Registration successful! Redirecting to login page...",
      });
    } catch (err) {
      console.error(err.response?.data || err.message);
      setModal({
        show: true,
        type: "error",
        message: err.response?.data?.message || "Registration failed. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    setGoogleModal(true);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden border border-[#E9ECEF]">
          <div className="bg-[#0D1B2A] text-white p-6 text-center">
            <h1 className="text-2xl font-bold">Create an Account</h1>
            <p className="text-blue-50">Join us today</p>
          </div>

          <form onSubmit={handleSignup} className="p-6 md:p-8">
            <div className="space-y-4">
              {/* First Name */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <User size={16} className="mr-1.5 text-gray-500" />
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  className="w-full p-3 rounded-lg border border-[#778DA9] text-[#1B1B1B] focus:outline-none focus:ring-2 focus:ring-[#0D1B2A]"
                  placeholder="First Name"
                />
                {touched.firstName && errors.firstName && (
                  <div className="text-red-500 text-sm flex items-center mt-1">
                    <AlertCircle size={14} className="mr-1" />
                    {errors.firstName}
                  </div>
                )}
              </div>

              {/* Last Name */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <User size={16} className="mr-1.5 text-gray-500" />
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  className="w-full p-3 rounded-lg border border-[#778DA9] text-[#1B1B1B] focus:outline-none focus:ring-2 focus:ring-[#0D1B2A]"
                  placeholder="Last Name"
                />
                {touched.lastName && errors.lastName && (
                  <div className="text-red-500 text-sm flex items-center mt-1">
                    <AlertCircle size={14} className="mr-1" />
                    {errors.lastName}
                  </div>
                )}
              </div>

              {/* Email */}
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
                  onBlur={handleBlur}
                  required
                  className="w-full p-3 rounded-lg border border-[#778DA9] text-[#1B1B1B] focus:outline-none focus:ring-2 focus:ring-[#0D1B2A]"
                  placeholder="your.email@example.com"
                />
                {touched.email && errors.email && (
                  <div className="text-red-500 text-sm flex items-center mt-1">
                    <AlertCircle size={14} className="mr-1" />
                    {errors.email}
                  </div>
                )}
              </div>

              {/* Password */}
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
                    onBlur={handleBlur}
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
                {touched.password && errors.password && (
                  <div className="text-red-500 text-sm flex items-center mt-1">
                    <AlertCircle size={14} className="mr-1" />
                    {errors.password}
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <Lock size={16} className="mr-1.5 text-gray-500" />
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
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
                {touched.confirmPassword && errors.confirmPassword && (
                  <div className="text-red-500 text-sm flex items-center mt-1">
                    <AlertCircle size={14} className="mr-1" />
                    {errors.confirmPassword}
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 rounded-lg bg-[#0D1B2A] text-white font-medium hover:bg-[#19b3c7] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0D1B2A] disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <div className="h-5 w-5 mr-2 animate-spin rounded-full border-2 border-white border-r-transparent"></div>
                    Signing up...
                  </>
                ) : (
                  "Sign Up"
                )}
              </button>
            </div>

            {/* Divider */}
            <div className="flex items-center my-6">
              <div className="flex-grow h-px bg-gray-300"></div>
              <span className="mx-3 text-gray-500 text-sm">OR</span>
              <div className="flex-grow h-px bg-gray-300"></div>
            </div>

            {/* Google Login Placeholder */}
            <button
              type="button"
              onClick={handleGoogleSignup}
              className="w-full flex items-center justify-center gap-3 border border-gray-300 p-3 rounded-lg hover:bg-gray-50 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                width="20px"
                height="20px"
              >
                <path
                  fill="#FFC107"
                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                />
                <path
                  fill="#FF3D00"
                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                />
                <path
                  fill="#4CAF50"
                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                />
                <path
                  fill="#1976D2"
                  d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                />
              </svg>
              <span className="text-[#1B1B1B]">Sign up with Google</span>
            </button>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-[#0D1B2A] hover:text-[#19b3c7]"
                >
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>

        {/* Success/Error Modal */}
        {modal.show && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 mx-4">
              <div className="flex justify-between items-center mb-4">
                <h3
                  className={`text-lg font-semibold ${
                    modal.type === "success" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {modal.type === "success" ? "Success" : "Error"}
                </h3>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={18} />
                </button>
              </div>
              <p className="text-gray-700 mb-4">{modal.message}</p>
              {modal.type === "success" && (
                <p className="text-sm text-gray-500">
                  Redirecting to login page in 3 seconds...
                </p>
              )}
            </div>
          </div>
        )}

        {/* Google Feature Coming Soon Modal */}
        {googleModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 mx-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-[#0D1B2A]">
                  Coming Soon!
                </h3>
                <button
                  onClick={() => setGoogleModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={18} />
                </button>
              </div>
              <p className="text-gray-700 mb-4">
                Google sign-up feature will be enabled soon. Until then, please
                sign up using the registration form.
              </p>
              <button
                onClick={() => setGoogleModal(false)}
                className="w-full bg-[#0D1B2A] text-white py-2 rounded-lg hover:bg-[#19b3c7] transition-colors mt-2"
              >
                Got it
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Register;
