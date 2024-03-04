// In components/RecipeDetails.js

import React, { useEffect, useState } from 'react';
import { fetchRecipeById } from './BackendService'; // Adjust the import path as necessary

const RecipeDetails = ({ id }) => {
    const [recipe, setRecipe] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const fetchedRecipe = await fetchRecipeById(id);
                setRecipe(fetchedRecipe);
            } catch (error) {
                setError('Failed to fetch recipe. Please try again later.');
            }
        };

        fetchRecipe();
    }, [id]); // Re-run this effect if the id changes

    if (error) return <div>{error}</div>;
    if (!recipe) return <div>Loading...</div>;

    return (
        <div>
            <h2>{recipe.title}</h2>
            <img src={recipe.picture} alt={recipe.title} />
            <p>Category: {recipe.category}</p>
            <p>Difficulty: {recipe.difficulty}</p>
            <p>Description: {recipe.description}</p>
            {/* Display ingredients and instructions as needed */}
        </div>
    );
};

export default RecipeDetails;
