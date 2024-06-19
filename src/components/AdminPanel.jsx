import { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';

const AdminPanel = ({ onLogout, onAddProduct }) => {
  const [newProductName, setNewProductName] = useState("");
  const [newProductPrice, setNewProductPrice] = useState("");
  const [newProductImage, setNewProductImage] = useState("");

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

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddProduct({
      name: newProductName,
      price: parseFloat(newProductPrice),
      image: newProductImage,
    });
    setNewProductName("");
    setNewProductPrice("");
    setNewProductImage("");
  };

  return (
    <>
      <Button className="mt-3 mb-3" onClick={onLogout}>Cerrar Sesión</Button>
      <Card className="mt-4">
        <Card.Body>
          <Form onSubmit={handleSubmit}>
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
            <Button className="mt-3" type="submit">Agregar Producto</Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default AdminPanel;
