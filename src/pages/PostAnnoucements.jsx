import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const PostAnnouncements = () => {
  // States for handling the announcement form
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Handle post announcement form submission
  const handlePostAnnouncement = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      setErrorMessage("Both title and content are required!");
      setTimeout(() => setErrorMessage(""), 3000);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("https://shubhanya-backend.onrender.com/post_announcement.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage(data.message || "Announcement posted and emails sent successfully!");
        setTitle("");
        setContent("");
        setTimeout(() => setSuccessMessage(""), 5000);
      } else {
        setErrorMessage(data.error || "Error posting the announcement.");
        setTimeout(() => setErrorMessage(""), 3000);
      }
    } catch (error) {
      console.error("Error posting announcement:", error);
      setErrorMessage("Something went wrong. Please try again later.");
      setTimeout(() => setErrorMessage(""), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-[#F5F7FA] min-h-screen py-10 px-4 md:px-8 text-[#1B1B1B]">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-10 text-[#0D1B2A]">Post Announcements</h1>

          {/* Success message */}
          {successMessage && (
            <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
              {successMessage}
            </div>
          )}

          {/* Error message */}
          {errorMessage && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {errorMessage}
            </div>
          )}

          {/* Post Announcement Form */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-[#778DA9]">
            <h3 className="text-2xl font-semibold text-[#0D1B2A] mb-6">Create New Announcement</h3>
            <form onSubmit={handlePostAnnouncement}>
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-[#415A77]">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  className="mt-2 block w-full p-3 border border-[#E6E6E6] rounded-lg text-[#1B263B]"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="content" className="block text-sm font-medium text-[#415A77]">
                  Content
                </label>
                <textarea
                  id="content"
                  className="mt-2 block w-full p-3 border border-[#E6E6E6] rounded-lg text-[#1B263B]"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                  rows="6"
                />
              </div>

              <button
                type="submit"
                className="bg-[#1CC5DC] text-white py-3 px-6 rounded-lg hover:bg-[#0D1B2A] transition-colors"
                disabled={loading}
              >
                {loading ? "Posting..." : "Post Announcement"}
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PostAnnouncements;
