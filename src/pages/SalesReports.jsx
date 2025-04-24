import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

// Register the necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const SalesReports = () => {
  const navigate = useNavigate();
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");

  useEffect(() => {
    // Fetch sales data from the backend
    const fetchSalesData = async () => {
      try {
        const response = await fetch("https://shubhanya-backend.onrender.com/sales.php");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setSalesData(data);
      } catch (error) {
        console.error("Error fetching sales data:", error);
        setError("Failed to load sales data. Please try again later.");
        setModalContent("Failed to load sales data. Please try again later.");
        setShowModal(true);
      } finally {
        setLoading(false);
      }
    };

    fetchSalesData();
  }, []);

  // Group sales data by date to avoid duplicates in chart
  const groupedSalesData = salesData.reduce((acc, item) => {
    const existingItem = acc.find(entry => entry.date === item.date);
    if (existingItem) {
      existingItem.sales = (parseFloat(existingItem.sales) + parseFloat(item.sales)).toFixed(2);
      existingItem.orders = parseInt(existingItem.orders) + parseInt(item.orders);
    } else {
      acc.push({ ...item });
    }
    return acc;
  }, []);

  // Sort by date ascending for the chart
  const sortedDataForChart = [...groupedSalesData].sort((a, b) => new Date(a.date) - new Date(b.date));

  // Prepare data for the sales chart
  const chartData = {
    labels: sortedDataForChart.map(item => item.date),
    datasets: [
      {
        label: "Sales (₹)",
        data: sortedDataForChart.map(item => parseFloat(item.sales)),
        fill: false,
        borderColor: "#1CC5DC",
        tension: 0.1,
      },
    ],
  };

  // Sales Summary Data
  const totalSales = salesData.reduce((acc, item) => acc + parseFloat(item.sales), 0).toFixed(2);
  const uniqueOrdersCount = new Set(salesData.map(item => item.order_id)).size;
  const avgOrderValue = uniqueOrdersCount ? (totalSales / uniqueOrdersCount).toFixed(2) : "0.00";

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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F5F7FA]">
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1CC5DC] mx-auto mb-4"></div>
          <p className="text-lg text-[#0D1B2A]">Loading sales reports...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="bg-[#F5F7FA] min-h-screen py-10 px-4 md:px-8 text-[#1B1B1B]">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-10 text-[#0D1B2A]">Sales Reports</h1>

          {/* Sales Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            <div className="bg-white p-6 rounded-lg shadow-md border border-[#778DA9] text-center">
              <h3 className="text-xl font-semibold text-[#0D1B2A]">Total Sales</h3>
              <p className="text-3xl font-bold text-[#1B263B]">₹{totalSales}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border border-[#778DA9] text-center">
              <h3 className="text-xl font-semibold text-[#0D1B2A]">Total Orders</h3>
              <p className="text-3xl font-bold text-[#1B263B]">{uniqueOrdersCount}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border border-[#778DA9] text-center">
              <h3 className="text-xl font-semibold text-[#0D1B2A]">Average Order Value</h3>
              <p className="text-3xl font-bold text-[#1B263B]">₹{avgOrderValue}</p>
            </div>
          </div>

          {/* Sales Trend Chart */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-[#778DA9] mb-10">
            <h3 className="text-2xl font-semibold text-[#0D1B2A] mb-6">Sales Trend Over Time</h3>
            {sortedDataForChart.length > 0 ? (
              <Line 
                data={chartData} 
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'top',
                    },
                    tooltip: {
                      callbacks: {
                        label: function(context) {
                          return `Sales: ₹${context.raw}`;
                        }
                      }
                    }
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      ticks: {
                        callback: function(value) {
                          return '₹' + value;
                        }
                      }
                    }
                  }
                }}
              />
            ) : (
              <p className="text-center py-10 text-gray-500">No sales data available to display chart</p>
            )}
          </div>

          {/* Sales Table */}
          <div className="overflow-x-auto bg-white rounded-lg shadow-md border border-[#778DA9]">
            <table className="min-w-full table-auto">
              <thead className="bg-[#F0F4F8]">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-[#0D1B2A]">Date</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-[#0D1B2A]">Order ID</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-[#0D1B2A]">Sales</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-[#0D1B2A]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {salesData.length > 0 ? (
                  salesData.map((item) => (
                    <tr key={item.id} className="border-t border-[#E6E6E6] hover:bg-[#F9FAFB]">
                      <td className="px-6 py-4 text-sm text-[#415A77]">{item.date}</td>
                      <td className="px-6 py-4 text-sm text-[#415A77]">{item.order_id}</td>
                      <td className="px-6 py-4 text-sm text-[#415A77]">₹{parseFloat(item.sales).toFixed(2)}</td>
                      <td className="px-6 py-4 text-sm">
                        <button
                          onClick={() => navigate(`/admin/reports/details/?id=${item.order_id}`)}
                          className="bg-[#1CC5DC] text-white px-3 py-1 rounded hover:bg-[#19B2C8] transition-colors"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="px-6 py-4 text-center text-gray-500">No sales data available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
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

export default SalesReports;