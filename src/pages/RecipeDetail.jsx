import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const allRecipes = [
  {
    name: "Penne rigate con longaniza",
    image: "https://images.ctfassets.net/43ibah8kumsy/ea4c468f-30c4-4ad8-b56c-0b090d7ebf62/9d10ed4e561bef13baf0574a7114258a/5pastapennebarilla_upscaled.jpg?w=1600&h=1600&fm=webp&q=50",
    weight: "420g",
    price: "7.150",
    calories: 865,
    fats: 59,
    carbs: 58,
    proteins: 26,
    cuisine: "italiana",
    ingredients: ["Pasta penne", "Longaniza", "Salsa de tomate", "Queso parmesano", "Aceite de oliva", "Ajo", "Cebolla"],
    instructions: [
      "Cocina la pasta penne en agua con sal hasta que esté al dente.",
      "En una sartén, sofríe ajo y cebolla picados con un poco de aceite de oliva.",
      "Agrega la longaniza cortada en trozos y cocina hasta que esté dorada.",
      "Añade salsa de tomate y deja cocinar por 10 minutos.",
      "Mezcla la pasta con la salsa y espolvorea queso parmesano rallado antes de servir."
    ]
  },
];

const getRecipeByName = (name) => {
  const normalized = decodeURIComponent(name);
  return allRecipes.find((r) => r.name.toLowerCase() === normalized.toLowerCase());
};

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const r = getRecipeByName(id);
    setRecipe(r || null);
  }, [id]);

  if (!recipe) return <p className="message">Cargando...</p>;

  return (
    <div className="container">
      <Link to="/products" style={{ color: '#ff5722', fontWeight: '600' }}>← Volver a recetas</Link>
      <h1>{recipe.name}</h1>
      <img src={recipe.image} alt={recipe.name} style={{ width: '100%', borderRadius: '8px', marginBottom: '1rem' }} />
      <h2>Ingredientes</h2>
      <ul>{recipe.ingredients.map((ing, i) => <li key={i}>{ing}</li>)}</ul>
      <h2>Instrucciones</h2>
      <ol>{recipe.instructions.map((step, i) => <li key={i}>{step}</li>)}</ol>
    </div>
  );
};

export default RecipeDetail;
