import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Banner({ data }) {
  const { title, content, destination, label } = data;

  return (
    <Row className="bg-light p-5">
      <Col className="text-center">
        <h1 className="display-4">{title}</h1>
        <p className="lead">{content}</p>
        <Link to={destination}>
          <Button variant="primary">{label}</Button>
        </Link>
      </Col>
    </Row>
  );
}
