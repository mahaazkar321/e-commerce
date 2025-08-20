export const getCategoryEndpoint = (category) => {
  const endpointMap = {
    'Men Fashion': '/api/men-fashion',
    'Woman Fashion': '/api/woman-fashion',
    'Electronics': '/api/appliance-electronics',
    'Health and Beauty': '/api/health-and-beauty',
    'Home and Lifestyle': '/api/home-and-lifestyle',
    'Syrup and Medicine': '/api/syrup-and-medicine',
    'Sports': '/api/sports-and-outdoor',
    'FlashSales': '/api/flash-sales',
    'BestSellings': '/api/best-selling'
  };
  return endpointMap[category];
};