import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AdminOrderManager = () => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortField, setSortField] = useState("order_date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  
  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalType, setModalType] = useState("success"); // success or error

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("https://shubhanya-backend.onrender.com/adminorders.php");
      setOrders(res.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError("Failed to load orders. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    setIsProcessing(true);
    try {
      const res = await axios.post("https://shubhanya-backend.onrender.com/adminorders.php", {
        mode: "update_status",
        order_id: orderId,
        order_status: newStatus,
      });

      if (res.data.success) {
        setModalType("success");
        setModalMessage(`Order ${orderId} status changed to "${newStatus}"`);
        setShowModal(true);
        fetchOrders();
      } else {
        setModalType("error");
        setModalMessage(`Failed to update order status: ${res.data.message || "Unknown error"}`);
        setShowModal(true);
      }
    } catch (err) {
      console.error("Failed to update status:", err);
      setModalType("error");
      setModalMessage("An error occurred while updating status.");
      setShowModal(true);
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Filter + Search
  const filteredOrders = orders.filter((order) => {
    const matchesSearch = 
      (order.order_id && order.order_id.toLowerCase().includes(search.toLowerCase())) || 
      (order.name && order.name.toLowerCase().includes(search.toLowerCase())) ||
      (order.phone && order.phone.includes(search));
    
    const matchesStatus = statusFilter === "all" || order.order_status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Sorting
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    let aValue = a[sortField];
    let bValue = b[sortField];

    if (sortField === "order_date") {
      aValue = new Date(aValue);
      bValue = new Date(bValue);
    } else if (sortField === "total_amount") {
      aValue = parseFloat(aValue);
      bValue = parseFloat(bValue);
    } else {
      aValue = typeof aValue === "string" ? aValue.toLowerCase() : aValue;
      bValue = typeof bValue === "string" ? bValue.toLowerCase() : bValue;
    }

    return sortOrder === "asc" ? aValue > bValue ? 1 : -1 : aValue < bValue ? 1 : -1;
  });

  // Pagination
  const totalOrders = sortedOrders.length;
  const totalRevenue = sortedOrders.reduce(
    (sum, order) => sum + parseFloat(order.total_amount || 0),
    0
  );
  const indexOfLast = currentPage * ordersPerPage;
  const indexOfFirst = indexOfLast - ordersPerPage;
  const currentOrders = sortedOrders.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(sortedOrders.length / ordersPerPage);

  const handleSort = (field) => {
    if (field === sortField) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  // Modal component
  const Modal = ({ isOpen, onClose, message, type }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
        <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
          <div className="flex items-center mb-4">
            {type === "success" ? (
              <div className="bg-green-100 p-2 rounded-full mr-3">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
            ) : (
              <div className="bg-red-100 p-2 rounded-full mr-3">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </div>
            )}
            <h3 className="text-lg font-medium">
              {type === "success" ? "Success" : "Error"}
            </h3>
          </div>
          <p className="text-gray-700 mb-4">{message}</p>
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className={`px-4 py-2 rounded-lg text-white ${
                type === "success" ? "bg-[#1CC5DC] hover:bg-[#19b3c7]" : "bg-red-500 hover:bg-red-600"
              } transition`}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Loading overlay component
  const LoadingOverlay = ({ message }) => (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl flex flex-col items-center">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-[#E0E1DD] rounded-full"></div>
          <div className="w-16 h-16 border-t-4 border-[#1CC5DC] animate-spin rounded-full absolute left-0 top-0"></div>
        </div>
        <p className="mt-4 text-lg font-medium text-[#1B263B]">{message}</p>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-[#F5F7FA] text-[#1B1B1B]">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-6">Order Management</h1>

        {/* Filters and summary */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by Order ID, Name or Phone"
            className="w-full md:w-1/3 px-4 py-2 border border-[#415A77] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1CC5DC]"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full md:w-1/4 px-4 py-2 border border-[#415A77] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1CC5DC]"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <div className="w-full md:w-auto flex flex-col md:flex-row items-center gap-4 text-sm">
            <div className="font-medium">
              Total Orders: <span className="text-[#1B263B] font-semibold">{totalOrders}</span>
            </div>
            <div className="font-medium">
              Total Revenue:{" "}
              <span className="text-[#1CC5DC] font-semibold">₹{totalRevenue.toFixed(2)}</span>
            </div>
            <button 
              onClick={fetchOrders}
              className="px-4 py-2 bg-[#1CC5DC] text-white rounded-lg hover:bg-[#19b3c7] transition"
              disabled={isLoading}
            >
              {isLoading ? "Refreshing..." : "Refresh"}
            </button>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Main content with loading state */}
        <div className="relative">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="text-center">
                <div className="inline-block w-16 h-16 border-4 border-[#E0E1DD] rounded-full relative">
                  <div className="absolute inset-0 border-t-4 border-[#1CC5DC] rounded-full animate-spin"></div>
                </div>
                <p className="mt-4 text-lg font-medium text-[#1B263B]">Loading orders...</p>
              </div>
            </div>
          ) : (
            <>
              {/* Orders Table */}
              <div className="overflow-x-auto">
                <table className="min-w-full table-auto border-separate border-spacing-0 bg-white shadow-md rounded-lg">
                  <thead className="bg-[#1B263B] text-white">
                    <tr>
                      {[ 
                        { label: "Order ID", field: "order_id" },
                        { label: "Customer", field: "name" },
                        { label: "Items", field: "" },
                        { label: "Total", field: "total_amount" },
                        { label: "Address", field: "city" },
                        { label: "Phone", field: "phone" },
                        { label: "Payment", field: "payment_mode" },
                        { label: "Status", field: "order_status" },
                        { label: "Date", field: "order_date" },
                      ].map(({ label, field }) => (
                        <th
                          key={label}
                          className="px-6 py-4 text-sm font-semibold text-left cursor-pointer select-none hover:bg-[#415A77] hover:text-white border-b border-[#E0E1DD]"
                          onClick={() => field && handleSort(field)}
                        >
                          {label}
                          {field === sortField && (
                            <span className="ml-1">{sortOrder === "asc" ? "▲" : "▼"}</span>
                          )}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {currentOrders.length > 0 ? (
                      currentOrders.map((order) => (
                        <tr key={order.id} className="text-sm hover:bg-[#f1f5f9]">
                          <td className="px-6 py-3 border-b border-[#E0E1DD]">{order.order_id}</td>
                          <td className="px-6 py-3 border-b border-[#E0E1DD]">
                            <div>{order.name}</div>
                            <div className="text-xs text-gray-500">ID: {order.user_id}</div>
                          </td>
                          <td className="px-6 py-3 border-b border-[#E0E1DD]">
                            {order.items && order.items.map((item, index) => (
                              <div key={index} className="mb-1 last:mb-0">
                                {item.product_name} (×{item.quantity}) - ₹{parseFloat(item.price).toFixed(2)}
                              </div>
                            ))}
                          </td>
                          <td className="px-6 py-3 border-b border-[#E0E1DD]">₹{parseFloat(order.total_amount).toFixed(2)}</td>
                          <td className="px-6 py-3 border-b border-[#E0E1DD]">
                            {order.address1}, {order.address2 && `${order.address2}, `}{order.city} - {order.pincode}
                          </td>
                          <td className="px-6 py-3 border-b border-[#E0E1DD]">{order.phone}</td>
                          <td className="px-6 py-3 border-b border-[#E0E1DD] capitalize">{order.payment_mode}</td>
                          <td className="px-6 py-3 border-b border-[#E0E1DD]">
                            <select
                              value={order.order_status}
                              onChange={(e) => handleStatusChange(order.order_id, e.target.value)}
                              className="border border-[#415A77] text-sm rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-[#1CC5DC]"
                              style={{
                                backgroundColor: 
                                  order.order_status === 'delivered' ? '#dcfce7' :
                                  order.order_status === 'cancelled' ? '#fee2e2' :
                                  order.order_status === 'shipped' ? '#dbeafe' :
                                  order.order_status === 'processing' ? '#fef9c3' : '#ffffff'
                              }}
                              disabled={isProcessing}
                            >
                              {["pending", "processing", "shipped", "delivered", "cancelled"].map(
                                (status) => (
                                  <option key={status} value={status}>
                                    {status.charAt(0).toUpperCase() + status.slice(1)}
                                  </option>
                                )
                              )}
                            </select>
                          </td>
                          <td className="px-6 py-3 border-b border-[#E0E1DD]">
                            {new Date(order.order_date).toLocaleString()}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="9" className="text-center p-4 text-[#778DA9]">
                          No orders found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center mt-6 gap-2">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                    className="px-6 py-3 bg-[#415A77] text-white rounded-lg disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <span className="text-sm">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    className="px-6 py-3 bg-[#415A77] text-white rounded-lg disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <Footer />
      
      {/* Processing overlay */}
      {isProcessing && <LoadingOverlay message="Updating order status..." />}
      
      {/* Status update modal */}
      <Modal 
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        message={modalMessage}
        type={modalType}
      />
    </div>
  );
};

export default AdminOrderManager;