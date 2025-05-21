import React, { useState } from "react";
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

];

export default function Checkout() {
  const [page, setPage] = useState(1);
  const [cuisineFilter, setCuisineFilter] = useState("");
  const [textFilter, setTextFilter] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState(allRecipes);
  const [displayedItems, setDisplayedItems] = useState(allRecipes.slice(0, PAGE_SIZE));

  // Filtrado simple
  React.useEffect(() => {
    let filtered = allRecipes;
    if (cuisineFilter) filtered = filtered.filter(r => r.cuisine === cuisineFilter);
    if (textFilter) filtered = filtered.filter(r => r.name.toLowerCase().includes(textFilter.toLowerCase()));

    setFilteredRecipes(filtered);
    setDisplayedItems(filtered.slice(0, PAGE_SIZE));
    setPage(1);
  }, [cuisineFilter, textFilter]);

  return (
    <>
      <h1>SUBLIME FOOD RESTAURANT</h1>
      <section>
        <select value={cuisineFilter} onChange={e => setCuisineFilter(e.target.value)}>
          <option value="">Todas las cocinas</option>
          <option value="italiana">Italiana</option>
          <option value="mexicana">Mexicana</option>
          <option value="asiatica">Asiática</option>
        </select>
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={textFilter}
          onChange={e => setTextFilter(e.target.value)}
        />
      </section>
      <main>
        {displayedItems.map((recipe, index) => (
          <RecipeCard key={`${recipe.name}-${index}`} recipe={recipe} />
        ))}
      </main>
    </>
  );
}