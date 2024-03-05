// ResetPassword.js
import React, { useState } from "react";
import { Form, Button, Card, Container } from "react-bootstrap";
import Swal from 'sweetalert2';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/users/reset-password`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          newPassword,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        // Display success alert
        Swal.fire({
          title: 'Success!',
          icon: 'success',
          text: 'Password reset successfully',
        });
      } else {
        console.error("Password reset failed:", data.message);
        // Display error alert
        Swal.fire({
          title: 'Error!',
          icon: 'error',
          text: data.message || 'Password reset failed',
        });
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      // Display error alert
      Swal.fire({
        title: 'Error!',
        icon: 'error',
        text: 'Failed to reset password. Please try again.',
      });
    }
  };

  return (
    <Container className="reset-password-container">
      <Card className="reset-password-card">
        <Card.Body>
          <h2 className="mb-4">Reset Password</h2>
          <Form className="reset-password-form" onSubmit={handleResetPassword}>
            <Form.Group controlId="formNewPassword" className="mb-3">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                name="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button className="submit-btn" variant="primary" type="submit">
              Reset Password
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ResetPassword;
