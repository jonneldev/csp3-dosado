import { Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function PreviewProducts({ data, breakPoint }) {
  // Destructure the data object
  const { _id, name, description, price, stock } = data;

  return (
    <Col xs={12} md={breakPoint}>
      <Card className="cardHighlight mx-2">
        <Card.Body>
          <Card.Title className="text-center">
            <Link to={`/products/${_id}`}>{name}</Link>
          </Card.Title>
          <Card.Text>{description}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <h5 className="text-center">₱{price}</h5>
          {stock > 0 ? (
            <>
              <p className="text-center">In Stock: {stock}</p>
              <Link className="btn btn-primary d-block" to={`/products/${_id}`}>
                Details
              </Link>
            </>
          ) : (
            <p className="text-center text-danger">Out of Stock</p>
          )}
        </Card.Footer>
      </Card>
    </Col>
  );
}

