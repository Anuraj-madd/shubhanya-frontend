import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Legal = () => {
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
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 md:mb-4">Legal Information</h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
            Important information about our terms, policies, and your rights as a customer.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Terms & Conditions */}
        <section className="mb-16">
          <div className="bg-white p-8 rounded-lg shadow-md border border-brand-accent2">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <span className="text-brand-secondary text-xl">📜</span>
              </div>
              <h2 className="text-2xl font-bold text-brand-primary">Terms & Conditions</h2>
            </div>
            <div className="space-y-4 text-brand-accent1">
              <p>
                By using our services, you agree to abide by all applicable laws and regulations. Users must not misuse our platform 
                or violate any terms that may harm the integrity of the business or experience of others.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Users must provide accurate and complete information when using our services</li>
                <li>Any unauthorized access or use of our systems is strictly prohibited</li>
                <li>We reserve the right to suspend or terminate accounts that violate our terms</li>
                <li>Users are responsible for maintaining the confidentiality of their account information</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Cancellation Policy */}
        <section className="mb-16">
          <div className="bg-white p-8 rounded-lg shadow-md border border-brand-accent2">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <span className="text-brand-secondary text-xl">❌</span>
              </div>
              <h2 className="text-2xl font-bold text-brand-primary">Cancellation Policy</h2>
            </div>
            <div className="space-y-4 text-brand-accent1">
              <p>
                We understand that circumstances may change, and you may need to cancel your order. Here's our cancellation policy:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Orders can be canceled within 1 hour of purchase if not already processed</li>
                <li>After 1 hour, cancellations may not be guaranteed</li>
                <li>Approved cancellations will receive a full refund to the original payment method</li>
                <li>Refunds are processed within 5-7 business days</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Refund Policy */}
        <section className="mb-16">
          <div className="bg-white p-8 rounded-lg shadow-md border border-brand-accent2">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <span className="text-brand-secondary text-xl">💰</span>
              </div>
              <h2 className="text-2xl font-bold text-brand-primary">Refund Policy</h2>
            </div>
            <div className="space-y-4 text-brand-accent1">
              <p>
                Our refund policy is designed to ensure customer satisfaction while maintaining fair business practices:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Refunds are provided for defective or failed product deliveries</li>
                <li>Refund requests must be submitted within 7 days of the order date</li>
                <li>Each case is reviewed individually based on product usage and eligibility</li>
                <li>Refunds are processed through the original payment method</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Privacy Policy */}
        <section className="mb-16">
          <div className="bg-white p-8 rounded-lg shadow-md border border-brand-accent2">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <span className="text-brand-secondary text-xl">🔒</span>
              </div>
              <h2 className="text-2xl font-bold text-brand-primary">Privacy Policy</h2>
            </div>
            <div className="space-y-4 text-brand-accent1">
              <p>
                We are committed to protecting your privacy and ensuring the security of your personal information:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Personal data is collected only with your consent</li>
                <li>Your information is securely stored and never shared without permission</li>
                <li>We use industry-standard security measures to protect your data</li>
                <li>You have the right to access and control your personal information</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="bg-gradient-to-r from-blue-700 to-blue-900 p-8 rounded-lg shadow-md text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Have Questions About Our Policies?</h2>
          <p className="mb-6">
            Our team is here to help you understand our terms and policies better.
          </p>
          <a 
            href="/contact" 
            className="inline-block bg-white text-blue-700 hover:bg-blue-100 px-6 py-2 rounded-md font-medium transition"
          >
            Contact Us
          </a>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Legal;
