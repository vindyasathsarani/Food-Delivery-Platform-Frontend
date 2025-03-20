import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import './FoodSearch.css';
import SearchIcon from '@mui/icons-material/Search';
import { BASE_URL } from '../../config';
function FoodSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/Food/search?foodName=${searchQuery}`);
      const foods = response.data;
      if (foods.length > 0) {
        // If food is available, navigate to the ViewFood component
        navigate(`/fetch/${foods[0]._id}`);
      } else {
        alert(`Food '${searchQuery}' is not available.`);
      }
    } catch (error) {
      console.error('Error searching for food:', error);
      alert('An error occurred while searching for food. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSearch();
    }
  };

  return (
<div className="rounded-search-bar">
      <div className="search-container">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for food..."
          onKeyPress={handleKeyPress}
          className="search-input"
        />
        <SearchIcon onClick={handleSearch} /> {/* Handle click event here */}
      </div>
     
   

      {loading && <p>Loading...</p>}
    </div>

  );
}

export default FoodSearch;
