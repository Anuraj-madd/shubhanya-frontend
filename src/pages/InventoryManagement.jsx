import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Register chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const InventoryManagement = () => {
  const navigate = useNavigate();
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch inventory data from the backend
    const fetchInventory = async () => {
      try {
        const response = await fetch("https://shubhanya-backend.onrender.com/inventory.php");
        const data = await response.json();
        setInventory(data);
      } catch (error) {
        console.error("Error fetching inventory data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, []);

  // Prepare data for the chart
  const chartData = {
    labels: inventory.map((item) => item.name), // Product names as labels
    datasets: [
      {
        label: "Stock Levels",
        data: inventory.map((item) => item.stock), // Stock levels as data
        backgroundColor: "rgba(29, 151, 255, 0.6)",
        borderColor: "rgba(29, 151, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Chart options to improve readability and appearance
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Allow custom height for the chart
    plugins: {
      title: {
        display: true,
        text: 'Product Stock Levels',
        font: {
          size: 20,
          weight: 'bold',
        },
        color: '#0D1B2A',
      },
      tooltip: {
        backgroundColor: '#1B263B',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#1CC5DC',
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        ticks: {
          maxRotation: 45, // Rotate X-axis labels
          minRotation: 30,
          font: {
            size: 12,
          },
        },
      },
      y: {
        ticks: {
          font: {
            size: 12,
          },
        },
      },
    },
  };

  if (loading) {
    return (
      <div className="text-center py-10">
        <p>Loading inventory...</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="bg-[#F5F7FA] min-h-screen py-10 px-4 md:px-8 text-[#1B1B1B]">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-10 text-[#0D1B2A]">
            Inventory Management
          </h1>

          {/* Chart */}
          <div className="mb-10 bg-white p-6 rounded-lg shadow-md border border-[#778DA9]">
            <h2 className="text-2xl font-semibold text-[#0D1B2A] mb-4">Stock Levels Chart</h2>
            <div className="relative h-80"> {/* Fixed height for the chart */}
              <Bar data={chartData} options={chartOptions} />
            </div>
          </div>

          <div className="overflow-x-auto bg-white rounded-lg shadow-md border border-[#778DA9]">
            <table className="min-w-full table-auto border border-[#778DA9]">
              <thead className="bg-[#DFEBF6]">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-[#0D1B2A] border border-[#778DA9]">
                    Product Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-[#0D1B2A] border border-[#778DA9]">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-[#0D1B2A] border border-[#778DA9]">
                    Stock Level
                  </th>
                </tr>
              </thead>
              <tbody>
                {inventory.map((item) => (
                  <tr key={item.id} className="bg-white">
                    <td className="px-6 py-4 text-sm text-[#415A77] border border-[#778DA9]">
                      {item.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-[#415A77] border border-[#778DA9]">
                      {item.description}
                    </td>
                    <td className="px-6 py-4 text-sm text-[#415A77] border border-[#778DA9]">
                      {/* Stock Level - Not updatable */}
                      <span>{item.stock}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default InventoryManagement;
