import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const query = new URLSearchParams(location.search).get('query');

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/api/search?query=${query}`);
        setResults(response.data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch search results.");
      } finally {
        setLoading(false);
      }
    };

    if (query) fetchResults();
  }, [query]);

  if (loading) return <div className="text-center py-8 text-lg font-medium">Loading...</div>;
  if (error) return <div className="text-red-500 text-center py-8 text-lg">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-10 text-center">
        Search Results for "<span className="text-blue-600">{query}</span>"
      </h2>

      {results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {results.map((item) => {
            const imageUrl = item.images?.[0]
              ? `http://localhost:5000${item.images[0]}`
              : 'https://via.placeholder.com/300x400?text=No+Image';

            return (
              <div
                key={item._id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                {/* Image */}
                <div className="h-60 bg-gray-100 relative">
                  <img
                    src={imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/300x400?text=No+Image';
                      e.target.style.objectFit = 'contain';
                    }}
                  />
                </div>

                {/* Product Details */}
                <div className="p-4 flex flex-col justify-between h-[180px]">
                  <div>
                    <h3 className="font-semibold text-lg mb-1 line-clamp-1">{item.name}</h3>
                    <p className="text-gray-600 font-medium mb-2">Rs. {item.price?.toFixed(2)}</p>
                    {item.category && (
                      <span className="inline-block bg-gray-200 text-gray-700 text-xs font-medium px-3 py-1 rounded-full">
                        {item.category}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() =>
                      navigate(
                        `/products/${item.category?.toLowerCase().replace(/\s+/g, '-')}/${item._id}`
                      )
                    }
                   className="mt-4 w-full bg-black text-black py-2 rounded transition duration-200 border border-black hover:opacity-90"
                  style={{
                    
                    padding: '0.5rem',
                    backgroundColor: '#333',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}

                  >
                    View Details
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl font-medium">No results found for "{query}"</p>
          <p className="text-gray-500 mt-2">Try different keywords</p>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
