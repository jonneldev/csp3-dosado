import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import ProductCard from "./ProductCard";
import ProductSearch from "./ProductSearch";

export default function UserView({ productsData }) {
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = async (query) => {
    setSearchQuery(query);

    if (query.trim() !== '') {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/products/search`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ productName: query })
        });
        const data = await response.json();
        setSearchResults(data);
      } catch (error) {
        console.error('Error searching for products:', error);
      }
    } else {
      setSearchResults([]);
    }
  };

  return (
    <div>
      <ProductSearch onSearch={handleSearch} />
      <div className="mt-4">
        {searchQuery && (
          <>
            <h2>Search Results</h2>
            <Row>
              {searchResults.map(product => (
                <Col key={product._id} xs={12} md={6} lg={4}>
                  <ProductCard productProp={product} />
                </Col>
              ))}
            </Row>
          </>
        )}

        <h2>All Products</h2>
        <Row>
          {productsData.map(product => (
            <Col key={product._id} xs={12} md={6} lg={4}>
              <ProductCard productProp={product} />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
