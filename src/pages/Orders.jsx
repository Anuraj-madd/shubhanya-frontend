import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      navigate("/login");
    } else {
      setUser(storedUser);
      fetchOrders(storedUser.id);
    }
  }, [navigate]);

  const fetchOrders = async (userId) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.post("https://shubhanya-backend.onrender.com/fetch_orders.php", {
        user_id: userId,
      });
      
      console.log("Orders response:", response.data);
      
      if (Array.isArray(response.data)) {
        setOrders(response.data);
      } else if (response.data.orders && Array.isArray(response.data.orders)) {
        setOrders(response.data.orders);
      } else {
        console.error("Expected array but received:", response.data);
        setOrders([]);
        setError("Invalid order data received from server");
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError("Failed to load orders: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <>
      <Navbar />
      <div className="bg-[#F5F7FA] min-h-screen py-10 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">My Orders</h1>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              <p>{error}</p>
            </div>
          )}

          {loading ? (
            <div className="text-center py-12">
              <p className="text-xl">Loading your orders...</p>
            </div>
          ) : orders.length === 0 ? (
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <p className="text-xl mb-4">You haven't placed any orders yet</p>
              <Link
                to="/products"
                className="bg-[#1CC5DC] hover:bg-[#17b1c5] text-white font-semibold py-2 px-6 rounded transition duration-300"
              >
                Browse Products
              </Link>
            </div>
          ) : (
            <div className="space-y-8">
              {orders.map((order) => (
                <div
                  key={order.order_id}
                  className="bg-white rounded-lg shadow-md overflow-hidden border border-[#AAC7D8]"
                >
                  <div className="bg-[#E0E8F0] px-6 py-4 flex flex-col md:flex-row justify-between items-start md:items-center">
                    <div>
                      <p className="font-bold text-lg">Order #{order.order_id}</p>
                      <p className="text-sm text-[#415A77]">
                        Placed on {formatDate(order.order_date)}
                      </p>
                    </div>
                    <div className="mt-3 md:mt-0">
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium 
                        ${order.order_status === "delivered" ? "bg-green-100 text-green-800" : 
                          order.order_status === "shipped" ? "bg-blue-100 text-blue-800" : 
                          order.order_status === "cancelled" ? "bg-red-100 text-red-800" : 
                          "bg-yellow-100 text-yellow-800"}`}
                      >
                        {order.order_status.charAt(0).toUpperCase() + order.order_status.slice(1)}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    {/* Order Items Section */}
                    <h3 className="font-semibold text-lg mb-3">Items</h3>
                    <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
                      {order.items && Array.isArray(order.items) ? (
                        order.items.map((item, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-4 border-b pb-3"
                          >
                            <img
                              src={item.image ? `https://shubhanya-backend.onrender.com/uploads/${item.image}` : "https://via.placeholder.com/150?text=Product"}
                              alt={item.product_name}
                              className="w-16 h-16 object-contain rounded border"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "https://via.placeholder.com/150?text=No+Image";
                              }}
                            />
                            <div className="flex-grow">
                              <h4 className="font-medium">{item.product_name}</h4>
                              <p className="text-sm text-[#415A77]">
                                ₹{parseFloat(item.price).toFixed(2)} × {item.quantity}
                              </p>
                            </div>
                            <p className="font-medium">
                              ₹{(parseFloat(item.price) * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        ))
                      ) : (
                        <p>No items found for this order</p>
                      )}
                    </div>

                    {/* Shipping Details */}
                    <div className="mt-6 grid md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Shipping Address</h3>
                        <div className="bg-gray-50 p-3 rounded">
                          <p className="font-medium">{order.name}</p>
                          <p>{order.address1}</p>
                          {order.address2 && <p>{order.address2}</p>}
                          <p>{order.city}, {order.pincode}</p>
                          <p>Phone: {order.phone}</p>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Order Summary</h3>
                        <div className="bg-gray-50 p-3 rounded">
                          <div className="flex justify-between mb-1">
                            <span>Payment Method:</span>
                            <span className="font-medium">
                              {order.payment_mode === "cod" ? "Cash on Delivery" : "Online Payment"}
                            </span>
                          </div>
                          <div className="flex justify-between text-lg font-bold pt-3 border-t mt-2">
                            <span>Total:</span>
                            <span>₹{parseFloat(order.total_amount).toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Orders;