import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import RecipeCard from "../components/RecipeCard";

const PAGE_SIZE = 8;

const allRecipes = [
  {
    image:
      "https://images.ctfassets.net/43ibah8kumsy/ea4c468f-30c4-4ad8-b56c-0b090d7ebf62/9d10ed4e561bef13baf0574a7114258a/5pastapennebarilla_upscaled.jpg?w=1600&h=1600&fm=webp&q=50",
    name: "Penne rigate con longaniza",
    weight: "420g",
    price: "18000",
    calories: 865,
    fats: 59,
    carbs: 58,
    proteins: 26,
    cuisine: "italiana",
  },
  {
    image:
      "https://recetasdecocina.elmundo.es/wp-content/uploads/2021/03/IMG_20200321_150823.jpg",
    name: "Ensalada quinoa y aguacate",
    weight: "350g",
    price: "15000",
    calories: 420,
    fats: 20,
    carbs: 45,
    proteins: 10,
    cuisine: "mexicana",
  },
  // ... otras recetas ...
];

export default function Checkout() {
  const [page, setPage] = useState(1);
  const [cuisineFilter, setCuisineFilter] = useState("");
  const [textFilter, setTextFilter] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState(allRecipes);
  const [displayedItems, setDisplayedItems] = useState(allRecipes.slice(0, PAGE_SIZE));

  useEffect(() => {
    let filtered = allRecipes;

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
    const nextPage = page + 1;
    const start = page * PAGE_SIZE;
    const end = nextPage * PAGE_SIZE;
    let nextItems = filteredRecipes.slice(start, end);

    if (nextItems.length === 0) {
      // Reiniciamos para repetir recetas
      nextItems = filteredRecipes.slice(0, PAGE_SIZE);
      setPage(1);
    } else {
      setPage(nextPage);
    }

    setDisplayedItems((prev) => [...prev, ...nextItems]);
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

      <section
        style={{
          maxWidth: 600,
          margin: "0 auto 24px",
          display: "flex",
          gap: "12px",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
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

        <input
          type="text"
          aria-label="Filtrar por nombre"
          placeholder="Buscar por nombre..."
          value={textFilter}
          onChange={(e) => setTextFilter(e.target.value)}
          style={{ borderRadius: "30px", minWidth: "250px", padding: "12px 20px", border: "2px solid #d35400" }}
        />

        <button style={{ borderRadius: "25px" }}>Filtrar</button>
        <button
          onClick={() => {
            setCuisineFilter("");
            setTextFilter("");
          }}
          style={{ borderRadius: "25px" }}
        >
          Limpiar filtros
        </button>
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
              />
            ))}
          </main>
        </InfiniteScroll>
      )}
    </>
  );
}
