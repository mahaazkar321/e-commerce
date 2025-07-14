import React from 'react';
import '../assets/css/CheckOut.css'; // Import the CSS file
import monitor from "../assets/img/monitor.png";
import gamepad from "../assets/img/gamepad.png";
import visa from '../assets/img/visa.png';
import masterCard from '../assets/img/masterCard.png'

const CheckOut = () => {
  return (
    <div className="checkout-container">
      {/* Left Side - Billing Form */}
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

      {/* Right Side - Order Summary */}
      <div className="order-summary">
        <div className="product-item">
          <img src={monitor} alt="LCD Monitor" />
          <span>LCD Monitor</span>
          <span className="price">$650</span>
        </div>
        <div className="product-item">
          <img src={gamepad} alt="Gamepad" />
          <span>H1 Gamepad</span>
          <span className="price">$1100</span>
        </div>
        <div className="summary-totals">
          <div><span>Subtotal:</span><span>$1750</span></div>
        </div>
        <div className="summary-totals">
          <div><span>Shipping:</span><span>Free</span></div>
        </div>
        <div className="summary-totals">
          <div className="total"><span>Total:</span><span>$1750</span></div>
        </div>

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
