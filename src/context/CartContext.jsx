import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    
    const addToCart = (product) => {
        setCartItems(prevItems => {
            const index = prevItems.findIndex(item => item.name === product.name);
            if (index >= 0) {
                const newItems = [...prevItems];
                newItems[index].quantity += 1;
                return newItems;
            }
            return [...prevItems, { ...product, quantity: 1 }];
        });
    };
    return (
        <CartContext.Provider value={{ cartItems, setCartItems, addToCart, totalQuantity }}>
            {children}
        </CartContext.Provider>
    );
};




