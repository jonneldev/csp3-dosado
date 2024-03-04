import React, { useState, useEffect, useCallback } from "react";
import { Button, Container, Row, Col, Table } from "react-bootstrap";
import Swal from "sweetalert2";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state

  const fetchCartItems = useCallback(() => {
    setLoading(true); // Set loading to true when starting the fetch

    fetch(`${process.env.REACT_APP_API_URL}/b1/cart/all`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false); // Set loading to false when the fetch is complete

        if (!data.success || !data.cartItems || !Array.isArray(data.cartItems) || data.cartItems.length === 0) {
          throw new Error("Invalid response structure or empty cart items");
        }

        const updatedCartItems = data.cartItems.map((item) => ({
          productId: item.productId?._id || 'No ID',
          productName: item.productId?.name || 'No Name',
          productPrice: item.productId?.price || 'No Price',
          quantity: item.quantity || 0,
          totalPrice: item.totalPrice || 0,
        }));

        const totalAmount = updatedCartItems.reduce((total, item) => total + item.totalPrice, 0);

        setCartItems(updatedCartItems);
        setTotalAmount(totalAmount);
      })
      .catch((error) => {
        setLoading(false); // Set loading to false in case of an error
        console.error(`Error fetching cart items: ${error.message}`);
        // Display an error message to the user if needed
      });
  }, []);

  const removeFromCart = (productId) => {
    fetch(`${process.env.REACT_APP_API_URL}/b1/cart/${productId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        fetchCartItems();
        Swal.fire({
          title: "Success",
          icon: "success",
          text: "Item removed from the cart",
        });
      })
      .catch((error) => console.error("Error removing item from the cart:", error));
  };

  const toggleProductSelection = (productId) => {
    setSelectedProducts((prevSelected) => {
      if (prevSelected.includes(productId)) {
        return prevSelected.filter((id) => id !== productId);
      } else {
        return [...prevSelected, productId];
      }
    });
  };

  const confirmOrder = () => {
    if (selectedProducts.length === 0) {
      Swal.fire({
        title: "Error",
        icon: "error",
        text: "Please select at least one product to place an order.",
      });
    } else {
      Swal.fire({
        title: "Confirm Order",
        icon: "question",
        text: "Do you want to place this order?",
        showCancelButton: true,
        confirmButtonText: "Yes, place order",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          placeOrder();
        }
      });
    }
  };

  const placeOrder = () => {
    const selectedCartItems = selectedProducts.map((productId) => {
      const cartItem = cartItems.find((item) => item.productId === productId);
      return {
        productId,
        quantity: cartItem ? cartItem.quantity : 0,
      };
    });
  
    console.log("Selected Cart Items:", selectedCartItems);
  
    fetch(`${process.env.REACT_APP_API_URL}/b1/orders/place`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        products: selectedCartItems,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          Swal.fire({
            title: "Order Placed",
            icon: "success",
            text: "Your order has been placed successfully!",
          });
  
          // Remove selected items from the cart after placing the order
          const updatedCartItems = cartItems.filter(
            (item) => !selectedProducts.includes(item.productId)
          );
          setCartItems(updatedCartItems);
          setSelectedProducts([]); // Clear the selected products
        } else {
          console.error(`Error placing order: ${data.error}`);
          Swal.fire({
            title: "Error",
            icon: "error",
            text: `Failed to place the order. Error: ${data.error}`,
          });
        }
      })
      .catch((error) => {
        console.error(`Error placing order: ${error.message}`);
        Swal.fire({
          title: "Error",
          icon: "error",
          text: "Failed to place the order. Please try again.",
        });
      });
  };
  

  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  return (
    <Container className="mt-5">
      <h1 className="mb-4">Shopping Cart</h1>

      {loading ? (
        <p>Loading cart items...</p>
      ) : cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Select</th>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {cartItems.map((item) => (
                <tr key={item.productId}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedProducts.includes(item.productId)}
                      onChange={() => toggleProductSelection(item.productId)}
                    />
                  </td>
                  <td>{item.productName}</td>
                  <td>${item.productPrice}</td>
                  <td>{item.quantity}</td>
                  <td>${item.totalPrice}</td>
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => removeFromCart(item.productId)}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Row className="justify-content-end">
            <Col md={4} className="text-right">
              <h5>Total Price: ${totalAmount}</h5>
              <Button variant="success" onClick={confirmOrder}>
                Place Order
              </Button>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default Cart;
