import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { recipes } from '../data/recipes';

const normalizeString = (str) => str.trim().toLowerCase();

const formatPrice = (price) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
};

const getRecipeByName = (name) => {
  const normalizedName = normalizeString(name);
  return recipes.find(recipe => normalizeString(recipe.name) === normalizedName);
};

const RecipeDetail = () => {
  const { id } = useParams();
  const recipe = getRecipeByName(decodeURIComponent(id));

  if (!recipe) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h2>Receta no encontrada</h2>
        <Link to="/products" className="back-button">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Volver a recetas
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '1rem 2rem' }}>
      <Link to="/products" className="back-button">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Volver a recetas
      </Link>

      <div className="recipe-details-container">
        <h1 style={{ 
          color: '#d35400',
          marginBottom: '1.5rem',
          fontSize: '2.5rem',
          fontWeight: '900'
        }}>{recipe.name}</h1>

        <div style={{ 
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '2rem',
          marginBottom: '2rem'
        }}>
          <img 
            src={recipe.image} 
            alt={recipe.name}
            style={{
              width: '100%',
              height: '400px',
              objectFit: 'cover',
              borderRadius: '12px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}
          />

          <div>
            <div style={{
              background: '#f8f9fa',
              padding: '1.5rem',
              borderRadius: '12px',
              marginBottom: '1.5rem'
            }}>
              <h2 style={{ 
                color: '#d35400',
                marginBottom: '1rem',
                fontSize: '1.5rem',
                fontWeight: '700'
              }}>Información nutricional</h2>
              <div style={{ 
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '1rem'
              }}>
                <div>
                  <p style={{ fontWeight: '600' }}>Calorías:</p>
                  <p>{recipe.calories} kcal</p>
                </div>
                <div>
                  <p style={{ fontWeight: '600' }}>Proteínas:</p>
                  <p>{recipe.proteins}g</p>
                </div>
                <div>
                  <p style={{ fontWeight: '600' }}>Carbohidratos:</p>
                  <p>{recipe.carbs}g</p>
                </div>
                <div>
                  <p style={{ fontWeight: '600' }}>Grasas:</p>
                  <p>{recipe.fats}g</p>
                </div>
              </div>
            </div>

            <div style={{
              background: '#f8f9fa',
              padding: '1.5rem',
              borderRadius: '12px'
            }}>
              <h2 style={{ 
                color: '#d35400',
                marginBottom: '1rem',
                fontSize: '1.5rem',
                fontWeight: '700'
              }}>Detalles</h2>
              <div style={{ 
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '1rem'
              }}>
                <div>
                  <p style={{ fontWeight: '600' }}>Peso:</p>
                  <p>{recipe.weight}</p>
                </div>
                <div>
                  <p style={{ fontWeight: '600' }}>Precio:</p>
                  <p style={{ color: '#d35400', fontWeight: '700', fontSize: '1.1rem' }}>
                    {formatPrice(recipe.price)}
                  </p>
                </div>
                <div>
                  <p style={{ fontWeight: '600' }}>Cocina:</p>
                  <p style={{ textTransform: 'capitalize' }}>{recipe.cuisine}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '2rem',
          marginTop: '2rem'
        }}>
          <div style={{
            background: '#f8f9fa',
            padding: '1.5rem',
            borderRadius: '12px'
          }}>
            <h2 style={{ 
              color: '#d35400',
              marginBottom: '1rem',
              fontSize: '1.5rem',
              fontWeight: '700'
            }}>Ingredientes</h2>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {recipe.ingredients?.map((ingredient, index) => (
                <li 
                  key={index}
                  style={{
                    padding: '0.5rem 0',
                    borderBottom: index < recipe.ingredients.length - 1 ? '1px solid #dee2e6' : 'none'
                  }}
                >
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>

          <div style={{
            background: '#f8f9fa',
            padding: '1.5rem',
            borderRadius: '12px'
          }}>
            <h2 style={{ 
              color: '#d35400',
              marginBottom: '1rem',
              fontSize: '1.5rem',
              fontWeight: '700'
            }}>Instrucciones</h2>
            <ol style={{ paddingLeft: '1.2rem' }}>
              {recipe.instructions?.map((instruction, index) => (
                <li 
                  key={index}
                  style={{
                    marginBottom: '0.5rem',
                    lineHeight: '1.5'
                  }}
                >
                  {instruction}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
