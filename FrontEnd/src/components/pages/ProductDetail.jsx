import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Axios from '../../constants/Axios';

const productDataDemo = {
    name: "GADDIS NAVY SUEDE",
    oldPrice: "$129.95",
    newPrice: "$79.99",
    rating: 5,
    reviewsCount: 3,
    images: [
      "https://www.stevemadden.com/cdn/shop/files/STEVEMADDEN_MENS_JAYSHAN_BLACK_grande.jpg?v=1701468141",
      "https://www.stevemadden.com/cdn/shop/files/STEVEMADDEN_MENS_JAYSHAN_BLACK_01_grande.jpg?v=1701468141",
      "https://www.stevemadden.com/cdn/shop/files/STEVEMADDEN_MENS_JAYSHAN_BLACK_04_grande.jpg?v=1701468141"
    ],
    colors: ["NAVY SUEDE", "BROWN SUEDE"],
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 13, 14, 15],
    description: "Soft, supple and comfortable. Choose a 1/2 size smaller than your usual sneaker size.",
    reviews: [
      {
        id: 1,
        rating: 5,
        title: "Good Fit",
        content: "Soft, supple and comfortable. Choose a 1/2 size smaller than your usual sneaker size.",
        author: "Stephon R.",
        date: "05/01/24",
        pros: "Quality, Comfortable, Value, Stylish",
        age: "34-40"
      },
      {
        id: 2,
        rating: 4,
        title: "Nice Shoes",
        content: "Great quality and comfort. Would recommend.",
        author: "Alex D.",
        date: "04/30/24",
        pros: "Comfortable, Stylish",
        age: "28-34"
      },
      {
        id: 3,
        rating: 3,
        title: "Average",
        content: "The shoes are okay, but a bit tight.",
        author: "John K.",
        date: "04/29/24",
        pros: "Value",
        age: "22-28"
      }
    ]
  };

const ProductDetail = () => {
  const { id } = useParams();
  const [productData, setProductData] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await Axios.get(`/products/${id}`);
        const product = response.data;

        // Initialize selected color
        if (product.variants.length > 0) {
          setSelectedColor(product.variants[0].color);
        }
        
        setProductData(product);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product data:', error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!productData) {
    return <div>Product not found</div>;
  }

  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };

  return (
    <div className="product-detail p-4 mx-auto">
      <div className="flex">
        <div className="w-2/3">
          <img src={productDataDemo.images[0]} alt={productData.name} className="w-full" />
        </div>
        <div className="w-1/3 pl-4">
          <h1 className="text-2xl font-bold">{productData.name}</h1>
          <div className="text-2xl font-bold text-red-600">${productData.price.toFixed(2)}</div>
          <div className="mt-2">
            <span className="text-yellow-500">{"★".repeat(4)}</span>
            <span className="text-gray-500"> (3 Reviews)</span>
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-bold">COLOR</h3>
            <div className="flex">
              {productData.variants.map((variant, index) => (
                <div key={index} className="mr-2">
                  <button
                    className={`border-2 p-2 ${selectedColor === variant.color ? "border-black" : "border-gray-300"}`}
                    onClick={() => setSelectedColor(variant.color)}
                  >
                    <span>{variant.color}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-bold">SELECT A SIZE</h3>
            <div className="flex flex-wrap">
              {productData.variants.map((variant) => (
                variant.size.map((size, index) => (
                  <button
                    key={index}
                    className={`border p-2 m-1 ${selectedSize === size ? "bg-black text-white" : "bg-white"}`}
                    onClick={() => handleSizeClick(size)}
                  >
                    {size}
                  </button>
                ))
              ))}
            </div>
          </div>
          <button className="mt-4 w-full bg-black text-white py-2 font-bold">ADD TO CART</button>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-bold">Reviews</h2>
        <div className="mt-4">
          <div className="border-b pb-2">
            <span className="text-2xl font-bold">4</span>
            <span className="text-yellow-500 ml-2">{"★".repeat(4)}</span>
            <span className="ml-2 text-gray-500">(Based on {productData.variants.length} reviews)</span>
          </div>
          <div className="mt-4">
            {productDataDemo.reviews.map((review, index) => (
                <div key={review.id} className="border-b pb-4 mb-4">
                  <h3 className="font-bold">{review.title}</h3>
                  <span className="text-yellow-500">{"★".repeat(review.rating)}</span>
                  <p>{review.content}</p>
                  <p className="text-sm text-gray-500">{review.author} | Verified Buyer</p>
                  <p className="text-sm text-gray-500">Recommend: Yes, Pros: {review.pros}, Age: {review.age}</p>
                </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
