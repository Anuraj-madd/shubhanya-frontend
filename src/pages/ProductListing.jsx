import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [expandedProduct, setExpandedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [view, setView] = useState("grid"); // Default grid view for all devices
  const [sortOption, setSortOption] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { cartItems, addToCart, cartLoaded, isLoggedIn } = useCart();
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await axios.get("https://shubhanya-backend.onrender.com/product.php");
        setProducts(res.data);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
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
      if (sortOption === "newest") return new Date(b.created_at || 0) - new Date(a.created_at || 0);
      return 0;
    });

  const isInCart = (productId) => {
    return cartItems.some((item) => parseInt(item.id) === parseInt(productId));
  };

  const handleAddToCart = (product) => {
    if (!isLoggedIn) {
      navigate("/login", { state: { from: "/products", productId: product.id } });
      return;
    }
    addToCart(product);
  };

  const handleProductAction = (product, inCart) => {
    if (inCart) {
      navigate("/cart");
    } else {
      handleAddToCart(product);
    }
  };

  const getStockDisplay = (stock) => {
    const stockNum = parseInt(stock);
    if (stockNum === 0) {
      return { text: "Out of Stock", className: "text-red-600" };
    } else if (stockNum <= 5) {
      return { text: `Only ${stockNum} left!`, className: "text-amber-600" };
    } else {
      return { text: "In Stock", className: "text-green-600" };
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="bg-[#F5F7FA] min-h-screen flex items-center justify-center">
          <div className="text-center p-8">
            <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-[#415A77] border-r-transparent align-[-0.125em]" role="status">
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
            </div>
            <p className="mt-4 text-lg text-[#1B263B]">Loading products...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="bg-[#F5F7FA] min-h-screen flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-md border border-[#778DA9] max-w-md w-full">
            <div className="text-red-500 text-center mb-4 text-5xl">!</div>
            <h2 className="text-2xl font-bold text-center text-[#0D1B2A] mb-4">Something went wrong</h2>
            <p className="text-[#415A77] text-center mb-6">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="w-full bg-[#415A77] text-white py-2 rounded-md hover:bg-[#1B263B] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#415A77] focus:ring-opacity-50"
            >
              Try Again
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="bg-[#F5F7FA] min-h-screen p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-[#0D1B2A] mb-6">Our Products</h1>
          
          {/* Utility Bar */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4 mb-6 bg-white rounded-lg shadow-md border border-[#778DA9]/20">
            <div className="relative w-full md:w-1/3">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border border-[#778DA9]/30 p-2 pl-10 rounded-lg w-full text-[#1B1B1B] focus:outline-none focus:ring-2 focus:ring-[#415A77] focus:border-transparent"
              />
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 absolute left-3 top-2.5 text-[#778DA9]" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            
            <div className="flex items-center gap-4 w-full md:w-auto justify-between">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="border border-[#778DA9]/30 p-2 rounded-lg text-[#1B1B1B] focus:outline-none focus:ring-2 focus:ring-[#415A77] focus:border-transparent"
              >
                <option value="">Sort by</option>
                <option value="lowToHigh">Price: Low to High</option>
                <option value="highToLow">Price: High to Low</option>
                <option value="newest">Newest First</option>
              </select>
              
              <div className="flex items-center bg-[#E0E1DD] rounded-lg overflow-hidden">
                <button
                  onClick={() => setView("grid")}
                  className={`p-2 transition-colors duration-300 ${
                    view === "grid"
                      ? "bg-[#415A77] text-white"
                      : "bg-[#E0E1DD] text-[#1B1B1B] hover:bg-[#D1D2D0]"
                  }`}
                  aria-label="Grid View"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  onClick={() => setView("list")}
                  className={`p-2 transition-colors duration-300 ${
                    view === "list"
                      ? "bg-[#415A77] text-white"
                      : "bg-[#E0E1DD] text-[#1B1B1B] hover:bg-[#D1D2D0]"
                  }`}
                  aria-label="List View"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Product Count */}
          <p className="text-[#415A77] mb-4 font-medium">
            Showing {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"}
          </p>

          {/* No Results */}
          {filteredProducts.length === 0 && (
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-[#778DA9] mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-semibold text-[#0D1B2A] mb-2">No products found</h3>
              <p className="text-[#415A77]">Try adjusting your search or clear filters</p>
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")} 
                  className="mt-4 px-4 py-2 bg-[#415A77] text-white rounded-md hover:bg-[#1B263B] transition-colors duration-300"
                >
                  Clear search
                </button>
              )}
            </div>
          )}

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
              const isOutOfStock = product.stock === "0";
              const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);
              const stockStatus = getStockDisplay(product.stock);
              
              return (
                <div
                  key={product.id}
                  className={`relative bg-white rounded-lg shadow-md overflow-hidden flex flex-col ${
                    view === "list" ? "md:flex-row" : ""
                  } hover:shadow-lg transition-all duration-300 group border border-gray-100`}
                >
                  {/* Modified Out of Stock overlay - reduced blur and opacity for better visibility */}
                  {isOutOfStock && (
                    <div className="absolute inset-0 bg-white bg-opacity-40 backdrop-blur-[2px] z-10 flex items-center justify-center">
                      <div className="bg-red-600 text-white font-bold text-lg px-4 py-2 rounded-lg shadow">Out of Stock</div>
                    </div>
                  )}

                  {discount > 0 && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                      {discount}% OFF
                    </div>
                  )}

                  <div
                    className={`${
                      view === "list" ? "w-40 h-40 md:w-48 md:h-48 flex-shrink-0" : "w-full h-[200px]"
                    } flex items-center justify-center p-4 bg-white group-hover:scale-105 transition-transform duration-300`}
                  >
                    <img
                      src={
                        product.image.startsWith("http")
                          ? product.image
                          : `https://shubhanya-backend.onrender.com/uploads/${product.image}`
                      }
                      alt={product.name}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://via.placeholder.com/150?text=No+Image";
                      }}
                    />
                  </div>

                  <div className="flex flex-col justify-between w-full p-4 flex-grow">
                    <div>
                      <h3 className="font-semibold text-lg text-[#0D1B2A] line-clamp-2">{product.name}</h3>
                      <p className="text-[#415A77] text-sm mt-2 line-clamp-2 h-[40px]">
                        {product.description}
                      </p>
                      <div className="flex items-center mt-2">
                        <span className="font-bold text-lg text-green-600 mr-2">₹{product.price}</span>
                        {product.mrp > product.price && (
                          <span className="line-through text-red-400 text-sm">₹{product.mrp}</span>
                        )}
                      </div>
                      
                      <div className={`text-xs font-medium mt-1 ${stockStatus.className}`}>
                        {stockStatus.text}
                      </div>
                    </div>

                    <div className="mt-4 space-y-2">
                      <button
                        onClick={() => setExpandedProduct(product)}
                        className="bg-white border border-[#1CC5DC] text-[#1CC5DC] hover:bg-[#1CC5DC] hover:text-white font-medium px-3 py-2 rounded-lg w-full transition-colors duration-300 flex items-center justify-center gap-2"
                        disabled={isOutOfStock}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        Quick View
                      </button>
                      <button
                        onClick={() => handleProductAction(product, inCart)}
                        disabled={isOutOfStock}
                        className={`px-4 py-2 w-full rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-sm ${
                          inCart 
                            ? "bg-green-600 hover:bg-green-700 text-white" 
                            : "bg-[#415A77] hover:bg-[#0D1B2A] text-white hover:shadow-md"
                        }`}
                      >
                        {inCart ? (
                          <>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            View in Cart
                          </>
                        ) : (
                          <>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            Add to Cart
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Product Detail Modal */}
        {expandedProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm p-4" onClick={() => setExpandedProduct(null)}>
            <div 
              className="bg-white max-w-3xl w-full p-0 rounded-xl relative border border-[#778DA9]/20 max-h-[90vh] overflow-hidden shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setExpandedProduct(null)}
                className="absolute top-4 right-4 text-gray-600 hover:text-black bg-white/80 backdrop-blur-sm rounded-full w-8 h-8 flex items-center justify-center shadow-md z-10"
                aria-label="Close"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <div className="md:flex h-full">
                <div className="md:w-1/2 bg-[#F5F7FA] p-6 flex items-center justify-center">
                  <div className="relative w-full">
                    {parseInt(expandedProduct.stock) === 0 && (
                      <div className="absolute top-0 right-0 bg-red-500 text-white px-3 py-1 rounded-lg font-medium">
                        Out of Stock
                      </div>
                    )}
                    <img
                      src={
                        expandedProduct.image.startsWith("http")
                          ? expandedProduct.image
                          : `https://shubhanya-backend.onrender.com/uploads/${expandedProduct.image}`
                      }
                      alt={expandedProduct.name}
                      className="w-full h-64 object-contain"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://via.placeholder.com/300?text=No+Image";
                      }}
                    />
                  </div>
                </div>
                
                <div className="md:w-1/2 p-6 overflow-y-auto max-h-[70vh] md:max-h-[90vh]">
                  <h2 className="text-2xl font-bold text-[#0D1B2A] mb-3">
                    {expandedProduct.name}
                  </h2>
                  
                  <div className="flex items-center mb-4">
                    <span className="font-bold text-2xl text-green-600 mr-3">₹{expandedProduct.price}</span>
                    {expandedProduct.mrp > expandedProduct.price && (
                      <>
                        <span className="line-through text-red-400 text-lg mr-2">₹{expandedProduct.mrp}</span>
                        <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">
                          {Math.round(((expandedProduct.mrp - expandedProduct.price) / expandedProduct.mrp) * 100)}% OFF
                        </span>
                      </>
                    )}
                  </div>
                  
                  <div className="mb-6 text-[#415A77]">
                    <div className="prose prose-sm max-w-none">
                      <p className="mb-4">{expandedProduct.description}</p>
                    </div>
                    
                    {expandedProduct.stock && (
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mt-2 ${
                        getStockDisplay(expandedProduct.stock).className === "text-green-600" 
                          ? "bg-green-100" 
                          : getStockDisplay(expandedProduct.stock).className === "text-amber-600"
                            ? "bg-amber-100"
                            : "bg-red-100"
                      }`}>
                        <span className={getStockDisplay(expandedProduct.stock).className}>
                          {getStockDisplay(expandedProduct.stock).text}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {expandedProduct.category && (
                    <div className="mb-6">
                      <h4 className="text-sm text-[#778DA9] mb-1">Category</h4>
                      <span className="bg-[#E0E1DD] text-[#415A77] text-xs px-3 py-1 rounded-full">
                        {expandedProduct.category}
                      </span>
                    </div>
                  )}
                  
                  {expandedProduct.brand && (
                    <div className="mb-6">
                      <h4 className="text-sm text-[#778DA9] mb-1">Brand</h4>
                      <span className="font-medium text-[#1B263B]">{expandedProduct.brand}</span>
                    </div>
                  )}
                  
                  <div className="space-y-3">
                    <button
                      onClick={() => {
                        const inCart = isInCart(expandedProduct.id);
                        handleProductAction(expandedProduct, inCart);
                        if (!inCart && isLoggedIn) {
                          setExpandedProduct(null);
                        }
                      }}
                      disabled={expandedProduct.stock === "0"}
                      className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                        isInCart(expandedProduct.id) 
                          ? "bg-green-600 hover:bg-green-700 text-white" 
                          : "bg-[#415A77] hover:bg-[#0D1B2A] text-white"
                      } shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      {isInCart(expandedProduct.id) ? (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          View in Cart
                        </>
                      ) : (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                          </svg>
                          Add to Cart
                        </>
                      )}
                    </button>
                    
                    <button
                      onClick={() => setExpandedProduct(null)}
                      className="w-full py-3 px-6 rounded-lg font-medium transition-colors duration-300 border border-[#778DA9]/30 text-[#415A77] hover:bg-[#F5F7FA] flex items-center justify-center"
                    >
                      Continue Shopping
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ProductListing;
