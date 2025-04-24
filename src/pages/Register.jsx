import React, { useState } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [serverMessage, setServerMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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

    setServerMessage("");
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched({ ...touched, [name]: true });
    setErrors({ ...errors, [name]: validateField(name, value) });
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

    try {
      const formattedData = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        password: formData.password,
        role: "user",
      };

      const res = await axios.post("https://shubhanya-backend.onrender.com/register.php", formattedData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setServerMessage(res.data.message || "Signup successful!");
    } catch (err) {
      console.error(err.response?.data || err.message);
      setServerMessage(err.response?.data?.message || "Signup failed. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center px-4 py-10">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-8 border border-[#778DA9]">
          <h2 className="text-2xl font-bold text-center text-[#0D1B2A] mb-6">
            Create an Account
          </h2>

          {serverMessage && (
            <p className="text-center text-sm mb-4 text-[#415A77]">
              {serverMessage}
            </p>
          )}

          <form onSubmit={handleSignup} className="space-y-4">
            {["firstName", "lastName", "email"].map((field) => (
              <div key={field}>
                <label className="block font-semibold mb-1 text-[#1B263B]">
                  {field === "firstName" ? "First Name" : field === "lastName" ? "Last Name" : "Email"}
                </label>
                <input
                  type={field === "email" ? "email" : "text"}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full px-4 py-2 border border-[#778DA9] rounded-md bg-white text-[#0D1B2A]"
                />
                {touched[field] && errors[field] && (
                  <p className="text-red-500 text-sm">{errors[field]}</p>
                )}
              </div>
            ))}

            {/* Password */}
            <div className="relative">
              <label className="block font-semibold mb-1 text-[#1B263B]">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full px-4 py-2 border border-[#778DA9] rounded-md pr-10 bg-white text-[#0D1B2A]"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-[37px] right-3 text-[#415A77] cursor-pointer"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
              {touched.password && errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <label className="block font-semibold mb-1 text-[#1B263B]">Confirm Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full px-4 py-2 border border-[#778DA9] rounded-md pr-10 bg-white text-[#0D1B2A]"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-[37px] right-3 text-[#415A77] cursor-pointer"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
              {touched.confirmPassword && errors.confirmPassword && (
                <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-[#1CC5DC] text-white font-semibold py-2 rounded-md hover:bg-[#0D1B2A] transition"
            >
              Sign Up
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-4">
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="mx-3 text-gray-500">OR</span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>

          {/* Google Login Placeholder */}
          <button className="w-full flex items-center justify-center gap-3 border border-gray-300 py-2 rounded hover:bg-[#E0E1DD] transition">
            <FaGoogle className="text-[#DB4437]" />
            <span className="text-[#1B1B1B]">Sign up with Google</span>
          </button>

          <p className="text-center text-sm text-[#1B263B] mt-6">
            Already have an account?{" "}
            <a href="/login" className="text-[#9F2BEE] font-semibold hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
