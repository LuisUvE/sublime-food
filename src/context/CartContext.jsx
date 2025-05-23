import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
 
  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

return (
  <CartContext.Provider value={{ cartItems, setCartItems, totalQuantity }}>
    {children}
  </CartContext.Provider>
);


return (
    <CartContext.Provider value={{ cartItems, setCartItems, totalQuantity }}>
      {children}
    </CartContext.Provider>
  );
