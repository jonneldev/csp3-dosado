import React, { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function AddProduct({ fetchData }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [showAdd, setShowAdd] = useState(false);

  const openAdd = () => {
    setShowAdd(true);
  }

  const closeAdd = () => {
    setShowAdd(false);
    setName('');
    setDescription('');
    setPrice('');
    setStock('');
  }

  const addProduct = (e) => {
    e.preventDefault();

    fetch(`${process.env.REACT_APP_API_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        name: name,
        description: description,
        price: price,
        stock: stock
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          Swal.fire({
            title: 'Success!',
            icon: 'success',
            text: 'Product Successfully Added'
          });
          closeAdd();
          fetchData();
        } else {
          Swal.fire({
            title: 'Error!',
            icon: 'error',
            text: data.error.message || 'Please try again'
          });
          closeAdd();
        }
      })
      .catch(error => {
        console.error('Error adding product:', error);
        closeAdd();
      });
  }

  return (
    <>
      <Button variant="success" size="sm" onClick={openAdd}>
        Add Product
      </Button>

      {/* Add Modal */}
      <Modal show={showAdd} onHide={closeAdd}>
        <Form onSubmit={addProduct}>
          <Modal.Header closeButton>
            <Modal.Title>Add Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                value={description}
                onChange={e => setDescription(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                value={price}
                onChange={e => setPrice(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                value={stock}
                onChange={e => setStock(e.target.value)}
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeAdd}>Close</Button>
            <Button variant="success" type="submit">Submit</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
