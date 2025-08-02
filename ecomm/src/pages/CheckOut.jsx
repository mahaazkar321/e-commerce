import React, { useMemo } from 'react';
import '../assets/css/CheckOut.css';
import visa from '../assets/img/visa.png';
import masterCard from '../assets/img/masterCard.png';
import { useCart } from '../context/CartContext';

const CheckOut = () => {
  const { cartItems } = useCart();

  // Calculate subtotal
  const subtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cartItems]);

  return (
    <div className="checkout-container">
      {/* ---------- Billing Form ---------- */}
      <div className="billing-form">
        <h2>Billing Details</h2>
        <form>
          <label>First Name<span style={{ color: 'red' }}>*</span></label>
          <input type="text" required />
          <label>Company Name</label>
          <input type="text" />
          <label>Street Address<span style={{ color: 'red' }}>*</span></label>
          <input type="text" required />
          <label>Apartment, floor, etc. (optional)</label>
          <input type="text" />
          <label>Town/City<span style={{ color: 'red' }}>*</span></label>
          <input type="text" required />
          <label>Phone Number<span style={{ color: 'red' }}>*</span></label>
          <input type="text" required />
          <label>Email Address<span style={{ color: 'red' }}>*</span></label>
          <input type="email" required />
          <label className="checkbox-container">
            <input type="checkbox" />
            <span>Save this information for faster check-out next time</span>
          </label>
        </form>
      </div>

      {/* ---------- Order Summary ---------- */}
      <div className="order-summary">
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cartItems.map((item, idx) => (
            <div key={idx} className="product-item">
              <img
                src={
                  item.images?.[0]
                    ? `http://localhost:5000${item.images[0]}`
                    : 'https://via.placeholder.com/60x60?text=No+Image'
                }
                alt={item.name}
              />
              <span>{item.name} x {item.quantity}</span>
              <span className="price">${item.price * item.quantity}</span>
            </div>
          ))
        )}

        <div className="summary-totals">
          <div><span>Subtotal:</span><span>${subtotal}</span></div>
        </div>
        <div className="summary-totals">
          <div><span>Shipping:</span><span>Free</span></div>
        </div>
        <div className="summary-totals">
          <div className="total"><span>Total:</span><span>${subtotal}</span></div>
        </div>

        {/* ---------- Payment Options ---------- */}
        <div className="payment-options">
          <label className="payment-bank">
            <input type="radio" name="payment" />
            <span>Bank</span>
            <span className="payment-icons-inline">
              <img src={visa} alt="Visa" />
              <img src={masterCard} alt="MasterCard" />
            </span>
          </label>

          <label className="payment-cod">
            <input type="radio" name="payment" defaultChecked />
            <span>Cash on delivery</span>
          </label>
        </div>

        {/* ---------- Coupon + Place Order ---------- */}
        <div className="coupon-section">
          <input type="text" placeholder="Coupon Code" />
          <button className="apply-btn">Apply Coupon</button>
        </div>

        <button className="place-order-btn">Place Order</button>
      </div>
    </div>
  );
};

export default CheckOut;
