import React, { useEffect, useState } from "react";
import Axios from "../../constants/Axios";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../sharepages/Loading";

const CartItem = ({ item, onRemove, onIncrease, onDecrease }) => {
  const variant = item.variant;
  const size = item.size;
  const imageUrl = variant.images.length > 0 ? variant.images[0].url : "";

  return (
    <div className="flex items-center justify-between border-b py-4">
      <Link
        to={`/product/${variant.product_id}`}
        className="flex items-center"
      >
        <img
          src={imageUrl}
          alt={variant.name}
          className="w-16 h-16 object-cover"
        />
        <div className="flex-1 ml-4">
          <h2 className="text-lg font-bold">{variant.name}</h2>
          <p>Variant: {variant.name}</p>
          <p>Size: {size.name}</p>
        </div>
      </Link>
      <div className="flex items-center">
        <button
          onClick={() => onDecrease(item.id)}
          className="bg-black text-white px-2 py-1"
        >
          -
        </button>
        <input
          type="text"
          value={item.quantity}
          className="text-center border mx-2 w-12"
          readOnly
        />
        <button
          onClick={() => onIncrease(item.id)}
          className="bg-black text-white px-2 py-1"
        >
          +
        </button>
        <button onClick={() => onRemove(item.id)} className="ml-4 text-red-500">
          🗑️
        </button>
      </div>
      <p className="ml-4">${item.product_variant_size.price.toFixed(2)}</p>
    </div>
  );
};

CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    variant: PropTypes.object.isRequired,
    size: PropTypes.object.isRequired,
    quantity: PropTypes.number.isRequired,
    product_variant_size: PropTypes.object.isRequired,
  }).isRequired,
  onRemove: PropTypes.func.isRequired,
  onIncrease: PropTypes.func.isRequired,
  onDecrease: PropTypes.func.isRequired,
};

const Cart = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const handleRemove = async (id) => {
    try {
      await Axios.delete(`/cart-items/${id}`);
      setItems(items.filter((item) => item.id !== id));
      toast.success("Item removed from cart");
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const handleIncrease = async (id) => {
    try {
      const item = items.find((item) => item.id === id);
      await Axios.put(`/cart-items/${id}`, {
        quantity: item.quantity + 1,
      });
      setItems(
        items.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } catch (error) {
      console.error("Error increasing item quantity:", error);
    }
  };

  const handleDecrease = async (id) => {
    try {
      const item = items.find((item) => item.id === id);
      if (item.quantity > 1) {
        await Axios.put(`/cart-items/${id}`, {
          quantity: item.quantity - 1,
        });
        setItems(
          items.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity - 1 } : item
          )
        );
      }
    } catch (error) {
      console.error("Error decreasing item quantity:", error);
    }
  };

  if (loading) {
    return <Loading/>;
  }

  const total = items.reduce(
    (acc, item) => acc + item.product_variant_size.price * item.quantity,
    0
  );

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Your cart</h1>
      <div className="border rounded-lg p-4 mb-4">
        {items.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onRemove={handleRemove}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
          />
        ))}
      </div>
      <div className="flex justify-end">
        <div className="w-full lg:w-1/3 border rounded-lg p-4">
          <p className="text-xl font-bold">Total: ${total.toFixed(2)}</p>
          <button className="w-full bg-black text-white py-2 mt-4 font-bold">
            CHECKOUT
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Cart;
