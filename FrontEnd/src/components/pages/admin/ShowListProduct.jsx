import React, { useState, useEffect } from 'react';
import Axios from "../../../constants/Axios";

function ShowListProduct() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  const fetchProducts = async (page) => {
    try {
      const response = await Axios.get(`/get-list-products?page=${page}`);
      setProducts(response.data.data);
      setTotalPages(response.data.last_page);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Product List</h2>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Price</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b text-center">{product.id}</td>
              <td className="py-2 px-4 border-b">{product.name}</td>
              <td className="py-2 px-4 border-b">{product.price}</td>
              <td className="py-2 px-4 border-b text-center">
                <button
                  onClick={() => handleEdit(product.id)}
                  className="bg-blue-500 text-white py-1 px-3 rounded mr-2 hover:bg-blue-600 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="bg-gray-300 text-gray-700 py-1 px-4 rounded disabled:opacity-50 hover:bg-gray-400 transition-colors mx-2"
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="bg-gray-300 text-gray-700 py-1 px-4 rounded disabled:opacity-50 hover:bg-gray-400 transition-colors mx-2"
        >
          Next
        </button>
      </div>
    </div>
  );

  function handleEdit(id) {
    // Code xử lý khi bấm nút Edit
  }

  function handleDelete(id) {
    // Code xử lý khi bấm nút Delete
  }
}

export default ShowListProduct;
