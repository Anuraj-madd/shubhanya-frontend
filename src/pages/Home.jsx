import React, { useState, useEffect, useRef } from 'react';
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
  
  // State for testimonial carousel
  const [isPaused, setIsPaused] = useState(false);
  const testimonialRef = useRef(null);

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
      body: formData,
      // No need to set Content-Type header when using FormData
    });
    
    // Check if the request was successful
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    
    if (result.success) {
      setSubscribeStatus({
        message: result.message,
        type: 'success'
      });
      setEmail(''); // Clear form on success
    } else {
      setSubscribeStatus({
        message: result.message || 'Subscription failed. Please try again.',
        type: 'error'
      });
    }
  } catch (error) {
    console.error('Subscription error:', error);
    setSubscribeStatus({
      message: 'An error occurred. Please try again later.',
      type: 'error'
    });
  } finally {
    setIsSubmitting(false);
  }
};

  // Auto-scroll testimonials
  useEffect(() => {
    const scrollContainer = testimonialRef.current;
    if (!scrollContainer) return;

    let scrollInterval;
    let scrollAmount = 1; // Pixels to scroll per interval
    const totalWidth = scrollContainer.scrollWidth;
    const visibleWidth = scrollContainer.clientWidth;

    const startScrolling = () => {
      scrollInterval = setInterval(() => {
        if (isPaused) return;

        // Reset scroll position when we reach the end
        if (scrollContainer.scrollLeft + visibleWidth >= totalWidth) {
          scrollContainer.scrollLeft = 0;
        } else {
          scrollContainer.scrollLeft += scrollAmount;
        }
      }, 30); // Adjust interval for smoother/slower scrolling
    };

    // Start scrolling after a brief delay
    const timeoutId = setTimeout(startScrolling, 2000);

    // Handle mouse interactions
    const handleMouseEnter = () => setIsPaused(true);
    const handleMouseLeave = () => setIsPaused(false);
    const handleTouchStart = () => setIsPaused(true);
    const handleTouchEnd = () => {
      // Add a small delay before resuming to avoid immediate scrolling after touch
      setTimeout(() => setIsPaused(false), 3000);
    };

    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);
    scrollContainer.addEventListener('touchstart', handleTouchStart);
    scrollContainer.addEventListener('touchend', handleTouchEnd);
    
    // Wheel event to pause scrolling when user manually scrolls
    scrollContainer.addEventListener('wheel', () => {
      setIsPaused(true);
      // Resume after user is done scrolling
      clearTimeout(scrollContainer.wheelTimeout);
      scrollContainer.wheelTimeout = setTimeout(() => setIsPaused(false), 3000);
    });

    return () => {
      clearTimeout(timeoutId);
      clearInterval(scrollInterval);
      if (scrollContainer) {
        scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
        scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
        scrollContainer.removeEventListener('touchstart', handleTouchStart);
        scrollContainer.removeEventListener('touchend', handleTouchEnd);
        scrollContainer.removeEventListener('wheel', () => {});
        clearTimeout(scrollContainer.wheelTimeout);
      }
    };
  }, [isPaused]);

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
    },
    { 
      name: "Solar Power Systems",
      image: "/assets/categories/solar.webp",
      description: "Sustainable energy solutions for homes and businesses" 
    },
    { 
      name: "Electrical & Network Wiring",
      image: "/assets/categories/wiring.webp",
      description: "Professional wiring services with premium brand materials" 
    },
    { 
      name: "Network Tower Installation",
      image: "/assets/categories/tower.webp",
      description: "Custom tower solutions for enhanced connectivity" 
    },
    { 
      name: "Static IP Services",
      image: "/assets/categories/static-ip.webp",
      description: "All-India static IP solutions for business requirements" 
    }
  ];

  // New highlighted services
  const highlightedServices = [
    {
      title: "Solar Power Solutions",
      icon: "sun",
      description: "Renewable energy systems for homes and businesses with complete installation services",
      link: "/services#solar"
    },
    {
      title: "Static IP All Over India",
      icon: "globe-network",
      description: "Reliable static IP services across India in partnership with Netsathi Networks PVT LTD",
      link: "/services#internet"
    },
    {
      title: "Network Tower Installation",
      icon: "tower",
      description: "Custom network tower installation for enhanced connectivity in rural and urban areas",
      link: "/services#networking"
    },
    {
      title: "Electrical & Network Wiring",
      icon: "plug-wire",
      description: "Premium wiring solutions using trusted brands like Havells, Anchor, and D-Link",
      link: "/services#electrical"
    }
  ];

  // Expanded testimonials
  const testimonials = [
    {
      name: "Anuraj Maddhesiya", 
      company: "ABC Security Solutions",
      review: "Shubhanya provided us with a comprehensive CCTV setup for our corporate office. The quality and support have been exceptional.", 
      rating: 5
    },
    {
      name: "Ankit Soni", 
      company: "CloudTech Systems",
      review: "Their networking equipment has transformed our infrastructure. Fast delivery and excellent installation support.", 
      rating: 5
    },
    {
      name: "Alankriti Khandelwal", 
      company: "HomeSecure",
      review: "We've been partnering with Shubhanya for our client installations. Reliable products and fantastic after-sales service.", 
      rating: 4
    },
    {
      name: "Aman Soni",
      company: "Green Energy Solutions",
      review: "The solar power system installed by Shubhanya has reduced our energy costs by 40%. Professional installation and great ongoing maintenance.",
      rating: 5
    },
    {
      name: "CA Ritika Agarwal",
      company: "TechHub Coworking",
      review: "We rely on consistent internet connectivity for our business, and Shubhanya's static IP service has been rock-solid for over a year now.",
      rating: 5
    },
    {
      name: "Khushi Agrwal",
      company: "Rural Connect Initiative",
      review: "The network tower installation in our village has transformed connectivity for hundreds of families. Excellent work by the Shubhanya team.",
      rating: 5
    },
    {
      name: "Shaurya Lath",
      company: "Verma Electronics",
      review: "As a retailer, I've been sourcing networking equipment from Shubhanya for years. Their product quality and business ethics are unmatched.",
      rating: 4
    },
    {
      name: "Amar Gupta",
      company: "Secure Homes Association",
      review: "Our residential complex's security was completely upgraded with Shubhanya's IP surveillance system. The clarity and remote monitoring features are outstanding.",
      rating: 5
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
            <p className="text-xl text-white mb-8">Premium networking, surveillance, and sustainable energy solutions from Shubhanya Enterprises</p>
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
            With over 10 years of expertise in networking, surveillance, solar power, and infrastructure solutions, 
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

      {/* Highlighted Services */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-800 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Expanded Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {highlightedServices.map((service, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm p-6 rounded-lg hover:bg-white/20 transition">
                <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <span className="text-white text-2xl">
                    {/* Icon placeholder */}
                    {service.icon === "sun" && "☀️"}
                    {service.icon === "globe-network" && "🌐"}
                    {service.icon === "tower" && "📡"}
                    {service.icon === "plug-wire" && "🔌"}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-center">{service.title}</h3>
                <p className="text-blue-100 text-center mb-6">{service.description}</p>
{/*                 <div className="text-center">
                  <a 
                    href={service.link} 
                    className="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md transition"
                  >
                    Learn More
                  </a>
                </div> */}
              </div>
            ))}
          </div>
        </div>
      </section>

{/*       
      <section className="py-16 px-4 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Popular Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularCategories.slice(0, 4).map((category, index) => (
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
            Shubhanya Enterprises provides premium internet, static IP, and broadband services 
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
                {partner.name === "Netsathi Networks" 
                  ? "Premium broadband and Static IP services across India for business requirements." 
                  : "Top-tier broadband services tailored for homes and businesses."}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Brand Partners for Electrical & Networking */}
{/*       <section className="py-16 px-4 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Quality Brand Partners</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We work exclusively with industry-leading brands to ensure the highest quality for our electrical and networking solutions.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {["Havells", "Anchor", "D-Link", "TP-Link"].map((brand, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow text-center">
                <div className="h-16 flex items-center justify-center mb-4">
                  <div className="text-2xl font-bold text-blue-700">{brand}</div>
                </div>
                <p className="text-gray-600 text-sm">
                  Trusted partner for {index < 2 ? "electrical components" : "networking solutions"}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Customer Reviews - Scrollable */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">Customer Testimonials</h2>
        <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-12">
          See what our clients across India have to say about our products and services
        </p>
        
        {/* Carousel controls */}
        <div className="flex justify-center mb-6">
          <button 
            onClick={() => {
              if (testimonialRef.current) {
                testimonialRef.current.scrollLeft -= 300;
                setIsPaused(true);
                setTimeout(() => setIsPaused(false), 3000);
              }
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white w-10 h-10 rounded-full flex items-center justify-center mr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Scroll left"
          >
            <span className="text-lg">←</span>
          </button>
          <button 
            onClick={() => {
              if (testimonialRef.current) {
                testimonialRef.current.scrollLeft += 300;
                setIsPaused(true);
                setTimeout(() => setIsPaused(false), 3000);
              }
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white w-10 h-10 rounded-full flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Scroll right"
          >
            <span className="text-lg">→</span>
          </button>
        </div>
        
        {/* Carousel container */}
        <div 
          className="relative max-w-full overflow-hidden"
          style={{ WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)' }}
        >
          <div 
            ref={testimonialRef}
            className="flex overflow-x-scroll pb-8 hide-scrollbar snap-x"
            style={{ 
              scrollBehavior: 'smooth',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
            {/* Gap at start for smooth looping */}
            <div className="flex-shrink-0 w-4"></div>
            
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="flex-shrink-0 w-80 px-4 snap-center"
              >
                <ReviewCard 
                  name={testimonial.name} 
                  company={testimonial.company}
                  review={testimonial.review} 
                  rating={testimonial.rating}
                />
              </div>
            ))}
            
            {/* Repeat first few testimonials at end for seamless looping */}
            {testimonials.slice(0, 3).map((testimonial, index) => (
              <div 
                key={`repeat-${index}`} 
                className="flex-shrink-0 w-80 px-4 snap-center"
              >
                <ReviewCard 
                  name={testimonial.name} 
                  company={testimonial.company}
                  review={testimonial.review} 
                  rating={testimonial.rating}
                />
              </div>
            ))}
            
            {/* Gap at end for smooth looping */}
            <div className="flex-shrink-0 w-4"></div>
          </div>
          
          {/* Shadow overlay for fade effect */}
          <div className="absolute top-0 bottom-8 left-0 w-16 bg-gradient-to-r from-gray-50 to-transparent pointer-events-none"></div>
          <div className="absolute top-0 bottom-8 right-0 w-16 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none"></div>
        </div>
        
        {/* Indicator dots */}
        <div className="flex justify-center mt-2 space-x-2">
          {[0, 1, 2, 3].map((index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full focus:outline-none ${
                index === 0 ? 'bg-blue-600' : 'bg-gray-300'
              }`}
              onClick={() => {
                if (testimonialRef.current) {
                  testimonialRef.current.scrollLeft = index * 320 * 2;
                  setIsPaused(true);
                  setTimeout(() => setIsPaused(false), 3000);
                }
              }}
              aria-label={`Go to slide ${index + 1}`}
            ></button>
          ))}
        </div>
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

      {/* Add custom CSS to hide scrollbar */}
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
