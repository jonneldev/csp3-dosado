import React, { useState, useEffect } from 'react';
import { CardGroup, Spinner } from 'react-bootstrap';
import PreviewProducts from './PreviewProducts';

export default function FeaturedProducts() {
  const [previews, setPreviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProducts = () => {
      fetch(`${process.env.REACT_APP_API_URL}/products/all`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.products.length > 0) {
            const randomFeaturedProducts = getUniqueRandomProducts(data.products, 4);
            const featured = randomFeaturedProducts.map((product) => (
              <PreviewProducts data={product} key={product._id} breakPoint={3} />
            ));
            setPreviews(featured);
          } else {
            console.error('No products found in the API response.');
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching product data:', error);
          setLoading(false);
        });
    };

    const intervalId = setInterval(() => {
      fetchFeaturedProducts();
    }, 5000);

    // Initial fetch
    fetchFeaturedProducts();

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  // Function to get unique random products
  const getUniqueRandomProducts = (products, count) => {
    const shuffled = [...products];
    let currentIndex = shuffled.length,
      randomIndex,
      tempValue;

    // While there remain elements to shuffle
    while (currentIndex !== 0) {
      // Pick a remaining element
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // Swap it with the current element
      tempValue = shuffled[currentIndex];
      shuffled[currentIndex] = shuffled[randomIndex];
      shuffled[randomIndex] = tempValue;
    }

    return shuffled.slice(0, count);
  };

  return (
    <div className="text-center my-2">
      <h2>Featured Products</h2>
      {loading ? (
        <Spinner animation="border" role="status" variant="primary">
          <span className="sr-only">Loading...</span>
        </Spinner>
      ) : previews.length > 0 ? (
        <CardGroup className="justify-content-center">{previews}</CardGroup>
      ) : (
        <p>No featured products available at the moment.</p>
      )}
    </div>
  );
}
