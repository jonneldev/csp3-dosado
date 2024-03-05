// Profile.js
import React, { useContext, useEffect, useState } from "react";
import { Form, Button, Card, Container, Row, Col, Modal } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import Swal from 'sweetalert2';
import UserContext from "../UserContext";
import ResetPassword from "../components/ResetPassword"; // Import the ResetPassword component
import "../App.css"; // Import your new CSS file

export default function Profile() {
  const { user } = useContext(UserContext);
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);

  const [details, setDetails] = useState({
    firstName: '',
    lastName: '',
    mobileNo: '',
    address: '',
    email: '',
  });

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setDetails(data.data.user);
        }
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
      });
  }, []);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/users/profile`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: e.target.firstName.value,
          lastName: e.target.lastName.value,
          mobileNo: e.target.mobileNo.value,
          address: e.target.address.value,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        setDetails(data.data.user);
        // Display success alert
        Swal.fire({
          title: 'Success!',
          icon: 'success',
          text: 'Profile updated successfully',
        });
      } else {
        console.error("Profile update failed:", data.message);
        // Display error alert
        Swal.fire({
          title: 'Error!',
          icon: 'error',
          text: data.message || 'Profile update failed',
        });
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      // Display error alert
      Swal.fire({
        title: 'Error!',
        icon: 'error',
        text: 'Failed to update profile. Please try again.',
      });
    }
  };

  const handleShowResetPasswordModal = () => {
    setShowResetPasswordModal(true);
  };

  const handleCloseResetPasswordModal = () => {
    setShowResetPasswordModal(false);
  };

  return user.id === null ? (
    <Navigate to="/products" />
  ) : (
    <Container className="profile-container">
      <Card className="profile-card">
        <Card.Body>
          <h1 className="profile-header mb-4">Profile</h1>
          <h4 className="text-center mb-4">{`${details.firstName} ${details.lastName}`}</h4>
          <hr className="bg-primary" />
          <h5 className="text-dark">Contacts</h5>
          <ul className="contacts-list">
            <li>Email: {details.email}</li>
            <li>Mobile No: {details.mobileNo}</li>
          </ul>
          <Button variant="info" onClick={handleShowResetPasswordModal}>
            Change Password
          </Button>
        </Card.Body>
      </Card>

      <Card className="update-profile-card">
        <Card.Body>
          <h2 className="mb-4">Update Profile</h2>
          <Form className="update-form" onSubmit={handleUpdateProfile}>
            <Form.Group controlId="formFirstName" className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" name="firstName" defaultValue={details.firstName} />
            </Form.Group>
            <Form.Group controlId="formLastName" className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" name="lastName" defaultValue={details.lastName} />
            </Form.Group>
            <Form.Group controlId="formMobileNo" className="mb-3">
              <Form.Label>Mobile No</Form.Label>
              <Form.Control type="text" name="mobileNo" defaultValue={details.mobileNo} />
            </Form.Group>
            <Form.Group controlId="formAddress" className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control type="text" name="address" defaultValue={details.address} />
            </Form.Group>
            <Button className="submit-btn" variant="primary" type="submit">
              Update Profile
            </Button>
          </Form>
        </Card.Body>
      </Card>

      {/* Reset Password Modal */}
      <Modal show={showResetPasswordModal} onHide={handleCloseResetPasswordModal}>
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ResetPassword />
        </Modal.Body>
      </Modal>
    </Container>
  );
}
