import React, { useState, useEffect } from 'react';
import RecipeCard from './RecipeCard';

const RecipeList = () => {
    const [recipes, setRecipes] = useState([]);
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [filters, setFilters] = useState({
        cuisine: '',
        difficulty: '',
    });

    useEffect(() => {
        const demoRecipes = [
            { id: 1, name: "Spaghetti Carbonara", cuisine: "italiana", difficulty: "facil" },
            { id: 2, name: "Tacos al Pastor", cuisine: "mexicana", difficulty: "media" },
            { id: 3, name: "Sushi Roll", cuisine: "asiatica", difficulty: "dificil" },
        ];
        setRecipes(demoRecipes);
        setFilteredRecipes(demoRecipes);
    }, []);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value,
        }));

        setFilteredRecipes(
            recipes.filter(recipe =>
                (name === 'cuisine' ? (value === '' || recipe.cuisine === value) : true) &&
                (name === 'difficulty' ? (value === '' || recipe.difficulty === value) : true)
            )
        );
    };

    return (
        <div className="container">
            <h1>Lista de Recetas</h1>
            <div className="filters">
                <label>
                    Cocina:
                    <select name="cuisine" value={filters.cuisine} onChange={handleFilterChange}>
                        <option value="">Todas</option>
                        <option value="italiana">Italiana</option>
                        <option value="mexicana">Mexicana</option>
                        <option value="asiatica">Asiática</option>
                    </select>
                </label>
                <label>
                    Dificultad:
                    <select name="difficulty" value={filters.difficulty} onChange={handleFilterChange}>
                        <option value="">Todas</option>
                        <option value="facil">Fácil</option>
                        <option value="media">Media</option>
                        <option value="dificil">Difícil</option>
                    </select>
                </label>
            </div>
 
            <div className="recipe-list">
                {filteredRecipes.map(recipe => (
                    <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
            </div>
        </div>
    );
};

export default RecipeList;
