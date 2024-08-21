import React, { useEffect, useState } from "react";
import Axios from "../../constants/Axios.js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../sharepages/Loading";
import { useAuth } from "../../contexts/AuthContext.jsx";

const OrderItem = ({ item }) => {
  const variant = item.variant;
  const size = item.size;
  const imageUrl = variant.images.length > 0 ? variant.images[0].url : "";

  return (
    <div className="flex items-center justify-between border-b py-4">
      <div className="flex items-center space-x-4">
        <img
          src={imageUrl}
          alt={variant.name}
          className="w-20 h-20 rounded-lg object-cover shadow-sm"
        />
        <div className="flex-1">
          <h2 className="text-lg font-semibold">{variant.name}</h2>
          <p className="text-sm text-gray-500">Size: {size.name}</p>
          <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-lg font-semibold text-black">
          ${item.product_variant_size.price.toFixed(2)} x {item.quantity}
        </p>
        <p className="text-xl font-bold text-green-600">
          = ${(item.product_variant_size.price * item.quantity).toFixed(2)}
        </p>
      </div>
    </div>
  );
};

const Order = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [orderId, setOrderId] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await Axios.get("/cart-items");
        setItems(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cart items:", error);
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const handlePlaceOrder = async () => {
    if (!user) {
      toast.error("User not logged in");
      return;
    }

    const orderData = {
      user_id: user.id,
      status: "pending",
      total_price: items.reduce(
        (acc, item) => acc + item.product_variant_size.price * item.quantity,
        0
      ),
    };

    try {
      const response = await Axios.post("/orders", orderData);
      const newOrderId = response.data.id;
      setOrderId(newOrderId);
      
      const orderItemsData = items.map((item) => ({
        order_id: newOrderId,
        product_variant_size_id: item.product_variant_size.id,
        quantity: item.quantity,
        price: item.product_variant_size.price,
      }));

      for (const orderItem of orderItemsData) {
        await Axios.post("/order-items", orderItem);
      }

      // Gửi email xác nhận đơn hàng
      await Axios.post('/send-order-confirmation', { order_id: newOrderId, email: user.email });

      toast.success("Order placed successfully!");

    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Error placing order");
    }
  };

  if (loading) {
    return <Loading />;
  }

  const total = items.reduce(
    (acc, item) => acc + item.product_variant_size.price * item.quantity,
    0
  );

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Review Your Order</h1>
      <div className="border rounded-lg p-6 bg-white shadow-md mb-6">
        {items.map((item) => (
          <OrderItem key={item.id} item={item} />
        ))}
      </div>
      <div className="flex justify-end">
        <div className="w-full lg:w-1/3 border rounded-lg p-6 bg-gray-50 shadow-md">
          <p className="text-2xl font-bold text-center">
            Total: ${total.toFixed(2)}
          </p>
          <button
            onClick={handlePlaceOrder}
            className="w-full bg-black text-white py-3 mt-6 font-bold hover:bg-gray-800 transition-colors duration-200"
          >
            PLACE ORDER
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Order;
