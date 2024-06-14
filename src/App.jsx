import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import FloatingButton from './components/FloatingButton';
import { BsCart } from 'react-icons/bs';

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
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Supermercado Olaf</h1>
      {!isAdmin && (
        <div className="login">
          <input
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Iniciar Sesión</button>
        </div>
      )}
      {isAdmin && (
        <button onClick={handleLogout}>Cerrar Sesión</button>
      )}
      <div className="card">
        <p>
          Carrito: ${getTotalPrice().toFixed(2)}
        </p>
        <BsCart size={30} color="#000" />
      </div>
      <div className="products">
        <h2>Productos</h2>
        <ul>
          {products.map(product => (
            <li key={product.id}>
              <div>
                <img src={product.image} alt={product.name} />
                <div>
                  <p>{product.name}</p>
                  <p>${product.price.toFixed(2)}</p>
                </div>
              </div>
              {!isAdmin && (
                <button onClick={() => addToCart(product)}>Agregar al carrito</button>
              )}
              {isAdmin && (
                <button onClick={() => removeProduct(product.id)}>Eliminar</button>
              )}
            </li>
          ))}
        </ul>
        {isAdmin && (
          <div className="add-product">
            <input
              type="text"
              placeholder="Nombre del producto"
              value={newProductName}
              onChange={(e) => setNewProductName(e.target.value)}
            />
            <input
              type="number"
              placeholder="Precio del producto"
              value={newProductPrice}
              onChange={(e) => setNewProductPrice(e.target.value)}
            />
            <input
              type="file"
              onChange={handleImageUpload}
            />
            <button onClick={addProduct}>Agregar Producto</button>
          </div>
        )}
      </div>
      <div className="cart">
        <h2>Carrito</h2>
        <ul>
          {cart.map(item => (
            <li key={item.cartId}>
              <div>
                <img src={item.image} alt={item.name} />
                <div>
                  <p>{item.name}</p>
                  <p>${item.price.toFixed(2)}</p>
                </div>
              </div>
              <button onClick={() => removeFromCart(item.cartId)}>Quitar del carrito</button>
            </li>
          ))}
        </ul>
      </div>
      <FloatingButton />
    </>
  );
}

export default App;