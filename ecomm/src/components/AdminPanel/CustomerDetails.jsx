import React, { useEffect, useState } from "react";
import axios from "axios";
import '../../assets/css/customerdetails.css';

const CustomerDetails = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch all orders and extract customer details
  const fetchCustomers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/orders/all");
      
      // Extract unique customers based on email
      const customerMap = new Map();
      
      res.data.forEach(order => {
        if (order.billingDetails && order.billingDetails.email) {
          const email = order.billingDetails.email;
          if (!customerMap.has(email)) {
            customerMap.set(email, {
              ...order.billingDetails,
              orders: [{
                id: order._id,
                orderNumber: order.orderNumber,
                totalAmount: order.totalAmount,
                createdAt: order.createdAt,
                status: order.status || "Processing" // Default status if not provided
              }],
              orderCount: 1,
              totalSpent: order.totalAmount,
              firstOrder: order.createdAt,
              lastOrder: order.createdAt
            });
          } else {
            const existingCustomer = customerMap.get(email);
            const updatedOrders = [
              ...existingCustomer.orders,
              {
                id: order._id,
                orderNumber: order.orderNumber,
                totalAmount: order.totalAmount,
                createdAt: order.createdAt,
                status: order.status || "Processing" // Default status if not provided
              }
            ];
            
            customerMap.set(email, {
              ...existingCustomer,
              orders: updatedOrders,
              orderCount: existingCustomer.orderCount + 1,
              totalSpent: existingCustomer.totalSpent + order.totalAmount,
              lastOrder: order.createdAt > existingCustomer.lastOrder 
                ? order.createdAt 
                : existingCustomer.lastOrder
            });
          }
        }
      });
      
      setCustomers(Array.from(customerMap.values()));
    } catch (err) {
      console.error("Error fetching customers:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  // Filter customers based on search term
  const filteredCustomers = customers.filter(customer => {
    return (
      customer.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Function to determine status class for styling
  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'status-completed';
      case 'processing':
        return 'status-processing';
      case 'shipped':
        return 'status-shipped';
      case 'cancelled':
        return 'status-cancelled';
      default:
        return 'status-processing';
    }
  };

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="admin-spinner"></div>
        <p>Loading customer data...</p>
      </div>
    );
  }

  return (
    <div className="customer-details-container">
      <div className="admin-header">
        <h1>Customer Management</h1>
        <p>View and manage customer information</p>
      </div>

      {/* Customer Summary Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon total-customers">
            <i className="fas fa-users"></i>
          </div>
          <div className="stat-info">
            <span className="stat-label">Total Customers</span>
            <span className="stat-value">{customers.length}</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon total-orders">
            <i className="fas fa-shopping-bag"></i>
          </div>
          <div className="stat-info">
            <span className="stat-label">Total Orders</span>
            <span className="stat-value">
              {customers.reduce((total, customer) => total + customer.orderCount, 0)}
            </span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon total-revenue">
            <i className="fas fa-dollar-sign"></i>
          </div>
          <div className="stat-info">
            <span className="stat-label">Total Revenue</span>
            <span className="stat-value">
              ${customers.reduce((total, customer) => total + customer.totalSpent, 0).toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="admin-controls">
        <div className="search-box">
          <i className="fas fa-search"></i>
          <input
            type="text"
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Customers Table with Horizontal Scroll */}
      <div className="table-scroll-container">
        <div className="customers-table-container">
          <table className="customers-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Orders</th>
                <th>Status</th>
                <th>Total Spent</th>
                <th>First Order</th>
                <th>Last Order</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map((customer, index) => (
                  <tr key={index}>
                    <td>
                      <div className="customer-name">
                        {customer.firstName} {customer.lastName}
                      </div>
                      <div className="customer-company">{customer.companyName}</div>
                    </td>
                    <td>
                      <div className="customer-email">{customer.email}</div>
                    </td>
                    <td>
                      <div className="customer-phone">{customer.phone}</div>
                    </td>
                    <td>
                      <div className="customer-address">
                        {customer.streetAddress}
                        {customer.apartment && `, ${customer.apartment}`}
                        <br />
                        {customer.city}, {customer.state} {customer.zipCode}
                        {customer.country && <>, {customer.country}</>}
                      </div>
                    </td>
                    <td>
                      <div className="orders-container">
                        <div className="order-count-badge">{customer.orderCount} orders</div>
                        <div className="order-ids-list">
                          {customer.orders.map((order, idx) => (
                            <div key={idx} className="order-id-item">
                              <div className="order-id">{order.id}</div>
                              <div className="order-number">#{order.orderNumber}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="order-status-list">
                        {customer.orders.map((order, idx) => (
                          <div key={idx} className={`status-badge ${getStatusClass(order.status)}`}>
                            {order.status}
                          </div>
                        ))}
                      </div>
                    </td>
                    <td>
                      <div className="total-spent">${customer.totalSpent.toFixed(2)}</div>
                    </td>
                    <td>
                      <div className="order-date">
                        {new Date(customer.firstOrder).toLocaleDateString()}
                      </div>
                    </td>
                    <td>
                      <div className="order-date">
                        {new Date(customer.lastOrder).toLocaleDateString()}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="no-customers">
                    <i className="fas fa-user-slash"></i>
                    <p>No customers found</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetails;