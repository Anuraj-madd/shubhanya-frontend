import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [status, setStatus] = useState({
    message: "",
    isError: false,
    isSubmitting: false,
    isSubmitted: false
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setStatus({
      message: "Sending your message...",
      isError: false,
      isSubmitting: true,
      isSubmitted: false
    });
    
    // Create form data for submission
    const formBody = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formBody.append(key, value);
    });
    
    try {
      // Use XMLHttpRequest instead of fetch for better compatibility
      const xhr = new XMLHttpRequest();
      xhr.open('POST', 'https://shubhanya-backend.onrender.com/contact.php', true);
      
      xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const result = JSON.parse(xhr.responseText);
            
            // Always treat as success if email was sent
            setStatus({
              message: result.message || "Thank you for your message. We will get back to you soon!",
              isError: false,
              isSubmitting: false,
              isSubmitted: true
            });
            setFormData({ name: "", email: "", phone: "", message: "" });
          } catch (e) {
            console.error("Error parsing response:", e);
            // Even if parsing fails, assume success if status is 200-299
            setStatus({
              message: "Thank you for your message. We will get back to you soon!",
              isError: false,
              isSubmitting: false,
              isSubmitted: true
            });
            setFormData({ name: "", email: "", phone: "", message: "" });
          }
        } else {
          setStatus({
            message: "There was an error submitting the form. Please try again.",
            isError: true,
            isSubmitting: false,
            isSubmitted: false
          });
        }
      };
      
      xhr.onerror = function() {
        setStatus({
          message: "A network error occurred. Please try again later.",
          isError: true,
          isSubmitting: false,
          isSubmitted: false
        });
      };
      
      // Send the form data
      xhr.send(formBody);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus({
        message: "An unexpected error occurred. Please try again.",
        isError: true,
        isSubmitting: false,
        isSubmitted: false
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#E9ECEF] text-[#1B1F3B]">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold mb-6 text-center text-[#005F73]">
          Contact Us
        </h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-[#94D2BD] flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-6 text-center text-[#0A9396]">
                Get in Touch
              </h2>
              <p className="mb-2">
                <strong>Phone:</strong> +91 - 99359 70521
              </p>
              <p className="mb-2">
                <strong>Email:</strong> support@shubhanya.in
              </p>
              <p className="mb-2">
                <strong>Address:</strong> Near Prem Lal Singhania Inter College, Siswa Bazar, Maharajganj, Uttar Pradesh, India
              </p>
              <p className="mb-2">
                <strong>Hours:</strong> Mon–Sat, 9:00 AM – 6:00 PM
              </p>
              <p className="mt-4 text-sm text-[#005F73]">
                We aim to respond to all inquiries within 24 hours.
              </p>
            </div>

            {/* Google Map Location Pin */}
            <div className="mt-6">
              <iframe
                title="Location Map"
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3430.0762922915487!2d83.757495!3d27.147868!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjfCsDA4JzUyLjMiTiA4M8KwNDUnMjcuMCJF!5e1!3m2!1sen!2sin!4v1745261122888!5m2!1sen!2sin"
                width="100%"
                height="275"
                allowFullScreen=""
                loading="lazy"
                className="rounded border border-[#94D2BD]"
              ></iframe>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-[#94D2BD]">
            <h2 className="text-2xl font-bold mb-6 text-center text-[#0A9396]">
              Send Us a Message
            </h2>
            
            {/* Status Message */}
            {status.message && (
              <div className={`p-4 mb-4 rounded ${status.isError ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                {status.message}
              </div>
            )}
            
            {/* Only show form if not successfully submitted */}
            {!status.isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block mb-1 font-medium" htmlFor="name">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-[#94D2BD] rounded focus:outline-none focus:ring-2 focus:ring-[#0A9396]"
                    disabled={status.isSubmitting}
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium" htmlFor="email">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-[#94D2BD] rounded focus:outline-none focus:ring-2 focus:ring-[#0A9396]"
                    disabled={status.isSubmitting}
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium" htmlFor="phone">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-[#94D2BD] rounded focus:outline-none focus:ring-2 focus:ring-[#0A9396]"
                    disabled={status.isSubmitting}
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium" htmlFor="message">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-[#94D2BD] rounded focus:outline-none focus:ring-2 focus:ring-[#0A9396]"
                    disabled={status.isSubmitting}
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className={`bg-[#94D2BD] hover:bg-[#0A9396] text-[#030303] font-semibold px-6 py-2 rounded transition-all ${
                    status.isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  disabled={status.isSubmitting}
                >
                  {status.isSubmitting ? "Sending..." : "Submit"}
                </button>
              </form>
            ) : (
              <div className="text-center py-8">
                <svg className="mx-auto h-12 w-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <p className="mt-4 text-lg font-medium">Thank you for contacting us!</p>
                <button 
                  onClick={() => setStatus({message: "", isError: false, isSubmitting: false, isSubmitted: false})}
                  className="mt-4 bg-[#94D2BD] hover:bg-[#0A9396] text-[#030303] font-semibold px-6 py-2 rounded transition-all"
                >
                  Send Another Message
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
