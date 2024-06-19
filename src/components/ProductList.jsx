import { Row, Col, Card, Button } from 'react-bootstrap';
import ProductItem from './ProductItem';

const ProductList = ({ products, isAdmin, onAddToCart, onRemoveProduct }) => {
  return (
    <>
      <h2 className="mb-4">Productos</h2>
      <Row>
        {products.map(product => (
          <Col xs={12} md={6} lg={4} key={product.id} className="mb-4">
            <ProductItem
              product={product}
              isAdmin={isAdmin}
              onAddToCart={onAddToCart}
              onRemoveProduct={onRemoveProduct}
            />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default ProductList;
