import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Legal = () => {
  return (
    <div className="min-h-screen bg-[#E9ECEF] text-[#1B1F3B]">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold mb-8 text-center text-[#005F73]">
          Legal Information
        </h1>

        {/* Section Wrapper */}
        <div className="space-y-10">
          {/* Terms & Conditions */}
          <section className="bg-white p-6 rounded-lg shadow-md border border-[#94D2BD]">
            <h2 className="text-2xl font-semibold mb-4 text-[#0A9396]">
              Terms & Conditions
            </h2>
            <p className="text-sm leading-relaxed text-[#1B1F3B]">
              By using our services, you agree to abide by all applicable laws and
              regulations. Users must not misuse our platform or violate any terms
              that may harm the integrity of the business or experience of others.
              We reserve the right to suspend or terminate accounts that are found
              violating these terms.
            </p>
          </section>

          {/* Cancellation Policy */}
          <section className="bg-white p-6 rounded-lg shadow-md border border-[#94D2BD]">
            <h2 className="text-2xl font-semibold mb-4 text-[#0A9396]">
              Cancellation Policy
            </h2>
            <p className="text-sm leading-relaxed text-[#1B1F3B]">
              Orders once placed can be canceled within 1 hour of purchase if not
              already processed. After that time, cancellations may not be
              guaranteed. If a cancellation is approved, a full refund will be
              issued to the original payment method within 5-7 business days.
            </p>
          </section>

          {/* Refund Policy */}
          <section className="bg-white p-6 rounded-lg shadow-md border border-[#94D2BD]">
            <h2 className="text-2xl font-semibold mb-4 text-[#0A9396]">
              Refund Policy
            </h2>
            <p className="text-sm leading-relaxed text-[#1B1F3B]">
              Refunds are provided only for defective or failed product deliveries.
              All refund requests must be submitted within 7 days of the order
              date. We reserve the right to review and process the refund case
              based on product/service usage and eligibility.
            </p>
          </section>

          {/* Privacy Policy */}
          <section className="bg-white p-6 rounded-lg shadow-md border border-[#94D2BD]">
            <h2 className="text-2xl font-semibold mb-4 text-[#0A9396]">
              Privacy Policy
            </h2>
            <p className="text-sm leading-relaxed text-[#1B1F3B]">
              We are committed to protecting your privacy. Any personal data
              collected (such as name, contact information, or payment details)
              will be securely stored and never shared with third parties without
              consent. We employ standard security measures to safeguard user
              information and ensure transparency in data handling.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Legal;
