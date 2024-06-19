import { Row, Col, Card, Button } from 'react-bootstrap';

const ShoppingCart = ({ cart, onRemoveFromCart }) => {
  return (
    <>
      <h2 className="mt-4">Carrito</h2>
      <Row>
        {cart.map(item => (
          <Col xs={12} key={item.cartId} className="mb-4">
            <Card>
              <Card.Img variant="top" src={item.image} alt={item.name} />
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>${item.price.toFixed(2)}</Card.Text>
                <Button variant="danger" onClick={() => onRemoveFromCart(item.cartId)}>Quitar del carrito</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default ShoppingCart;
