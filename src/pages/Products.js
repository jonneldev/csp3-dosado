import React, { useEffect, useState, useContext } from "react";
import UserContext from "../UserContext";
import AdminView from "../components/AdminView";
import UserView from "../components/UserView";

export default function Products() {
  const { user } = useContext(UserContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/b1/products/all`);
      if (!response.ok) {
        throw new Error("Error fetching product data");
      }
      const data = await response.json();
      setProducts(data.products);
    } catch (error) {
      console.error("Error fetching product data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {

    fetchData();
  }, [user]);

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {user.isAdmin ? (
            <AdminView productsData={products} fetchData={fetchData} />
          ) : (
            <UserView productsData={products} />
          )}
        </>
      )}
    </>
  );
}
