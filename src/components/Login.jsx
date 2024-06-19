import { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(username, password);
    setUsername("");
    setPassword("");
  };

  return (
    <Row className="justify-content-center">
      <Col xs={12} md={6}>
        <Form onSubmit={handleSubmit}>
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
          <Button className="mt-3" type="submit">Iniciar Sesión</Button>
        </Form>
      </Col>
    </Row>
  );
};

export default Login;
