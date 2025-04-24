import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]); // Initialize as empty array instead of null
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      navigate("/login");
      return;
    }

    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const dashboardRes = await axios.post(
          "https://shubhanya-backend.onrender.com/dashboard.php",
          { user_id: storedUser.id, limit: 2 }
        );

        if (dashboardRes.data.error) {
          throw new Error(dashboardRes.data.error);
        }

        // Make sure recentOrders is always an array even if API doesn't return expected data
        setUser(dashboardRes.data.user);
        setRecentOrders(Array.isArray(dashboardRes.data.recent_orders) 
          ? dashboardRes.data.recent_orders 
          : []);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Failed to load your dashboard. Please try again.");
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [navigate]);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-600";
      case "shipped":
        return "bg-blue-600";
      case "processing":
        return "bg-yellow-600";
      case "cancelled":
        return "bg-red-600";
      case "pending":
      default:
        return "bg-orange-600";
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <>
      <Navbar />
      <div className="bg-[#F5F7FA] min-h-screen py-8 px-4 md:px-8 text-[#1B1B1B]">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1B263B]"></div>
            </div>
          ) : error ? (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              {error}
            </div>
          ) : (
            <>
              <h1 className="text-3xl font-bold mb-6 text-[#0D1B2A]">
                Welcome back, {user?.first_name || "User"}!
              </h1>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {[
                  {
                    label: "My Orders",
                    desc: "View and track your orders",
                    iconPath:
                      "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z",
                    onClick: () => navigate("/orders"),
                  },
                  {
                    label: "My Cart",
                    desc: "View items in your cart",
                    iconPath:
                      "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z",
                    onClick: () => navigate("/cart"),
                  },
                  {
                    label: "My Profile",
                    desc: "Edit your personal information",
                    iconPath:
                      "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
                    onClick: () => navigate("/profile"),
                  },
                ].map((action, index) => (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-lg shadow-md border border-[#778DA9] hover:bg-[#DFEBF6] transition-colors cursor-pointer relative overflow-hidden"
                    onClick={action.onClick}
                  >
                    <div className="absolute top-0 right-0 w-20 h-20 transform translate-x-8 -translate-y-8 bg-[#DFEBF6] rounded-full"></div>
                    <div className="relative z-10">
                      <div className="bg-[#DFEBF6] inline-block p-3 rounded-lg mb-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-[#1B263B]"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d={action.iconPath}
                          />
                        </svg>
                      </div>
                      <h2 className="text-xl font-semibold text-[#0D1B2A]">
                        {action.label}
                      </h2>
                      <p className="text-sm text-[#415A77] mt-1">
                        {action.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Recent Orders */}
              <div className="bg-white p-6 rounded-lg shadow-md border border-[#778DA9] mb-10">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-[#0D1B2A]">
                    Recent Orders
                  </h2>
                  <button
                    onClick={() => navigate("/orders")}
                    className="text-sm text-[#1B263B] hover:text-[#0D1B2A] font-medium"
                  >
                    View All
                  </button>
                </div>

                {/* Added a null/undefined check for recentOrders */}
                {recentOrders && recentOrders.length > 0 ? (
                  <div className="space-y-4">
                    {recentOrders.map((order) => (
                      <div
                        key={order.order_id}
                        className="border border-[#AAC7D8] rounded-lg p-4 hover:bg-[#F8FAFC] transition-colors"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-[#1B263B] font-medium">
                              Order #{order.order_id}
                            </p>
                            <p className="text-sm text-[#415A77]">
                              {formatDate(order.order_date)}
                            </p>
                            <p className="text-sm mt-2">{order.items}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-[#0D1B2A]">
                              ₹{order.total_amount}
                            </p>
                            <span
                              className={`inline-block mt-1 px-2 py-1 rounded text-white text-xs ${getStatusColor(
                                order.order_status
                              )}`}
                            >
                              {order.order_status.charAt(0).toUpperCase() +
                                order.order_status.slice(1)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-[#415A77]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 mx-auto text-[#AAC7D8] mb-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                      />
                    </svg>
                    <p>You haven't placed any orders yet.</p>
                    <button
                      onClick={() => navigate("/products")}
                      className="mt-4 bg-[#1B263B] text-white py-2 px-4 rounded hover:bg-[#0D1B2A] transition-colors"
                    >
                      Start Shopping
                    </button>
                  </div>
                )}
              </div>

              {/* Profile Summary */}
              <div className="bg-white p-6 rounded-lg shadow-md border border-[#778DA9]">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-[#0D1B2A]">
                    Profile Summary
                  </h2>
                  <button
                    onClick={() => navigate("/profile")}
                    className="text-sm text-[#1B263B] hover:text-[#0D1B2A] font-medium"
                  >
                    Edit
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[#1B263B]">
                  <div>
                    <p className="text-sm text-[#415A77]">Full Name</p>
                    <p className="font-medium">
                      {user?.first_name} {user?.last_name}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-[#415A77]">Email</p>
                    <p className="font-medium">{user?.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-[#415A77]">Account Status</p>
                    <p className="font-medium">
                      <span className="inline-block px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                        Active
                      </span>
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-[#415A77]">Joined On</p>
                    <p className="font-medium">
                      {user?.created_at ? formatDate(user.created_at) : "—"}
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserDashboard;