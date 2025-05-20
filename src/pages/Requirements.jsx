import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { RequirementsContext } from '../context/RequirementsContext';
import './Requirements.css';

export default function Requirements() {
    const { requirements, setRequirements } = useContext(RequirementsContext);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

const [form, setForm] = useState({
    nombre: requirements.nombre,
    presupuesto: requirements.presupuesto,
    direccion: requirements.direccion,
    tipoEntrega: requirements.tipoEntrega,
});

const handleChange = (e) => {
const { name, value } = e.target;
    setForm((prev) => ({
...prev,
    [name]: value,
    }));
};

return (
    <div className="requirements-container">
        <form className="requirements-form">
        <label>
            Nombre:
        <input
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
        />
        </label>
        <label>
            Presupuesto máximo (COP):
        <input
            type="text"
            name="presupuesto"
            value={form.presupuesto}
            onChange={handleChange}
        />
        </label>
        <label>
            Dirección:
        <input
            type="text"
            name="direccion"
            value={form.direccion}
            onChange={handleChange}
        />
        </label>
        <label>
            Tipo de entrega:
        <select
            name="tipoEntrega"
            value={form.tipoEntrega}
            onChange={handleChange}
        >
            <option value="domicilio">Domicilio</option>
            <option value="retiro">Retiro en tienda</option>
        </select>
        </label>
    </form>
    </div>
    
);
}
