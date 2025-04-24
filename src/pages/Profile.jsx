import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserCircle, Save, Mail, User, Lock, AlertCircle } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Profile = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("user_id");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: "", type: "" });
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Check if user is logged in
    if (!userId) {
      // Store the current page url in sessionStorage before redirecting
      sessionStorage.setItem("returnUrl", window.location.pathname);
      navigate("/login");
      return;
    }
    
    // Fetch user data when component mounts
    fetchUserData();
  }, [userId]);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const response = await axios.post("https://shubhanya-backend.onrender.com/profile.php", {
        mode: "fetch",
        user_id: userId,
      });
      
      if (response.data.success) {
        setFormData(prev => ({ 
          ...prev, 
          ...response.data.data,
          password: "",
          confirm_password: "", 
        }));
      } else {
        showNotification(response.data.message, "error");
      }
    } catch (error) {
      showNotification("Failed to fetch profile data", "error");
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.first_name?.trim()) {
      newErrors.first_name = "First name is required";
    }
    
    if (!formData.last_name?.trim()) {
      newErrors.last_name = "Last name is required";
    }
    
    if (formData.password && formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    if (formData.password && formData.password !== formData.confirm_password) {
      newErrors.confirm_password = "Passwords do not match";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const showNotification = (message, type = "success") => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: "", type: "" });
    }, 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      setSaving(true);
      const response = await axios.post("https://shubhanya-backend.onrender.com/profile.php", {
        mode: "update",
        user_id: userId,
        first_name: formData.first_name,
        last_name: formData.last_name,
        password: formData.password || null, // Only send password if provided
      });
      
      if (response.data.success) {
        showNotification(response.data.message, "success");
        // Clear password fields after successful update
        setFormData(prev => ({
          ...prev,
          password: "",
          confirm_password: ""
        }));
      } else {
        showNotification(response.data.message, "error");
      }
    } catch (error) {
      showNotification("Failed to update profile", "error");
      console.error("Error updating profile:", error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#F5F7FA] py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-[#E9ECEF]">
            <div className="bg-[#0D1B2A] text-white p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-white rounded-full p-2 text-[#0D1B2A]">
                  <UserCircle size={42} />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">Your Profile</h1>
                  <p className="text-blue-50">Manage your account information</p>
                </div>
              </div>
            </div>

            {/* Notification */}
            {notification.show && (
              <div className={`p-4 ${notification.type === "error" ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"} flex items-center`}>
                <AlertCircle size={20} className="mr-2" />
                <span>{notification.message}</span>
              </div>
            )}

            {loading ? (
              <div className="p-8 text-center">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-[#0D1B2A] border-r-transparent"></div>
                <p className="mt-2 text-gray-600">Loading your profile...</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center">
                      <User size={16} className="mr-1.5 text-gray-500" />
                      First Name
                    </label>
                    <input
                      type="text"
                      name="first_name"
                      value={formData.first_name || ""}
                      onChange={handleChange}
                      className={`w-full p-3 rounded-lg border ${errors.first_name ? 'border-red-500' : 'border-[#778DA9]'} text-[#1B1B1B] focus:outline-none focus:ring-2 focus:ring-[#0D1B2A]`}
                    />
                    {errors.first_name && (
                      <p className="text-red-500 text-xs mt-1">{errors.first_name}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center">
                      <User size={16} className="mr-1.5 text-gray-500" />
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="last_name"
                      value={formData.last_name || ""}
                      onChange={handleChange}
                      className={`w-full p-3 rounded-lg border ${errors.last_name ? 'border-red-500' : 'border-[#778DA9]'} text-[#1B1B1B] focus:outline-none focus:ring-2 focus:ring-[#0D1B2A]`}
                    />
                    {errors.last_name && (
                      <p className="text-red-500 text-xs mt-1">{errors.last_name}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center">
                      <Mail size={16} className="mr-1.5 text-gray-500" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email || ""}
                      disabled
                      className="w-full p-3 rounded-lg bg-gray-100 text-gray-600 border border-gray-200 cursor-not-allowed"
                    />
                    <p className="text-xs text-gray-500">Email cannot be changed</p>
                  </div>

                  <div className="space-y-2 md:col-span-2 border-t border-gray-200 pt-6 mt-2">
                    <h3 className="font-medium text-gray-900 mb-4">Change Password</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 flex items-center">
                          <Lock size={16} className="mr-1.5 text-gray-500" />
                          New Password
                        </label>
                        <input
                          type="password"
                          name="password"
                          value={formData.password || ""}
                          onChange={handleChange}
                          className={`w-full p-3 rounded-lg border ${errors.password ? 'border-red-500' : 'border-[#778DA9]'} text-[#1B1B1B] focus:outline-none focus:ring-2 focus:ring-[#0D1B2A]`}
                          placeholder="Leave blank to keep current password"
                        />
                        {errors.password && (
                          <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 flex items-center">
                          <Lock size={16} className="mr-1.5 text-gray-500" />
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          name="confirm_password"
                          value={formData.confirm_password || ""}
                          onChange={handleChange}
                          className={`w-full p-3 rounded-lg border ${errors.confirm_password ? 'border-red-500' : 'border-[#778DA9]'} text-[#1B1B1B] focus:outline-none focus:ring-2 focus:ring-[#0D1B2A]`}
                          placeholder="Leave blank to keep current password"
                        />
                        {errors.confirm_password && (
                          <p className="text-red-500 text-xs mt-1">{errors.confirm_password}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex items-center px-6 py-3 rounded-lg bg-[#0D1B2A] text-white font-medium hover:bg-[#19b3c7] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0D1B2A] disabled:opacity-70"
                  >
                    {saving ? (
                      <>
                        <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-white border-r-transparent"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save size={18} className="mr-2" />
                        Save Changes
                      </>
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

export default Profile;