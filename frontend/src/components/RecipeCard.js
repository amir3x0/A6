import React from "react";

// Enum for recipe categories
const CategoryLabels = {
  appetizers: "Appetizers",
  starters: "Starters",
  mainDish: "Main Dish",
  dessert: "Dessert",
};

// Added new prop `showSelectButton` to determine the visibility of the select button
const RecipeCard = ({
  recipe,
  isExpanded,
  onClick,
  onSelect,
  showSelectButton,
  showAddIngredientsButton, // New prop to control the display of the "Add Ingredients" button
  onAddIngredients, // New prop to handle the "Add Ingredients" button click
}) => {
  // Function to handle select button click without propagating to card click
  const handleSelectClick = (e) => {
    e.stopPropagation(); // Prevent onClick for the card from being called
    onSelect(recipe); // Call the onSelect handler passed from the parent
  };

  const handleAddIngredientsClick = () => {
    onAddIngredients(recipe.ingredients);
  };

  

  return (
    <div
      className={`border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out cursor-pointer ${
        isExpanded ? "scale-105" : "scale-100"
      } `}
      onClick={onClick}
    >
      <img
        src={recipe.picture}
        alt={recipe.title}
        className="w-full h-48 object-cover"
      />
      <div className={`p-4 ${isExpanded ? "px-8 py-6" : "px-4 py-4"}`}>
        <p className="text-lg font-semibold text-gray-800">{recipe.title}</p>
        {isExpanded && (
          <>
            <p className="text-gray-600 mt-2">{recipe.description}</p>
            <div className="mt-4">
              <ul className="list-disc list-inside">
                <p className="text-sm font-semibold">Steps:</p>
                {recipe.instructions.map((step, index) => (
                  <li key={index} className="text-sm text-gray-700">
                    {step}
                  </li>
                ))}
              </ul>
              <p className="text-sm mt-2">
                <span className="font-semibold">Difficulty:</span>{" "}
                {recipe.difficulty}
              </p>
              <div className="mt-2">
                <p className="text-sm font-semibold">Ingredients:</p>
                <ul className="list-disc list-inside">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li
                      key={index}
                      className="text-sm text-gray-700"
                    >{`${ingredient.name} - ${ingredient.quantity}`}</li>
                  ))}
                </ul>
              </div>
              <div className="mt-2">
                <p className="text-sm">
                  <span className="font-semibold">Calories:</span>{" "}
                  {recipe.calories.total} kcal
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Protein:</span>{" "}
                  {recipe.calories.protein}g
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Carbs:</span>{" "}
                  {recipe.calories.carbs}g
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Fat:</span>{" "}
                  {recipe.calories.fat}g
                </p>
              </div>
            </div>
            {/* Conditionally render the select button based on `showSelectButton` prop */}
            {showSelectButton && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect(recipe._id); // Pass the recipe ID instead of the whole recipe
                }}
                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Select
              </button>
            )}
            {/* Rest of the RecipeCard component remains unchanged */}
            {showAddIngredientsButton && (
              <button
                onClick={handleAddIngredientsClick}
                className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                Add Ingredients
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default RecipeCard;
