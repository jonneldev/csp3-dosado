import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import ProductSearch from "./ProductSearch";

export default function UserView({ productsData }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (productsData) {
      // Map through productsData and filter active products
      const productsArr = productsData.map((product) => (
        product.isActive === true ? (
          // Render ProductCard for each active product
          <ProductCard productProp={product} key={product._id} />
        ) : null
      ));

      // Set the products state with the rendered product cards
      setProducts(productsArr);
    }
  }, [productsData]);

  return (
    <>
      {/* Render the product search component */}
      <ProductSearch />
      {/* Render the product cards */}
      {products}
    </>
  );
}
