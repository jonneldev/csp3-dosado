import { useState, useEffect } from 'react';
import { CardGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PreviewProducts from './PreviewProducts';

export default function FeaturedProducts() {
  // the list of featured products using the PreviewProducts component
  const [previews, setPreviews] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/b1/products/all`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.products.length > 0) {
          const featured = data.products.slice(0, 5).map((product) => (
            <PreviewProducts data={product} key={product._id} breakPoint={2} />
          ));
          setPreviews(featured);
        } else {
          console.error('No products found in the API response.');
        }
      })
      .catch((error) => {
        console.error('Error fetching product data:', error);
      });
  }, []);

  return (
    <>
      <h2 className="text-center">Featured Products</h2>
      <CardGroup className="justify-content-center">
        {previews.length > 0 ? (
          previews
        ) : (
          <p>No featured products available at the moment.</p>
        )}
      </CardGroup>
    </>
  );
}
