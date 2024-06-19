import { Card } from 'react-bootstrap';
import { BsCart } from 'react-icons/bs';

const Cart = ({ totalPrice }) => {
  return (
    <Card className="my-4 p-3">
      <Card.Body>
        <Card.Text>
          Carrito: ${totalPrice.toFixed(2)}
        </Card.Text>
        <BsCart size={30} color="#000" />
      </Card.Body>
    </Card>
  );
};

export default Cart;
