import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { RequirementsContext } from "../context/RequirementsContext";
import '../styles/PaymentForm.css';

const DELIVERY_COST = 10000;

const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(price);
};

// Función para formatear número de tarjeta
const formatCardNumber = (value) => {
    const digits = value.replace(/\D/g, '');
    const groups = [];
    
    for (let i = 0; i < digits.length && i < 16; i += 4) {
        groups.push(digits.slice(i, i + 4));
    }
    
    return groups.join(' ');
};

// Función para formatear fecha de expiración
const formatExpiryDate = (value) => {
    const digits = value.replace(/\D/g, '');
    if (digits.length >= 2) {
        return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    }
    return digits;
};

// Validar fecha de expiración
const isValidExpiryDate = (value) => {
    if (!value.match(/^(0[1-9]|1[0-2])\/([0-9]{2})$/)) return false;
    
    const [month, year] = value.split('/');
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;
    
    const expYear = parseInt(year);
    const expMonth = parseInt(month);
    
    if (expYear < currentYear) return false;
    if (expYear === currentYear && expMonth < currentMonth) return false;
    
    return true;
};

// Validar número de tarjeta - solo verifica longitud
const isValidCardNumber = (number) => {
    const digits = number.replace(/\D/g, '');
    return digits.length === 16;
};

