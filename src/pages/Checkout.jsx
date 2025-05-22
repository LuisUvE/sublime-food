import React, { useState, useContext, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import RecipeCard from "../components/RecipeCard";
import { RequirementsContext } from "../context/RequirementsContext";
import { CartContext } from "../context/CartContext";
import "./Checkout.css";

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
  {
    image:
      "https://recetasveganas.net/wp-content/uploads/2020/09/bowl-arroz-hummus-verdura-saludable-vegano-recetas.jpg",
    name: "Bowl vegano con hummus",
    weight: "400g",
    price: "16000",
    calories: 520,
    fats: 22,
    carbs: 60,
    proteins: 12,
    cuisine: "asiatica",
  },
  {
    image:
      "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=800&q=80",
    name: "Sushi vegetariano",
    weight: "300g",
    price: "22000",
    calories: 410,
    fats: 18,
    carbs: 50,
    proteins: 14,
    cuisine: "asiatica",
  },
  {
    image:
      "https://www.demoslavueltaaldia.com/sites/default/files/956_polloverduras_g.png",
    name: "Pollo asado con hierbas",
    weight: "450g",
    price: "20000",
    calories: 780,
    fats: 40,
    carbs: 15,
    proteins: 65,
    cuisine: "mexicana",
  },
  {
    image:
      "https://theobjective.com/wp-content/uploads/2022/02/carbonara_1.jpg",
    name: "Pasta carbonara tradicional",
    weight: "400g",
    price: "19000",
    calories: 890,
    fats: 55,
    carbs: 65,
    proteins: 30,
    cuisine: "italiana",
  },
  {
    image:
      "https://i0.wp.com/recetaskwa.com/wp-content/uploads/2023/09/ceviche_camaron.jpg?ssl=1",
    name: "Ceviche de camarón",
    weight: "350g",
    price: "25000",
    calories: 350,
    fats: 10,
    carbs: 30,
    proteins: 40,
    cuisine: "mexicana",
  },
  {
    image:
      "https://tienda.vegusta.cl/wp-content/uploads/2022/03/Dark-Side-Pin%CC%83a-Cuadrada-para-WEB.jpg",
    name: "Hamburguesa vegana",
    weight: "380g",
    price: "17000",
    calories: 620,
    fats: 25,
    carbs: 70,
    proteins: 20,
    cuisine: "mexicana",
  },
  {
    image:
      "https://www.bekiacocina.com/images/cocina/0000/976-h.jpg",
    name: "Lasagna de verduras",
    weight: "500g",
    price: "21000",
    calories: 700,
    fats: 30,
    carbs: 60,
    proteins: 25,
    cuisine: "italiana",
  },
  {
    image:
      "https://laroussecocina.mx/wp-content/uploads/2020/02/S050419-24-TACOS-VEGETARIANOS-0555-1.jpg.webp",
    name: "Tacos vegetarianos",
    weight: "300g",
    price: "14000",
    calories: 480,
    fats: 18,
    carbs: 55,
    proteins: 15,
    cuisine: "mexicana",
  },
  {
    image:
      "https://d36fw6y2wq3bat.cloudfront.net/recipes/sopa-de-miso-con-tofu-y-vegetales/900/sopa-de-miso-con-tofu-y-vegetales_version_1687406461.jpg",
    name: "Sopa miso",
    weight: "400g",
    price: "13000",
    calories: 300,
    fats: 10,
    carbs: 40,
    proteins: 12,
    cuisine: "asiatica",
  },
  {
    image:
      "https://imag.bonviveur.com/ensalada-cesar-casera.jpg",
    name: "Ensalada César",
    weight: "350g",
    price: "15000",
    calories: 400,
    fats: 25,
    carbs: 35,
    proteins: 18,
    cuisine: "italiana",
  },
  {
    image:
      "https://fedecocina.net/static/aaa48f1f8a7e0773be2404e00d8fef08/a764f/pollo-teriyaki.jpg",
    name: "Pollo teriyaki",
    weight: "450g",
    price: "22000",
    calories: 600,
    fats: 30,
    carbs: 50,
    proteins: 40,
    cuisine: "asiatica",
  },
  {
    image:
      "https://upload.wikimedia.org/wikipedia/commons/a/a3/Eq_it-na_pizza-margherita_sep2005_sml.jpg",
    name: "Pizza margarita",
    weight: "400g",
    price: "20000",
    calories: 750,
    fats: 35,
    carbs: 80,
    proteins: 25,
    cuisine: "italiana",
  },
  {
    image:
      "https://okdiario.com/img/2018/04/23/makis-salmon.jpg",
    name: "Sushi de salmón",
    weight: "320g",
    price: "28000",
    calories: 500,
    fats: 20,
    carbs: 55,
    proteins: 30,
    cuisine: "asiatica",
  },
];

export default function Checkout() {
  const { requirements } = useContext(RequirementsContext);
  const { cartItems, addToCart } = useContext(CartContext);

  const [page, setPage] = useState(1);
  const [filteredRecipes, setFilteredRecipes] = useState(allRecipes);
  const [cuisineFilter, setCuisineFilter] = useState("");
  const [textFilter, setTextFilter] = useState("");
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
        />

        <button onClick={handleFilterClick}>Filtrar</button>
        <button onClick={handleClearFilters}>Limpiar filtros</button>
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
