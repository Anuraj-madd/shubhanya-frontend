import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [userId, setUserId] = useState(null);
  const [cartLoaded, setCartLoaded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const quantityUpdateTimers = useRef({});

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
  // Get latest user state directly from localStorage
  const storedUser = JSON.parse(localStorage.getItem("user"));
  
  if (!isLoggedIn && !storedUser?.id) {
    // Store current location to return after login
    sessionStorage.setItem('returnUrl', window.location.pathname);
    return false; // Return false to indicate login required
  }
  
  // Use the userId from state, or from localStorage as fallback
  const currentUserId = userId || storedUser?.id;
  
  if (!currentUserId) {
    console.error("No user ID available for cart operation");
    return false;
  }
  
  try {
    console.log("Adding product to cart:", product);
    
    // Make sure we're sending the correct product_id
    const productId = product.product_id || product.id;
    
    if (!productId) {
      console.error("Invalid product ID:", product);
      return false;
    }
    
    const dataToSend = {
      mode: "add",
      user_id: parseInt(currentUserId),
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
      // Update local state if we weren't using the right ID
      if (!userId && storedUser?.id) {
        setUserId(storedUser.id);
        setIsLoggedIn(true);
      }
      
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

  const updateQuantity = (productId, quantity) => {
    const parsedQuantity = parseInt(quantity);
    const parsedProductId = parseInt(productId);
    const parsedUserId = parseInt(userId);

    if (!parsedUserId || !parsedProductId || isNaN(parsedQuantity) || parsedQuantity < 1) {
      console.warn("Invalid updateQuantity params", { parsedUserId, parsedProductId, parsedQuantity });
      return;
    }

    // 1) Optimistic UI update
    setCartItems((prev) =>
      (prev || []).map((item) =>
        parseInt(item.id) === parsedProductId ? { ...item, quantity: parsedQuantity } : item
      )
    );

    // 2) Store a short-lived record in localStorage
    try {
      const key = `cart_pending_updates_${parsedUserId}`;
      const pendingRaw = localStorage.getItem(key);
      const pending = pendingRaw ? JSON.parse(pendingRaw) : {};
      pending[parsedProductId] = { quantity: parsedQuantity, ts: Date.now() };
      localStorage.setItem(key, JSON.stringify(pending));
    } catch (e) {
      console.warn("Failed to write pending cart update to localStorage", e);
    }

    // 3) Debounce server sync (~60ms)
    if (quantityUpdateTimers.current[parsedProductId]) {
      clearTimeout(quantityUpdateTimers.current[parsedProductId]);
    }

    quantityUpdateTimers.current[parsedProductId] = setTimeout(async () => {
      try {
        const dataToSend = {
          mode: "update",
          user_id: parsedUserId,
          product_id: parsedProductId,
          quantity: parsedQuantity,
        };

        console.log("Debounced sync for updateQuantity:", dataToSend);

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

        // Clean up the short-lived pending entry (it only needs to live ~60ms)
        try {
          const key = `cart_pending_updates_${parsedUserId}`;
          const pendingRaw = localStorage.getItem(key);
          const pending = pendingRaw ? JSON.parse(pendingRaw) : {};
          delete pending[parsedProductId];
          localStorage.setItem(key, JSON.stringify(pending));
        } catch (e) {
          console.warn("Failed to clear pending cart update from localStorage", e);
        }

        if (response.data.status === "success") {
          // Optionally refresh cart to ensure server is source of truth
          fetchCart();
        } else {
          console.error("Failed to update quantity:", response.data.message);
        }
      } catch (error) {
        console.error("Update quantity error:", error);
        console.error("Error details:", error.response?.data || error.message);
      }
    }, 60);
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
