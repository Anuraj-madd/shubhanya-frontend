// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductListing from "./pages/ProductListing";
import Cart from "./pages/Cart";
import { CartProvider } from "./context/CartContext";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Legal from "./pages/Legal";
import PrivateRoute from "./context/PrivateRoute";
import UserDashboard from "./pages/UserDashboard";
import Checkout from "./pages/Checkout";
import Profile from "./pages/Profile";
import Services from "./pages/Services";
import Orders from "./pages/Orders";
import ForgotPassword from "./pages/ForgotPassword";
import RequireAdmin from "./components/RequireAdmin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProducts from "./pages/AdminProduct";
import AdminOrderManager from "./pages/AdminOrderManager";
import AdminUserManager from "./pages/AdminUserManager";
import InventoryManagement from "./pages/InventoryManagement";
import SalesReports from "./pages/SalesReports";
import PostAnnouncements from "./pages/PostAnnoucements";
import AdminProfile from "./pages/AdminProfile";
import OrderDetails from "./pages/OrderDetails";

function App() {
  
  return (
    <CartProvider>
    <Router>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/Cart" element={<Cart/>}/>
        <Route path="Checkout" element={<Checkout/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/services" element={<Services />} />
        <Route path="/admin" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<ProductListing />} />
        <Route path="/about" element={<About />} />
        <Route path="/legal" element={<Legal/>}/>
        <Route path="/admin/dashboard" element={ <RequireAdmin> <AdminDashboard /> </RequireAdmin> }/>
        <Route path="/admin/products" element={ <RequireAdmin> <AdminProducts /> </RequireAdmin> }/>
        <Route path="/admin/orders" element={ <RequireAdmin> <AdminOrderManager /> </RequireAdmin> }/>
        <Route path="/admin/users" element={ <RequireAdmin> <AdminUserManager /> </RequireAdmin> }/>
        <Route path="/admin/inventory" element={ <RequireAdmin> <InventoryManagement /> </RequireAdmin> }/>
        <Route path="/admin/reports" element={ <RequireAdmin> <SalesReports /> </RequireAdmin> }/>
        <Route path="/admin/announcements" element={ <RequireAdmin> <PostAnnouncements /> </RequireAdmin> }/>
        <Route path="/admin/profile" element={ <RequireAdmin> <AdminProfile /> </RequireAdmin> }/>
        <Route path="/admin/reports/details" element={ <RequireAdmin> <OrderDetails /> </RequireAdmin> }/>
        <Route path="/dashboard" element={<PrivateRoute> <UserDashboard /></PrivateRoute>}/>
        <Route path="/profile" element={<PrivateRoute> <Profile/> </PrivateRoute>}/>
        <Route path="/Orders" element={<PrivateRoute> <Orders/> </PrivateRoute>}/>
        <Route path="/contact" element={<Contact />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </Router>
    </CartProvider>
  );
}

export default App;
