import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [expandedProduct, setExpandedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [view, setView] = useState("grid");
  const [sortOption, setSortOption] = useState("");
  const { cartItems, addToCart, cartLoaded } = useCart();

  useEffect(() => {
    const updateView = () => {
      setView(window.innerWidth < 768 ? "list" : "grid");
    };
    updateView();
    window.addEventListener("resize", updateView);
    return () => window.removeEventListener("resize", updateView);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("https://shubhanya-backend.onrender.com/product.php");
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === "lowToHigh") return a.price - b.price;
      if (sortOption === "highToLow") return b.price - a.price;
      return 0;
    });

  const isInCart = (productId) => {
    return cartItems.some((item) => parseInt(item.id) === parseInt(productId));
  };

  const handleAddToCart = (product) => {
    // Pass the original product directly to addToCart
    addToCart(product);
  };

  return (
    <>
      <Navbar />
      <div className="bg-[#F5F7FA] min-h-screen p-4">
        {/* Utility Bar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4 mb-6 bg-white rounded shadow-md border border-[#778DA9]">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-[#778DA9] p-2 rounded-md w-full md:w-1/3 text-[#1B1B1B]"
          />
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="border border-[#778DA9] p-2 rounded-md text-[#1B1B1B]"
          >
            <option value="">Sort by</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
          </select>
          <div className="flex gap-2">
            <button
              onClick={() => setView("grid")}
              className={`px-3 py-2 rounded-md font-medium ${
                view === "grid"
                  ? "bg-[#415A77] text-white"
                  : "bg-[#E0E1DD] text-[#1B1B1B]"
              }`}
            >
              Grid View
            </button>
            <button
              onClick={() => setView("list")}
              className={`px-3 py-2 rounded-md font-medium ${
                view === "list"
                  ? "bg-[#415A77] text-white"
                  : "bg-[#E0E1DD] text-[#1B1B1B]"
              }`}
            >
              List View
            </button>
          </div>
        </div>

        {/* Product Listing */}
        <div
          className={`grid gap-6 ${
            view === "grid"
              ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
              : "grid-cols-1"
          }`}
        >
          {filteredProducts.map((product) => {
            const inCart = isInCart(product.id);
            return (
              <div
                key={product.id}
                className={`relative bg-white rounded-lg shadow-md border border-[#778DA9] overflow-hidden flex flex-col justify-between ${
                  view === "list" ? "md:flex-row h-auto" : "min-h-[440px]"
                }`}
              >
                {product.stock === "0" && (
                  <div className="absolute inset-0 bg-white bg-opacity-60 backdrop-blur-sm z-10 flex items-center justify-center">
                    <span className="text-red-600 font-bold text-xl">Out of Stock</span>
                  </div>
                )}

                <div
                  className={`${
                    view === "list" ? "w-40 h-40" : "w-full h-[200px]"
                  } flex items-center justify-center p-2`}
                >
                  <img
                    src={
                      product.image.startsWith("http")
                        ? product.image
                        : `https://shubhanya-backend.onrender.com/uploads/${product.image}`
                    }
                    alt={product.name}
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="flex flex-col justify-between w-full p-4 flex-grow">
                  <div>
                    <h3 className="font-semibold text-lg text-[#0D1B2A]">{product.name}</h3>
                    <p className="text-[#415A77] text-sm mt-1 h-[40px] line-clamp-2">
                      {product.description}
                    </p>
                    <div className="text-sm text-[#1B263B] mt-1">
                      <span className="line-through text-red-400 mr-2">₹{product.mrp}</span>
                      <span className="font-bold text-green-600">₹{product.price}</span>
                    </div>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => setExpandedProduct(product)}
                      className="bg-[#1CC5DC] hover:bg-[#415A77] text-white font-medium px-3 py-1 rounded w-full"
                      disabled={product.stock === "0"}
                    >
                      View Detail
                    </button>
                    <button
                      onClick={() =>
                        inCart ? (window.location.href = "/cart") : handleAddToCart(product)
                      }
                      disabled={product.stock === "0"}
                      className={`px-4 py-2 w-full ${
                        inCart ? "bg-green-600" : "bg-[#415A77]"
                      } text-white rounded hover:bg-[#1B263B]`}
                    >
                      {inCart ? "View in Cart" : "Add to Cart"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Product Detail Modal */}
        {expandedProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="bg-white max-w-lg w-full p-6 rounded-lg relative border border-[#778DA9]">
              <button
                onClick={() => setExpandedProduct(null)}
                className="absolute top-2 right-2 text-gray-600 hover:text-black"
              >
                ✖
              </button>
              <img
                src={`https://shubhanya-backend.onrender.com/uploads/${expandedProduct.image}`}
                alt={expandedProduct.name}
                className="w-full h-60 object-contain mb-4 rounded"
              />
              <h2 className="text-2xl font-bold text-[#0D1B2A] mb-2">
                {expandedProduct.name}
              </h2>
              <p className="text-[#415A77] mb-3">{expandedProduct.description}</p>
              <div className="text-sm text-[#1B263B] mb-4">
                <span className="line-through text-red-400 mr-2">₹{expandedProduct.mrp}</span>
                <span className="font-bold text-green-600">₹{expandedProduct.price}</span>
              </div>
              {cartLoaded ? (
                <button
                  onClick={() =>
                    isInCart(expandedProduct.id)
                      ? (window.location.href = "/cart")
                      : handleAddToCart(expandedProduct)
                  }
                  className={`mt-4 px-4 py-2 ${
                    isInCart(expandedProduct.id) ? "bg-green-600" : "bg-[#415A77]"
                  } text-white rounded hover:bg-[#1B263B]`}
                >
                  {isInCart(expandedProduct.id) ? "View in Cart" : "Add to Cart"}
                </button>
              ) 
              : (
                <button
                  className="mt-4 px-4 py-2 bg-gray-400 text-white rounded"
                  disabled
                >
                  Loading...
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ProductListing;