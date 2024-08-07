import React, { useEffect, useState } from "react";
import Axios from "../../constants/Axios.js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../sharepages/Loading";
import { useAuth } from '../../contexts/AuthContext.jsx';

const OrderItem = ({ item }) => {
  const variant = item.variant;
  const size = item.size;
  const imageUrl = variant.images.length > 0 ? variant.images[0].url : "";

  return (
    <div className="flex items-center justify-between border-b py-4">
      <div className="flex items-center">
        <img
          src={imageUrl}
          alt={variant.name}
          className="w-16 h-16 object-cover"
        />
        <div className="flex-1 ml-4">
          <h2 className="text-lg font-bold">{variant.name}</h2>
          <p>Variant: {variant.name}</p>
          <p>Size: {size.name}</p>
          <p>Quantity: {item.quantity}</p>
          <p>Price: ${item.product_variant_size.price.toFixed(2)}</p>
        </div>
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
    const orderData = {
      user_id: user.id,
      status: 'pending',
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

      console.log(orderData)
      for (const orderItem of orderItemsData) {
        console.log(orderItem)
        await Axios.post("/order-items", orderItem);
      }

      toast.success("Order Successfully!");
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
      <h1 className="text-3xl font-bold mb-4">Review Your Order</h1>
      <div className="border rounded-lg p-4 mb-4">
        {items.map((item) => (
          <OrderItem
            key={item.id}
            item={item}
          />
        ))}
      </div>
      <div className="flex justify-end">
        <div className="w-full lg:w-1/3 border rounded-lg p-4">
          <p className="text-xl font-bold">Total: ${total.toFixed(2)}</p>
          <button
            onClick={handlePlaceOrder}
            className="w-full bg-black text-white py-2 mt-4 font-bold"
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
