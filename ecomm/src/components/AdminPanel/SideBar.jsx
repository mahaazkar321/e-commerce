import React, { useState } from "react";
import AddProduct from "./AddProd";
import AdminOrders from "./AdminOrders";

const SideBar = () => {
  const [activeComponent, setActiveComponent] = useState("addProduct");

  const renderComponent = () => {
    switch (activeComponent) {
      case "addProduct":
        return <AddProduct />;
      case "orderDetails":
        return <AdminOrders />;
      case "customerDetails":
        return <AddProduct />;
      default:
        return <AddProduct />;
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <div
        style={{
          width: "220px",
          backgroundColor: "#dc3545",
          color: "#fff",
          padding: "20px",
        }}
      >
        <h2 style={{ marginBottom: "30px", fontSize: "20px" }}>Dashboard</h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li
            style={{
              margin: "15px 0",
              cursor: "pointer",
              color: activeComponent === "addProduct" ? "#ecececff" : "#fff",
            }}
            onClick={() => setActiveComponent("addProduct")}
          >
            Add Product
          </li>
          <li
            style={{
              margin: "15px 0",
              cursor: "pointer",
              color: activeComponent === "orderDetails" ? "#ecececff" : "#fff",
            }}
            onClick={() => setActiveComponent("orderDetails")}
          >
            Order Details
          </li>
          <li
            style={{
              margin: "15px 0",
              cursor: "pointer",
              color: activeComponent === "customerDetails" ? "#ecececff" : "#fff",
            }}
            onClick={() => setActiveComponent("customerDetails")}
          >
            Customers Details
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: "20px" }}>
        {renderComponent()}
      </div>
    </div>
  );
};

export default SideBar;
