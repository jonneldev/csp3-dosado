import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Banner({ data }) {
  const { title, content, destination, label } = data;

  return (
    <Row className="bg-primary mt-4 mb-3 text-light py-5">
      <Col className="text-center">
        <h1 className="display-3 font-weight-bold mb-4">{title}</h1>
        <p className="lead mb-4">{content}</p>
        <Link to={destination}>
          <Button variant="light" size="lg" className="rounded-pill px-4">
            {label}
          </Button>
        </Link>
      </Col>
    </Row>
  );
}
