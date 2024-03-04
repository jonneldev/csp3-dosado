import React, { useContext, useEffect, useState } from "react";
import { Row, Col, Spinner, Form, Button, Card } from "react-bootstrap";
import UserContext from "../UserContext";
import { Navigate } from "react-router-dom";

export default function Profile() {
  const { user } = useContext(UserContext);

  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/b1/users/details`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          setDetails(data.data.user);
        }
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/b1/users/profile`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        setDetails(data.data.user);
      } else {
        console.error("Profile update failed:", data.message);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return user.id === null ? (
    <Navigate to="/products" />
  ) : (
    <Row className="mt-4 justify-content-center">
      <Col md={8}>
        <Card>
          <Card.Body className="text-dark bg-light">
            <h1 className="text-center mb-4">Profile</h1>
            <h4 className="text-center mb-4">{`${details.firstName} ${details.lastName}`}</h4>
            <hr className="bg-dark" />
            <h5 className="text-dark">Contacts</h5>
            <ul className="list-unstyled text-dark">
              <li>Email: {details.email}</li>
              <li>Mobile No: {details.mobileNo}</li>
            </ul>
          </Card.Body>
        </Card>
        <Card className="mt-4">
          <Card.Body>
            <h2 className="mb-4">Update Profile</h2>
            <Form onSubmit={handleUpdateProfile}>
              <Form.Group controlId="formFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" name="firstName" defaultValue={details.firstName} />
              </Form.Group>
              <Form.Group controlId="formLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" name="lastName" defaultValue={details.lastName} />
              </Form.Group>
              <Form.Group controlId="formMobileNo">
                <Form.Label>Mobile No</Form.Label>
                <Form.Control type="text" name="mobileNo" defaultValue={details.mobileNo} />
              </Form.Group>
              <Form.Group controlId="formAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control type="text" name="address" defaultValue={details.address} />
              </Form.Group>
              <Button variant="primary" type="submit" className="mt-3">
                Update Profile
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
