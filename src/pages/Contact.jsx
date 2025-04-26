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

  // Social media links
  const socialLinks = [
    { name: "Facebook", icon: "M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" },
    { name: "Twitter", icon: "M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" },
    { name: "Instagram", icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" },
    { name: "LinkedIn", icon: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" }
  ];

  return (
    <div className="min-h-screen bg-brand-background text-brand-text-dark">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-700 to-blue-900 py-12 md:py-16">
        <div className="absolute inset-0 opacity-20">
          <svg className="h-full w-full" viewBox="0 0 500 500" preserveAspectRatio="none">
            <path d="M259.5,84.5Q257,169,186,233.5Q115,298,67.5,399Q20,500,126.5,486.5Q233,473,301.5,427Q370,381,356.5,304Q343,227,356.5,163.5Q370,100,315,42Q260,-16,259.5,84.5Z" fill="white" />
          </svg>
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 md:mb-4">Contact Us</h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
            Have questions or need assistance? We're here to help you with any inquiries about our technology solutions.
          </p>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 md:py-16">
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {/* Contact Information Column */}
          <div className="md:col-span-1 space-y-6">
            {/* Contact Information Card */}
            <div className="bg-white p-5 md:p-6 rounded-lg shadow-md border border-brand-accent2">
              <h2 className="text-xl md:text-2xl font-bold text-brand-primary relative mb-4 md:mb-6">
                Contact Information
                <span className="block w-16 h-1 bg-brand-secondary mt-2"></span>
              </h2>
              
              <div className="space-y-5">
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4 text-brand-secondary flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-brand-primary">Phone</h3>
                    <p className="text-brand-accent1">+91 - 99359 70521</p>
                    <p className="text-sm text-brand-accent1 mt-1">Monday to Saturday, 9:00 AM – 6:00 PM</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4 text-brand-secondary flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-brand-primary">Email</h3>
                    <p className="text-brand-accent1 break-words">support@shubhanya.in</p>
                    <p className="text-sm text-brand-accent1 mt-1">We'll respond as soon as possible</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4 text-brand-secondary flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-brand-primary">Address</h3>
                    <p className="text-brand-accent1">Near Prem Lal Singhania Inter College,<br /> Siswa Bazar, Maharajganj,<br /> Uttar Pradesh, India</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Social Media Links */}
            <div className="bg-white p-5 md:p-6 rounded-lg shadow-md border border-brand-accent2">
              <h2 className="text-xl md:text-2xl font-bold text-brand-primary relative mb-4 md:mb-6">
                Connect With Us
                <span className="block w-16 h-1 bg-brand-secondary mt-2"></span>
              </h2>
              
              <div className="flex justify-around">
                {socialLinks.map((social, index) => (
                  <a 
                    key={index}
                    href="#" 
                    className="w-10 h-10 bg-blue-100 hover:bg-blue-200 text-brand-secondary rounded-full flex items-center justify-center transition-all"
                    aria-label={`Follow us on ${social.name}`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d={social.icon} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
            
            {/* Business Hours */}
            <div className="bg-white p-5 md:p-6 rounded-lg shadow-md border border-brand-accent2">
              <h2 className="text-xl md:text-2xl font-bold text-brand-primary relative mb-4 md:mb-6">
                Business Hours
                <span className="block w-16 h-1 bg-brand-secondary mt-2"></span>
              </h2>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-brand-accent1">Monday - Friday:</span>
                  <span className="font-medium text-brand-primary">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-brand-accent1">Saturday:</span>
                  <span className="font-medium text-brand-primary">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-brand-accent1">Sunday:</span>
                  <span className="font-medium text-brand-primary">Closed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form and Map Column */}
          <div className="md:col-span-2 space-y-6">
            {/* Contact Form */}
            <div className="bg-white p-5 md:p-6 rounded-lg shadow-md border border-brand-accent2">
              <h2 className="text-xl md:text-2xl font-bold text-brand-primary relative mb-4 md:mb-6">
                Send Us a Message
                <span className="block w-16 h-1 bg-brand-secondary mt-2"></span>
              </h2>
              
              {/* Status Message */}
              {status.message && (
                <div className={`p-4 mb-6 rounded-lg ${status.isError ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-green-50 text-green-600 border border-green-100'}`}>
                  <div className="flex items-center">
                    {status.isError ? (
                      <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
                      </svg>
                    ) : (
                      <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                      </svg>
                    )}
                    {status.message}
                  </div>
                </div>
              )}
              
              {/* Only show form if not successfully submitted */}
              {!status.isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-brand-primary" htmlFor="name">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Your full name"
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        disabled={status.isSubmitting}
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-brand-primary" htmlFor="email">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="your.email@example.com"
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        disabled={status.isSubmitting}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-brand-primary" htmlFor="phone">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Your phone number (optional)"
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      disabled={status.isSubmitting}
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-brand-primary" htmlFor="message">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="5"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Please describe how we can help you..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      disabled={status.isSubmitting}
                    ></textarea>
                  </div>
                  <div className="flex items-center">
                    <input 
                      id="terms" 
                      type="checkbox" 
                      required
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" 
                    />
                    <label htmlFor="terms" className="ml-2 block text-sm text-brand-accent1">
                      I agree to the <a href="#" className="text-brand-secondary hover:underline">Privacy Policy</a> and <a href="#" className="text-brand-secondary hover:underline">Terms of Service</a>
                    </label>
                  </div>
                  <button
                    type="submit"
                    className={`bg-brand-primary hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-md transition-all ${
                      status.isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                    disabled={status.isSubmitting}
                  >
                    {status.isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending Message...
                      </span>
                    ) : "Send Message"}
                  </button>
                </form>
              ) : (
                <div className="text-center py-8 md:py-12">
                  <div className="bg-green-100 rounded-full mx-auto w-16 h-16 flex items-center justify-center mb-4">
                    <svg className="h-8 w-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-brand-primary mb-2">Thank You!</h3>
                  <p className="text-brand-accent1 mb-6">Your message has been sent successfully. We'll get back to you soon.</p>
                  <button 
                    onClick={() => setStatus({message: "", isError: false, isSubmitting: false, isSubmitted: false})}
                    className="bg-brand-primary hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-md transition-all"
                  >
                    Send Another Message
                  </button>
                </div>
              )}
            </div>
            
            {/* Map */}
            <div className="bg-white p-5 md:p-6 rounded-lg shadow-md border border-brand-accent2">
              <h2 className="text-xl md:text-2xl font-bold text-brand-primary relative mb-4 md:mb-6">
                Visit Our Location
                <span className="block w-16 h-1 bg-brand-secondary mt-2"></span>
              </h2>
              
              <iframe
                title="Location Map"
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3430.0762922915487!2d83.757495!3d27.147868!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjfCsDA4JzUyLjMiTiA4M8KwNDUnMjcuMCJF!5e1!3m2!1sen!2sin!4v1745261122888!5m2!1sen!2sin"
                width="100%"
                height="350"
                allowFullScreen=""
                loading="lazy"
                className="rounded-md border border-gray-200"
              ></iframe>
            </div>
          </div>
        </div>
        
        {/* Call To Action */}
        <div className="mt-8 md:mt-10 bg-gradient-to-r from-blue-700 to-blue-900 p-6 md:p-8 rounded-lg shadow-md text-white text-center">
          <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Ready to Work With Us?</h2>
          <p className="mb-5 md:mb-6">
            Contact us today for a consultation and let our experts design a customized solution for your needs.
          </p>
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            <a 
              href="/services" 
              className="bg-white text-blue-700 hover:bg-blue-100 px-5 md:px-6 py-2 rounded-md font-medium transition"
            >
              Explore Our Services
            </a>
            <a 
              href="/shop" 
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-700 px-5 md:px-6 py-2 rounded-md font-medium transition"
            >
              Visit Our Shop
            </a>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Contact;
