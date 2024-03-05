import React, { useState, useEffect } from "react";
import { Container, Table, Button, Badge } from "react-bootstrap";
import Swal from "sweetalert2";
import "../App.css"; // Import your custom CSS for the Orders component

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    // Replace the URL with your actual API endpoint for fetching orders
    fetch(`${process.env.REACT_APP_API_URL}/orders/all`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setOrders(data.orders);
      })
      .catch((error) => console.error("Error fetching orders:", error));
  };

  const cancelOrder = (orderId) => {
    // Replace the URL with your actual API endpoint for canceling an order
    fetch(`${process.env.REACT_APP_API_URL}/orders/${orderId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          fetchOrders(); // Refresh orders after canceling
          Swal.fire({
            title: "Success",
            icon: "success",
            text: "Order canceled successfully",
          });
        } else {
          Swal.fire({
            title: "Error",
            icon: "error",
            text: "Failed to cancel the order. Please try again.",
          });
        }
      })
      .catch((error) => console.error("Error canceling order:", error));
  };

  const mergeProducts = (products) => {
    const mergedProducts = {};
    products.forEach((product) => {
      const key = product.productId;
      if (mergedProducts[key]) {
        // Product already exists, update quantity and total price
        mergedProducts[key].quantity += product.quantity;
        mergedProducts[key].totalPrice += product.totalPrice;
      } else {
        // Product doesn't exist, add it to the merged products
        mergedProducts[key] = { ...product };
      }
    });
    return Object.values(mergedProducts);
  };

  return (
    <Container className="mt-5">
      <h1 className="mb-4 text-center">Orders</h1>

      {orders.length === 0 ? (
        <p className="text-center">No orders found.</p>
      ) : (
        <Table striped bordered hover responsive className="orders-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total Price</th>
              <th>Purchased On</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <React.Fragment key={order._id}>
                {mergeProducts(order.products).map((product, index) => (
                  <tr key={`${order._id}-${index}`}>
                    <td>{product.productName}</td>
                    <td>${product.productPrice !== undefined ? product.productPrice.toFixed(2) : 'N/A'}</td>
                    <td>{product.quantity}</td>
                    <td>${product.totalPrice !== undefined ? product.totalPrice.toFixed(2) : 'N/A'}</td>
                    {index === 0 && (
                      <>
                        <td rowSpan={mergeProducts(order.products).length}>
                          {new Date(order.purchasedOn).toLocaleString()}
                        </td>
                        <td rowSpan={mergeProducts(order.products).length}>
                          <Badge
                            pill
                            variant={
                              order.status === "pending"
                                ? "warning"
                                : order.status === "processing"
                                ? "info"
                                : "success"
                            }
                          >
                            {order.status}
                          </Badge>
                        </td>
                        <td rowSpan={mergeProducts(order.products).length}>
                          {order.status === "pending" && (
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => cancelOrder(order._id)}
                            >
                              Cancel
                            </Button>
                          )}
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}
