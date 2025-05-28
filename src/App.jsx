/**
 * App.jsx - Componente principal de la aplicación
 * 
 * Este componente configura:
 * 1. Los proveedores de contexto para el estado global
 * 2. El sistema de rutas de la aplicación
 * 3. La estructura base de componentes
 */
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
    // RequirementsProvider: Gestiona el estado global de requisitos del usuario
    <RequirementsProvider>
      {/* CartProvider: Gestiona el estado global del carrito de compras */}
      <CartProvider>
        {/* Componente Cart: Siempre visible para acceso rápido al carrito */}
        <Cart />
        {/* Router: Configura el sistema de navegación */}
        <Router>
          <Routes>
            {/* Ruta principal: Formulario de requisitos */}
            <Route path="/" element={<Requirements />} />
            {/* Ruta de productos: Catálogo y checkout */}
            <Route path="/products" element={<Checkout />} />
            {/* Ruta dinámica: Detalles de receta específica */}
            <Route path="/recipe/:id" element={<RecipeDetail />} />
          </Routes>
        </Router>
      </CartProvider>
    </RequirementsProvider>
  );
}

export default App;
