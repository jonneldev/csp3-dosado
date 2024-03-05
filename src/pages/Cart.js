import React, { useState, useEffect, useCallback } from "react";
import { Button, Container, Row, Col, Table, Spinner } from "react-bootstrap";
import Swal from "sweetalert2";
import "../App.css"; // Import your custom CSS for the Cart component

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCartItems = useCallback(() => {
    setLoading(true);

    fetch(`${process.env.REACT_APP_API_URL}/cart/all`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);

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
        setLoading(false);
        console.error(`Error fetching cart items: ${error.message}`);
        // Display an error message to the user if needed
      });
  }, []);

  const removeFromCart = (productId) => {
    fetch(`${process.env.REACT_APP_API_URL}/cart/${productId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
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

  const updateQuantity = (productId, newQuantity) => {
    // Update the quantity for the selected product
    setCartItems((prevCartItems) => {
      const updatedCartItems = prevCartItems.map((item) =>
        item.productId === productId
          ? {
              ...item,
              quantity: newQuantity,
              totalPrice: newQuantity * item.productPrice, // Calculate the new total price
            }
          : item
      );
  
      // Recalculate the total amount based on the updated quantities
      const updatedTotalAmount = updatedCartItems.reduce((total, item) => total + item.totalPrice, 0);
  
      // Update the state with the new values
      setTotalAmount(updatedTotalAmount);
      return updatedCartItems;
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
    const createOrderPayload = () => {
      return selectedProducts.map((productId) => {
        const cartItem = cartItems.find((item) => item.productId === productId);
        return {
          productId,
          quantity: cartItem ? cartItem.quantity : 0,
        };
      });
    };

    const handleSuccess = (updatedCartItems) => {
      removeSelectedItemsFromCart(selectedProducts);

      // Clear the selected products
      setSelectedProducts([]);

      // Optionally update the cart items in the UI with the response from the server
      setCartItems(updatedCartItems);
    };

    const removeSelectedItemsFromCart = (selectedProducts) => {
      // Iterate over the selected products and remove them from the cart
      selectedProducts.forEach((productId) => {
        removeFromCart(productId);
      });
    };

    const handleError = (error) => {
      console.error(`Error placing order: ${error.message}`);
      Swal.fire({
        title: "Error",
        icon: "error",
        text: `Failed to place the order. Error: ${error.message}`,
      });
    };

    const sendOrderRequest = (orderPayload) => {
      fetch(`${process.env.REACT_APP_API_URL}/orders/place`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          products: orderPayload,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            handleSuccess(data.cartItems);
          } else {
            handleError(new Error(data.error));
          }
        })
        .catch((error) => {
          handleError(error);
        });
    };

    const selectedCartItems = createOrderPayload();
    console.log("Selected Cart Items:", selectedCartItems);

    sendOrderRequest(selectedCartItems);
  };

  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  return (
    <Container className="mt-5">
      <h1 className="mb-4">Shopping Cart</h1>

      {loading && <Spinner animation="border" role="status" />}
      
      {!loading && cartItems.length === 0 && <p>Your cart is empty.</p>}

      {!loading && cartItems.length > 0 && (
        <>
          <Table striped bordered hover responsive className="cart-table">
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
                <tr key={`cartItem_${item.productId}`}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedProducts.includes(item.productId)}
                      onChange={() => toggleProductSelection(item.productId)}
                    />
                  </td>
                  <td>{item.productName}</td>
                  <td>${item.productPrice}</td>
                  <td>
                    <div className="quantity-control">
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      >
                        -
                      </Button>
                      <span className="quantity">{item.quantity}</span>
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      >
                        +
                      </Button>
                    </div>
                  </td>
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
            <Col xs={12} md={4} className="text-right">
              <h5 className="total-price">Total Price: ${totalAmount}</h5>
              <Button variant="success" onClick={confirmOrder} className="place-order-btn">
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
