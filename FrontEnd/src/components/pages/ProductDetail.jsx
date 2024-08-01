import React, { useState } from 'react';

const productData = {
  name: "GADDIS NAVY SUEDE",
  oldPrice: "$129.95",
  newPrice: "$79.99",
  rating: 4,
  reviewsCount: 3,
  images: [
    "https://www.stevemadden.com/cdn/shop/files/STEVEMADDEN_MENS_GADDIS_NAVY-SUEDE_01_c776d1f8-dae9-4f93-b699-fcdec96fb4f3_grande.jpg?v=1709132131",
    "https://www.stevemadden.com/cdn/shop/files/STEVEMADDEN_MENS_GADDIS_NAVY-SUEDE_02_b3ec8db7-427f-4cd7-8c93-108b471112dd_grande.jpg?v=1709132131"
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
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(productData.colors[0]);

  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };

  return (
    <div className="product-detail p-4 max-w-screen-lg mx-auto">
      <div className="flex">
        <div className="w-2/3">
          <img src={productData.images[0]} alt={productData.name} className="w-full" />
          <div className="flex mt-4">
            {productData.images.map((image, index) => (
              <img key={index} src={image} alt={`${productData.name} ${index}`} className="w-1/3 mr-2" />
            ))}
          </div>
        </div>
        <div className="w-1/3 pl-4">
          <h1 className="text-2xl font-bold">{productData.name}</h1>
          <div className="text-lg text-gray-500 line-through">{productData.oldPrice}</div>
          <div className="text-2xl font-bold text-red-600">{productData.newPrice}</div>
          <div className="mt-2">
            <span className="text-yellow-500">{"★".repeat(productData.rating)}</span>
            <span className="text-gray-500"> ({productData.reviewsCount} Reviews)</span>
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-bold">COLOR - {selectedColor}</h3>
            <div className="flex">
              {productData.colors.map((color, index) => (
                <div key={index} className="mr-2">
                  <button
                    className={`border-2 p-2 ${selectedColor === color ? "border-black" : "border-gray-300"}`}
                    onClick={() => setSelectedColor(color)}
                  >
                    <span>{color}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-bold">SELECT A SIZE</h3>
            <div className="flex flex-wrap">
              {productData.sizes.map((size) => (
                <button
                  key={size}
                  className={`border p-2 m-1 ${selectedSize === size ? "bg-black text-white" : "bg-white"}`}
                  onClick={() => handleSizeClick(size)}
                >
                  {size}
                </button>
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
            <span className="text-2xl font-bold">{productData.rating}</span>
            <span className="text-yellow-500 ml-2">{"★".repeat(productData.rating)}</span>
            <span className="ml-2 text-gray-500">(Based on {productData.reviewsCount} reviews)</span>
          </div>
          <div className="mt-4">
            {productData.reviews.map((review) => (
              <div key={review.id} className="border-b pb-4 mb-4">
                <h3 className="font-bold">{review.title}</h3>
                <span className="text-yellow-500 ml-2">{"★".repeat(review.rating)}</span>
                <p>{review.content}</p>
                <p className="text-sm text-gray-500">{review.author} | Verified Buyer</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
