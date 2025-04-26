import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const About = () => {
  // Company milestones for timeline
  const milestones = [
    { year: "2015", event: "Established as a small networking equipment provider in Gorakhpur" },
    { year: "2017", event: "Expanded services to include surveillance systems installation" },
    { year: "2019", event: "Formed strategic partnership with Netsathi Networks PVT LTD" },
    { year: "2020", event: "Added solar power solutions to our service offerings" },
    { year: "2022", event: "Expanded operations to cover major parts of Uttar Pradesh East" },
    { year: "2023", event: "Launched our comprehensive e-commerce platform" }
  ];

  // Team values
  const values = [
    {
      title: "Excellence",
      description: "We strive for excellence in every project, ensuring the highest quality solutions for our clients.",
      icon: "🌟"
    },
    {
      title: "Integrity",
      description: "We operate with honesty and transparency in all our business dealings.",
      icon: "🤝"
    },
    {
      title: "Innovation",
      description: "We continuously explore new technologies to offer cutting-edge solutions.",
      icon: "💡"
    },
    {
      title: "Customer-Centric",
      description: "We prioritize our customers' needs and satisfaction above all else.",
      icon: "👥"
    }
  ];

  // Partners
  const partners = [
    { name: "Netsathi Networks PVT LTD", role: "Internet Services" },
    { name: "Railwire", role: "Broadband Provider" },
    { name: "Airtel", role: "Broadband Provider" },
    { name: "Havells", role: "Electrical Solutions" },
    { name: "D-Link", role: "Networking Equipment" },
    { name: "Hikvision", role: "Surveillance Systems" },
    { name: "SyroTech", role: "FTTH Solutions" },
    { name: "Tp-Link", role: "Networking Equipment" },
    { name: "CP Plus", role: "Surveillance Systems" },
    { name: "Mikrotik", role: "Routing & RF Solutions" },
    { name: "Anchor", role: "Networking Equipment" },
    { name: "Ubiquity", role: "Wireless Equipments" }
  ];

  return (
    <div className="min-h-screen bg-brand-background text-brand-text-dark">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-700 to-blue-900 py-20">
        <div className="absolute inset-0 opacity-20">
          <svg className="h-full w-full" viewBox="0 0 500 500" preserveAspectRatio="none">
            <path d="M259.5,84.5Q257,169,186,233.5Q115,298,67.5,399Q20,500,126.5,486.5Q233,473,301.5,427Q370,381,356.5,304Q343,227,356.5,163.5Q370,100,315,42Q260,-16,259.5,84.5Z" fill="white" />
          </svg>
        </div>
        <div className="max-w-6xl mx-auto px-4 relative">
          <h1 className="text-5xl font-bold text-white mb-6">About Shubhanya Enterprises</h1>
          <p className="text-xl text-blue-100 max-w-2xl">
            Your trusted partner for end-to-end technology solutions in networking, surveillance, internet services, 
            and renewable energy systems.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Introduction */}
        <section className="mb-16">
          <div className="flex flex-col md:flex-row gap-10">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6 text-brand-primary relative">
                Who We Are
                <span className="block w-20 h-1 bg-brand-secondary mt-2"></span>
              </h2>
              <p className="text-brand-accent1 leading-relaxed mb-4">
                Shubhanya Enterprises is a leading technology solutions provider based in Uttar Pradesh East. We specialize in delivering comprehensive 
                networking, surveillance, internet services, and renewable energy solutions tailored to the unique needs of our clients.
              </p>
              <p className="text-brand-accent1 leading-relaxed mb-4">
                With years of industry experience and a team of certified professionals, we have established ourselves as a trusted partner for businesses, 
                educational institutions, healthcare facilities, and residential clients across the region.
              </p>
              <p className="text-brand-accent1 leading-relaxed">
                Our commitment to quality, innovation, and customer satisfaction has enabled us to build lasting relationships with our clients and partners, 
                making us a preferred choice for technology solutions in Eastern Uttar Pradesh.
              </p>
            </div>
            <div className="md:w-1/2 bg-white p-6 rounded-lg shadow-md border border-brand-accent2">
              <h3 className="text-2xl font-semibold mb-4 text-brand-primary">Our Approach</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <span className="text-brand-secondary mr-3 mt-1">✓</span>
                  <div>
                    <h4 className="font-medium">Consultative Process</h4>
                    <p className="text-sm text-brand-accent1">We begin every project with a detailed consultation to understand your specific requirements.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-brand-secondary mr-3 mt-1">✓</span>
                  <div>
                    <h4 className="font-medium">Custom Solutions</h4>
                    <p className="text-sm text-brand-accent1">We design and implement solutions tailored to your unique business challenges.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-brand-secondary mr-3 mt-1">✓</span>
                  <div>
                    <h4 className="font-medium">Quality Assurance</h4>
                    <p className="text-sm text-brand-accent1">We use only premium products and follow industry best practices in all our installations.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-brand-secondary mr-3 mt-1">✓</span>
                  <div>
                    <h4 className="font-medium">Ongoing Support</h4>
                    <p className="text-sm text-brand-accent1">We provide comprehensive post-implementation support and maintenance services.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Mission */}
        <section className="mb-16 bg-white p-8 rounded-lg shadow-md border border-brand-accent2">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-brand-primary">Our Mission</h2>
            <p className="text-xl text-brand-accent1 leading-relaxed mb-8">
              To empower businesses and individuals with cutting-edge technology solutions that enhance security, 
              connectivity, and sustainability while providing exceptional value and support.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-brand-secondary text-2xl">🔌</span>
                </div>
                <h3 className="font-semibold mb-2">Connectivity</h3>
                <p className="text-sm text-brand-accent1">
                  Creating reliable network infrastructure that keeps you connected in today's digital world.
                </p>
              </div>
              <div className="p-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-brand-secondary text-2xl">🔒</span>
                </div>
                <h3 className="font-semibold mb-2">Security</h3>
                <p className="text-sm text-brand-accent1">
                  Implementing comprehensive surveillance systems to protect what matters most.
                </p>
              </div>
              <div className="p-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-brand-secondary text-2xl">☀️</span>
                </div>
                <h3 className="font-semibold mb-2">Sustainability</h3>
                <p className="text-sm text-brand-accent1">
                  Promoting renewable energy solutions for a greener and more sustainable future.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Services */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-brand-primary text-center">Our Comprehensive Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md border border-brand-accent2 hover:shadow-lg transition">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-brand-secondary text-2xl">🌐</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-brand-primary">Networking Solutions</h3>
              <p className="text-brand-accent1 mb-4">
                Enterprise-grade networking infrastructure setup and maintenance including network design, wireless setup, 
                and 24/7 monitoring services.
              </p>
              <ul className="text-sm text-brand-accent1 space-y-1">
                <li className="flex items-start">
                  <span className="text-brand-secondary mr-2">•</span>
                  <span>Network Design & Implementation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-secondary mr-2">•</span>
                  <span>Wireless Network Setup</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-secondary mr-2">•</span>
                  <span>Network Tower Installation</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border border-brand-accent2 hover:shadow-lg transition">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-brand-secondary text-2xl">📹</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-brand-primary">Surveillance Systems</h3>
              <p className="text-brand-accent1 mb-4">
                Comprehensive security camera solutions for businesses and homes with professional installation
                and ongoing maintenance.
              </p>
              <ul className="text-sm text-brand-accent1 space-y-1">
                <li className="flex items-start">
                  <span className="text-brand-secondary mr-2">•</span>
                  <span>CCTV Installation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-secondary mr-2">•</span>
                  <span>IP Camera Systems</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-secondary mr-2">•</span>
                  <span>Surveillance System Maintenance</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border border-brand-accent2 hover:shadow-lg transition">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-brand-secondary text-2xl">🌍</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-brand-primary">Internet Services</h3>
              <p className="text-brand-accent1 mb-4">
                High-speed internet solutions in partnership with leading providers like Airtel, Ralwire, and Netsathi Networks.
              </p>
              <ul className="text-sm text-brand-accent1 space-y-1">
                <li className="flex items-start">
                  <span className="text-brand-secondary mr-2">•</span>
                  <span>Broadband Connectivity</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-secondary mr-2">•</span>
                  <span>Dedicated Internet Access</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-secondary mr-2">•</span>
                  <span>Static IP Services All Over India</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border border-brand-accent2 hover:shadow-lg transition">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-brand-secondary text-2xl">☀️</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-brand-primary">Solar Power Solutions</h3>
              <p className="text-brand-accent1 mb-4">
                Renewable energy systems for homes and businesses with complete installation services and ongoing support.
              </p>
              <ul className="text-sm text-brand-accent1 space-y-1">
                <li className="flex items-start">
                  <span className="text-brand-secondary mr-2">•</span>
                  <span>Residential Solar Systems</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-secondary mr-2">•</span>
                  <span>Commercial Solar Installations</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-secondary mr-2">•</span>
                  <span>Solar Maintenance & Support</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border border-brand-accent2 hover:shadow-lg transition">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-brand-secondary text-2xl">🔌</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-brand-primary">Electrical & Network Wiring</h3>
              <p className="text-brand-accent1 mb-4">
                Premium wiring solutions using trusted brands like Havells, Anchor, and D-Link for both commercial and residential needs.
              </p>
              <ul className="text-sm text-brand-accent1 space-y-1">
                <li className="flex items-start">
                  <span className="text-brand-secondary mr-2">•</span>
                  <span>Commercial Electrical Wiring</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-secondary mr-2">•</span>
                  <span>Structured Network Cabling</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-secondary mr-2">•</span>
                  <span>Electrical Maintenance</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md border border-brand-accent2 hover:shadow-lg transition">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-brand-secondary text-2xl">📋</span>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-brand-primary">Technical Consulting</h3>
              <p className="text-brand-accent1 mb-4">
                Expert consultation services for IT infrastructure and security to help businesses make informed technology decisions.
              </p>
              <ul className="text-sm text-brand-accent1 space-y-1">
                <li className="flex items-start">
                  <span className="text-brand-secondary mr-2">•</span>
                  <span>Security Audits</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-secondary mr-2">•</span>
                  <span>IT Infrastructure Planning</span>
                </li>
                <li className="flex items-start">
                  <span className="text-brand-secondary mr-2">•</span>
                  <span>Training & Knowledge Transfer</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-brand-primary text-center">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md border border-brand-accent2 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-brand-secondary text-2xl">{value.icon}</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-brand-primary">{value.title}</h3>
                <p className="text-brand-accent1">{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Our Journey Timeline */}
{/*         <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-brand-primary text-center">Our Journey</h2>
          <div className="relative">
            
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-200"></div>
            
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`relative flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                  <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'pr-8 md:text-right' : 'pl-8'}`}>
                    <div className="bg-white p-4 rounded-lg shadow-md border border-brand-accent2">
                      <span className="text-brand-secondary font-bold">{milestone.year}</span>
                      <p className="text-brand-accent1">{milestone.event}</p>
                    </div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-brand-primary border-4 border-blue-100 z-10"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section> */}

        {/* Our Partners */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-brand-primary text-center">Our Strategic Partners</h2>
          <div className="bg-white p-8 rounded-lg shadow-md border border-brand-accent2">
            <p className="text-brand-accent1 text-center mb-8">
              We've established strong partnerships with industry leaders to ensure we deliver the best products and services to our clients.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {partners.map((partner, index) => (
                <div key={index} className="text-center p-4">
                  <div className="h-16 mx-auto mb-3 flex items-center justify-center">
                    <img 
                      src={`/assets/partners/${partner.name.toLowerCase().replace(/\s+/g, '-')}.png`} 
                      alt={`${partner.name} logo`}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <h3 className="font-semibold text-brand-primary">{partner.name}</h3>
                  <p className="text-sm text-brand-accent1">{partner.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Service Areas */}
        <section className="mb-16 bg-white p-8 rounded-lg shadow-md border border-brand-accent2">
          <h2 className="text-2xl font-semibold mb-6 text-brand-primary">Areas We Serve</h2>
          <p className="text-brand-accent1 mb-4">
            We currently provide our comprehensive services across major parts of Uttar Pradesh East, including:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-3 rounded text-center border border-brand-accent2">
              <span className="font-medium text-brand-primary">Maharajganj</span>
            </div>
            <div className="bg-blue-50 p-3 rounded text-center border border-brand-accent2">
              <span className="font-medium text-brand-primary">Siddharthnagar</span>
            </div>
            <div className="bg-blue-50 p-3 rounded text-center border border-brand-accent2">
              <span className="font-medium text-brand-primary">Gorakhpur</span>
            </div>
            <div className="bg-blue-50 p-3 rounded text-center border border-brand-accent2">
              <span className="font-medium text-brand-primary">Nautanwa</span>
            </div>
            <div className="bg-blue-50 p-3 rounded text-center border border-brand-accent2">
              <span className="font-medium text-brand-primary">Barhni</span>
            </div>
            <div className="bg-blue-50 p-3 rounded text-center border border-brand-accent2">
              <span className="font-medium text-brand-primary">Nichlaul</span>
            </div>
            <div className="bg-blue-50 p-3 rounded text-center border border-brand-accent2">
              <span className="font-medium text-brand-primary">Basti</span>
            </div>
            <div className="bg-blue-50 p-3 rounded text-center border border-brand-accent2">
              <span className="font-medium text-brand-primary">And Many More</span>
            </div>
          </div>
          <p className="text-brand-accent1 mt-4">
            Through our partnerships, we can provide Static IP services nationwide across India.
          </p>
        </section>

        {/* Call To Action */}
        <section className="bg-gradient-to-r from-blue-700 to-blue-900 p-8 rounded-lg shadow-md text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Work With Us?</h2>
          <p className="mb-6">
            Contact us today for a consultation and let our experts design a customized solution for your needs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="/contact" 
              className="bg-white text-blue-700 hover:bg-blue-100 px-6 py-2 rounded-md font-medium transition"
            >
              Get In Touch
            </a>
            <a 
              href="/services" 
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-700 px-6 py-2 rounded-md font-medium transition"
            >
              Explore Our Services
            </a>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default About;
