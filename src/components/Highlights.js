import { Row, Col, Card } from 'react-bootstrap';

export default function Highlights() {

  return (
    <Row className="mt-3 mb-3">
      <Col xs={12} md={4}>
        <Card className="cardHighlight p-3">
          <Card.Body>
            <Card.Title>
              <h2>Shop Anytime, Anywhere</h2>
            </Card.Title>
            <Card.Text>
              Explore our online store 24/7 and discover a wide range of products. Shop from the comfort of your home and get your favorite items delivered to your doorstep.
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col xs={12} md={4}>
        <Card className="cardHighlight p-3">
          <Card.Body>
            <Card.Title>
              <h2>Exclusive Deals for You</h2>
            </Card.Title>
            <Card.Text>
              Enjoy exclusive discounts and special offers on our featured products. Save more while getting high-quality items. Check our promotions regularly!
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col xs={12} md={4}>
        <Card className="cardHighlight p-3">
          <Card.Body>
            <Card.Title>
              <h2>Join Our Loyalty Program</h2>
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
