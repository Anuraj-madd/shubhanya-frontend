import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const PostAnnouncements = () => {
  const navigate = useNavigate();
  
  // States for handling the announcement form
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  // Fetch existing announcements
  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await fetch("/api/announcements"); // Example endpoint, adjust as needed
        const data = await response.json();
        setAnnouncements(data);
      } catch (error) {
        console.error("Error fetching announcements:", error);
        setError("Failed to load announcements.");
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  // Handle post announcement form submission
  const handlePostAnnouncement = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      alert("Both title and content are required!");
      return;
    }

    try {
      const response = await fetch("/api/announcements", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      });

      if (response.ok) {
        setSuccessMessage("Announcement posted successfully!");
        setTitle("");
        setContent("");
        setTimeout(() => setSuccessMessage(""), 3000); // Hide success message after 3 seconds
        // Re-fetch announcements to include the new one
        const newAnnouncements = await response.json();
        setAnnouncements(newAnnouncements);
      } else {
        alert("Error posting the announcement.");
      }
    } catch (error) {
      console.error("Error posting announcement:", error);
      alert("Something went wrong.");
    }
  };

  // Handle deleting an announcement
  const handleDeleteAnnouncement = async (id) => {
    if (window.confirm("Are you sure you want to delete this announcement?")) {
      try {
        const response = await fetch(`/api/announcements/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          setAnnouncements((prev) => prev.filter((ann) => ann.id !== id));
        } else {
          alert("Failed to delete announcement.");
        }
      } catch (error) {
        console.error("Error deleting announcement:", error);
        alert("Something went wrong.");
      }
    }
  };

  if (loading) {
    return (
      <div className="text-center py-10">
        <p>Loading announcements...</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="bg-[#F5F7FA] min-h-screen py-10 px-4 md:px-8 text-[#1B1B1B]">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-10 text-[#0D1B2A]">Post Announcements</h1>

          {/* Success message */}
          {successMessage && (
            <div className="mb-6 text-center text-lg font-medium text-green-600">
              {successMessage}
            </div>
          )}

          {/* Post Announcement Form */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-[#778DA9] mb-10">
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
              >
                Post Announcement
              </button>
            </form>
          </div>

          {/* List of Announcements */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-[#778DA9]">
            <h3 className="text-2xl font-semibold text-[#0D1B2A] mb-6">Existing Announcements</h3>
            {announcements.length > 0 ? (
              <div>
                {announcements.map((ann) => (
                  <div key={ann.id} className="mb-6 border-b border-[#E6E6E6] pb-4">
                    <h4 className="text-xl font-semibold text-[#0D1B2A]">{ann.title}</h4>
                    <p className="text-sm text-[#415A77]">{ann.content}</p>
                    <div className="mt-3">
                      <button
                        onClick={() => handleDeleteAnnouncement(ann.id)}
                        className="text-[#E74C3C] hover:text-[#C0392B] transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No announcements available.</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PostAnnouncements;
