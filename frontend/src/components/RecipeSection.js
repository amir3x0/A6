import React, { useState, useEffect } from "react";
import RecipeCard from "./RecipeCard";
import { fetchRecipes } from "../services/BackendService";
import { useLocation } from "react-router-dom";
import { useSelectedRecipes } from '../context/SelectedRecipesContext';
import { useNavigate } from "react-router-dom";



const RecipeSection = () => {
  const [originalRecipes, setOriginalRecipes] = useState({});
  const [displayedRecipes, setDisplayedRecipes] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedRecipes, setSelectedRecipes] = useState([]); // Define the state for selected recipes
  const [loadingStatus, setLoadingStatus] = useState("Loading");
  const location = useLocation();
  const passedCategory = location.state?.category;
  const { addRecipe } = useSelectedRecipes();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedRecipes = await fetchRecipes();
        let categorized;
        if (passedCategory) {
          // Filter recipes by the passed category
          categorized = {
            [passedCategory]: fetchedRecipes.filter(
              (recipe) =>
                recipe.category.toLowerCase() === passedCategory.toLowerCase()
            ),
          };
        } else {
          // Original categorization logic
          categorized = fetchedRecipes.reduce((acc, recipe) => {
            const category = recipe.category.toLowerCase();
            if (!acc[category]) acc[category] = [];
            acc[category].push({ ...recipe, picture: recipe.picture });
            return acc;
          }, {});
        }
        setOriginalRecipes(categorized);
        setDisplayedRecipes(categorized);
        setLoadingStatus("Loaded");
      } catch (error) {
        setLoadingStatus("Error");
      }
    };

    fetchData();
  }, [passedCategory]);

  const handleSelectRecipe = (recipeId) => {
    // Use the addRecipe method from the context to add the selected recipe
    addRecipe(recipeId).then(() => {
        // After adding the recipe, navigate back to the PlanSection
        navigate('/plan');
    }).catch(error => console.error("Error adding recipe:", error));
};

  useEffect(() => {
    if (!searchTerm.trim()) {
      setDisplayedRecipes(originalRecipes);
    } else {
      const filtered = Object.keys(originalRecipes).reduce((acc, category) => {
        const filteredRecipes = originalRecipes[category].filter((recipe) =>
          recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        if (filteredRecipes.length) acc[category] = filteredRecipes;
        return acc;
      }, {});

      setDisplayedRecipes(filtered);
    }
  }, [searchTerm, originalRecipes]);

  const handleRecipeClick = (recipe, category) => {
    setSelectedRecipe(selectedRecipe === recipe ? null : recipe);
    setSelectedCategory(selectedRecipe === recipe ? null : category);
  };

  document.title = "Our Recipes";

  // Enhanced category colors with more vibrant and unique options
  const categoryColors = {
    appetizers: "bg-pink-50",
    starters: "bg-indigo-50",
    "main dish": "bg-green-50",
    dessert: "bg-yellow-50",
  };

  if (loadingStatus === "Error")
    return (
      <div className="text-center text-red-500">Error loading recipes.</div>
    );
  if (loadingStatus !== "Loaded")
    return <div className="text-center">Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Title */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-red-800">Explore Recipes</h1>
        <p className="text-md text-gray-600 mt-2">
          Discover your next favorite dish
        </p>
      </div>

      <div className="mb-8 flex justify-center">
        <input
          type="text"
          placeholder="Search for recipes..."
          className="form-input mt-1 block w-full md:w-1/2 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {Object.entries(displayedRecipes).length > 0 ? (
        Object.entries(displayedRecipes).map(([category, recipes]) => (
          <div
            key={category}
            className={`${
              categoryColors[category] || "bg-gray-100"
            } mb-12 p-4 rounded-lg shadow`}
          >
            <h2 className="text-2xl font-bold mb-4 capitalize text-gray-800">
              {category}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {recipes.map((recipe) => (
                <div
                  key={recipe._id}
                  className={`p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300 transform hover:-translate-y-1 bg-white ${
                    selectedRecipe === recipe
                      ? "ring-2 ring-offset-2 ring-blue-500"
                      : ""
                  }`}
                  onClick={() => handleRecipeClick(recipe, category)}
                >
                  <RecipeCard
                    recipe={recipe}
                    isExpanded={
                      selectedRecipe && selectedRecipe._id === recipe._id
                    }
                    onSelect={() => handleSelectRecipe(recipe._id)}
                    showSelectButton={!!passedCategory}
                  />
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="text-center">No recipes found.</div>
      )}
    </div>
  );
};

export default RecipeSection;
