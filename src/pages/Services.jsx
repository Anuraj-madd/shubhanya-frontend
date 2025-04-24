import React from 'react';
import Navbar from "../components/Navbar";
import Footer from '../components/Footer';

const Services = () => {
  // Service categories with their details
  const serviceCategories = [
    {
      id: 'networking',
      title: 'Networking Solutions',
      icon: 'network',
      description: 'Enterprise-grade networking infrastructure setup and maintenance',
      services: [
        {
          name: 'Network Design & Implementation',
          description: 'Custom network architecture design and deployment tailored to your business requirements',
          features: ['Scalable network planning', 'Hardware selection & configuration', 'Security implementation', 'Performance optimization']
        },
        {
          name: 'Wireless Network Setup',
          description: 'High-performance WiFi solutions for offices, warehouses, and commercial spaces',
          features: ['Site survey & analysis', 'Access point installation', 'Network segmentation', 'Guest network setup']
        },
        {
          name: 'Network Monitoring & Maintenance',
          description: '24/7 monitoring and proactive maintenance of your network infrastructure',
          features: ['Real-time performance monitoring', 'Issue detection & resolution', 'Regular security updates', 'Network health reports']
        },
        {
          name: 'Network Tower Installation',
          description: 'Custom network tower installation for enhanced connectivity in rural and urban areas',
          features: ['Site assessment & planning', 'Tower structure setup', 'Equipment mounting', 'Signal optimization', 'Regulatory compliance']
        }
      ]
    },
    {
      id: 'surveillance',
      title: 'Surveillance Systems',
      icon: 'camera',
      description: 'Comprehensive security camera solutions for businesses and homes',
      services: [
        {
          name: 'CCTV Installation',
          description: 'Professional installation of security cameras and recording systems',
          features: ['Site security assessment', 'Camera placement optimization', 'DVR/NVR setup', 'Mobile viewing configuration']
        },
        {
          name: 'IP Camera Systems',
          description: 'Advanced IP-based surveillance systems with remote monitoring capabilities',
          features: ['High-resolution cameras', 'Cloud storage options', 'Smart motion detection', 'Integration with existing systems']
        },
        {
          name: 'Surveillance System Maintenance',
          description: 'Regular maintenance and troubleshooting of your security systems',
          features: ['Preventive maintenance', 'Software updates', 'Hardware repairs', 'System optimization']
        }
      ]
    },
    {
      id: 'internet',
      title: 'Internet Services',
      icon: 'globe',
      description: 'High-speed internet solutions in partnership with leading providers',
      services: [
        {
          name: 'Broadband Connectivity',
          description: 'Reliable high-speed internet connections for homes and businesses',
          features: ['Multiple speed options', 'Unlimited data plans', 'Quick installation', '24/7 technical support']
        },
        {
          name: 'Dedicated Internet Access',
          description: 'Enterprise-grade dedicated internet connections with SLA guarantees',
          features: ['Symmetrical bandwidth', 'Guaranteed uptime', 'Priority support', 'Network redundancy']
        },
        {
          name: 'ISP Partnerships',
          description: 'Internet services through our partnerships with Airtel, Ralwire, and Netsathi Networks',
          features: ['Competitive pricing', 'Bundle offers', 'Single point of contact', 'Simplified billing']
        },
        {
          name: 'Static IP Services All Over India',
          description: 'Reliable static IP services across India in partnership with Netsathi Networks PVT LTD',
          features: ['Enterprise-grade static IPs', 'Multiple IP blocks available', 'Consistent connectivity', 'Technical implementation support', 'Business continuity solutions']
        }
      ]
    },
    {
      id: 'solar',
      title: 'Solar Power Solutions',
      icon: 'sun',
      description: 'Renewable energy systems for homes and businesses with complete installation services',
      services: [
        {
          name: 'Residential Solar Systems',
          description: 'Custom solar power solutions designed for homes and small businesses',
          features: ['Energy requirement assessment', 'System design & sizing', 'High-efficiency solar panels', 'Inverter installation', 'Battery backup options']
        },
        {
          name: 'Commercial Solar Installations',
          description: 'Large-scale solar power systems for commercial buildings and industrial facilities',
          features: ['ROI analysis & planning', 'Rooftop/ground mount options', 'Grid-tie systems', 'Power distribution setup', 'Performance monitoring']
        },
        {
          name: 'Solar Maintenance & Support',
          description: 'Ongoing maintenance and technical support for solar power systems',
          features: ['Regular system inspections', 'Panel cleaning services', 'Efficiency monitoring', 'Component replacement', 'System upgrades']
        }
      ]
    },
    {
      id: 'electrical',
      title: 'Electrical & Network Wiring',
      icon: 'plug-wire',
      description: 'Premium wiring solutions using trusted brands like Havells, Anchor, and D-Link',
      services: [
        {
          name: 'Commercial Electrical Wiring',
          description: 'Complete electrical wiring services for offices, retail spaces, and industrial facilities',
          features: ['Custom wiring diagrams', 'High-quality cable installation', 'Circuit breaker setup', 'Safety compliance', 'Load balancing']
        },
        {
          name: 'Structured Network Cabling',
          description: 'Professional network cabling and infrastructure installation',
          features: ['Cat6/Cat6A/Fiber optic cabling', 'Patch panel setup', 'Cable management systems', 'Testing & certification', 'Documentation']
        },
        {
          name: 'Electrical Maintenance',
          description: 'Preventive maintenance and troubleshooting for electrical systems',
          features: ['Safety inspections', 'Preventive maintenance', 'Emergency repairs', 'System upgrades', 'Compliance checks']
        }
      ]
    },
    {
      id: 'consulting',
      title: 'Technical Consulting',
      icon: 'clipboard',
      description: 'Expert consultation services for IT infrastructure and security',
      services: [
        {
          name: 'Security Audits',
          description: 'Comprehensive assessment of your network and physical security systems',
          features: ['Vulnerability scanning', 'Security gap analysis', 'Compliance checks', 'Detailed reports with recommendations']
        },
        {
          name: 'IT Infrastructure Planning',
          description: 'Strategic planning for your organization\'s IT and networking needs',
          features: ['Requirements analysis', 'Growth forecasting', 'Budget optimization', 'Technology recommendations']
        },
        {
          name: 'Training & Knowledge Transfer',
          description: 'Training sessions for your staff on security systems and network management',
          features: ['Customized training programs', 'Hands-on workshops', 'Documentation', 'Ongoing support']
        }
      ]
    }
  ];

  // Service process steps
  const processSteps = [
    {
      number: '01',
      title: 'Initial Consultation',
      description: 'We begin with a detailed discussion to understand your specific requirements and challenges.'
    },
    {
      number: '02',
      title: 'Site Assessment',
      description: 'Our technical team conducts a thorough assessment of your location to identify the best solutions.'
    },
    {
      number: '03',
      title: 'Proposal & Design',
      description: 'We create a customized proposal with detailed designs and specifications for your approval.'
    },
    {
      number: '04',
      title: 'Implementation',
      description: 'Our certified technicians install and configure all systems according to the approved plan.'
    },
    {
      number: '05',
      title: 'Testing & Handover',
      description: 'All systems undergo rigorous testing before final handover and training.'
    },
    {
      number: '06',
      title: 'Ongoing Support',
      description: 'We provide continued technical support and maintenance to ensure optimal performance.'
    }
  ];

  // Industries served
  const industries = [
    { name: 'Corporate Offices', icon: 'building' },
    { name: 'Retail Stores', icon: 'shopping-bag' },
    { name: 'Educational Institutions', icon: 'book' },
    { name: 'Healthcare Facilities', icon: 'heart' },
    { name: 'Hospitality', icon: 'hotel' },
    { name: 'Manufacturing', icon: 'industry' },
    { name: 'Residential Complexes', icon: 'home' },
    { name: 'Warehouses & Logistics', icon: 'truck' }
  ];

  // Featured services section - showcase the expanded services from home page
  const featuredServices = [
    {
      title: "Solar Power Solutions",
      icon: "sun",
      description: "Renewable energy systems that reduce electricity costs by up to 40% while providing a sustainable power source for your home or business. Our complete solutions include system design, installation, and maintenance.",
      link: "#solar"
    },
    {
      title: "Static IP All Over India",
      icon: "globe-network",
      description: "Enterprise-grade static IP services available nationwide through our partnership with Netsathi Networks PVT LTD. Ideal for businesses requiring consistent connectivity, remote access systems, and hosting applications.",
      link: "#internet"
    },
    {
      title: "Network Tower Installation",
      icon: "tower",
      description: "Custom network tower solutions that enhance connectivity in challenging environments. We handle everything from site assessment and regulatory compliance to construction and equipment mounting.",
      link: "#networking"
    },
    {
      title: "Electrical & Network Wiring",
      icon: "plug-wire",
      description: "Professional wiring services using premium brands like Havells, Anchor, and D-Link. Our certified technicians ensure safe, reliable, and future-proof electrical and network infrastructure.",
      link: "#electrical"
    }
  ];

  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-r from-blue-700 to-blue-900">
        <div className="absolute inset-0 overflow-hidden">
          <svg className="absolute right-0 top-0 h-full w-2/3 translate-x-1/3 opacity-20" viewBox="0 0 500 500">
            <defs>
              <path id="blob" d="M259.5,84.5Q257,169,186,233.5Q115,298,67.5,399Q20,500,126.5,486.5Q233,473,301.5,427Q370,381,356.5,304Q343,227,356.5,163.5Q370,100,315,42Q260,-16,259.5,84.5Z" />
            </defs>
            <use fill="#ffffff" href="#blob" />
          </svg>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">Our Services</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Comprehensive networking, surveillance, and internet solutions tailored to your business needs
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-blue-800">End-to-End Technology Solutions</h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto">
            At Shubhanya Enterprises, we provide comprehensive services that cover everything from initial consultation 
            and planning to implementation, maintenance, and support. Our team of certified professionals ensures that 
            your networking and security systems operate at peak performance, giving you peace of mind.
          </p>
        </div>
      </section>

      {/* Featured Services Highlight */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-800 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Featured Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredServices.map((service, index) => (
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
                <div className="text-center">
                  <a 
                    href={service.link} 
                    className="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md transition"
                  >
                    Learn More
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Categories */}
      {serviceCategories.map((category, index) => (
        <section 
          key={category.id} 
          id={category.id}
          className={`py-20 px-4 ${index % 2 === 1 ? 'bg-gray-100' : ''}`}
        >
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-center mb-12">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 md:mb-0 md:mr-6">
                <span className="text-blue-600 text-2xl">
                  {/* Icon placeholder */}
                  {category.icon === "network" && "🌐"}
                  {category.icon === "camera" && "📹"}
                  {category.icon === "globe" && "🌍"}
                  {category.icon === "clipboard" && "📋"}
                  {category.icon === "sun" && "☀️"}
                  {category.icon === "plug-wire" && "🔌"}
                </span>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-blue-800">{category.title}</h2>
                <p className="text-lg text-gray-600">{category.description}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {category.services.map((service, sIndex) => (
                <div key={sIndex} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                  <h3 className="text-xl font-semibold mb-3 text-blue-700">{service.name}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-start">
                        <span className="text-blue-500 mr-2">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Our Process */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-700 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">Our Service Process</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {processSteps.map((step, index) => (
              <div key={index} className="relative">
                <div className="absolute -left-4 -top-4 bg-blue-500 rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg">
                  {step.number}
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 pl-8 hover:bg-white/20 transition">
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-blue-100">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16 text-blue-800">Industries We Serve</h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {industries.map((industry, index) => (
              <div key={index} className="bg-white rounded-lg shadow p-6 text-center hover:shadow-md transition">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 text-xl">
                    {/* Icon placeholder */}
                    {industry.icon === "building" && "🏢"}
                    {industry.icon === "shopping-bag" && "🛍️"}
                    {industry.icon === "book" && "📚"}
                    {industry.icon === "heart" && "❤️"}
                    {industry.icon === "hotel" && "🏨"}
                    {industry.icon === "industry" && "🏭"}
                    {industry.icon === "home" && "🏠"}
                    {industry.icon === "truck" && "🚚"}
                  </span>
                </div>
                <h3 className="font-semibold text-blue-700">{industry.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-blue-50">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-blue-800">Ready to Get Started?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Contact us today for a free consultation and let our experts design a solution that fits your needs and budget.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="/contact" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md font-medium transition shadow-md"
            >
              Request Consultation
            </a>
            <a 
              href="tel:+919935970521" 
              className="bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-md font-medium transition"
            >
              Call Us Now
            </a>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-blue-800">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            {[
              {
                question: "What areas do you provide services in?",
                answer: "We currently provide our services across major parts of Uttar Pradesh East like Maharajganj, Siddharthnagar, Gorakhpur, Deoria, Basti. For other locations, please contact us to check availability."
              },
              {
                question: "Do you offer maintenance contracts for installed systems?",
                answer: "Yes, we offer comprehensive Annual Maintenance Contracts (AMC) that include regular preventive maintenance visits, priority support, and discounted rates on repairs and replacements."
              },
              {
                question: "Can you integrate new systems with our existing infrastructure?",
                answer: "Absolutely! Our technical team specializes in integrating new systems with existing infrastructure to maximize your current investments while providing enhanced capabilities."
              },
              {
                question: "What brands do you work with?",
                answer: "We work with leading brands in the industry including Cisco, Hikvision, Dahua, TP-Link, D-Link, Ubiquiti, Havells, Anchor and many more. We recommend products based on your specific requirements and budget."
              },
              {
                question: "How quickly can you respond to service requests?",
                answer: "For our contract customers, we offer response times as quick as 4 hours for critical issues. Standard service requests are typically addressed within 24 hours depending on location and complexity."
              },
              {
                question: "Do you provide static IP services outside of Uttar Pradesh?",
                answer: "Yes, through our partnership with Netsathi Networks PVT LTD, we can provide static IP services all across India for businesses requiring consistent IP addressing for their operations."
              },
              {
                question: "What types of solar power systems do you install?",
                answer: "We install both grid-tie and off-grid solar power systems for residential and commercial applications. Our solutions range from small home installations to large commercial setups depending on your energy requirements."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-2 text-blue-700">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Services;
