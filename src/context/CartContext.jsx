import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import axios from "axios";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [userId, setUserId] = useState(null);
  const [cartLoaded, setCartLoaded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser?.id) {
      setUserId(storedUser.id);
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

// Add this to CartContext.jsx's CartProvider
useEffect(() => {
  const checkUserAuth = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser?.id) {
      setUserId(storedUser.id);
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  };

  // Check immediately on mount
  checkUserAuth();
  
  // Also set up an event listener for localStorage changes
  window.addEventListener('storage', checkUserAuth);
  
  return () => {
    window.removeEventListener('storage', checkUserAuth);
  };
}, []);
  
  const fetchCart = useCallback(() => {
    if (userId) {
      const dataToSend = {
        mode: "fetch",
        user_id: parseInt(userId),
      };

      console.log("Request Data for fetchCart:", dataToSend);

      axios
        .post(
          "https://shubhanya-backend.onrender.com/cart.php",
          dataToSend,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          console.log("Fetched cart data:", res.data);
          setCartItems(Array.isArray(res.data) ? res.data : []);
          setCartLoaded(true);
        })
        .catch((err) => {
          console.error("Fetch cart error:", err);
          console.error("Error details:", err.response?.data || err.message);
          setCartLoaded(true);
        });
    } else {
      setCartLoaded(true);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      fetchCart();
    }
  }, [fetchCart, userId]);

  const addToCart = async (product) => {
    if (!isLoggedIn) {
      // Store current location to return after login
      sessionStorage.setItem('returnUrl', window.location.pathname);
      return false; // Return false to indicate login required
    }
    
    try {
      console.log("Adding product to cart:", product);
      
      // Make sure we're sending the correct product_id
      // product could be either from ProductListing or directly from the Cart
      const productId = product.product_id || product.id;
      
      if (!productId) {
        console.error("Invalid product ID:", product);
        return;
      }
      
      const dataToSend = {
        mode: "add",
        user_id: parseInt(userId),
        product_id: parseInt(productId),
        quantity: 1,
      };

      console.log("Request Data for addToCart:", dataToSend);

      const response = await axios.post(
        "https://shubhanya-backend.onrender.com/cart.php",
        dataToSend,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      
      console.log("Add to cart response:", response.data);
      
      if (response.data.status === "success") {
        fetchCart(); // Refresh cart after adding
        return true; // Return true to indicate success
      } else {
        console.error("Failed to add to cart:", response.data.message);
        return false;
      }
    } catch (err) {
      console.error("Error adding to cart:", err);
      console.error("Error details:", err.response?.data || err.message);
      return false;
    }
  };

  const updateQuantity = async (productId, quantity) => {
    try {
      const dataToSend = {
        mode: "update",
        user_id: parseInt(userId),
        product_id: parseInt(productId),
        quantity: parseInt(quantity),
      };

      console.log("Request Data for updateQuantity:", dataToSend);

      const response = await axios.post(
        "https://shubhanya-backend.onrender.com/cart.php",
        dataToSend,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      
      console.log("Update quantity response:", response.data);
      
      if (response.data.status === "success") {
        fetchCart(); // Refresh cart after updating
      } else {
        console.error("Failed to update quantity:", response.data.message);
      }
    } catch (error) {
      console.error("Update quantity error:", error);
      console.error("Error details:", error.response?.data || error.message);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const dataToSend = {
        mode: "delete",
        user_id: parseInt(userId),
        product_id: parseInt(productId),
      };

      console.log("Request Data for removeFromCart:", dataToSend);

      const response = await axios.post(
        "https://shubhanya-backend.onrender.com/cart.php",
        dataToSend,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      
      console.log("Remove from cart response:", response.data);
      
      if (response.data.status === "success") {
        fetchCart(); // Refresh cart after removing
      } else {
        console.error("Failed to remove from cart:", response.data.message);
      }
    } catch (error) {
      console.error("Remove from cart error:", error);
      console.error("Error details:", error.response?.data || error.message);
    }
  };

  return (
    <CartContext.Provider
      value={{ 
        cartItems, 
        addToCart, 
        updateQuantity, 
        removeFromCart,
        fetchCart,
        cartLoaded,
        isLoggedIn
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
