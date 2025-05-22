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
