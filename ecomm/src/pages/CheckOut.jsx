import React, { useState, useMemo } from "react";
import "../assets/css/CheckOut.css";
import visa from "../assets/img/visa.png";
import masterCard from "../assets/img/masterCard.png";
import { useCart } from "../context/CartContext";
import axios from "axios";

const CheckOut = () => {
  const { cartItems } = useCart();

  // Billing form states
  const [firstName, setFirstName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [apartment, setApartment] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash on delivery");

  const subtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cartItems]);

  // Place order
  const handlePlaceOrder = async () => {
    try {
      const token = localStorage.getItem("token"); // stored at login
      if (!token) {
        alert("Please log in before placing an order");
        return;
      }

      const billingDetails = {
        firstName,
        companyName,
        streetAddress,
        apartment,
        city,
        phone,
        email,
      };

      const res = await axios.post(
        "http://localhost:5000/api/orders",
        {
          items: cartItems,
          billingDetails,
          totalAmount: subtotal,
          paymentMethod,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Order placed successfully!");
      console.log(res.data);
    } catch (err) {
      console.error("Order error:", err.response?.data || err.message);
      alert("Failed to place order. Check console for details.");
    }
  };

  return (
    <div className="checkout-container">
      {/* Billing form */}
      <div className="billing-form">
        <h2>Billing Details</h2>
        <form>
          <label>First Name *</label>
          <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />

          <label>Company Name</label>
          <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />

          <label>Street Address *</label>
          <input type="text" value={streetAddress} onChange={(e) => setStreetAddress(e.target.value)} required />

          <label>Apartment, floor, etc. (optional)</label>
          <input type="text" value={apartment} onChange={(e) => setApartment(e.target.value)} />

          <label>Town/City *</label>
          <input type="text" value={city} onChange={(e) => setCity(e.target.value)} required />

          <label>Phone Number *</label>
          <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required />

          <label>Email Address *</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </form>
      </div>

      {/* Order Summary */}
      <div className="order-summary">
        {cartItems.map((item, idx) => (
          <div key={idx} className="product-item">
            <img
              src={
                item.images?.[0]
                  ? `http://localhost:5000${item.images[0]}`
                  : "https://via.placeholder.com/60x60?text=No+Image"
              }
              alt={item.name}
            />
            <span>
              {item.name} x {item.quantity}
            </span>

            <span className="price">Rs. {item.price * item.quantity}</span>
          </div>
        ))}

        <div className="summary-totals">
          <div>
            <span>Subtotal:</span>
            <span>Rs. {subtotal}</span>
          </div>
          <div>
            <span>Shipping:</span>
            <span>Free</span>
          </div>
          <div className="total">
            <span>Total:</span>

            <span>Rs. {subtotal}</span>
          </div>
        </div>

        {/* Payment Options */}
        <div className="payment-options">
          <label>
            <input
              type="radio"
              name="payment"
              value="Bank"
              checked={paymentMethod === "Bank"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Bank
            <span className="payment-icons-inline">
              <img src={visa} alt="Visa" />
              <img src={masterCard} alt="MasterCard" />
            </span>
          </label>

          <label>
            <input
              type="radio"
              name="payment"
              value="Cash on delivery"
              checked={paymentMethod === "Cash on delivery"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Cash on delivery
          </label>
        </div>

        <button className="place-order-btn" onClick={handlePlaceOrder}>
          Place Order
        </button>
      </div>
    </div>
  );
};

export default CheckOut;
