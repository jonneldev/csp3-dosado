import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function ProductCard({ productProp }) {
  // Deconstruct the product properties into their own variables
  const { _id, name, description, price, stock } = productProp;

  return (
    <Card>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Subtitle>Description:</Card.Subtitle>
        <Card.Text>{description}</Card.Text>
        <Card.Subtitle>Price:</Card.Subtitle>
        <Card.Text>Php {price}</Card.Text>
        <Card.Subtitle>Stock:</Card.Subtitle>
        <Card.Text>{stock}</Card.Text>
        <Link className="btn btn-primary" to={`/products/${_id}`}>
          Details
        </Link>
      </Card.Body>
    </Card>
  );
}

// Check if the ProductCard component is getting the correct prop types
// PropTypes are used for validating information passed to a component.
ProductCard.propTypes = {
  // The 'shape' method is used to check if a prop object conforms to a specific "shape"
  productProp: PropTypes.shape({
    // Define the properties and their expected types
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    stock: PropTypes.number.isRequired,
  }),
};
