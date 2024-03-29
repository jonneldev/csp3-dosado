import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function EditProduct({ product, fetchData }) {

  const [productId, setProductId] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [showEdit, setShowEdit] = useState(false);

  const openEdit = (productId) => {
    fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`)
      .then(res => res.json())
      .then(data => {
        setProductId(data.product._id);
        setName(data.product.name);
        setDescription(data.product.description);
        setPrice(data.product.price);
        setStock(data.product.stock);
        setShowEdit(true);
      })
      .catch(error => {
        console.error('Error fetching product details:', error);
        setShowEdit(false);
      });
  }
  

  const closeEdit = () => {
    setShowEdit(false);
    setProductId('');
    setName('');
    setDescription('');
    setPrice('');
    setStock('');
  }

  const editProduct = (e) => {
    e.preventDefault();

    fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`, {
      method: 'PUT',
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
            text: 'Product Successfully Updated'
          });
          closeEdit();
          fetchData();
        } else {
          Swal.fire({
            title: 'Error!',
            icon: 'error',
            text: data.error.message || 'Please try again'
          });
          closeEdit();
        }
      })
      .catch(error => {
        console.error('Error updating product:', error);
        closeEdit();
      });
  }

  return (
    <>
      <Button variant="primary" size="sm" onClick={() => openEdit(product)}> Edit </Button>

      {/* Edit Modal */}
      <Modal show={showEdit} onHide={closeEdit}>
        <Form onSubmit={editProduct}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Product</Modal.Title>
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
            <Button variant="secondary" onClick={closeEdit}>Close</Button>
            <Button variant="success" type="submit">Submit</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
