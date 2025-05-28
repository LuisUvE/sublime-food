/**
 * CartContext.jsx - Contexto para la gestión del carrito de compras
 * 
 * Este contexto proporciona:
 * - Estado global para los items del carrito
 * - Funciones para agregar y remover productos
 * - Cálculo de cantidades totales
 */
import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    // Estado principal: Array de items en el carrito
    const [cartItems, setCartItems] = useState([]);

    // Calcula la cantidad total de items en el carrito
    const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    
    /**
     * Agrega un producto al carrito
     * @param {Object} product - Producto a agregar
     * - Si el producto ya existe, incrementa su cantidad
     * - Si es nuevo, lo agrega con cantidad 1
     */
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

    /**
     * Remueve un producto del carrito
     * @param {string} productName - Nombre del producto a remover
     * - Si hay más de uno, reduce la cantidad
     * - Si solo hay uno, elimina el item completamente
     */
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

    // Proveedor del contexto con los valores y funciones necesarias
    return (
        <CartContext.Provider value={{ 
            cartItems,      // Estado actual del carrito
            setCartItems,   // Función para actualizar el carrito directamente
            addToCart,      // Función para agregar productos
            removeFromCart, // Función para remover productos
            totalQuantity   // Cantidad total de items
        }}>
            {children}
        </CartContext.Provider>
    );
};




