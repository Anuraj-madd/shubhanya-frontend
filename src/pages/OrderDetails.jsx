import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Hook to get query parameters from the URL
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const OrderDetails = () => {
  const query = useQuery();
  const orderId = query.get("id"); // Gets ?id=123 from the URL

  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(`https://shubhanya-backend.onrender.com/sales.php?id=${orderId}`);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        if (data.error) {
          setModalContent(data.error);
          setShowModal(true);
        } else {
          setOrderDetails(data);
        }
      } catch (error) {
        console.error("Error fetching order details:", error);
        setModalContent("Failed to load order details. Please try again later.");
        setShowModal(true);
      } finally {
        setLoading(false);
      }
    };

    if (orderId) {
      fetchOrderDetails();
    } else {
      setLoading(false);
      setModalContent("Order ID is missing in the URL.");
      setShowModal(true);
    }
  }, [orderId]);

  // Modal component
  const Modal = ({ show, onClose, children }) => {
    if (!show) return null;
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
          <div className="mb-4">{children}</div>
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="bg-[#1CC5DC] text-white px-4 py-2 rounded hover:bg-[#19B2C8] transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <div className="bg-[#F5F7FA] min-h-screen py-10 px-4 md:px-8 text-[#1B1B1B]">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md border border-[#778DA9] p-6">
          <h1 className="text-2xl font-bold text-[#0D1B2A] mb-6">Order Details</h1>

          {loading ? (
            <div className="text-center py-10">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#1CC5DC] mx-auto mb-4"></div>
              <p className="text-[#415A77]">Loading order details...</p>
            </div>
          ) : orderDetails ? (
            <>
              <div className="mb-6">
                <p><span className="font-semibold text-[#0D1B2A]">Order ID:</span> {orderDetails.order_id}</p>
                {/* <p><span className="font-semibold text-[#0D1B2A]">Date:</span> {orderDetails.date}</p> */}
                {/* <p><span className="font-semibold text-[#0D1B2A]">Total Sales:</span> ₹{parseFloat(orderDetails.sales).toFixed(2)}</p> */}
              </div>

              <h2 className="text-xl font-semibold text-[#0D1B2A] mb-4">Items:</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full table-auto text-sm">
                  <thead className="bg-[#F0F4F8]">
                    <tr>
                      <th className="px-4 py-2 text-left">Product</th>
                      <th className="px-4 py-2 text-left">Qty</th>
                      <th className="px-4 py-2 text-left">Price</th>
                      <th className="px-4 py-2 text-left">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderDetails.items && orderDetails.items.length > 0 ? (
                      orderDetails.items.map((item, index) => (
                        <tr key={index} className="border-t border-[#E6E6E6]">
                          <td className="px-4 py-2 text-[#415A77]">{item.product_name}</td>
                          <td className="px-4 py-2 text-[#415A77]">{item.quantity}</td>
                          <td className="px-4 py-2 text-[#415A77]">₹{parseFloat(item.price).toFixed(2)}</td>
                          <td className="px-4 py-2 text-[#415A77]">₹{(item.quantity * item.price).toFixed(2)}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="px-4 py-4 text-center text-gray-500">No items found for this order.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <p className="text-center text-gray-500">No order details found.</p>
          )}
        </div>
      </div>

      {/* Error Modal */}
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <h3 className="text-xl font-semibold text-[#0D1B2A] mb-2">Notification</h3>
        <p>{modalContent}</p>
      </Modal>

      <Footer />
    </>
  );
};

export default OrderDetails;
