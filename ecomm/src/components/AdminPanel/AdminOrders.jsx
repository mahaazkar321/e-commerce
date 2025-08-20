import React, { useEffect, useState } from "react";
import axios from "axios";
import '../../assets/css/adminorder.css';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch all orders
  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/orders/all"); 
      setOrders(res.data);
    } catch (err) {
      console.error("Error fetching orders:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  // Update order status
  const updateStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/api/orders/${id}`, { status });
      fetchOrders(); // Refresh after update
    } catch (err) {
      console.error("Update failed:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Filter orders based on status and search term
  const filteredOrders = orders.filter(order => {
    const statusMatch = filter === "all" || order.status === filter;
    const searchMatch = 
      order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (order.billingDetails?.firstName && order.billingDetails.firstName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (order.billingDetails?.email && order.billingDetails.email.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return statusMatch && searchMatch;
  });

  // Get status counts for the summary cards
  const statusCounts = orders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    acc.total = (acc.total || 0) + 1;
    return acc;
  }, {});

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="admin-spinner"></div>
        <p>Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="admin-orders-container">
      <div className="admin-header">
        <h1>Order Management</h1>
        <p>Manage and track customer orders</p>
      </div>

      {/* Status Summary Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon total-orders">
            <i className="fas fa-shopping-cart"></i>
          </div>
          <div className="stat-info">
            <span className="stat-label">Total Orders</span>
            <span className="stat-value">{statusCounts.total || 0}</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon pending">
            <i className="fas fa-clock"></i>
          </div>
          <div className="stat-info">
            <span className="stat-label">Pending</span>
            <span className="stat-value">{statusCounts.pending || 0}</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon processing">
            <i className="fas fa-cog"></i>
          </div>
          <div className="stat-info">
            <span className="stat-label">Processing</span>
            <span className="stat-value">{statusCounts.processing || 0}</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon shipped">
            <i className="fas fa-shipping-fast"></i>
          </div>
          <div className="stat-info">
            <span className="stat-label">Shipped</span>
            <span className="stat-value">{statusCounts.shipped || 0}</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon cancelled">
            <i className="fas fa-times-circle"></i>
          </div>
          <div className="stat-info">
            <span className="stat-label">Cancelled</span>
            <span className="stat-value">{statusCounts.cancelled || 0}</span>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="admin-controls">
        <div className="control-group">
          <div className="search-box">
            <i className="fas fa-search"></i>
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="status-filter"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="orders-table-container">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Products</th>
              <th>Total</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <tr key={order._id}>
                  <td>
                    <div className="order-id">#{order._id.slice(-8)}</div>
                    <div className="order-date">
                      {new Date(order.createdAt || Date.now()).toLocaleDateString()}
                    </div>
                  </td>
                  <td>
                    <div className="customer-name">
                      {order.billingDetails?.firstName} {order.billingDetails?.lastName}
                    </div>
                    <div className="customer-email">{order.billingDetails?.email}</div>
                    <div className="customer-phone">{order.billingDetails?.phone}</div>
                  </td>
                  <td>
                    <div className="products-list">
                      {order.items.slice(0, 2).map((item, i) => (
                        <div key={i} className="product-item">
                          {item.name} × {item.quantity}
                        </div>
                      ))}
                      {order.items.length > 2 && (
                        <div className="more-items">
                          +{order.items.length - 2} more items
                        </div>
                      )}
                    </div>
                  </td>
                  <td>
                    <div className="order-total">${order.totalAmount?.toFixed(2)}</div>
                  </td>
                  <td>
                    <span className={`status-badge ${order.status}`}>
                      {order.status}
                    </span>
                  </td>
                  <td>
                    <select
                      value={order.status}
                      onChange={(e) => updateStatus(order._id, e.target.value)}
                      className={`status-select ${order.status}`}
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="no-orders">
                  <i className="fas fa-inbox"></i>
                  <p>No orders found</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrders;