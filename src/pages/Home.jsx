import React, { useState } from 'react';
import Navbar from "../components/Navbar";
import Footer from '../components/Footer';
import ReviewCard from '../components/ReviewCard';

const Home = () => {
  // State for newsletter form
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState({
    message: '',
    type: '' // 'success' or 'error'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle newsletter form submission
  const handleSubscribe = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!email || !email.includes('@')) {
      setSubscribeStatus({
        message: 'Please enter a valid email address',
        type: 'error'
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Create form data for PHP
      const formData = new FormData();
      formData.append('email', email);
      
      // Submit to PHP endpoint
      const response = await fetch('https://shubhanya-backend.onrender.com/subscribe.php', {
        method: 'POST',
        body: formData
      });
      
      const result = await response.json();
      
      if (result.success) {
        setSubscribeStatus({
          message: result.message,
          type: 'success'
        });
        setEmail(''); // Clear form on success
      } else {
        setSubscribeStatus({
          message: result.message,
          type: 'error'
        });
      }
    } catch (error) {
      setSubscribeStatus({
        message: 'An error occurred. Please try again later.',
        type: 'error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const benefitCards = [
    { 
      icon: "shield-check", 
      title: "Quality Assured", 
      description: "All products undergo rigorous testing for reliability and performance" 
    },
    { 
      icon: "truck", 
      title: "Fast Delivery", 
      description: "Next-day delivery available on most products across Maharajganj" 
    },
    { 
      icon: "headset", 
      title: "Expert Support", 
      description: "Dedicated technical team available 24/7 for installation and troubleshooting" 
    },
    { 
      icon: "shield", 
      title: "Warranty Covered", 
      description: "Extended warranties and service guarantees on all products" 
    }
  ];

  const internetPartners = [
    { name: "Airtel", logo: "/assets/airtel.png" },
    { name: "Ralwire", logo: "/assets/railwire.png" },
    { name: "Netsathi Networks", logo: "/assets/NS.png" }
  ];

  const popularCategories = [
    { 
      name: "CCTV Systems",
      image: "/assets/categories/cctv.webp",
      description: "High-resolution security cameras and DVR systems" 
    },
    { 
      name: "Networking Equipment",
      image: "/assets/categories/networking.webp",
      description: "Enterprise-grade routers, switches and accessories" 
    },
    { 
      name: "IP Surveillance",
      image: "/assets/categories/ip-surveillance.webp",
      description: "Smart IP cameras with remote monitoring" 
    },
    { 
      name: "Broadband Solutions",
      image: "/assets/categories/broadband.webp",
      description: "High-speed internet connectivity solutions" 
    }
  ];

  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen">
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: "url('/assets/cover_hero.webp')" }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
        <div className="relative h-full max-w-7xl mx-auto px-4 flex flex-col justify-center items-start">
          <div className="max-w-xl">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">Secure Your World</h1>
            <p className="text-xl text-white mb-8">Premium networking and surveillance solutions from Shubhanya Enterprises</p>
            <div className="flex flex-wrap gap-4">
              <a
                href="/products"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-md transition shadow-lg"
              >
                Explore Products
              </a>
              <a
                href="/services"
                className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-600 text-white font-medium px-8 py-3 rounded-md transition"
              >
                View Services
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Shubhanya */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Shubhanya</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            With over 10 years of expertise in networking and surveillance solutions, 
            we provide end-to-end services for businesses and homes across India.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefitCards.map((card, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-blue-600 text-xl">
                  {/* Icon placeholder - you would use your icon component here */}
                  {card.icon === "shield-check" && "✓"}
                  {card.icon === "truck" && "🚚"}
                  {card.icon === "headset" && "🎧"}
                  {card.icon === "shield" && "🛡️"}
                </span>
              </div>
              <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
              <p className="text-gray-600">{card.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Categories */}
      {/* <section className="py-16 px-4 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Popular Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularCategories.map((category, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="relative h-64 overflow-hidden rounded-lg mb-4">
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70 z-10"></div>
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition duration-300"
                  />
                  <h3 className="absolute bottom-4 left-4 right-4 text-xl font-semibold text-white z-20">{category.name}</h3>
                </div>
                <p className="text-gray-600">{category.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Internet Solutions Partners */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Internet Solutions Partners</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Shubhanya Enterprises provides premium internet and broadband services 
            in partnership with India's leading network providers.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {internetPartners.map((partner, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-lg transition">
              <div className="h-24 flex items-center justify-center mb-6">
                <img 
                  src={partner.logo} 
                  alt={`${partner.name} logo`} 
                  className="max-h-full" 
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">{partner.name}</h3>
              <p className="text-gray-600">
              Top-tier broadband services tailored for homes and businesses.
              </p>
              {/* <a 
                href={`/partners/${partner.name.toLowerCase()}`}
                className="inline-block mt-4 text-blue-600 font-medium hover:text-blue-800"
              >
                Learn more →
              </a> */}
            </div>
          ))}
        </div>
      </section>

      {/* Promotional Banner */}
      {/* <section className="bg-gradient-to-r from-blue-700 to-blue-900 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="mb-8 md:mb-0 text-center md:text-left">
            <h2 className="text-3xl font-bold mb-2">Limited Time Offer</h2>
            <p className="text-xl mb-0">30% OFF on all IP Surveillance Systems</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="bg-white text-blue-800 px-6 py-3 rounded-md font-semibold text-center">
              Offer ends in: 5 days
            </div>
            <a
              href="/products/ip-surveillance"
              className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-bold px-8 py-3 rounded-md transition shadow-md text-center"
            >
              Shop Now
            </a>
          </div>
        </div>
      </section> */}

      {/* Customer Reviews */}
      <section className="py-20 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Customer Testimonials</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ReviewCard 
            name="Anuraj Maddhesiya" 
            company="ABC Security Solutions"
            review="Shubhanya provided us with a comprehensive CCTV setup for our corporate office. The quality and support have been exceptional." 
            rating={5}
          />
          <ReviewCard 
            name="Ankit Soni" 
            company="CloudTech Systems"
            review="Their networking equipment has transformed our infrastructure. Fast delivery and excellent installation support." 
            rating={5}
          />
          <ReviewCard 
            name="Aman Soni" 
            company="HomeSecure"
            review="We've been partnering with Shubhanya for our client installations. Reliable products and fantastic after-sales service." 
            rating={4}
          />
        </div>
        {/* <div className="text-center mt-12">
          <a 
            href="/testimonials" 
            className="text-blue-600 font-medium hover:text-blue-800"
          >
            View all testimonials →
          </a>
        </div> */}
      </section>

      {/* Newsletter Signup */}
      <section className="bg-gray-100 py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-lg text-gray-600 mb-8">
            Subscribe to our newsletter for latest product updates, tech news, and exclusive offers
          </p>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row justify-center gap-4">
            <input
              type="email"
              placeholder="Your Email Address"
              className="flex-grow px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              className={`bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition ${
                isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
          
          {/* Status message */}
          {subscribeStatus.message && (
            <div className={`mt-4 p-3 rounded-md ${
              subscribeStatus.type === 'success' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {subscribeStatus.message}
            </div>
          )}
          
          <p className="text-sm text-gray-500 mt-4">
            We respect your privacy and will never share your information
          </p>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;