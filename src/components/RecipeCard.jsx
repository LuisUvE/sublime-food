import React from 'react';

export default function RecipeCard({ recipe, addToCart }) {
  return (
    <article className="recipe-card">
      <h3>{recipe.name}</h3>
      <button onClick={() => addToCart(recipe)}>AÑADIR</button>
    </article>
  );
}
