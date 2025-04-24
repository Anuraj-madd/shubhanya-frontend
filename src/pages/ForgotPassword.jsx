import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Mail, AlertCircle, ArrowLeft, Check, Key, Lock, Eye, EyeOff } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Email entry, 2: OTP verification, 3: New password
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpInputs, setOtpInputs] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Helper for logging
  const logRequestResponse = (action, request, response) => {
    console.log(`${action} Request:`, request);
    console.log(`${action} Response:`, response);
  };

  // Handle email form submission
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const requestData = { email, mode: "request_otp" };
      const response = await axios.post(
        "https://shubhanya-backend.onrender.com/forgot-pasword.php",
        JSON.stringify(requestData),
        { headers: { "Content-Type": "application/json" } }
      );
      
      logRequestResponse("Email", requestData, response.data);
      
      if (response.data.success) {
        setSuccess("OTP sent to your email address. Please check your inbox.");
        setStep(2); // Move to OTP verification step
      } else {
        setError(response.data.message || "Failed to send OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error requesting OTP:", error);
      setError(
        error.response?.data?.message || 
        "An error occurred. Please check your email and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Handle OTP input
  const handleOtpChange = (index, value) => {
    // Only allow digits
    if (!/^\d*$/.test(value)) return;

    const newOtpInputs = [...otpInputs];
    newOtpInputs[index] = value;
    setOtpInputs(newOtpInputs);
    
    // Combine OTP digits without any spaces or other characters
    const combinedOtp = newOtpInputs.join("");
    setOtp(combinedOtp);
    
    console.log("Current OTP:", combinedOtp); // For debugging
    
    // Auto-focus next input
    if (value && index < 5) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  // Handle OTP form submission
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      // Ensure OTP is a clean string without spaces
      const cleanOtp = otpInputs.join("").trim();
      
      // Make sure OTP is exactly 6 digits
      if (cleanOtp.length !== 6) {
        setError("OTP must be 6 digits");
        setLoading(false);
        return;
      }
      
      const requestData = { email, otp: cleanOtp, mode: "verify_otp" };
      
      console.log("Submitting OTP:", cleanOtp);
      
      const response = await axios.post(
        "https://shubhanya-backend.onrender.com/forgot-pasword.php",
        JSON.stringify(requestData),
        { headers: { "Content-Type": "application/json" } }
      );
      
      logRequestResponse("OTP Verification", requestData, response.data);
      
      if (response.data.success) {
        setSuccess("OTP verified successfully.");
        setStep(3); // Move to reset password step
      } else {
        setError(response.data.message || "Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setError(
        error.response?.data?.message || 
        "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Handle password reset form submission
  const handleResetSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    // Validate passwords
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }
    
    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long.");
      setLoading(false);
      return;
    }
    
    try {
      // Fix: Changed "new_password" to "password" to match backend expectations
      const requestData = { 
        email, 
        otp: otpInputs.join("").trim(), 
        password: newPassword, // Changed from new_password to password
        mode: "reset_password" 
      };
      
      const response = await axios.post(
        "https://shubhanya-backend.onrender.com/forgot-pasword.php",
        JSON.stringify(requestData),
        { headers: { "Content-Type": "application/json" } }
      );
      
      logRequestResponse("Password Reset", requestData, response.data);
      
      if (response.data.success) {
        setSuccess("Password reset successfully. You can now login with your new password.");
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } else {
        setError(response.data.message || "Failed to reset password. Please try again.");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      setError(
        error.response?.data?.message || 
        "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  // Helper function to handle "back" navigation between steps
  const goBack = () => {
    if (step === 2) {
      setStep(1);
      setSuccess("");
    } else if (step === 3) {
      setStep(2);
      setSuccess("");
    }
  };

  // Resend OTP functionality
  const handleResendOtp = async () => {
    setLoading(true);
    setError("");
    
    try {
      const requestData = { email, mode: "resend_otp" };
      const response = await axios.post(
        "https://shubhanya-backend.onrender.com/forgot-pasword.php",
        JSON.stringify(requestData),
        { headers: { "Content-Type": "application/json" } }
      );
      
      logRequestResponse("Resend OTP", requestData, response.data);
      
      if (response.data.success) {
        setSuccess("New OTP sent to your email address. Please check your inbox.");
        // Reset OTP inputs
        setOtpInputs(["", "", "", "", "", ""]);
        setOtp("");
      } else {
        setError(response.data.message || "Failed to resend OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error resending OTP:", error);
      setError(
        error.response?.data?.message || 
        "An error occurred. Please try again."
      );
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
            <h1 className="text-2xl font-bold">
              {step === 1 && "Forgot Password"}
              {step === 2 && "Verify OTP"}
              {step === 3 && "Reset Password"}
            </h1>
            <p className="text-blue-50">
              {step === 1 && "We'll send you an OTP to reset your password"}
              {step === 2 && "Enter the 6-digit code sent to your email"}
              {step === 3 && "Create a new password for your account"}
            </p>
          </div>

          {/* Error and Success Messages */}
          {error && (
            <div className="p-4 bg-red-50 text-red-700 flex items-center">
              <AlertCircle size={20} className="mr-2" />
              <span>{error}</span>
            </div>
          )}
          
          {success && (
            <div className="p-4 bg-green-50 text-green-700 flex items-center">
              <Check size={20} className="mr-2" />
              <span>{success}</span>
            </div>
          )}

          <div className="p-6 md:p-8">
            {/* Step 1: Email Entry */}
            {step === 1 && (
              <form onSubmit={handleEmailSubmit}>
                <div className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center">
                      <Mail size={16} className="mr-1.5 text-gray-500" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full p-3 rounded-lg border border-[#778DA9] text-[#1B1B1B] focus:outline-none focus:ring-2 focus:ring-[#0D1B2A]"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex justify-center py-3 px-4 rounded-lg bg-[#0D1B2A] text-white font-medium hover:bg-[#19b3c7] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0D1B2A] disabled:opacity-70"
                  >
                    {loading ? (
                      <>
                        <div className="h-5 w-5 mr-2 animate-spin rounded-full border-2 border-white border-r-transparent"></div>
                        Sending OTP...
                      </>
                    ) : (
                      "Send OTP"
                    )}
                  </button>
                </div>

                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    Remember your password?{" "}
                    <a href="/login" className="font-medium text-[#0D1B2A] hover:text-[#19b3c7]">
                      Log in
                    </a>
                  </p>
                </div>
              </form>
            )}

            {/* Step 2: OTP Verification */}
            {step === 2 && (
              <form onSubmit={handleOtpSubmit}>
                <div className="space-y-5">
                  <div>
                    <label className="text-sm font-medium text-gray-700 flex items-center mb-3">
                      <Key size={16} className="mr-1.5 text-gray-500" />
                      Enter Verification Code
                    </label>
                    <div className="flex justify-between gap-2">
                      {otpInputs.map((digit, index) => (
                        <input
                          key={index}
                          id={`otp-input-${index}`}
                          type="text"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleOtpChange(index, e.target.value)}
                          required
                          className="w-full aspect-square max-w-12 p-0 rounded-lg border border-[#778DA9] text-[#1B1B1B] text-center text-xl font-bold focus:outline-none focus:ring-2 focus:ring-[#0D1B2A]"
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={goBack}
                      className="text-gray-600 hover:text-gray-800 flex items-center text-sm"
                    >
                      <ArrowLeft size={16} className="mr-1" />
                      Back
                    </button>
                    
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      disabled={loading}
                      className="text-sm font-medium text-[#0D1B2A] hover:text-[#19b3c7]"
                    >
                      Resend OTP
                    </button>
                  </div>

                  <button
                    type="submit"
                    disabled={loading || otp.length !== 6}
                    className="w-full flex justify-center py-3 px-4 rounded-lg bg-[#0D1B2A] text-white font-medium hover:bg-[#19b3c7] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0D1B2A] disabled:opacity-70"
                  >
                    {loading ? (
                      <>
                        <div className="h-5 w-5 mr-2 animate-spin rounded-full border-2 border-white border-r-transparent"></div>
                        Verifying...
                      </>
                    ) : (
                      "Verify OTP"
                    )}
                  </button>
                </div>
              </form>
            )}

            {/* Step 3: New Password */}
            {step === 3 && (
              <form onSubmit={handleResetSubmit}>
                <div className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center">
                      <Lock size={16} className="mr-1.5 text-gray-500" />
                      New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        minLength={8}
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
                    <p className="text-xs text-gray-500 mt-1">Password must be at least 8 characters long</p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center">
                      <Lock size={16} className="mr-1.5 text-gray-500" />
                      Confirm Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        minLength={8}
                        className="w-full p-3 rounded-lg border border-[#778DA9] text-[#1B1B1B] focus:outline-none focus:ring-2 focus:ring-[#0D1B2A] pr-10"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>

                  <div className="flex items-center">
                    <button
                      type="button"
                      onClick={goBack}
                      className="text-gray-600 hover:text-gray-800 flex items-center text-sm"
                    >
                      <ArrowLeft size={16} className="mr-1" />
                      Back
                    </button>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex justify-center py-3 px-4 rounded-lg bg-[#0D1B2A] text-white font-medium hover:bg-[#19b3c7] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0D1B2A] disabled:opacity-70"
                  >
                    {loading ? (
                      <>
                        <div className="h-5 w-5 mr-2 animate-spin rounded-full border-2 border-white border-r-transparent"></div>
                        Resetting Password...
                      </>
                    ) : (
                      "Reset Password"
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ForgotPassword;