import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AdminUserManager = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");
  const [isLoading, setIsLoading] = useState(false);

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(""); // success, error, confirm
  const [modalMessage, setModalMessage] = useState("");
  const [pendingAction, setPendingAction] = useState(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get("https://shubhanya-backend.onrender.com/adminusers.php");
      setUsers(res.data);
      setIsLoading(false);
    } catch (err) {
      console.error("Error fetching users:", err);
      showErrorModal("Failed to load users. Please try again.");
      setIsLoading(false);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      setIsLoading(true);
      await axios.post("https://shubhanya-backend.onrender.com/adminusers.php", {
        mode: "update_role",
        user_id: userId,
        role: newRole,
      });
      await fetchUsers();
      showSuccessModal("User role updated successfully!");
    } catch (err) {
      console.error("Failed to update user role:", err);
      showErrorModal("Failed to update user role. Please try again.");
      setIsLoading(false);
    }
  };

  const confirmDelete = (userId) => {
    setPendingAction(() => () => handleDelete(userId));
    setModalType("confirm");
    setModalMessage(
      "Are you sure you want to delete this user? This action cannot be undone."
    );
    setShowModal(true);
  };

  const handleDelete = async (userId) => {
    try {
      setIsLoading(true);
      await axios.post("https://shubhanya-backend.onrender.com/adminusers.php", {
        mode: "delete_user",
        user_id: userId,
      });
      await fetchUsers();
      showSuccessModal("User deleted successfully!");
    } catch (err) {
      console.error("Failed to delete user:", err);
      showErrorModal("Failed to delete user. Please try again.");
      setIsLoading(false);
    }
  };

  const showSuccessModal = (message) => {
    setModalType("success");
    setModalMessage(message);
    setShowModal(true);
    setTimeout(() => setShowModal(false), 3000);
  };

  const showErrorModal = (message) => {
    setModalType("error");
    setModalMessage(message);
    setShowModal(true);
  };

  const handleSort = (field) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(order);
  };

  // Filter + sort + pagination
  const filteredUsers = users.filter(
    (user) =>
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.id.toString().includes(search)
  );

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    const valA = a[sortField];
    const valB = b[sortField];
    if (sortField === "created_at") {
      return sortOrder === "asc"
        ? new Date(valA) - new Date(valB)
        : new Date(valB) - new Date(valA);
    } else if (typeof valA === "string") {
      return sortOrder === "asc"
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA);
    } else {
      return sortOrder === "asc" ? valA - valB : valB - valA;
    }
  });

  const totalPages = Math.ceil(sortedUsers.length / usersPerPage);
  const paginatedUsers = sortedUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#F5F7FA] text-[#1B1B1B]">
      <Navbar />
      <main className="flex-grow container mx-auto max-w-7xl px-6 py-10">
        <h1 className="text-4xl font-extrabold text-center mb-10 tracking-wide">
          User Management
        </h1>

        {/* Search Input */}
        <div className="max-w-md mx-auto mb-8 relative">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"
              />
            </svg>
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search by Email or User ID"
            className="w-full pl-14 pr-5 py-3 border border-[#415A77] rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1CC5DC] focus:border-[#1CC5DC] transition"
            aria-label="Search users by email or ID"
          />
        </div>

        {/* User Table */}
        <div className="bg-white rounded-xl shadow-lg border border-[#E0E1DD] overflow-x-auto">
          <table className="min-w-full divide-y divide-[#E0E1DD]">
            <thead className="bg-[#1B263B] text-white">
              <tr>
                {[
                  { label: "User ID", field: "id" },
                  { label: "Name" },
                  { label: "Email" },
                  { label: "Role", field: "role" },
                  { label: "Join Date", field: "created_at" },
                  { label: "Actions" },
                ].map((col) => (
                  <th
                    key={col.label}
                    onClick={() => col.field && handleSort(col.field)}
                    className={`px-6 py-4 text-left text-sm font-semibold cursor-pointer select-none ${
                      col.field ? "hover:bg-[#273B5A]" : ""
                    }`}
                    scope="col"
                    aria-sort={
                      sortField === col.field
                        ? sortOrder === "asc"
                          ? "ascending"
                          : "descending"
                        : "none"
                    }
                  >
                    <div className="flex items-center space-x-1">
                      <span>{col.label}</span>
                      {sortField === col.field && (
                        <span aria-hidden="true" className="text-xs">
                          {sortOrder === "asc" ? "▲" : "▼"}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-[#E0E1DD]">
              {paginatedUsers.length > 0 ? (
                paginatedUsers.map((user, idx) => (
                  <tr
                    key={user.id}
                    className={`text-sm ${
                      idx % 2 === 0 ? "bg-[#FAFBFC]" : "bg-white"
                    } hover:bg-[#E6F7FF] transition-colors`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap font-mono text-[#415A77]">
                      {user.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium">
                      {user.first_name} {user.last_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-[#778DA9] truncate max-w-xs">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap capitalize">
                      <select
                        value={user.role}
                        onChange={(e) =>
                          handleRoleChange(user.id, e.target.value)
                        }
                        className="w-full border border-[#415A77] rounded-md bg-[#E6E6E6] text-[#1B1B1B] py-1 px-2 focus:outline-none focus:ring-1 focus:ring-[#1CC5DC] transition"
                        aria-label={`Change role for user ${user.first_name} ${user.last_name}`}
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-[#415A77]">
                      {new Date(user.created_at).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => confirmDelete(user.id)}
                        className="bg-[#9F2BEE] text-white px-4 py-2 rounded-lg shadow-md hover:bg-[#7d1a9f] focus:outline-none focus:ring-2 focus:ring-[#7d1a9f] transition"
                        aria-label={`Delete user ${user.first_name} ${user.last_name}`}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-12 text-[#778DA9] italic font-light"
                  >
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 0 && (
          <nav
            className="flex justify-center items-center gap-3 mt-8"
            aria-label="Pagination Navigation"
          >
            <button
              onClick={() => goToPage(1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-[#415A77] text-white rounded-md disabled:opacity-50 hover:bg-[#273B5A] transition"
              aria-disabled={currentPage === 1}
              aria-label="Go to first page"
            >
              First
            </button>
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-[#415A77] text-white rounded-md disabled:opacity-50 hover:bg-[#273B5A] transition"
              aria-disabled={currentPage === 1}
              aria-label="Go to previous page"
            >
              Prev
            </button>

            {Array.from({ length: Math.min(5, totalPages) }, (_, idx) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = idx + 1;
              } else if (currentPage <= 3) {
                pageNum = idx + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + idx;
              } else {
                pageNum = currentPage - 2 + idx;
              }

              return (
                <button
                  key={pageNum}
                  onClick={() => goToPage(pageNum)}
                  className={`px-4 py-2 rounded-md transition-colors font-semibold ${
                    pageNum === currentPage
                      ? "bg-[#1CC5DC] text-white shadow-lg"
                      : "bg-gray-200 text-[#1B1B1B] hover:bg-gray-300"
                  }`}
                  aria-current={pageNum === currentPage ? "page" : undefined}
                  aria-label={`Go to page ${pageNum}`}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-[#415A77] text-white rounded-md disabled:opacity-50 hover:bg-[#273B5A] transition"
              aria-disabled={currentPage === totalPages}
              aria-label="Go to next page"
            >
              Next
            </button>
            <button
              onClick={() => goToPage(totalPages)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-[#415A77] text-white rounded-md disabled:opacity-50 hover:bg-[#273B5A] transition"
              aria-disabled={currentPage === totalPages}
              aria-label="Go to last page"
            >
              Last
            </button>
          </nav>
        )}
      </main>
      <Footer />

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-2xl flex flex-col items-center space-y-4">
            <div className="w-14 h-14 border-4 border-[#1CC5DC] border-t-transparent rounded-full animate-spin"></div>
            <p className="text-[#1B1B1B] font-medium text-lg">Processing...</p>
          </div>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white p-8 rounded-xl shadow-xl max-w-md w-full">
            {/* Modal Header */}
            <div className="flex items-center mb-6 space-x-4">
              {modalType === "success" && (
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              )}
              {modalType === "error" && (
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7 text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
              )}
              {modalType === "confirm" && (
                <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7 text-yellow-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
              )}
              <h3
                className={`text-2xl font-semibold ${
                  modalType === "success"
                    ? "text-green-600"
                    : modalType === "error"
                    ? "text-red-600"
                    : "text-yellow-600"
                }`}
              >
                {modalType.charAt(0).toUpperCase() + modalType.slice(1)}
              </h3>
            </div>

            {/* Modal Message */}
            <p className="mb-8 text-gray-700">{modalMessage}</p>

            {/* Modal Actions */}
            <div className="flex justify-end space-x-4">
              {modalType === "confirm" ? (
                <>
                  <button
                    onClick={() => {
                      setShowModal(false);
                      if (pendingAction) pendingAction();
                    }}
                    className="px-5 py-2 bg-[#9F2BEE] text-white rounded-lg shadow-md hover:bg-[#7d1a9f] focus:outline-none focus:ring-2 focus:ring-[#7d1a9f] transition"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-5 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2 bg-[#415A77] text-white rounded-lg hover:bg-[#273B5A] focus:outline-none focus:ring-2 focus:ring-[#273B5A] transition"
                >
                  Close
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUserManager;
