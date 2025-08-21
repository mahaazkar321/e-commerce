export const getOrders = async (isAdmin = false) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No authentication token found");
      throw new Error("Authentication required");
    }

    // Use different endpoint based on user role
    const endpoint = isAdmin 
      ? "http://localhost:5000/api/orders/all" 
      : "http://localhost:5000/api/orders";

    const response = await axios.get(endpoint, {
      headers: { 
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      timeout: 10000
    });

    console.log("API Response status:", response.status);
    
    // Handle different response formats
    if (Array.isArray(response.data)) {
      return response.data;
    } else if (response.data && Array.isArray(response.data.orders)) {
      return response.data.orders;
    } else if (response.data && Array.isArray(response.data.data)) {
      return response.data.data;
    } else {
      console.warn("Unexpected response format:", response.data);
      return [];
    }
  } catch (error) {
    console.error("Error in getOrders:", {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data
    });
    
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    } else if (error.response?.status === 403) {
      console.error("Access denied - Admin privileges required");
      throw new Error("Admin access required");
    }
    
    throw error;
  }
};