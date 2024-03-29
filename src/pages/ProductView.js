import React, { useEffect, useState, useContext } from "react";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import { useParams, useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import UserContext from "../UserContext";

// ProductView component
export default function ProductView() {
  const { productId } = useParams();
  console.log('Fetching product details for productId:', productId);

  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  // Adjust the product state structure
  const [product, setProduct] = useState({
    createdOn: '',
    description: '',
    isActive: true,
    name: '',
    price: 0,
    stock: 0,
    _id: '',
  });

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`);
        if (response.ok) {
          const data = await response.json();
          console.log('Product details:', data);

          // Set the product state with the fetched data
          setProduct(data.product);
        } else {
          console.error('Error fetching product details. Response status:', response.status);
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    if (productId) {
      fetchProductDetails();
    } else {
      console.error('No productId found in the URL.');
    }
  }, [productId]);

  const addToCart = () => {
    if (product && product._id) {
      fetch(`${process.env.REACT_APP_API_URL}/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          products: [
            {
              productId: product._id,
              quantity: 1, // You can adjust the quantity as needed
            },
          ],
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
  
          if (data.success) {
            Swal.fire({
              title: "Successfully Added",
              icon: "success",
              text: "Product added to your cart successfully.",
            });
  
            // Redirect to the products page after successful addition to cart
            navigate("/products");
          } else {
            Swal.fire({
              title: "Something went wrong",
              icon: "error",
              text: "Please try again.",
            });
          }
        })
        .catch((error) => {
          console.error('Error adding product to cart:', error);
          Swal.fire({
            title: "Error",
            icon: "error",
            text: "An error occurred. Please try again later.",
          });
        });
    } else {
      console.error('Cannot add to cart: product or product._id is undefined.');
    }
  };
  

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col lg={6}>
          <Card className="shadow">
            <Card.Body className="text-center">
              {product._id ? (
                <>
                  <Card.Title className="mb-3">{product.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">Description:</Card.Subtitle>
                  <Card.Text className="mb-3">{product.description}</Card.Text>
                  <Card.Subtitle className="mb-2 text-muted">Price:</Card.Subtitle>
                  <Card.Text className="mb-3">
                    <span className="text-primary">$ {product.price.toFixed(2)}</span>
                  </Card.Text>
                  <Card.Subtitle className="mb-2 text-muted">Stock:</Card.Subtitle>
                  {product.stock > 0 ? (
                    <Card.Text className="mb-3 text-success">In Stock: {product.stock}</Card.Text>
                  ) : (
                    <Card.Text className="text-danger mb-3">Out of Stock</Card.Text>
                  )}
                  {user.id !== null ? (
                    <Button variant="primary" block onClick={addToCart} disabled={product.stock <= 0}>
                      Add to Cart
                    </Button>
                  ) : (
                    <Link className="btn btn-danger btn-block" to="/login">
                      Log in to Add to Cart
                    </Link>
                  )}
                </>
              ) : (
                <p>Loading product details...</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
