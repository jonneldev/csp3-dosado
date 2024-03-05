import React, { useState } from "react";
import ProductCard from "./ProductCard";
import "../App.css"; // Import the new CSS file

const ProductSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const handleSearch = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/products/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ productName: searchQuery })
      });
      const data = await response.json();
      setSearchResults(data);
      setIsSearchVisible(true);
    } catch (error) {
      console.error('Error searching for products:', error);
    }
  };

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
    if (event.target.value === "") {
      setIsSearchVisible(false);
    }
  };

  return (
    <div className="product-search-container">
      <div className="form-group position-relative">
        <label htmlFor="productName">Product Name:</label>
        <input
          type="text"
          id="productName"
          className="form-control"
          value={searchQuery}
          onChange={handleInputChange}
          onFocus={() => setIsSearchVisible(true)}
        />
        {isSearchVisible && (
          <div className="search-results">
            <button className="btn btn-primary" onClick={handleSearch}>
              Search
            </button>
            <h3>Search Results:</h3>
            <ul>
              {searchResults.map(product => (
                <ProductCard productProp={product} key={product._id} />
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductSearch;
