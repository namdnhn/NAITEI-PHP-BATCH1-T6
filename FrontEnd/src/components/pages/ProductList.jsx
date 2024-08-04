import React, { useEffect, useState } from 'react';
import Axios from '../../constants/Axios';
import { Link, useLocation } from 'react-router-dom';

function ProductList() {
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState('');

    const [sort, setSort] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const query = new URLSearchParams(useLocation().search);
    const search = query.get('search') || '';

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await Axios.get('/products', {
                    params: { search, category, sort }
                });
                setProducts(response.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [search, category, sort]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold">
                    MEN'S - DRESS SHOES <span className="text-black">(46)</span>
                </h1>
                <div className="flex items-center">
                    <div className="mr-6">
                        Show Filters <span className="ml-2">&#8801;</span>
                    </div>
                    <div className="flex items-center">
                        <span className="mr-2">Sort by:</span>
                        <select
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                            className="border p-2 ml-2"
                        >
                            <option value="">Relevance</option>
                            <option value="price_low_to_high">Price Low to High</option>
                            <option value="price_high_to_low">Price High to Low</option>
                            <option value="newest_to_oldest">Newest to Oldest</option>
                            <option value="ranking">Ranking</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Product list */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map(product => (
                    <div key={product.id} className="border p-4 rounded flex flex-col">
                        <img src={product.image_url} alt={product.name} className="w-full object-cover mb-4" />
                        <div className="w-full flex justify-between items-center">
                            <div className="flex flex-col">
                                <p className="text-sm text-gray-500">MEN'S SHOES</p>
                                <h2 className="text-lg font-bold">{product.name}</h2>
                            </div>
                            <div className="flex flex-col items-end">
                                <p className="text-gray-500 ">3 COLORS</p>
                                <Link to={`/product/${product.id}`} className="text-sm font-semibold"> {/*use react router dom*/}
                                    <button>ADD +</button>
                                </Link>
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