export default function Cart() {
    const { requirements } = useContext(RequirementsContext);
    const { cartItems, totalQuantity, setCartItems } = useContext(CartContext);
    const [isOpen, setIsOpen] = useState(false);
    const [isPaying, setIsPaying] = useState(false);

    // Calcula total sumando precio * cantidad
    const totalPrice = cartItems.reduce((sum, item) => {
        const priceNum = parseFloat(item.price.replace(/[^0-9.,]/g, "").replace(",", "."));
        return sum + (priceNum || 0) * item.quantity;
    }, 0);

    // Total final con costo domicilio si aplica
    const totalFinal = requirements.tipoEntrega === "domicilio" ? totalPrice + DELIVERY_COST : totalPrice;

    // Estado formulario pago
    const [formData, setFormData] = useState({
        nombre: requirements.nombre || "",
        direccion: requirements.direccion || "",
        tarjeta: "",
        fechaExp: "",
        cvv: "",
    });

    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        let formattedValue = value;

        if (name === 'tarjeta') {
            // Eliminar cualquier carácter que no sea número
            const numericValue = value.replace(/\D/g, '');
            // Aplicar formato solo si hay dígitos
            if (numericValue) {
                formattedValue = formatCardNumber(numericValue);
            } else {
                formattedValue = '';
            }
        } else if (name === 'fechaExp') {
            formattedValue = formatExpiryDate(value);
        } else if (name === 'cvv') {
            formattedValue = value.replace(/\D/g, '').slice(0, 4);
        }

        setFormData(prev => ({ ...prev, [name]: formattedValue }));
        
        // Limpiar error al escribir
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: "" }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.nombre.trim()) {
            newErrors.nombre = "El nombre es requerido";
        }
        
        if (!formData.direccion.trim()) {
            newErrors.direccion = "La dirección es requerida";
        }
        
        // Validación simplificada de tarjeta
        const cardNumber = formData.tarjeta.replace(/\s/g, '');
        if (!cardNumber) {
            newErrors.tarjeta = "El número de tarjeta es requerido";
        } else if (!isValidCardNumber(cardNumber)) {
            newErrors.tarjeta = "La tarjeta debe tener 16 dígitos";
        }
        
        // Validación de fecha de expiración
        if (!formData.fechaExp) {
            newErrors.fechaExp = "La fecha de expiración es requerida";
        } else if (!isValidExpiryDate(formData.fechaExp)) {
            newErrors.fechaExp = "Fecha de expiración inválida o vencida";
        }
        
        // Validación de CVV
        if (!formData.cvv) {
            newErrors.cvv = "El CVV es requerido";
        } else if (!formData.cvv.match(/^\d{3,4}$/)) {
            newErrors.cvv = "CVV inválido";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const toggleCart = () => {
        setIsOpen((open) => !open);
        if (isPaying) setIsPaying(false);
    };

    const handlePayClick = () => {
        setIsPaying(true);
    };

    const handleCancelPayment = () => {
        setIsPaying(false);
    };

    const handleClearCart = () => {
        setCartItems([]);
    };

    const handlePaySubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        if (totalFinal > requirements.presupuesto) {
            alert("El total supera tu presupuesto. Elimina algunos productos o ajusta el pedido.");
            return;
        }

        alert(`¡Gracias ${formData.nombre}! Tu pago de ${formatPrice(totalFinal)} ha sido procesado exitosamente.`);
        setIsPaying(false);
        setIsOpen(false);
        setCartItems([]);
        setFormData({
            nombre: "",
            direccion: "",
            tarjeta: "",
            fechaExp: "",
            cvv: "",
        });
    };

    const removeFromCart = (itemToRemove) => {
        const updatedItems = cartItems.map(item => {
            if (item.name === itemToRemove.name) {
                if (item.quantity > 1) {
                    return { ...item, quantity: item.quantity - 1 };
                }
                return null;
            }
            return item;
        }).filter(Boolean);
        
        setCartItems(updatedItems);
    };

    return (
        <>
            <div
                onClick={toggleCart}
                className="cart-icon"
                style={{
                    position: "fixed",
                    top: 15,
                    right: 15,
                    background: "#fff",
                    borderRadius: "50%",
                    width: 50,
                    height: 50,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                    zIndex: 10000,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                    transition: "transform 0.3s ease",
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.1)"}
                onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                aria-label="Abrir carrito de compras"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                    if (e.key === "Enter") toggleCart();
                }}
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d35400" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
                {totalQuantity > 0 && (
                    <span
                        style={{
                            position: "absolute",
                            top: -5,
                            right: -5,
                            background: "#e74c3c",
                            color: "white",
                            borderRadius: "50%",
                            padding: "2px 6px",
                            fontSize: "12px",
                            fontWeight: "bold",
                            minWidth: "20px",
                            textAlign: "center",
                            boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                        }}
                    >
                        {totalQuantity}
                    </span>
                )}
            </div>

            {isOpen && !isPaying && (
                <aside className="cart-aside">
                    <div className="cart-header">
                        <button 
                            onClick={toggleCart} 
                            className="cart-close-btn"
                            aria-label="Cerrar carrito"
                        >
                            <svg 
                                width="24" 
                                height="24" 
                                viewBox="0 0 24 24" 
                                fill="none" 
                                stroke="currentColor" 
                                strokeLinecap="round" 
                                strokeLinejoin="round"
                            >
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                        <h2 className="cart-title">Tu Carrito</h2>
                    </div>

                    <div className="cart-list-container">
                        {cartItems.length === 0 ? (
                            <div className="empty-cart">
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                                    <line x1="3" y1="6" x2="21" y2="6"></line>
                                    <path d="M16 10a4 4 0 0 1-8 0"></path>
                                </svg>
                                <p>Tu carrito está vacío</p>
                                <small>¡Agrega algunos productos deliciosos!</small>
                            </div>
                        ) : (
                            <ul className="cart-list">
                                {cartItems.map((item, i) => (
                                    <li key={i} className="cart-item">
                                        <div className="cart-item-content">
                                            <div className="cart-item-header">
                                                <h3 className="cart-item-title">{item.name}</h3>
                                                <button
                                                    onClick={() => removeFromCart(item)}
                                                    className="remove-item-btn"
                                                    aria-label={`Eliminar ${item.name} del carrito`}
                                                >
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                            
                                            <div className="cart-item-details">
                                                <div className="cart-item-quantity">
                                                    <span className="detail-label">Cantidad:</span>
                                                    <span className="detail-value">{item.quantity}</span>
                                                </div>
                                                <div className="cart-item-price">
                                                    <span className="detail-label">Precio unitario:</span>
                                                    <span className="detail-value">{formatPrice(item.price)}</span>
                                                </div>
                                                <div className="cart-item-subtotal">
                                                    <span className="detail-label">Subtotal:</span>
                                                    <span className="detail-value">{formatPrice(item.price * item.quantity)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div className="cart-footer">
                        <div className="cart-summary">
                            <div className="summary-row">
                                <span>Subtotal:</span>
                                <span>{formatPrice(totalPrice)}</span>
                            </div>
                            {requirements.tipoEntrega === "domicilio" && (
                                <div className="summary-row">
                                    <span>Costo domicilio:</span>
                                    <span>{formatPrice(DELIVERY_COST)}</span>
                                </div>
                            )}
                            <div className="summary-row total">
                                <span>Total a pagar:</span>
                                <span>{formatPrice(totalFinal)}</span>
                            </div>
                        </div>

                        <div className="cart-buttons">
                            <button 
                                className="cart-pay-btn" 
                                onClick={handlePayClick}
                                disabled={cartItems.length === 0}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                                    <line x1="1" y1="10" x2="23" y2="10"></line>
                                </svg>
                                Pagar
                            </button>
                            <button 
                                className="cart-clear-btn" 
                                onClick={handleClearCart}
                                disabled={cartItems.length === 0}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="3 6 5 6 21 6"></polyline>
                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                </svg>
                                Limpiar carrito
                            </button>
                        </div>
                    </div>
                </aside>
            )}

            {isOpen && isPaying && (
                <aside className="cart-aside">
                    <div className="payment-form-container">
                        <div className="payment-form-header">
                            <button 
                                onClick={handleCancelPayment} 
                                className="payment-close-btn"
                                aria-label="Cerrar formulario de pago"
                            >
                                <svg 
                                    width="24" 
                                    height="24" 
                                    viewBox="0 0 24 24" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round"
                                >
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                            <h2 className="payment-form-title">Detalles de Pago</h2>
                        </div>
                        
                        <div className="payment-form-content">
                            <div className="payment-total">
                                <div className="description">Total a pagar:</div>
                                <div className="amount">{formatPrice(totalFinal)}</div>
                            </div>

                            <form onSubmit={handlePaySubmit} className="payment-form">
                                <div className="form-group">
                                    <label htmlFor="nombre">Nombre completo</label>
                                    <input
                                        type="text"
                                        id="nombre"
                                        name="nombre"
                                        value={formData.nombre}
                                        onChange={handleInputChange}
                                        placeholder="Ej: Juan Pérez"
                                    />
                                    {errors.nombre && (
                                        <div className="error-message">
                                            <svg className="error-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <circle cx="12" cy="12" r="10"></circle>
                                                <line x1="12" y1="8" x2="12" y2="12"></line>
                                                <line x1="12" y1="16" x2="12.01" y2="16"></line>
                                            </svg>
                                            {errors.nombre}
                                        </div>
                                    )}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="direccion">Dirección de envío</label>
                                    <input
                                        type="text"
                                        id="direccion"
                                        name="direccion"
                                        value={formData.direccion}
                                        onChange={handleInputChange}
                                        placeholder="Ej: Calle 123 #45-67"
                                    />
                                    {errors.direccion && (
                                        <div className="error-message">
                                            <svg className="error-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <circle cx="12" cy="12" r="10"></circle>
                                                <line x1="12" y1="8" x2="12" y2="12"></line>
                                                <line x1="12" y1="16" x2="12.01" y2="16"></line>
                                            </svg>
                                            {errors.direccion}
                                        </div>
                                    )}
                                </div>

                                <h3 className="payment-section-title">Datos de la Tarjeta</h3>
                                
                                <div className="form-group">
                                    <label htmlFor="tarjeta">Número de tarjeta</label>
                                    <input
                                        type="text"
                                        id="tarjeta"
                                        name="tarjeta"
                                        value={formData.tarjeta}
                                        onChange={handleInputChange}
                                        placeholder="1234 5678 9012 3456"
                                        maxLength="19"
                                        inputMode="numeric"
                                        autoComplete="cc-number"
                                    />
                                    {errors.tarjeta && (
                                        <div className="error-message">
                                            <svg className="error-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <circle cx="12" cy="12" r="10"></circle>
                                                <line x1="12" y1="8" x2="12" y2="12"></line>
                                                <line x1="12" y1="16" x2="12.01" y2="16"></line>
                                            </svg>
                                            {errors.tarjeta}
                                        </div>
                                    )}
                                </div>

                                <div className="card-info-footer">
                                    <div className="form-group exp-group">
                                        <label htmlFor="fechaExp">Fecha de expiración</label>
                                        <input
                                            type="text"
                                            id="fechaExp"
                                            name="fechaExp"
                                            value={formData.fechaExp}
                                            onChange={handleInputChange}
                                            placeholder="MM/YY"
                                            maxLength="5"
                                        />
                                        {errors.fechaExp && (
                                            <div className="error-message">
                                                <svg className="error-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <circle cx="12" cy="12" r="10"></circle>
                                                    <line x1="12" y1="8" x2="12" y2="12"></line>
                                                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                                                </svg>
                                                {errors.fechaExp}
                                            </div>
                                        )}
                                    </div>

                                    <div className="form-group cvv-group">
                                        <label htmlFor="cvv">CVV</label>
                                        <input
                                            type="text"
                                            id="cvv"
                                            name="cvv"
                                            value={formData.cvv}
                                            onChange={handleInputChange}
                                            placeholder="123"
                                            maxLength="4"
                                        />
                                        {errors.cvv && (
                                            <div className="error-message">
                                                <svg className="error-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <circle cx="12" cy="12" r="10"></circle>
                                                    <line x1="12" y1="8" x2="12" y2="12"></line>
                                                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                                                </svg>
                                                {errors.cvv}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <button type="submit" className="payment-submit-btn">
                                    Confirmar pago
                                </button>

                                <div className="secure-badge">
                                    <svg className="secure-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                    </svg>
                                    Pago seguro con cifrado SSL
                                </div>
                            </form>
                        </div>
                    </div>
                </aside>
            )}
        </>
    );
}
