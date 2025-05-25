import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(price);
};

export default function RecipeCard({ recipe }) {
    const { addToCart } = useContext(CartContext);

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
            <div className="weight">({recipe.weight})</div>
            <div className="price">{formatPrice(recipe.price)}</div>

            <section className="nutrition-info" aria-label="Información nutricional">
                <div className="nutrition-item">
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/883/883407.png"
                        alt="Calorías"
                        style={{ width: 28, height: 28 }}
                    />
                    <span className="value">{recipe.calories}</span>
                    <span className="label">Calorías</span>
                </div>
                <div className="nutrition-item">
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/1046/1046784.png"
                        alt="Grasas"
                        style={{ width: 28, height: 28 }}
                    />
                    <span className="value">{recipe.fats}g</span>
                    <span className="label">Grasas</span>
                </div>
                <div className="nutrition-item">
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/1046/1046787.png"
                        alt="Carbohidratos"
                        style={{ width: 28, height: 28 }}
                    />
                    <span className="value">{recipe.carbs}g</span>
                    <span className="label">Carbohidratos</span>
                </div>
                <div className="nutrition-item">
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/1046/1046793.png"
                        alt="Proteínas"
                        style={{ width: 28, height: 28 }}
                    />
                    <span className="value">{recipe.proteins}g</span>
                    <span className="label">Proteínas</span>
                </div>
            </section>

            <button onClick={() => addToCart(recipe)}>AÑADIR</button>
        </article>
    );
}