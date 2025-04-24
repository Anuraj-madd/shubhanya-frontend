import React from 'react';

const featuredProducts = [
  {
    id: 1,
    name: "IP Security Camera",
    price: "₹4,299",
    image: "/assets/ip-camera.jpg", // Replace with real images
  },
  {
    id: 2,
    name: "MikroTik Router",
    price: "₹7,499",
    image: "/assets/mikrotik.jpg",
  },
  {
    id: 3,
    name: "PoE Switch 8 Port",
    price: "₹3,999",
    image: "/assets/poe-switch.jpg",
  },
  {
    id: 4,
    name: "Wireless Access Point",
    price: "₹5,199",
    image: "/assets/access-point.jpg",
  },
];

const FeaturedProducts = () => {
  return (
    <section className="py-12 px-6 bg-bgLight dark:bg-textDark text-textDark dark:text-bgLight">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-primary dark:text-bgLight">
          Featured Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <div key={product.id} className="bg-white dark:bg-bgLight rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2 text-black dark:text-primary">{product.name}</h3>
                <p className="text-primary font-bold text-lg mb-3">{product.price}</p>
                <button className="bg-primary text-white dark:bg-bgDark px-4 py-2 rounded hover:bg-[#0f2c56] transition">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
