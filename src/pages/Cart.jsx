import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, fetchCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in by looking in localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      // Redirect to login page if the user is not logged in
      navigate("/login");
    } else {
      // Refresh cart data when component mounts
      fetchCart();
    }
  }, [navigate, fetchCart]);

  const handleQuantityChange = (id, delta) => {
    console.log("Changing quantity for product ID:", id, "by delta:", delta);
    const item = cartItems.find((i) => i.id === id);
    if (!item) {
      console.error("Item not found in cart:", id);
      return;
    }
  
    const newQuantity = item.quantity + delta;
    if (newQuantity > 0) {
      updateQuantity(id, newQuantity);
    } else {
      removeFromCart(id);
    }
  };

  const handleQuantityInput = (id, newQuantity) => {
    console.log("Setting quantity for product ID:", id, "to:", newQuantity);
    const item = cartItems.find((i) => i.id === id);
    if (!item) {
      console.error("Item not found in cart:", id);
      return;
    }

    // Convert to number and validate
    const quantity = parseInt(newQuantity);
    
    // Allow empty input for better UX (user can type)
    if (newQuantity === '') {
      return;
    }
    
    if (isNaN(quantity) || quantity < 1) {
      // If invalid input, don't update yet (let blur handle it)
      return;
    }
    
    // Limit maximum quantity to prevent abuse (e.g., 999)
    if (quantity > 999) {
      return;
    }
    
    if (quantity === 0) {
      removeFromCart(id);
    } else {
      updateQuantity(id, quantity);
    }
  };

  const handleQuantityBlur = (id, inputValue) => {
    const item = cartItems.find((i) => i.id === id);
    if (!item) return;

    const quantity = parseInt(inputValue);
    
    // If input is empty or invalid, revert to current quantity
    if (isNaN(quantity) || quantity < 1) {
      // Force re-render by updating with current quantity
      updateQuantity(id, item.quantity);
    }
  };

  const handleQuantityKeyPress = (e, id) => {
    // Handle Enter key press
    if (e.key === 'Enter') {
      e.target.blur(); // Trigger blur event to validate and update
    }
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  const handleRemove = (id) => {
    console.log("Removing item with ID:", id);
    removeFromCart(id);
  };

  const totalAmount = (cartItems || []).reduce(
    (total, item) => total + parseFloat(item.price) * parseInt(item.quantity),
    0
  );

  const taxAmount = totalAmount * 0.18;
  const priceWithoutTax = totalAmount - taxAmount;

  const shippingFee = totalAmount < 299 ? 40 : 0;
  const grandTotal = totalAmount + shippingFee;

  return (
    <div className="min-h-screen bg-[#E9ECEF] text-[#1B1F3B]">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

        {cartItems.length === 0 ? (
          <p className="text-lg">Your cart is empty.</p>
        ) : (
          <>
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-4 rounded-lg shadow-md flex flex-col sm:flex-row items-center sm:items-start gap-4 border border-[#94D2BD]"
                >
                  <img
                    src={`https://shubhanya-backend.onrender.com/uploads/${item.image}`}
                    alt={item.name}
                    className="w-32 h-32 object-contain rounded bg-white"
                  />
                  <div className="flex-1 w-full">
                    <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
                    <p className="text-lg mb-2 text-[#005F73]">₹{item.price}</p>
                    <div className="flex items-center gap-2 mb-2">
                      <button
                        onClick={() => handleQuantityChange(item.id, -1)}
                        className="px-2 py-1 bg-[#0A9396] text-white rounded hover:bg-[#005F73] transition-colors duration-200"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min="1"
                        max="999"
                        value={item.quantity}
                        onChange={(e) => handleQuantityInput(item.id, e.target.value)}
                        onBlur={(e) => handleQuantityBlur(item.id, e.target.value)}
                        onKeyPress={(e) => handleQuantityKeyPress(e, item.id)}
                        className="w-16 px-2 py-1 text-center border border-[#94D2BD] rounded focus:outline-none focus:ring-2 focus:ring-[#0A9396] focus:border-transparent hover:border-[#0A9396] transition-colors duration-200 bg-white"
                        aria-label="Quantity"
                        title="Click to edit quantity"
                      />
                      <button
                        onClick={() => handleQuantityChange(item.id, 1)}
                        className="px-2 py-1 bg-[#0A9396] text-white rounded hover:bg-[#005F73] transition-colors duration-200"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="text-red-500 hover:underline text-sm"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="text-lg font-semibold sm:ml-auto">
                    ₹{(parseFloat(item.price) * parseInt(item.quantity)).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            {/* Total Section */}
            <div className="mt-8 bg-white p-6 rounded-lg shadow-md border border-[#94D2BD]">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-stretch gap-6">
                {/* Summary Text */}
                <div className="space-y-2 text-left w-full md:w-2/3">
                  <h2 className="text-2xl font-bold mb-4">Summary</h2>
                  <p className="text-base">
                    Subtotal (Before Tax): ₹{priceWithoutTax.toFixed(2)}
                  </p>
                  <p className="text-base">
                    Tax (18% GST): ₹{taxAmount.toFixed(2)}
                  </p>
                  <p className="text-base">
                    Shipping Fee:{" "}
                    {shippingFee > 0 ? (
                      `₹${shippingFee.toFixed(2)}`
                    ) : (
                      <>
                        <span className="line-through text-red-500 mr-2">
                          ₹40.00
                        </span>
                        <span className="text-green-600 font-semibold">₹0</span>
                      </>
                    )}
                  </p>
                  <p className="text-xl font-semibold mt-4">
                    Total: ₹{grandTotal.toFixed(2)}
                  </p>
                </div>

                {/* Button */}
                <div className="w-full md:w-1/3 flex justify-end items-end">
                  <button onClick={handleCheckout} className="bg-[#94D2BD] hover:bg-[#0A9396] text-[#030303] font-semibold px-6 py-3 rounded transition-all">
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Cart;