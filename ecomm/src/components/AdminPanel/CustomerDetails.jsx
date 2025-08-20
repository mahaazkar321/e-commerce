import React, { useEffect, useState } from "react";
import { getOrders } from "./orderService";

const CustomerDetails = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const data = await getOrders();
        console.log("Fetched orders data:", data);
        
        if (Array.isArray(data)) {
          data.forEach((order, index) => {
            console.log(`Order ${index} ID:`, order._id);
            console.log(`Order ${index} billing details:`, order.billingDetails);
          });
        }
        
        setOrders(data);
      } catch (err) {
        console.error("Error fetching orders", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) {
    return <div className="p-6">Loading orders...</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Customer Billing Details</h2>

      {!Array.isArray(orders) || orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border-gray-200">
            <thead>
              <tr className="bg-gray-95">
                <th className="py-2 px-5 border-b text-left">ID</th>
                <th className="py-2 px-5 border-b text-left">Name</th>
                <th className="py-2 px-5 border-b text-left">Company</th>
                <th className="py-2 px-5 border-b text-left">Address</th>
                <th className="py-2 px-5 border-b text-left">City</th>
                <th className="py-2 px-5 border-b text-left">Phone</th>
                <th className="py-2 px-5 border-b text-left">Email</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50">
                  <td className="py-2 px-5 border-b">
                    #{order._id?.slice(-6).toUpperCase()}
                  </td>
                  <td className="py-2 px-5 border-b">
                    {order.billingDetails?.firstName || "N/A"}
                  </td>
                  <td className="py-2 px-5 border-b">
                    {order.billingDetails?.companyName || "N/A"}
                  </td>
                  <td className="py-2 px-5 border-b">
                    {order.billingDetails ? (
                      <>
                        {order.billingDetails.streetAddress || "N/A"}
                        {order.billingDetails.apartment && `, ${order.billingDetails.apartment}`}
                      </>
                    ) : (
                      "N/A"
                    )}
                  </td>
                  <td className="py-2 px-5 border-b">
                    {order.billingDetails?.city || "N/A"}
                  </td>
                  <td className="py-2 px-5 border-b">
                    {order.billingDetails?.phone || "N/A"}
                  </td>
                  <td className="py-2 px-5 border-b">
                    {order.billingDetails?.email || "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CustomerDetails;