import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import FloatingButton from './components/FloatingButton';
import Login from './components/Login';
import AdminPanel from './components/AdminPanel';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import ShoppingCart from './components/ShoppingCart';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([
    { id: 1, name: "Producto 1", price: 10, image: "/default-product-image.png" },
    { id: 2, name: "Producto 2", price: 20, image: "/default-product-image.png" },
  ]);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleLogin = (username, password) => {
    if (username === "admin" && password === "admin") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
      alert("Credenciales incorrectas");
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
  };

  const addProduct = (newProduct) => {
    setProducts([...products, { ...newProduct, id: products.length + 1 }]);
  };

  const removeProduct = (productId) => {
    setProducts(products.filter(product => product.id !== productId));
  };

  const addToCart = (product) => {
    setCart([...cart, { ...product, cartId: Date.now() }]);
  };

  const removeFromCart = (cartId) => {
    setCart(cart.filter(item => item.cartId !== cartId));
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header cartItemCount={cart.length} />
      <div className="container mt-4 flex-grow-1">
        <h1 className="my-4 text-center">Supermercado Olaf</h1>
        {!isAdmin ? (
          <Login onLogin={handleLogin} />
        ) : (
          <AdminPanel onLogout={handleLogout} onAddProduct={addProduct} />
        )}
        <Cart totalPrice={cart.reduce((total, item) => total + item.price, 0)} />
        <ProductList
          products={products}
          isAdmin={isAdmin}
          onAddToCart={addToCart}
          onRemoveProduct={removeProduct}
        />
        <ShoppingCart cart={cart} onRemoveFromCart={removeFromCart} />
      </div>
      <FloatingButton />
      <Footer />
    </div>
  );
}

export default App;
