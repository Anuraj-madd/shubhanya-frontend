import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';
import logo from '../assets/navlogo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  const isAdmin = user?.role === 'admin';

  return (
    <header className="sticky top-0 z-50 bg-[#0D1B2A] text-[#E0E1DD] shadow-lg">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
        <Link to="/">
          <img src={logo} alt="ShubhanyaEnterprises" className="h-10 w-auto" />
        </Link>

        {/* Navigation Links */}
        <ul className="hidden md:flex space-x-6 text-md font-medium">
          {isAdmin ? (
            <>
              <li><Link to="/admin/orders" className="hover:text-[#AAC7D8]">Orders</Link></li>
              <li><Link to="/admin/inventory" className="hover:text-[#AAC7D8]">Stock</Link></li>
              <li><Link to="/admin/reports" className="hover:text-[#AAC7D8]">Report</Link></li>
              <li><Link to="/admin/users" className="hover:text-[#AAC7D8]">Users</Link></li>
            </>
          ) : (
            <>
              <li><Link to="/" className="hover:text-[#AAC7D8]">Home</Link></li>
              <li><Link to="/services" className="hover:text-[#AAC7D8]">Services</Link></li>
              <li><Link to="/products" className="hover:text-[#AAC7D8]">Products</Link></li>
              <li><Link to="/about" className="hover:text-[#AAC7D8]">About</Link></li>
              <li><Link to="/contact" className="hover:text-[#AAC7D8]">Contact</Link></li>
            </>
          )}
        </ul>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          {!isAdmin && (
            <Link to="/cart" className="text-xl hover:text-[#AAC7D8]">
              <FaShoppingCart />
            </Link>
          )}

          {user ? (
            <>
              <span className="text-white text-sm font-medium">Hi, {user.firstname}</span>

              <Link
                to={isAdmin ? "/admin/dashboard" : "/dashboard"}
                className="bg-[#44576D] hover:bg-[#768A96] text-white text-sm font-medium px-3 py-1 rounded transition hidden sm:block"
              >
                {isAdmin ? "Admin Dashboard" : "User Dashboard"}
              </Link>

              <button
                onClick={handleLogout}
                className="bg-[#44576D] hover:bg-[#768A96] text-white px-3 py-1 rounded transition hidden sm:block"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="hidden sm:flex space-x-2">
              <Link
                to="/login"
                className="bg-[#44576D] hover:bg-[#768A96] text-white px-3 py-1 rounded transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="border border-[#44576D] hover:bg-[#44576D] text-white px-3 py-1 rounded transition"
              >
                Sign Up
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-xl">
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#29353C] px-4 pb-4 space-y-4 text-[#DFEBF6] text-center">
          {isAdmin ? (
            <>
              <Link to="/admin/orders" className="block hover:text-[#AAC7D8]" onClick={() => setIsOpen(false)}>Orders</Link>
              <Link to="/admin/inventory" className="block hover:text-[#AAC7D8]" onClick={() => setIsOpen(false)}>Stock</Link>
              <Link to="/admin/reports" className="block hover:text-[#AAC7D8]" onClick={() => setIsOpen(false)}>Report</Link>
              <Link to="/admin/users" className="block hover:text-[#AAC7D8]" onClick={() => setIsOpen(false)}>Users</Link>
            </>
          ) : (
            <>
              <Link to="/" className="block hover:text-[#AAC7D8]" onClick={() => setIsOpen(false)}>Home</Link>
              <Link to="/services" className="block hover:text-[#AAC7D8]" onClick={() => setIsOpen(false)}>Services</Link>
              <Link to="/products" className="block hover:text-[#AAC7D8]" onClick={() => setIsOpen(false)}>Productss</Link>
              <Link to="/about" className="block hover:text-[#AAC7D8]" onClick={() => setIsOpen(false)}>About</Link>
              <Link to="/contact" className="block hover:text-[#AAC7D8]" onClick={() => setIsOpen(false)}>Contact</Link>
              <Link to="/cart" className="block hover:text-[#AAC7D8]" onClick={() => setIsOpen(false)}>Cart</Link>
            </>
          )}

          {!user && (
            <>
              <Link to="/login" className="block hover:text-[#AAC7D8]" onClick={() => setIsOpen(false)}>Login</Link>
              <Link to="/register" className="block hover:text-[#AAC7D8]" onClick={() => setIsOpen(false)}>Sign Up</Link>
            </>
          )}

          {user && (
            <div className="flex flex-col items-center space-y-4">
              <Link
                to={isAdmin ? "/admin/dashboard" : "/dashboard"}
                className="block hover:text-[#AAC7D8] text-white"
                onClick={() => setIsOpen(false)}
              >
                {isAdmin ? "Admin Dashboard" : "User Dashboard"}
              </Link>
              <button
                onClick={() => { setIsOpen(false); handleLogout(); }}
                className="block hover:text-[#AAC7D8] text-white"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
