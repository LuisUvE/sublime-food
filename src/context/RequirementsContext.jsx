/**
 * RequirementsContext.jsx - Contexto para la gestión de requisitos del usuario
 * 
 * Este contexto maneja:
 * - Información personal del usuario
 * - Preferencias de entrega
 * - Restricciones de presupuesto
 */
import React, { createContext, useState } from 'react';

export const RequirementsContext = createContext();

export const RequirementsProvider = ({ children }) => {
    // Estado inicial con los campos requeridos
    const [requirements, setRequirements] = useState({
        nombre: '',           // Nombre del usuario
        presupuesto: 0,      // Presupuesto máximo para la compra
        direccion: '',       // Dirección de entrega
        tipoEntrega: 'domicilio', // Método de entrega: 'domicilio' o 'retiro'
    });

    // Proveedor del contexto con el estado y su función de actualización
    return (
        <RequirementsContext.Provider value={{ 
            requirements,     // Estado actual de los requisitos
            setRequirements  // Función para actualizar los requisitos
        }}>
            {children}
        </RequirementsContext.Provider>
    );
};
