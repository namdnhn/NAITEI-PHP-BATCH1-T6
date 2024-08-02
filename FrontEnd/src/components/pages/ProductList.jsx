import React, { useEffect, useState } from 'react';
import Axios from '../../constants/Axios';

const productImageUrl = "https://cdn.shopify.com/s/files/1/2170/8465/files/STEVEMADDEN_MENS_JAYSHAN_BLACK.jpg";

function ProductList() {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await Axios.get('/products', {
                    params: { search, category }
                });
                setProducts(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchProducts();
    }, [search, category]);

    const handleAddToCart = (productId) => {
        navigate(`/product/:id`);
    };

    return (
        <div className="p-4">
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border p-2"
                />
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="border p-2 ml-2"
                >
                    <option value="">All Categories</option>
                    {/* Thêm các option cho category */}
                </select>
            </div>

            {/* Product list */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map(product => (
                    <div key={product.id} className="border p-4 rounded flex flex-col">
                        <img src={productImageUrl} alt={product.name} className="w-full h-48 object-cover mb-4" />
                        <div className="w-full flex justify-between items-center">
                            <div className="flex flex-col">
                                <p className="text-sm text-gray-500">MEN'S SHOES</p>
                                <h2 className="text-lg font-bold">{product.name}</h2>
                            </div>
                            <div className="flex flex-col items-end">
                                <p className="text-gray-500 ">3 COLORS</p>
                                <button
                                    className="text-sm font-semibold"
                                    onClick={() => handleAddToCart(product.id)} 
                                >
                                    ADD +
                                </button>
                            </div>
                        </div>
                        <p className="text-lg mt-4">${product.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductList;
