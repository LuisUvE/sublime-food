import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { RequirementsContext } from "../context/RequirementsContext";

const DELIVERY_COST = 10000;

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
        nombre: "",
        direccion: "",
        tarjeta: "",
        fechaExp: "",
        cvv: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Abre/cierra panel carrito
    const toggleCart = () => {
        setIsOpen((open) => !open);
        if (isPaying) setIsPaying(false);
    };

    // Abre formulario pago
    const handlePayClick = () => {
        setIsPaying(true);
    };

    // Vuelve al carrito desde formulario pago
    const handleCancelPayment = () => {
        setIsPaying(false);
    };

    // Botón limpiar carrito
    const handleClearCart = () => {
        setCartItems([]);
    };

    // Envía formulario pago (simulación)
    const handlePaySubmit = (e) => {
        e.preventDefault();

        if (totalFinal > requirements.presupuesto) {
            alert("El total supera tu presupuesto. Elimina algunos productos o ajusta el pedido.");
            return;
        }

        alert(`Gracias ${formData.nombre}, su pago de $${totalFinal.toFixed(2)} ha sido procesado.`);
        setIsPaying(false);
        setIsOpen(false);
        setCartItems([]); // Limpia carrito después de la compra
        setFormData({
            nombre: "",
            direccion: "",
            tarjeta: "",
            fechaExp: "",
            cvv: "",
        });
    };
    return (
        <>
            {/* Icono carrito fijo */}
            <div
                onClick={toggleCart}
                style={{
                    position: "fixed",
                    top: 15,
                    right: 15,
                    background: "#eee",
                    borderRadius: "50%",
                    width: 50,
                    height: 50,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                    zIndex: 10000,
                    boxShadow: "0 0 8px rgba(0,0,0,0.3)",
                    userSelect: "none",
                }}
                aria-label="Abrir carrito de compras"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                    if (e.key === "Enter") toggleCart();
                }}
            >
                <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M7 4h-2l-3 9v2h2a3 3 0 1 0 6 0h6a3 3 0 1 0 6 0h2v-2l-3-9h-2" />
                </svg>
                {totalQuantity > 0 && (
                    <span
                        style={{
                            position: "absolute",
                            top: 5,
                            right: 5,
                            background: "red",
                            color: "white",
                            borderRadius: "50%",
                            padding: "3px 8px",
                            fontSize: 14,
                            fontWeight: "bold",
                            minWidth: 22,
                            textAlign: "center",
                            userSelect: "none",
                        }}
                        aria-live="polite"
                    >
                        {totalQuantity}
                    </span>
                )}
            </div>
            {isOpen && !isPaying && (
                <aside
                    className="cart-aside"
                    aria-label="Carrito de compras"
                >
                    <button
                        onClick={() => setIsOpen(false)}
                        className="cart-close-btn"
                        aria-label="Cerrar carrito"
                    >
                        &times;
                    </button>

                    <h2 className="cart-title">Tu carrito</h2>

                    <div className="cart-list-container" style={{ flexGrow: 1, overflowY: "auto", marginBottom: 12 }}>
                        {cartItems.length === 0 ? (
                            <p>Tu carrito está vacío.</p>
                        ) : (
                            <ul className="cart-list">
                                {cartItems.map((item, i) => (
                                    <li key={i}>
                                        <strong>{item.name}</strong>
                                        <div>Cantidad: {item.quantity}</div>
                                        <div>Precio unitario: ${item.price}</div>
                                        <div>
                                            Subtotal: $
                                            {(
                                                parseFloat(item.price.replace(/[^0-9.-]+/g, "")) *
                                                item.quantity
                                            ).toFixed(2)}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div className="cart-total">Total productos: ${totalPrice.toFixed(2)}</div>
                    {requirements.tipoEntrega === "domicilio" && (
                        <div className="cart-delivery-cost">Costo domicilio: ${DELIVERY_COST.toFixed(2)}</div>
                    )}
                    <div className="cart-final-total">Total a pagar: ${totalFinal.toFixed(2)}</div>

                    <div className="cart-buttons" style={{ marginBottom: 12 }}>
                        <button className="cart-pay-btn cart-button" onClick={handlePayClick}>
                            Pagar
                        </button>
                        <button className="cart-clear-btn cart-button" onClick={handleClearCart}>
                            Limpiar carrito
                        </button>
                    </div>
                </aside>
            )}

            {isOpen && !isPaying && (
                <aside
                    className="cart-aside"
                    aria-label="Carrito de compras"
                >
                    <button
                        onClick={() => setIsOpen(false)}
                        className="cart-close-btn"
                        aria-label="Cerrar carrito"
                    >
                        &times;
                    </button>

                    <h2 className="cart-title">Tu carrito</h2>

                    <div className="cart-list-container" style={{ flexGrow: 1, overflowY: "auto", marginBottom: 12 }}>
                        {cartItems.length === 0 ? (
                            <p>Tu carrito está vacío.</p>
                        ) : (
                            <ul className="cart-list">
                                {cartItems.map((item, i) => (
                                    <li key={i}>
                                        <strong>{item.name}</strong>
                                        <div>Cantidad: {item.quantity}</div>
                                        <div>Precio unitario: ${item.price}</div>
                                        <div>
                                            Subtotal: $
                                            {(
                                                parseFloat(item.price.replace(/[^0-9.-]+/g, "")) *
                                                item.quantity
                                            ).toFixed(2)}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div className="cart-total">Total productos: ${totalPrice.toFixed(2)}</div>
                    {requirements.tipoEntrega === "domicilio" && (
                        <div className="cart-delivery-cost">Costo domicilio: ${DELIVERY_COST.toFixed(2)}</div>
                    )}
                    <div className="cart-final-total">Total a pagar: ${totalFinal.toFixed(2)}</div>

                    <div className="cart-buttons" style={{ marginBottom: 12 }}>
                        <button className="cart-pay-btn cart-button" onClick={handlePayClick}>
                            Pagar
                        </button>
                        <button className="cart-clear-btn cart-button" onClick={handleClearCart}>
                            Limpiar carrito
                        </button>
                    </div>
                </aside>
            )}
