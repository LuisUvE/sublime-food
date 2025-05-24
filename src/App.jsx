import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { RequirementsProvider } from './context/RequirementsContext';
import Cart from './components/Cart';
import Checkout from './pages/Checkout';
import RecipeDetail from './pages/RecipeDetail';
import Requirements from './pages/Requirements';

function App() {
  return (
    <RequirementsProvider>
      <CartProvider>
        <Cart />
        <Router>
          <Routes>
            <Route path="/" element={<Requirements />} />
            <Route path="/products" element={<Checkout />} />
            <Route path="/recipe/:id" element={<RecipeDetail />} />
          </Routes>
        </Router>
      </CartProvider>
    </RequirementsProvider>
  );
}

export default App;
