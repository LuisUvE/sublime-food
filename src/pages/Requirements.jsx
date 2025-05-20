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

  const validate = () => {
    const newErrors = {};
    if (!form.nombre.trim()) newErrors.nombre = 'El nombre es obligatorio.';
    else if (form.nombre.trim().length > 20)
      newErrors.nombre = 'El nombre no puede tener más de 20 caracteres.';

    if (!form.presupuesto || isNaN(form.presupuesto))
      newErrors.presupuesto = 'El presupuesto es obligatorio y debe ser un número.';
    else if (Number(form.presupuesto) <= 0)
      newErrors.presupuesto = 'El presupuesto debe ser mayor que cero.';

    if (!form.direccion.trim()) newErrors.direccion = 'La dirección es obligatoria.';

    if (!['domicilio', 'retiro'].includes(form.tipoEntrega))
      newErrors.tipoEntrega = 'El tipo de entrega no es válido.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setRequirements({
        nombre: form.nombre.trim(),
        presupuesto: Number(form.presupuesto),
        direccion: form.direccion.trim(),
        tipoEntrega: form.tipoEntrega,
      });
      navigate('/products');
    }
  };

  return (
    <div className="requirements-container">
      <form onSubmit={handleSubmit} noValidate className="requirements-form">
        <label>
          Nombre:
          <input
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            aria-describedby="error-nombre"
            maxLength={20}
            required
          />
          {errors.nombre && (
            <p id="error-nombre" className="error-message">
              {errors.nombre}
            </p>
          )}
        </label>

        <label>
          Presupuesto máximo (COP):
          <input
            type="text"
            name="presupuesto"
            value={form.presupuesto}
            onChange={handleChange}
            aria-describedby="error-presupuesto"
            required
            inputMode="numeric"
          />
          {errors.presupuesto && (
            <p id="error-presupuesto" className="error-message">
              {errors.presupuesto}
            </p>
          )}
        </label>

        <label>
          Dirección:
          <input
            type="text"
            name="direccion"
            value={form.direccion}
            onChange={handleChange}
            aria-describedby="error-direccion"
            required
          />
          {errors.direccion && (
            <p id="error-direccion" className="error-message">
              {errors.direccion}
            </p>
          )}
        </label>

        <label>
          Tipo de entrega:
          <select
            name="tipoEntrega"
            value={form.tipoEntrega}
            onChange={handleChange}
            aria-describedby="error-tipoEntrega"
            required
          >
            <option value="domicilio">Domicilio</option>
            <option value="retiro">Retiro en tienda</option>
          </select>
          {errors.tipoEntrega && (
            <p id="error-tipoEntrega" className="error-message">
              {errors.tipoEntrega}
            </p>
          )}
        </label>

        <div className="buttons-group">
          <button type="submit">Iniciar compra</button>
        </div>
      </form>
    </div>
  );
}
