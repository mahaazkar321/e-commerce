import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext"; // ✅ import CartContext
import "../assets/css/cart.css";

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, updateQuantity } = useCart(); // ✅ use global cart

  const handleQuantityChange = (id, newQty) => {
    updateQuantity(id, newQty);
  };

  const getSubtotal = (item) => item.price * item.quantity;

  const total = cartItems.reduce((sum, item) => sum + getSubtotal(item), 0);

  return (
    <>
    <div className="cart-container">
      <div className="cart-header">
        <h1>Exclusive</h1>
        <nav>
          <span>Home / </span>
          <span>Cart</span>
        </nav>
      </div>

      <div className="cart-table">
  <div className="cart-table-scroll">
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
              <img className="products-image"
                src={
                  item.images?.[0]
                    ? `http://localhost:5000${item.images[0]}`
                    : 'https://via.placeholder.com/60x60?text=No+Image'
                } 
                alt={item.name}
              />
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
</div>

      <div className="cart-actions">
        <Link to="/">
          <button className="return-btn mt-3">Return To Shop</button>
        </Link>

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
    </>
  );
};

export default Cart;
