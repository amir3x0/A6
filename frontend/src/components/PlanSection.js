import React, { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";
import PlanBg from "../pages/plan/plan_img/planBg.jpg";
import { useNavigate } from "react-router-dom";
import { useSelectedRecipes } from "../context/SelectedRecipesContext";
import { useShoppingList } from "../context/ShoppingListContext";

const PlanSection = () => {
  const [expandedRecipeId, setExpandedRecipeId] = useState(null);
  const { selectedRecipes } = useSelectedRecipes();
  const navigate = useNavigate();
  const [shoppingList, setShoppingListState] = useState([]);
  const { setShoppingList } = useShoppingList();

  const handleAddRecipe = (category) => {
    navigate(`/Recipes`, { state: { category } });
  };

  // Function to handle adding ingredients to the shopping list
  const handleAddIngredients = (ingredients) => {
    setShoppingListState((currentList) => {
      const ingredientMap = currentList.reduce((acc, ingredient) => {
        const key = `${ingredient.name}-${ingredient.unit}`;
        if (!acc[key]) {
          acc[key] = { ...ingredient };
        } else {
          acc[key].quantity += ingredient.quantity;
        }
        return acc;
      }, {});

      ingredients.forEach((ingredientToAdd) => {
        const key = `${ingredientToAdd.name}-${ingredientToAdd.unit}`;
        if (ingredientMap[key]) {
          ingredientMap[key].quantity += parseFloat(ingredientToAdd.quantity);
        } else {
          ingredientMap[key] = {
            ...ingredientToAdd,
            quantity: parseFloat(ingredientToAdd.quantity),
          };
        }
      });

      return Object.values(ingredientMap);
    });
  };

  const makeList = () => {
    setShoppingList(shoppingList); // Update the global context with the local state
    navigate("/Shopping");
  };

  return (
    <div className="container mx-auto mt-10 px-5">
      <div className="w-full mb-10">
        <div className="image-container relative overflow-hidden max-h-72">
          <img className="w-full" src={PlanBg} alt="Plan Your Meal" />
          <div className="overlay absolute bottom-0 left-0 right-0 bg-gray-800 bg-opacity-55 p-5">
            <h1 className="text-white text-4xl font-serif mb-5">Plan A Meal</h1>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-between">
        {/* Categories Container */}
        <div className="w-full lg:w-3/4 pr-4 mb-10 lg:mb-0">
          {["Appetizers", "Starters", "Main Dish", "Dessert"].map(
            (category) => (
              <div key={category} className="mb-10">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-green-800 uppercase">
                    {category}
                  </h2>
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors duration-300"
                    onClick={() => handleAddRecipe(category)}
                  >
                    +
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {selectedRecipes
                    .filter((recipe) => recipe.category === category)
                    .map((recipe) => (
                      <RecipeCard
                        key={recipe._id}
                        recipe={recipe}
                        isExpanded={expandedRecipeId === recipe._id}
                        onClick={() =>
                          setExpandedRecipeId(
                            expandedRecipeId === recipe._id ? null : recipe._id
                          )
                        }
                        showSelectButton={false}
                        showAddIngredientsButton={true}
                        onAddIngredients={handleAddIngredients}
                      />
                    ))}
                </div>
              </div>
            )
          )}
        </div>

        {/* Shopping List Section */}
        <div className="w-full lg:w-1/4 lg:pl-4">
          <h2 className="text-3xl font-bold text-green-800 uppercase mb-4">
            Shopping List
          </h2>
          <div className="overflow-x-auto lg:overflow-visible shadow-md rounded-lg">
            <table className="min-w-full text-sm divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 font-semibold text-left text-gray-600 uppercase">
                    Ingredient
                  </th>
                  <th className="px-4 py-3 font-semibold text-left text-gray-600 uppercase">
                    Quantity
                  </th>
                  <th className="px-4 py-3 font-semibold text-left text-gray-600 uppercase">
                    Unit
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {shoppingList.map(({ name, quantity, unit }, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-2 text-gray-700">{name}</td>
                    <td className="px-4 py-2 text-gray-700">{quantity}</td>
                    <td className="px-4 py-2 text-gray-700">{unit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button
            onClick={makeList}
            className="mt-4 w-full bg-green-600 text-white font-semibold py-2 px-4 rounded hover:bg-green-700 transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-opacity-50 shadow-lg"
          >
            Make List
          </button>
          <div className="mt-4">
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Enter meal plan name"
              //value={mealPlanName}
             // onChange={(e) => setMealPlanName(e.target.value)}
            />
            <button
              className="mt-2 w-full bg-green-500 text-white font-semibold py-2 px-4 rounded hover:bg-green-700 transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-opacity-50 shadow-lg"
              //onClick={handleSavePlanMeal}
            >
              Save Plan Meal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanSection;
