import React, { useState, useContext, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import RecipeCard from "../components/RecipeCard";
import { RequirementsContext } from "../context/RequirementsContext";
import { CartContext } from "../context/CartContext";
import { recipes } from "../data/recipes";
import "./Checkout.css";

const PAGE_SIZE = 8;

export default function Checkout() {
  const { requirements } = useContext(RequirementsContext);
  const { cartItems, addToCart } = useContext(CartContext);

  const [page, setPage] = useState(1);
  const [filteredRecipes, setFilteredRecipes] = useState(recipes);
  const [cuisineFilter, setCuisineFilter] = useState("");
  const [textFilter, setTextFilter] = useState("");
  const [displayedItems, setDisplayedItems] = useState(recipes.slice(0, PAGE_SIZE));

  useEffect(() => {
    let filtered = recipes;

    if (cuisineFilter) {
      filtered = filtered.filter((r) => r.cuisine === cuisineFilter);
    }

    if (textFilter) {
      filtered = filtered.filter((r) =>
        r.name.toLowerCase().includes(textFilter.toLowerCase())
      );
    }

    setFilteredRecipes(filtered);
    setDisplayedItems(filtered.slice(0, PAGE_SIZE));
    setPage(1);
  }, [cuisineFilter, textFilter]);

  const fetchMoreData = () => {
    let nextPage = page + 1;
    let start = page * PAGE_SIZE;
    let end = nextPage * PAGE_SIZE;

    let nextItems = filteredRecipes.slice(start, end);

    if (nextItems.length === 0) {
      // Reiniciamos para repetir recetas
      start = 0;
      end = PAGE_SIZE;
      nextItems = filteredRecipes.slice(start, end);
      nextPage = 1;
    }

    setDisplayedItems((prev) => [...prev, ...nextItems]);
    setPage(nextPage);
  };

  const handleAddToCart = (product) => {
    const totalCurrent = cartItems.reduce((sum, item) => {
      const priceNum = parseFloat(
        item.price.replace(/[^0-9.,]/g, "").replace(",", ".")
      );
      return sum + (priceNum || 0) * item.quantity;
    }, 0);

    const productPrice = parseFloat(
      product.price.replace(/[^0-9.,]/g, "").replace(",", ".")
    );

    if (totalCurrent + productPrice > requirements.presupuesto) {
      alert("No puedes agregar este producto porque supera tu presupuesto.");
      return;
    }
    addToCart(product);
  };

  const handleFilterClick = () => {
    // No hace falta hacer nada aquí porque el useEffect actualiza los filtros
  };

  const handleClearFilters = () => {
    setCuisineFilter("");
    setTextFilter("");
  };

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

      {displayedItems.length === 0 ? (
        <p
          style={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "1.2rem",
            color: "#d35400",
          }}
        >
          No hay recetas que coincidan con el filtro.
        </p>
      ) : (
        <InfiniteScroll
          dataLength={displayedItems.length}
          next={fetchMoreData}
          hasMore={true}
          loader={
            <p
              style={{
                textAlign: "center",
                color: "#d35400",
                fontWeight: "700",
                marginTop: "1rem",
              }}
            >
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
