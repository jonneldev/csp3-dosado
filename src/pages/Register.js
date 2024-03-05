import { useState, useEffect, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';

export default function Register() {
  const { user } = useContext(UserContext);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isActive, setIsActive] = useState(false);

  function registerUser(e) {
    e.preventDefault();

    fetch(`${process.env.REACT_APP_API_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        mobileNo: mobileNo,
        address: address,
        password: password
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data) {
          setFirstName("");
          setLastName("");
          setEmail("");
          setMobileNo("");
          setAddress("");
          setPassword("");
          setConfirmPassword("");

          Swal.fire({
            title: "Registration Successful",
            icon: "success",
            text: "Thank you for registering!"
          });

          // Redirect to home page
          // Ensure that the user context is updated accordingly
          // (You may not need this if you handle user details in a different way)
        } else {
          Swal.fire({
            title: "Registration Failed",
            icon: "error",
            text: "Please try again later."
          });
        }
      });
  }

  useEffect(() => {
    if (
      firstName !== "" &&
      lastName !== "" &&
      email !== "" &&
      mobileNo !== "" &&
      address !== "" &&
      password !== "" &&
      confirmPassword !== "" &&
      password === confirmPassword &&
      mobileNo.length === 11
    ) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [firstName, lastName, email, mobileNo, address, password, confirmPassword]);

  return (
    (user.id !== null) ? 
      <Navigate to='/' />
     : 
      <Form onSubmit={(e) => registerUser(e)}>
        <h1 className="my-5 text-center">Register</h1>
        <Form.Group>
          <Form.Label>First Name:</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter First Name" 
            required
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Last Name:</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter Last Name" 
            required
            value={lastName}
            onChange={e => setLastName(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Email:</Form.Label>
          <Form.Control 
            type="email" 
            placeholder="Enter Email" 
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Mobile No:</Form.Label>
          <Form.Control 
            type="number" 
            placeholder="Enter 11 Digit No."
            required
            value={mobileNo}
            onChange={e => setMobileNo(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Address:</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter Address"
            required
            value={address}
            onChange={e => setAddress(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password:</Form.Label>
          <Form.Control 
            type="password" 
            placeholder="Enter Password" 
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Confirm Password:</Form.Label>
          <Form.Control 
            type="password" 
            placeholder="Confirm Password" 
            required
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          id="submitBtn"
          disabled={!isActive} // Disable the button if isActive is false
        >
          Submit
        </Button>
      </Form>
    
  );
}
