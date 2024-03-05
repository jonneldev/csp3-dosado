import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function ProductCard({ productProp }) {
  // Destructure the product properties into their own variables
  const { _id, name, description, price, stock } = productProp;

  return (
    <Card className="shadow">
      <Card.Body>
        <Card.Title className="mb-3">{name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Description:</Card.Subtitle>
        <Card.Text className="mb-3">{description}</Card.Text>
        <Card.Subtitle className="mb-2 text-muted">Price:</Card.Subtitle>
        <Card.Text className="mb-3">
          <span className="text-primary">$ {price.toFixed(2)}</span>
        </Card.Text>
        <Card.Subtitle className="mb-2 text-muted">Stock:</Card.Subtitle>
        {stock > 0 ? (
          <Card.Text className="mb-3 text-success">In Stock: {stock}</Card.Text>
        ) : (
          <Card.Text className="text-danger mb-3">Out of Stock</Card.Text>
        )}
        <Link className="btn btn-primary" to={`/products/${_id}`}>
          Details
        </Link>
      </Card.Body>
    </Card>
  );
}

// PropTypes validation
ProductCard.propTypes = {
  productProp: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    stock: PropTypes.number.isRequired,
  }).isRequired,
};
