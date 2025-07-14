import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/cart.css";
import monitor from '../assets/img/monitor.png'
import gamepad from '../assets/img/gamepad.png'
const Cart = () => {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "LCD Monitor",
      price: 650,
      quantity: 1,
      image: monitor
    },
    {
      id: 2,
      name: "H1 Gamepad",
      price: 550,
      quantity: 2,
      image:gamepad
    }
  ]);

  const handleQuantityChange = (id, newQty) => {
    const updatedItems = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: parseInt(newQty) } : item
    );
    setCartItems(updatedItems);
  };

  const getSubtotal = (item) => item.price * item.quantity;

  const total = cartItems.reduce((sum, item) => sum + getSubtotal(item), 0);

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h1>Exclusive</h1>
        <nav>
          <span>Home / </span>
          <span>Cart</span>
        </nav>
      </div>

      <div className="cart-table">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id}>
                <td>
                  <div className="product-info">
                    <img src={item.image} alt={item.name} className="product-image" />
                    <span>{item.name}</span>
                  </div>
                </td>
                <td>${item.price}</td>
                <td>
                  <select
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                  >
                    {[...Array(10)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </td>
                <td>${getSubtotal(item)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="cart-actions">
        <button className="return-btn">Return To Shop</button>

        <div className="coupon-section">
          <input
            type="text"
            placeholder="Coupon Code"
            className="coupon-input"
          />
          <button className="apply-btn">Apply Coupon</button>
        </div>

        <button className="update-btn">Update Cart</button>
      </div>

      <div className="cart-total">
        <h2>Cart Total</h2>
        <div className="total-details">
          <div className="subtotal">
            <span>Subtotal:</span>
            <span>${total}</span>
          </div>
          <div className="shipping">
            <span>Shipping:</span>
            <span>Free</span>
          </div>
          <div className="total">
            <span>Total:</span>
            <span>${total}</span>
          </div>
        </div>
        <button className="checkout-btn" onClick={() => navigate("/check-out")}>
          Proceed to checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
