import { Card, Button } from 'react-bootstrap';

const ProductItem = ({ product, isAdmin, onAddToCart, onRemoveProduct }) => {
  return (
    <Card>
      <Card.Img variant="top" src={product.image} alt={product.name} />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>${product.price.toFixed(2)}</Card.Text>
        {!isAdmin ? (
          <Button onClick={() => onAddToCart(product)}>Agregar al carrito</Button>
        ) : (
          <Button variant="danger" onClick={() => onRemoveProduct(product.id)}>Eliminar</Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default ProductItem;
