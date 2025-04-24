import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AdminProductManager = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    mrp: "",
    price: "",
    stock: "",
    offer: "",
    description: "",
    image: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState({ show: false, message: "", isError: false });
  const [editingProduct, setEditingProduct] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("https://shubhanya-backend.onrender.com/product.php");
      setProducts(res.data);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      showModal("Failed to fetch products", true);
      setIsLoading(false);
    }
  };

  const handleFormChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    const formData = new FormData();
    for (const key in form) {
      formData.append(key, form[key]);
    }
    
    try {
      await axios.post("https://shubhanya-backend.onrender.com/product.php", formData);
      setForm({
        name: "",
        mrp: "",
        price: "",
        stock: "",
        offer: "",
        description: "",
        image: null,
      });
      fetchProducts();
      showModal("Product added successfully!");
    } catch (err) {
      console.error(err);
      showModal("Failed to add product", true);
      setIsLoading(false);
    }
  };

  const handleUpdate = async (product) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("id", product.id);
      formData.append("name", product.name);
      formData.append("mrp", product.mrp);
      formData.append("price", product.price);
      formData.append("stock", product.stock);
      formData.append("offer", product.offer);
      formData.append("description", product.description);
      formData.append("existingImage", product.image);
      if (product.newImage) {
        formData.append("image", product.newImage);
      }
      
      await axios.post(
        "https://shubhanya-backend.onrender.com/product.php?action=update",
        formData
      );
      
      setEditingProduct(null);
      fetchProducts();
      showModal("Product updated successfully!");
    } catch (err) {
      console.error("Update failed:", err);
      showModal("Failed to update product", true);
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setIsLoading(true);
    try {
      // Fixed: Use axios.delete with proper configuration
      await axios({
        method: 'DELETE',
        url: `https://shubhanya-backend.onrender.com/product.php?id=${id}`,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      // After successful deletion, update the products list and close modal
      fetchProducts();
      setShowDeleteConfirm(null);
      showModal("Product deleted successfully!");
    } catch (err) {
      console.error("Delete error:", err);
      showModal("Failed to delete product", true);
      setIsLoading(false);
    }
  };

  const showModal = (message, isError = false) => {
    setModal({ show: true, message, isError });
    setTimeout(() => setModal({ show: false, message: "", isError: false }), 3000);
  };

  const handleProductEdit = (product) => {
    setEditingProduct({...product});
  };

  const handleEditChange = (e, field) => {
    const { value, files } = e.target;
    setEditingProduct(prev => ({
      ...prev,
      [field]: files ? files[0] : value,
      newImage: files ? files[0] : prev.newImage
    }));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F7FA] text-[#1B1B1B]">
      <Navbar />

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
            <div className="w-16 h-16 border-4 border-t-[#1CC5DC] border-r-[#1CC5DC] border-b-[#1CC5DC] border-l-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-lg font-semibold">Processing...</p>
          </div>
        </div>
      )}

      {/* Success/Error Modal */}
      {modal.show && (
        <div className="fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-md animate-fade-in"
          style={{ 
            backgroundColor: modal.isError ? '#FFE1E1' : '#E1FFE1',
            borderLeft: `4px solid ${modal.isError ? '#FF4545' : '#45FF6E'}`
          }}>
          <div className="flex items-center">
            <div className="mr-3">
              {modal.isError ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
            <p className="font-medium">{modal.message}</p>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Confirm Deletion</h3>
            <p className="mb-6">Are you sure you want to delete this product? This action cannot be undone.</p>
            <div className="flex justify-end space-x-3">
              <button 
                onClick={() => setShowDeleteConfirm(null)}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 font-medium"
              >
                Cancel
              </button>
              <button 
                onClick={() => handleDelete(showDeleteConfirm)}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40 p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Edit Product</h3>
              <button 
                onClick={() => setEditingProduct(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  className="border border-[#778DA9] p-2 rounded w-full"
                  value={editingProduct.name}
                  onChange={(e) => handleEditChange(e, "name")}
                />
              </div>
              
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-1">MRP</label>
                <input
                  type="number"
                  className="border border-[#778DA9] p-2 rounded w-full"
                  value={editingProduct.mrp}
                  onChange={(e) => handleEditChange(e, "mrp")}
                />
              </div>
              
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-1">Selling Price</label>
                <input
                  type="number"
                  className="border border-[#778DA9] p-2 rounded w-full"
                  value={editingProduct.price}
                  onChange={(e) => handleEditChange(e, "price")}
                />
              </div>
              
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                <input
                  type="number"
                  className="border border-[#778DA9] p-2 rounded w-full"
                  value={editingProduct.stock}
                  onChange={(e) => handleEditChange(e, "stock")}
                />
              </div>
              
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-1">Offer</label>
                <input
                  className="border border-[#778DA9] p-2 rounded w-full"
                  value={editingProduct.offer}
                  onChange={(e) => handleEditChange(e, "offer")}
                />
              </div>
              
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                <div className="flex items-center space-x-4">
                  {editingProduct.image && (
                    <img
                      src={`https://shubhanya-backend.onrender.com/uploads/${editingProduct.image}`}
                      alt="product"
                      className="w-16 h-16 object-cover rounded"
                    />
                  )}
                  <input
                    type="file"
                    className="border border-[#778DA9] p-2 rounded w-full"
                    onChange={(e) => handleEditChange(e, "newImage")}
                  />
                </div>
              </div>
            </div>
            
            <div className="form-group mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                className="border border-[#778DA9] p-2 rounded w-full min-h-24"
                value={editingProduct.description}
                onChange={(e) => handleEditChange(e, "description")}
              />
            </div>
            
            <div className="flex justify-end">
              <button
                onClick={() => handleUpdate(editingProduct)}
                className="bg-[#1CC5DC] hover:bg-[#415A77] text-white font-semibold px-6 py-2 rounded transition-all"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="flex-grow p-4 max-w-7xl mx-auto w-full">
        <h1 className="text-3xl font-bold text-[#0D1B2A] mb-6 text-center">
          Admin Product Manager
        </h1>

        {/* Add Product Form */}
        <div className="bg-white shadow-lg rounded-lg border border-[#415A77] overflow-hidden mb-8">
          <div className="p-4 bg-[#1B263B] text-white">
            <h2 className="text-xl font-semibold">Add New Product</h2>
          </div>
          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                <input
                  className="border border-[#778DA9] p-2 rounded w-full"
                  type="text"
                  name="name"
                  placeholder="Product Name"
                  value={form.name}
                  onChange={handleFormChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-1">MRP</label>
                <input
                  className="border border-[#778DA9] p-2 rounded w-full"
                  type="number"
                  name="mrp"
                  placeholder="MRP"
                  value={form.mrp}
                  onChange={handleFormChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-1">Selling Price</label>
                <input
                  className="border border-[#778DA9] p-2 rounded w-full"
                  type="number"
                  name="price"
                  placeholder="Selling Price"
                  value={form.price}
                  onChange={handleFormChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                <input
                  className="border border-[#778DA9] p-2 rounded w-full"
                  type="number"
                  name="stock"
                  placeholder="Stock"
                  value={form.stock}
                  onChange={handleFormChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-1">Offer</label>
                <input
                  className="border border-[#778DA9] p-2 rounded w-full"
                  type="text"
                  name="offer"
                  placeholder="Offer"
                  value={form.offer}
                  onChange={handleFormChange}
                />
              </div>
              
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
                <input
                  className="border border-[#778DA9] p-2 rounded w-full"
                  type="file"
                  name="image"
                  onChange={handleFormChange}
                />
              </div>
            </div>
            
            <div className="form-group mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                className="border border-[#778DA9] p-2 rounded w-full"
                name="description"
                placeholder="Product Description"
                value={form.description}
                onChange={handleFormChange}
                required
                rows="4"
              />
            </div>
            
            <button
              type="submit"
              className="bg-[#1CC5DC] hover:bg-[#415A77] text-white font-semibold py-3 px-6 rounded transition-all w-full sm:w-auto"
            >
              Add Product
            </button>
          </form>
        </div>

        {/* Products Table */}
        <div className="bg-white shadow-lg rounded-lg border border-[#415A77] overflow-hidden">
          <div className="p-4 bg-[#1B263B] text-white flex justify-between items-center">
            <h2 className="text-xl font-semibold">Product List</h2>
            <span className="bg-[#1CC5DC] px-3 py-1 rounded-full text-xs font-medium">
              {products.length} Products
            </span>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-[#E0E7FF]">
                <tr>
                  {[
                    "Image",
                    "Name",
                    "MRP",
                    "Selling Price",
                    "Stock",
                    "Offer",
                    "Actions",
                  ].map((h) => (
                    <th key={h} className="border-b border-[#778DA9] p-3 text-left">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {products.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-8 text-gray-500">
                      No products found. Add your first product above.
                    </td>
                  </tr>
                ) : (
                  products.map((p) => (
                    <tr key={p.id} className="hover:bg-gray-50 border-b border-[#778DA9]">
                      <td className="p-3">
                        {p.image ? (
                          <img
                            src={`https://shubhanya-backend.onrender.com/uploads/${p.image}`}
                            alt="product"
                            className="w-12 h-12 object-cover rounded"
                          />
                        ) : (
                          <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
                            <span className="text-gray-400 text-xs">No image</span>
                          </div>
                        )}
                      </td>
                      <td className="p-3 truncate max-w-xs">{p.name}</td>
                      <td className="p-3">₹{p.mrp}</td>
                      <td className="p-3">₹{p.price}</td>
                      <td className="p-3">{p.stock}</td>
                      <td className="p-3">{p.offer || "—"}</td>
                      <td className="p-3">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleProductEdit(p)}
                            className="bg-[#1CC5DC] hover:bg-[#415A77] text-white px-3 py-1 rounded font-medium text-sm transition-all flex items-center"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            Edit
                          </button>
                          <button
                            onClick={() => setShowDeleteConfirm(p.id)}
                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded font-medium text-sm transition-all flex items-center"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminProductManager;