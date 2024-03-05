// AppNavBar.js
import '../App.css';
import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faShoppingCart, faUser, faList, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import UserContext from '../UserContext';

export default function AppNavBar() {
  const { user } = useContext(UserContext);

  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="brand">
          <FontAwesomeIcon icon={faShoppingCart} /> E-Commerce Store
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            <Nav.Link as={NavLink} to="/" exact>
              <FontAwesomeIcon icon={faHome} /> Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/products">
              Products
            </Nav.Link>
            {user.id !== null ? (
              <>
                {user.isAdmin ? (
                  <>
                    {/* Removed Add Product Link */}
                  </>
                ) : (
                  <>
                    <Nav.Link as={NavLink} to="/profile">
                      <FontAwesomeIcon icon={faUser} /> My Profile
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/cart">
                      <FontAwesomeIcon icon={faShoppingCart} /> My Cart
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/orders">
                      <FontAwesomeIcon icon={faList} /> My Orders
                    </Nav.Link>
                  </>
                )}
                <Nav.Link as={NavLink} to="/logout">
                  <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={NavLink} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={NavLink} to="/register">
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
