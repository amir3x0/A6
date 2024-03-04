import React, { createContext, useContext, useState } from 'react';
import { fetchRecipeById } from '../services/BackendService'; 

const SelectedRecipesContext = createContext();

export const useSelectedRecipes = () => useContext(SelectedRecipesContext);

export const SelectedRecipesProvider = ({ children }) => {
  const [selectedRecipes, setSelectedRecipes] = useState([]);

  const addRecipe = async (recipeId) => {
    try {
      // Fetch the recipe details by ID
      const recipeDetails = await fetchRecipeById(recipeId);

      // Add the fetched recipe to the state
      setSelectedRecipes((prevRecipes) => {
        // Optionally, you can check if the recipe is already added
        const isExisting = prevRecipes.some(recipe => recipe._id === recipeDetails._id);
        if (!isExisting) {
          return [...prevRecipes, recipeDetails];
        }
        return prevRecipes;
      });
    } catch (error) {
      console.error("Error fetching recipe details: ", error);
      // Handle error (e.g., set error state, show notification, etc.)
    }
  };

  const clearSelectedRecipes = () => {
    setSelectedRecipes([]);
  };

  return (
    <SelectedRecipesContext.Provider value={{ selectedRecipes, addRecipe, clearSelectedRecipes }}>
      {children}
    </SelectedRecipesContext.Provider>
  );
};