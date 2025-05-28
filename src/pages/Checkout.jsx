/**
 * Checkout.jsx - Página principal de productos
 * 
 * Esta página maneja:
 * - Visualización de productos disponibles
 * - Filtrado y búsqueda de productos
 * - Integración con el carrito de compras
 * - Validación de presupuesto
 */
import React, { useState, useContext, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import RecipeCard from "../components/RecipeCard";
import { RequirementsContext } from "../context/RequirementsContext";
import { CartContext } from "../context/CartContext";
import { recipes } from "../data/recipes";
import "./Checkout.css";

// Número de productos por página para el scroll infinito
const PAGE_SIZE = 8;

export default function Checkout() {
  // Contextos necesarios
  const { requirements } = useContext(RequirementsContext);
  const { cartItems, addToCart } = useContext(CartContext);

  // Estados locales para la gestión de productos y filtros
  const [page, setPage] = useState(1);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [cuisineFilter, setCuisineFilter] = useState("");
  const [textFilter, setTextFilter] = useState("");
  const [displayedItems, setDisplayedItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  // Inicialización de datos al montar el componente
  useEffect(() => {
    if (recipes && recipes.length > 0) {
      setFilteredRecipes(recipes);
      setDisplayedItems(recipes.slice(0, PAGE_SIZE));
      setIsLoading(false);
      setHasMore(recipes.length > PAGE_SIZE);
    }
  }, []);

  // Efecto para aplicar filtros cuando cambian
  useEffect(() => {
    if (!recipes) return;

    let filtered = [...recipes];

    // Aplicar filtro por tipo de cocina
    if (cuisineFilter) {
      filtered = filtered.filter((r) => r.cuisine === cuisineFilter);
    }

    // Aplicar filtro por texto
    if (textFilter) {
      filtered = filtered.filter((r) =>
        r.name.toLowerCase().includes(textFilter.toLowerCase())
      );
    }

    // Actualizar estado con resultados filtrados
    setFilteredRecipes(filtered);
    setDisplayedItems(filtered.slice(0, PAGE_SIZE));
    setPage(1);
  }, [cuisineFilter, textFilter]);

  /**
   * Carga más productos para el scroll infinito
   * - Calcula el siguiente conjunto de productos
   * - Actualiza la página actual
   * - Maneja el ciclo de productos si se llega al final
   */
  const fetchMoreData = () => {
    if (!filteredRecipes || filteredRecipes.length === 0) return;

    let nextPage = page + 1;
    let start = page * PAGE_SIZE;
    let end = nextPage * PAGE_SIZE;

    let nextItems = filteredRecipes.slice(start, end);

    // Si no hay más items, volver al inicio
    if (nextItems.length === 0) {
      start = 0;
      end = PAGE_SIZE;
      nextItems = filteredRecipes.slice(start, end);
      nextPage = 1;
    }

    setDisplayedItems((prev) => [...prev, ...nextItems]);
    setPage(nextPage);
  };

  /**
   * Maneja la adición de productos al carrito
   * - Valida el presupuesto disponible
   * - Calcula el total actual del carrito
   * - Agrega el producto si hay presupuesto suficiente
   */
  const handleAddToCart = (product) => {
    if (!product || !product.price) return;

    // Calcular total actual del carrito
    const totalCurrent = cartItems.reduce((sum, item) => {
      const priceNum = parseFloat(
        item.price.replace(/[^0-9.,]/g, "").replace(",", ".")
      );
      return sum + (priceNum || 0) * item.quantity;
    }, 0);

    // Convertir precio del producto a número
    const productPrice = parseFloat(
      product.price.replace(/[^0-9.,]/g, "").replace(",", ".")
    );

    // Validar contra presupuesto
    if (totalCurrent + productPrice > requirements.presupuesto) {
      alert("No puedes agregar este producto porque supera tu presupuesto.");
      return;
    }
    addToCart(product);
  };

  // Manejadores de filtros
  const handleFilterClick = () => {
    // Los filtros se aplican automáticamente por el useEffect
  };

  const handleClearFilters = () => {
    setCuisineFilter("");
    setTextFilter("");
  };

  // Mostrar loading mientras se cargan los datos iniciales
  if (isLoading) {
    return <div>Cargando...</div>;
  }

  return (
    <>
      <h1
        style={{
          textAlign: "center",
          fontSize: "2.7rem",
          fontWeight: "900",
          color: "#d35400",
          marginBottom: "24px",
          letterSpacing: "0.15em",
          fontFamily: "'Poppins', sans-serif",
          userSelect: "none",
        }}
      >
        SUBLIME FOOD RESTAURANT
      </h1>

      {/* Sección de filtros */}
      <section className="filters">
        <div>
          <select
            aria-label="Filtrar por cocina"
            value={cuisineFilter}
            onChange={(e) => setCuisineFilter(e.target.value)}
          >
            <option value="">Todas las cocinas</option>
            <option value="italiana">Italiana</option>
            <option value="mexicana">Mexicana</option>
            <option value="asiatica">Asiática</option>
          </select>
        </div>

        <div>
          <input
            type="text"
            aria-label="Filtrar por nombre"
            placeholder="Buscar por nombre..."
            value={textFilter}
            onChange={(e) => setTextFilter(e.target.value)}
          />
        </div>

        <div className="button-group">
          <button onClick={handleFilterClick}>Filtrar</button>
          <button onClick={handleClearFilters}>Limpiar filtros</button>
        </div>
      </section>

      {/* Visualización de productos */}
      {displayedItems.length === 0 ? (
        <p className="no-results">
          No hay recetas que coincidan con el filtro.
        </p>
      ) : (
        <InfiniteScroll
          dataLength={displayedItems.length}
          next={fetchMoreData}
          hasMore={true}
          loader={
            <p className="loading">
              Cargando productos...
            </p>
          }
        >
          <main className="app-container">
            {displayedItems.map((recipe, index) => (
              <RecipeCard
                key={`${recipe.name}-${index}`}
                recipe={recipe}
                addToCart={handleAddToCart}
              />
            ))}
          </main>
        </InfiniteScroll>
      )}
    </>
  );
}
