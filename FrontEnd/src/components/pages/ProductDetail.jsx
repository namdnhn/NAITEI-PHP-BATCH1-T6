import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Axios from "../../constants/Axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const productDataDemo = {
  name: "GADDIS NAVY SUEDE",
  oldPrice: "$129.95",
  newPrice: "$79.99",
  rating: 5,
  reviewsCount: 3,
  images: [
    "https://www.stevemadden.com/cdn/shop/files/STEVEMADDEN_MENS_JAYSHAN_BLACK_grande.jpg?v=1701468141",
    "https://www.stevemadden.com/cdn/shop/files/STEVEMADDEN_MENS_JAYSHAN_BLACK_01_grande.jpg?v=1701468141",
    "https://www.stevemadden.com/cdn/shop/files/STEVEMADDEN_MENS_JAYSHAN_BLACK_04_grande.jpg?v=1701468141",
  ],
  colors: ["NAVY SUEDE", "BROWN SUEDE"],
  sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 13, 14, 15],
  description:
    "Soft, supple and comfortable. Choose a 1/2 size smaller than your usual sneaker size.",
  reviews: [
    {
      id: 1,
      rating: 5,
      title: "Good Fit",
      content:
        "Soft, supple and comfortable. Choose a 1/2 size smaller than your usual sneaker size.",
      author: "Stephon R.",
      date: "05/01/24",
      pros: "Quality, Comfortable, Value, Stylish",
      age: "34-40",
    },
    {
      id: 2,
      rating: 4,
      title: "Nice Shoes",
      content: "Great quality and comfort. Would recommend.",
      author: "Alex D.",
      date: "04/30/24",
      pros: "Comfortable, Stylish",
      age: "28-34",
    },
    {
      id: 3,
      rating: 3,
      title: "Average",
      content: "The shoes are okay, but a bit tight.",
      author: "John K.",
      date: "04/29/24",
      pros: "Value",
      age: "22-28",
    },
  ],
};

const ProductDetail = () => {
  const { id } = useParams();
  const [productData, setProductData] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await Axios.get(`/products/${id}/variants`);
        const product = response.data;

        setProductData(product);

        if (product.variants.length > 0) {
          setSelectedVariant(product.variants[0]);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching product data:", error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (selectedVariant && selectedVariant.sizes.length > 0) {
      setSelectedSize(selectedVariant.sizes[0]);
    }
  }, [selectedVariant]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!productData) {
    return <div>Product not found</div>;
  }

  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };

  const addToCart = async () => {
    try {
      const response = await Axios.post("/add-to-cart", {
        product_variant_id: selectedVariant.id,
        size_id: selectedSize.id,
        quantity: 1,
      });
      if (response.status === 201 || response.status === 202) {
        toast.success("Added to cart");
      }
    } catch (error) {
      toast.error("Error adding to cart");
    }
  };

  return (
    <div className="product-detail p-4 mx-auto max-w-screen-lg">
      <div className="flex justify-center">
        <div className="w-2/3">
          <Carousel showThumbs={true}>
            {selectedVariant.images.map((image, index) => (
              <div key={index}>
                <img src={image.url} alt={`${productData.name} ${index}`} />
              </div>
            ))}
          </Carousel>
        </div>
        <div className="w-1/3 pl-4">
          <h1 className="text-2xl font-bold">{productData.name}</h1>
          <div className="text-2xl font-bold text-red-600">
            ${productData.price.toFixed(2)}
          </div>
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
                    className={`border-2 p-2 ${
                      selectedVariant === variant
                        ? "border-black"
                        : "border-gray-300"
                    }`}
                    onClick={() => setSelectedVariant(variant)}
                  >
                    <span>{variant.name}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-bold">SELECT A SIZE</h3>
            <div className="flex flex-wrap">
              {selectedVariant.sizes.map((size, index) => (
                <button
                  key={index}
                  className={`border p-2 m-1 ${
                    selectedSize === size ? "bg-black text-white" : "bg-white"
                  }`}
                  onClick={() => handleSizeClick(size)}
                >
                  {size.name}
                </button>
              ))}
            </div>
          </div>
          <button className="mt-4 w-full bg-black text-white py-2 font-bold" onClick={addToCart}>
            ADD TO CART
          </button>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-bold">Reviews</h2>
        <div className="mt-4">
          <div className="border-b pb-2">
            <span className="text-2xl font-bold">4</span>
            <span className="text-yellow-500 ml-2">{"★".repeat(4)}</span>
            {/* <span className="ml-2 text-gray-500">(Based on {productData.variants.length} reviews)</span> */}
          </div>
          <div className="mt-4">
            {productDataDemo.reviews.map((review, index) => (
              <div key={review.id} className="border-b pb-4 mb-4">
                <h3 className="font-bold">{review.title}</h3>
                <span className="text-yellow-500">
                  {"★".repeat(review.rating)}
                </span>
                <p>{review.content}</p>
                <p className="text-sm text-gray-500">
                  {review.author} | Verified Buyer
                </p>
                <p className="text-sm text-gray-500">
                  Recommend: Yes, Pros: {review.pros}, Age: {review.age}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ProductDetail;
