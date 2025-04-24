import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const adminFeatures = [
  {
    title: "Manage Products",
    description: "Add, update, and delete products",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 10h2l1 9h12l1-9h2M5 6h14v4H5z"
      />
    ),
    route: "/admin/products",
  },
  {
    title: "Manage Orders",
    description: "View and process customer orders",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 17v-6h13v6m-6-6V5a2 2 0 00-4 0v6"
      />
    ),
    route: "/admin/orders",
  },
  {
    title: "Manage Users",
    description: "See and edit registered users",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17 20h5v-2a4 4 0 00-4-4h-1M9 20h6M4 6h16M4 10h16M4 14h16M4 18h6"
      />
    ),
    route: "/admin/users",
  },
  {
    title: "Inventory Management",
    description: "Track stock levels & availability",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 3h18v18H3V3z"
      />
    ),
    route: "/admin/inventory",
  },
  {
    title: "Sales Reports",
    description: "Analyze sales trends & performance",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 3v18h18M9 17l3-3 4 4M13 13l3-3"
      />
    ),
    route: "/admin/reports",
  },
  {
    title: "Post Announcements",
    description: "Display notices for users",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 19V6h13v13H9zM5 9H2v6h3"
      />
    ),
    route: "/admin/announcements",
  },
  {
    title: "Manage Profile",
    description: "Update admin profile details",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 14c-1.5 0-3-1.5-3-3s1.5-3 3-3 3 1.5 3 3-1.5 3-3 3zM12 2v2M12 20v2m-6-6h12"
      />
    ),
    route: "/admin/profile",
  }
];

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="bg-[#F5F7FA] min-h-screen py-10 px-4 md:px-8 text-[#1B1B1B]">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-10 text-[#0D1B2A]">
            Welcome Admin!
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {adminFeatures.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md border border-[#778DA9] hover:bg-[#DFEBF6] transition-colors cursor-pointer relative overflow-hidden"
                onClick={() => navigate(feature.route)}
              >
                <div className="absolute top-0 right-0 w-20 h-20 transform translate-x-8 -translate-y-8 bg-[#DFEBF6] rounded-full" />
                <div className="relative z-10">
                  <div className="bg-[#DFEBF6] inline-block p-3 rounded-lg mb-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-[#1B263B]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      {feature.icon}
                    </svg>
                  </div>
                  <h2 className="text-xl font-semibold text-[#0D1B2A]">
                    {feature.title}
                  </h2>
                  <p className="text-sm text-[#415A77] mt-1">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminDashboard;
