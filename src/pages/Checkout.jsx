import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Checkout = () => {
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    address1: "",
    address2: "",
    city: "",
    pincode: "",
    phone: "",
    paymentMode: "cod",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  
  // New state for order confirmation modal
  const [orderConfirmation, setOrderConfirmation] = useState({
    show: false,
    orderId: "",
    orderDate: ""
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) navigate("/login");
    else {
      setUser(storedUser);
      setFormData((prev) => ({
        ...prev,
        name: storedUser.name || "",
        phone: storedUser.phone || "",
      }));
    }

    // Fetch cart items if user exists
    if (storedUser?.id) {
      fetchCart(storedUser.id);
    }
  }, [navigate]);

  const fetchCart = async (userId) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.post("https://shubhanya-backend.onrender.com/cart.php", {
        mode: "fetch",
        user_id: userId,
      });
      console.log("Fetched cart data:", response.data);
      
      // Make sure response.data is an array
      if (Array.isArray(response.data)) {
        setCartItems(response.data);
      } else {
        console.error("Expected array but received:", response.data);
        setCartItems([]);
        setError("Invalid cart data received from server");
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
      setError("Failed to load cart items: " + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user makes changes
    setError(null);
  };

  // Calculate the final price (price including tax)
  const getSubtotal = () =>
    cartItems.reduce(
      (total, item) =>
        total + parseFloat(item.price) * parseInt(item.quantity),
      0
    );

  // Calculate price before tax (final price / 1.18)
  const subtotalBeforeTax = getSubtotal() / 1.18;
  
  // Calculate tax (18% of price before tax)
  const tax = subtotalBeforeTax * 0.18;
  
  // Calculate shipping fee
  const shippingFee = subtotalBeforeTax < 199 ? 40 : 0;
  
  // Calculate final total
  const total = subtotalBeforeTax + tax + shippingFee;

  const validateForm = () => {
    if (!formData.name || !formData.address1 || !formData.city || !formData.pincode || !formData.phone) {
      setError("Please fill in all required fields");
      return false;
    }
    
    if (cartItems.length === 0) {
      setError("Your cart is empty");
      return false;
    }
    
    return true;
  };

  const handleOnlinePayment = () => {
    if (!validateForm()) return;
    setShowPaymentModal(true);
  };

  const handleCODCheckout = async () => {
    if (!user) {
      alert("Please log in to complete your order");
      navigate("/login");
      return;
    }

    // Validation
    if (!validateForm()) return;

    setLoading(true);
    setError(null);
    
    const orderData = {
      user_id: user.id,
      cartItems: cartItems,
      formData: {
        name: formData.name,
        phone: formData.phone,
        address1: formData.address1,
        address2: formData.address2 || "",
        city: formData.city,
        pincode: formData.pincode,
        paymentMode: formData.paymentMode,
      },
    };

    console.log("Sending order data:", JSON.stringify(orderData));

    try {
      const response = await axios.post(
        "https://shubhanya-backend.onrender.com/orders.php",
        orderData
      );

      console.log("Order response:", response.data);

      if (response.data.status === "success") {
        // Show confirmation modal instead of alert
        setOrderConfirmation({
          show: true,
          orderId: response.data.order_id,
          orderDate: response.data.order_date || new Date().toLocaleString()
        });
      } else {
        setError("Failed to place order: " + response.data.message);
      }
    } catch (error) {
      console.error("Checkout error:", error);
      setError(
        "Failed to place order: " + 
        (error.response?.data?.message || error.message || "Unknown error")
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCheckout = () => {
    if (formData.paymentMode === "online") {
      handleOnlinePayment();
    } else {
      handleCODCheckout();
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Loading spinner component with animation
  const LoadingSpinner = () => (
    <div className="fixed inset-0 bg-white bg-opacity-80 flex flex-col items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-[#E0E7FF] rounded-full"></div>
          <div className="w-16 h-16 border-4 border-t-[#1CC5DC] border-r-transparent border-b-transparent border-l-transparent rounded-full absolute top-0 left-0 animate-spin"></div>
        </div>
        <div className="mt-6 text-center">
          <h3 className="text-xl font-semibold text-gray-800">Processing Order</h3>
          <p className="text-gray-600 mt-2">Please wait while we confirm your payment and process your order...</p>
          
          <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
            <div className="bg-[#1CC5DC] h-2 rounded-full animate-pulse"></div>
          </div>
          
          <div className="mt-4 grid grid-cols-3 gap-4 text-xs text-gray-500">
            <div className="flex flex-col items-center">
              <div className="w-6 h-6 bg-[#1CC5DC] text-white rounded-full flex items-center justify-center mb-1">1</div>
              <span>Verifying</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-6 h-6 bg-gray-300 text-white rounded-full flex items-center justify-center mb-1">2</div>
              <span>Processing</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-6 h-6 bg-gray-300 text-white rounded-full flex items-center justify-center mb-1">3</div>
              <span>Confirming</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Payment coming soon modal
  const PaymentComingSoonModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h3 className="text-xl font-bold mb-4">Online Payment Coming Soon</h3>
        <p className="mb-6">
          We're currently working on implementing online payment options. For now, please use Cash on Delivery (COD) to complete your purchase.
        </p>
        <div className="flex justify-end">
          <button
            onClick={() => setShowPaymentModal(false)}
            className="bg-[#1CC5DC] hover:bg-[#17b1c5] text-white font-semibold py-2 px-6 rounded transition duration-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );

  // Updated Order confirmation modal with improved mobile responsiveness
  const OrderConfirmationModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg w-full max-w-lg">
        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mt-4">Order Confirmed!</h2>
          <p className="text-gray-600 mt-1">Thank you for your purchase</p>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-md mb-6">
          {/* Changed from grid to flex layout for better mobile display */}
          <div className="flex flex-col space-y-4">
            <div>
              <p className="text-sm text-gray-500">Order ID</p>
              <p className="font-semibold text-gray-800 break-all">{orderConfirmation.orderId}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Order Date</p>
              <p className="font-semibold text-gray-800">{formatDate(orderConfirmation.orderDate)}</p>
            </div>
          </div>
        </div>
        
        <p className="text-gray-600 text-center mb-6 text-sm md:text-base">
          A confirmation email has been sent to your registered email address with all the order details.
        </p>
        
        <div className="flex flex-col md:flex-row gap-3">
          <button
            onClick={() => navigate("/orders")}
            className="w-full bg-[#1CC5DC] hover:bg-[#17b1c5] text-white font-semibold py-3 rounded transition duration-300"
          >
            View My Orders
          </button>
          <button
            onClick={() => navigate("/products")}
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 rounded transition duration-300"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Navbar />
      <div className="bg-[#F5F7FA] min-h-screen py-10 px-4 md:px-8 text-[#1B1B1B]">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Checkout</h1>
          
          {/* Error message display */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              <p>{error}</p>
            </div>
          )}
          
          {loading ? (
            <LoadingSpinner />
          ) : cartItems.length === 0 ? (
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <p className="text-xl">Your cart is empty</p>
              <button 
                onClick={() => navigate("/products")}
                className="mt-4 bg-[#1CC5DC] hover:bg-[#17b1c5] text-white font-semibold py-2 px-6 rounded transition duration-300"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Shipping Form */}
              <div className="bg-white p-6 rounded-lg shadow-md border border-[#778DA9]">
                <h2 className="text-2xl font-bold mb-4">Shipping Information</h2>
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  {[
                    { label: "Full Name*", name: "name", type: "text" },
                    { label: "Address Line 1*", name: "address1", type: "text" },
                    { label: "Address Line 2", name: "address2", type: "text" },
                    { label: "City*", name: "city", type: "text" },
                    { label: "Pincode*", name: "pincode", type: "text" },
                    { label: "Phone Number*", name: "phone", type: "tel" },
                  ].map((field) => (
                    <div key={field.name}>
                      <label className="block mb-1 font-medium">{field.label}</label>
                      <input
                        type={field.type}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleInputChange}
                        className={`w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#1CC5DC] ${
                          field.label.includes("*") && !formData[field.name] 
                            ? "border-red-400" 
                            : "border-[#AAC7D8]"
                        }`}
                        required={field.label.includes("*")}
                      />
                    </div>
                  ))}

                  <div>
                    <label className="block mb-1 font-medium">Payment Mode</label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="paymentMode"
                          value="cod"
                          checked={formData.paymentMode === "cod"}
                          onChange={handleInputChange}
                        />
                        Pay on Delivery
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="paymentMode"
                          value="online"
                          checked={formData.paymentMode === "online"}
                          onChange={handleInputChange}
                        />
                        Pay Online
                        <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-0.5 rounded">Coming Soon</span>
                      </label>
                    </div>
                  </div>
                </form>
              </div>

              {/* Order Summary */}
              <div className="bg-white p-6 rounded-lg shadow-md border border-[#778DA9]">
                <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
                <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 border-b pb-3"
                    >
                      <img
                        src={`https://shubhanya-backend.onrender.com/uploads/${item.image}`}
                        alt={item.name}
                        className="w-20 h-20 object-contain rounded border"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://via.placeholder.com/150?text=No+Image";
                        }}
                      />
                      <div className="flex-grow">
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-sm text-[#415A77]">
                          ₹{parseFloat(item.price).toFixed(2)} × {item.quantity}
                        </p>
                      </div>
                      <p className="font-semibold">
                        ₹{(parseFloat(item.price) * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 space-y-2 text-sm text-[#44576D] border-t pt-4">
                  <div className="flex justify-between">
                    <span>Price (Before Tax):</span>
                    <span>₹{subtotalBeforeTax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (18% GST):</span>
                    <span>₹{tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping Fee:</span>
                    <span>₹{shippingFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold pt-3 border-t border-dashed mt-2">
                    <span>Total:</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  className="w-full mt-6 bg-[#1CC5DC] hover:bg-[#17b1c5] text-white font-semibold py-3 rounded transition duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  onClick={handleCheckout}
                  disabled={loading || cartItems.length === 0}
                >
                  {loading ? "Processing..." : formData.paymentMode === "cod"
                    ? "Place Order (COD)"
                    : "Proceed to Payment"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Coming Soon Modal */}
      {showPaymentModal && <PaymentComingSoonModal />}
      
      {/* Order Confirmation Modal */}
      {orderConfirmation.show && <OrderConfirmationModal />}
      
      <Footer />
    </>
  );
};

export default Checkout;