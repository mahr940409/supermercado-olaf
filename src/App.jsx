import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import FloatingButton from './components/FloatingButton';
import { BsCart } from 'react-icons/bs';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Container, Row, Col, Button, Form, Card } from 'react-bootstrap'; // Import React-Bootstrap components

function App() {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([
    { id: 1, name: "Producto 1", price: 10, image: "/default-product-image.png" },
    { id: 2, name: "Producto 2", price: 20, image: "/default-product-image.png" },
  ]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [newProductName, setNewProductName] = useState("");
  const [newProductPrice, setNewProductPrice] = useState("");
  const [newProductImage, setNewProductImage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const adminUsername = "admin"; // Nombre de usuario del administrador
  const adminPassword = "admin"; // Contraseña del administrador

  const handleLogin = () => {
    if (username === adminUsername && password === adminPassword) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
      alert("Credenciales incorrectas");
    }
    setUsername("");
    setPassword("");
  };

  const addProduct = () => {
    if (isAdmin && newProductName && newProductPrice && newProductImage) {
      const newProduct = {
        id: products.length + 1,
        name: newProductName,
        price: parseFloat(newProductPrice),
        image: newProductImage,
      };
      setProducts([...products, newProduct]);
      setNewProductName("");
      setNewProductPrice("");
      setNewProductImage("");
    }
  };

  const removeProduct = (productId) => {
    setProducts(products.filter(product => product.id !== productId));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setNewProductImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const addToCart = (product) => {
    const cartProduct = {
      ...product,
      cartId: Date.now(), 
    };
    setCart([...cart, cartProduct]);
  };

  const removeFromCart = (cartId) => {
    setCart(cart.filter(item => item.cartId !== cartId));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  const handleLogout = () => {
    setIsAdmin(false);
  };

  return (
    <Container>
      <h1 className="my-4 text-center">Supermercado Olaf</h1>
      {!isAdmin && (
        <Row className="justify-content-center">
          <Col xs={12} md={6}>
            <Form>
              <Form.Group controlId="formUsername">
                <Form.Control
                  type="text"
                  placeholder="Usuario"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formPassword" className="mt-3">
                <Form.Control
                  type="password"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Button className="mt-3" onClick={handleLogin}>Iniciar Sesión</Button>
            </Form>
          </Col>
        </Row>
      )}
      {isAdmin && (
        <Button className="mt-3 mb-3" onClick={handleLogout}>Cerrar Sesión</Button>
      )}
      <Row className="my-4">
        <Col>
          <Card className="p-3">
            <Card.Body>
              <Card.Text>
                Carrito: ${getTotalPrice().toFixed(2)}
              </Card.Text>
              <BsCart size={30} color="#000" />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2 className="mb-4">Productos</h2>
          <Row>
            {products.map(product => (
              <Col xs={12} md={6} lg={4} key={product.id} className="mb-4">
                <Card>
                  <Card.Img variant="top" src={product.image} alt={product.name} />
                  <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>${product.price.toFixed(2)}</Card.Text>
                    {!isAdmin && (
                      <Button onClick={() => addToCart(product)}>Agregar al carrito</Button>
                    )}
                    {isAdmin && (
                      <Button variant="danger" onClick={() => removeProduct(product.id)}>Eliminar</Button>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          {isAdmin && (
            <Row className="mt-4">
              <Col>
                <Card>
                  <Card.Body>
                    <Form>
                      <Form.Group controlId="formProductName">
                        <Form.Control
                          type="text"
                          placeholder="Nombre del producto"
                          value={newProductName}
                          onChange={(e) => setNewProductName(e.target.value)}
                        />
                      </Form.Group>
                      <Form.Group controlId="formProductPrice" className="mt-3">
                        <Form.Control
                          type="number"
                          placeholder="Precio del producto"
                          value={newProductPrice}
                          onChange={(e) => setNewProductPrice(e.target.value)}
                        />
                      </Form.Group>
                      <Form.Group controlId="formProductImage" className="mt-3">
                        <Form.Control
                          type="file"
                          onChange={handleImageUpload}
                        />
                      </Form.Group>
                      <Button className="mt-3" onClick={addProduct}>Agregar Producto</Button>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          )}
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <h2>Carrito</h2>
          <Row>
            {cart.map(item => (
              <Col xs={12} key={item.cartId} className="mb-4">
                <Card>
                  <Card.Img variant="top" src={item.image} alt={item.name} />
                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>${item.price.toFixed(2)}</Card.Text>
                    <Button variant="danger" onClick={() => removeFromCart(item.cartId)}>Quitar del carrito</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
      <FloatingButton />
    </Container>
  );
}

export default App;
