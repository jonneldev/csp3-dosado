import React from 'react';
import { Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../App.css'

export default function PreviewProducts({ data, breakPoint }) {
  // Destructure the data object
  const { _id, name, description, price, stock } = data;

  return (
    <Col xs={12} md={breakPoint} className="mb-2">
      <Card className="cardHighlight h-100 shadow-sm mx-2">
        <Card.Body className="d-flex flex-column justify-content-between">
          <Card.Title className="text-center mb-3">
            <Link to={`/products/${_id}`} className="text-decoration-none text-dark">
              <h5 className="mb-0">{name}</h5>
            </Link>
          </Card.Title>
          <Card.Text className="mb-3">{description}</Card.Text>
          <div className="text-center">
            <h4 className="text-price mb-2">${price.toFixed(2)}</h4>
            {stock > 0 ? (
              <>
                <p className="text-success mb-2">In Stock: {stock}</p>
                <Link to={`/products/${_id}`} className="btn btn-primary btn-sm">
                  View Details
                </Link>
              </>
            ) : (
              <p className="text-danger mb-2">Out of Stock</p>
            )}
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
}

PreviewProducts.propTypes = {
  data: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    stock: PropTypes.number.isRequired,
  }).isRequired,
  breakPoint: PropTypes.number.isRequired,
};
