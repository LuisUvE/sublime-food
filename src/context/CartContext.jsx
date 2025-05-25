import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    
    const addToCart = (product) => {
        setCartItems(prevItems => {
            // Buscamos si el producto ya existe en el carrito
            const existingItem = prevItems.find(item => item.name === product.name);
            
            if (existingItem) {
                // Si existe, creamos un nuevo array con el item actualizado
                return prevItems.map(item => 
                    item.name === product.name 
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            
            // Si no existe, lo agregamos como nuevo item
            return [...prevItems, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (productName) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.name === productName);
            
            if (existingItem) {
                if (existingItem.quantity > 1) {
                    // Si hay más de uno, reducimos la cantidad
                    return prevItems.map(item =>
                        item.name === productName
                            ? { ...item, quantity: item.quantity - 1 }
                            : item
                    );
                } else {
                    // Si solo hay uno, eliminamos el item completamente
                    return prevItems.filter(item => item.name !== productName);
                }
            }
            return prevItems;
        });
    };

    return (
        <CartContext.Provider value={{ cartItems, setCartItems, addToCart, removeFromCart, totalQuantity }}>
            {children}
        </CartContext.Provider>
    );
};




