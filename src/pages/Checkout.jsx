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
    const [displayedItems, setDisplayedItems] = useState(allRecipes.slice(0, PAGE_SIZE));

return (
    <>
    <h1>SUBLIME FOOD RESTAURANT</h1>
    <main>
        {displayedItems.map((recipe, index) => (
        <RecipeCard key={`${recipe.name}-${index}`} recipe={recipe} />
        ))}
    </main>
    </>
    );
}
