import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const About = () => {
  return (
    <div className="min-h-screen bg-brand-background text-brand-text-dark">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold mb-6 text-center text-brand-primary">
          About Us
        </h1>

        {/* Who We Are */}
        <section className="bg-white p-6 rounded-lg shadow-md mb-10 border border-brand-accent2">
          <h2 className="text-2xl font-semibold mb-3 text-brand-primary">
            Who We Are
          </h2>
          <p className="text-brand-accent1 leading-relaxed">
            We are a leading provider of networking and surveillance equipment,
            offering high-quality products and seamless customer experience
            through our eCommerce platform. Our team is passionate about
            technology and committed to helping businesses and individuals stay
            connected and secure.
          </p>
        </section>

        {/* Our Mission */}
        <section className="bg-white p-6 rounded-lg shadow-md mb-10 border border-brand-accent2">
          <h2 className="text-2xl font-semibold mb-3 text-brand-primary">
            Our Mission
          </h2>
          <p className="text-brand-accent1 leading-relaxed">
            Our mission is to provide reliable and affordable tech solutions
            with excellent customer support. We aim to bridge the gap between
            innovation and accessibility by offering cutting-edge products,
            expert guidance, and fast delivery.
          </p>
        </section>

        {/* Why Choose Us */}
        <section className="bg-white p-6 rounded-lg shadow-md mb-10 border border-brand-accent2">
          <h2 className="text-2xl font-semibold mb-3 text-brand-primary">
            Why Choose Us?
          </h2>
          <ul className="list-disc list-inside space-y-2 text-brand-accent1">
            <li>Wide range of trusted and verified products</li>
            <li>Secure and hassle-free shopping experience</li>
            <li>Excellent customer service and after-sales support</li>
            <li>Fast shipping and easy returns</li>
            <li>Committed to your satisfaction and safety</li>
          </ul>
        </section>

        {/* Extra Services */}
        <section className="bg-white p-6 rounded-lg shadow-md border border-brand-accent2">
          <h2 className="text-2xl font-semibold mb-3 text-brand-primary">
            Extra Services
          </h2>
          <p className="text-brand-accent1 leading-relaxed">
            In addition to supplying top-notch networking and surveillance
            equipment, we also offer broadband internet connectivity for homes
            and businesses. Through our strategic partnership with{" "}
            <strong className="text-brand-secondary">Netsathi Networks Private Limited</strong>, we provide high-speed,
            reliable internet services powered by industry leaders{" "}
            <strong className="text-brand-secondary">Railwire</strong> and <strong className="text-brand-secondary">Airtel</strong>.
          </p>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default About;
