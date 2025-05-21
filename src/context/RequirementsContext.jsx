import React, { createContext, useState } from 'react';

export const RequirementsContext = createContext();

export const RequirementsProvider = ({ children }) => {
    const [requirements, setRequirements] = useState({
    nombre: '',
    presupuesto: 0,
    direccion: '',
    tipoEntrega: 'domicilio', // o 'retiro'
});

return (
<RequirementsContext.Provider value={{ requirements, setRequirements }}>
{children}
    </RequirementsContext.Provider>
);
};
