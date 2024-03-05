// Login.js
import React, { useState, useEffect, useContext } from "react";
import { Form, Button, Card } from "react-bootstrap";
import Swal from "sweetalert2";
import UserContext from "../UserContext";
import { Navigate } from "react-router-dom";

export default function Login() {
  const { user, setUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isActive, setIsActive] = useState(false);

  async function authenticate(e) {
    e.preventDefault();
    console.log("Attempting to authenticate...");

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      console.log("Authentication response status:", response.status);
      const data = await response.json();
      console.log("Authentication response data:", data);

      if (response.ok && data.success) {
        localStorage.setItem("token", data.data.accessToken);
        console.log("Token set in local storage:", data.data.accessToken);
        retrieveUserDetails(data.data.accessToken);
        Swal.fire({
          title: "Login Successful",
          icon: "success",
          text: "Welcome to Your E-commerce Store",
        });
      } else {
        console.error("Authentication failed. No access token received.");
        Swal.fire({
          title: "Authentication failed",
          icon: "error",
          text: "Check your login details and try again",
        });
      }
    } catch (error) {
      console.error("Authentication Error:", error);
      Swal.fire({
        title: "Authentication failed",
        icon: "error",
        text: "An unexpected error occurred during authentication. Please try again.",
      });
    }

    setEmail("");
    setPassword("");
  }

  const retrieveUserDetails = async (token) => {
    console.log("Retrieving user details...");

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("User details response status:", response.status);
      const data = await response.json();
      console.log("User details response data:", data);

      if (response.ok && data.success) {
        const userDetails = data.data.user; // Assuming user details are nested under 'user' key

        setUser({
          id: userDetails._id,
          isAdmin: userDetails.isAdmin,
        });

        console.log("User details retrieved successfully. ID:", userDetails._id, "isAdmin:", userDetails.isAdmin);
      } else {
        console.error("Failed to retrieve user details:", data.message);
      }
    } catch (error) {
      console.error("Error retrieving user details:", error.message);
    }
  };

  useEffect(() => {
    setIsActive(email !== "" && password !== "");
  }, [email, password]);

  return user.id !== null ? (
    <Navigate to="/products" />
  ) : (
    <Card className="p-4 mx-auto mt-5 shadow" style={{ maxWidth: "400px", borderRadius: "15px", backgroundColor: "#f8f9fa" }}>
      <h1 className="my-4 text-center" style={{ color: "#343a40" }}>
        Login
      </h1>
      <Form onSubmit={(e) => authenticate(e)}>
        <Form.Group controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button
          variant={isActive ? "primary" : "danger"}
          type="submit"
          block
          disabled={!isActive}
          style={{
            borderRadius: "10px",
            marginTop: "15px",
            backgroundColor: isActive ? "#007bff" : "#dc3545",
            borderColor: isActive ? "#007bff" : "#dc3545",
          }}
        >
          Submit
        </Button>
      </Form>
    </Card>
  );
}
