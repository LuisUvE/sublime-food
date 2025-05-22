import React from 'react';
import { Link } from 'react-router-dom';

export default function RecipeCard({ recipe, addToCart }) {
    return (
        <article className="recipe-card" aria-label={`Receta: ${recipe.name}`}>
            <Link to={`/recipe/${encodeURIComponent(recipe.name)}`}>
                <img
                    src={recipe.image}
                    alt={recipe.name}
                    className="recipe-image"
                    loading="lazy"
                />
            </Link>
            <h3>
                <Link
                    to={`/recipe/${encodeURIComponent(recipe.name)}`}
                    style={{ color: 'inherit', textDecoration: 'none' }}
                >
                    {recipe.name}
                </Link>
            </h3>
            


            <Link to={`/recipe/${encodeURIComponent(recipe.name)}`}>
                <h3>{recipe.name}</h3>
            </Link>
            <h3>{recipe.name}</h3>
            <button onClick={() => addToCart(recipe)}>AÑADIR</button>
        </article>
    );
}