import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';

export default function Highlights() {
  return (
    <Row className="mt-1 mb-5">
      <Col xs={12} md={4} className="mb-4">
        <Card className="cardHighlight p-4 text-center shadow">
          <Card.Body>
            <Card.Title>
              <h2 className="mb-4 text-primary">Shop Anytime, Anywhere</h2>
            </Card.Title>
            <Card.Text>
              Explore our online store 24/7 and discover a wide range of products. Shop from the comfort of your home and get your favorite items delivered to your doorstep.
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col xs={12} md={4} className="mb-4">
        <Card className="cardHighlight p-4 text-center shadow">
          <Card.Body>
            <Card.Title>
              <h2 className="mb-4 text-success">Exclusive Deals for You</h2>
            </Card.Title>
            <Card.Text>
              Enjoy exclusive discounts and special offers on our featured products. Save more while getting high-quality items. Check our promotions regularly!
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col xs={12} md={4} className="mb-4">
        <Card className="cardHighlight p-4 text-center shadow">
          <Card.Body>
            <Card.Title>
              <h2 className="mb-4 text-warning">Join Our Loyalty Program</h2>
            </Card.Title>
            <Card.Text>
              Be part of our community and join our loyalty program. Earn rewards with every purchase and unlock exciting benefits. Shop with us and experience the perks!
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
