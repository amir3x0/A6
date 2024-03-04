import React, { useState } from 'react';

const Share = () => {
    document.title = "Share Recipe";
    const [recipeName, setRecipeName] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [ingredientType, setIngredientType] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const [description, setDescription] = useState('');
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [ingredientQuantities, setIngredientQuantities] = useState({});
    const [mealCategory, setMealCategory] = useState('');
    const [instructions, setInstructions] = useState([""]);

    const handleAddInstruction = () => {
      setInstructions([...instructions, ""]); // Add an empty string for the new step
    };

    const handleDeleteInstruction = (index) => {
      setInstructions(instructions.filter((_, idx) => idx !== index));
    };

    const updateInstruction = (index, value) => {
      const updatedInstructions = instructions.map((instruction, idx) =>
        idx === index ? value : instruction
      );
      setInstructions(updatedInstructions);
    };

    const handleMealCategoryChange = (e) => {
        setMealCategory(e.target.value);
    };

    const handleIngredientTypeChange = (e) => {
        const selectedType = e.target.value;
        setIngredientType(selectedType);
        setSelectedIngredients(ingredientTypes[selectedType] || []);
    };

    const handleAddIngredient = (ingredient) => {
        if (!ingredients.includes(ingredient)) {
            setIngredients([...ingredients, ingredient]);
            setIngredientQuantities({ ...ingredientQuantities, [ingredient]: "" }); // Initialize with an empty string for the amount
        }
    };

    const updateIngredientAmount = (ingredient, amount) => {
        setIngredientQuantities({ ...ingredientQuantities, [ingredient]: amount });
    };

    const handleDeleteIngredient = (ingredient) => {
        setIngredients(ingredients.filter(item => item !== ingredient));
        const { [ingredient]: _, ...remainingQuantities } = ingredientQuantities;
        setIngredientQuantities(remainingQuantities);
    };

    const handleShare = () => {
        //TODO Send stuff to db.
    };

    const ingredientTypes = {
        Vegetables: ['Carrots', 'Broccoli', 'Spinach', 'Tomatoes'],
        Proteins: ['Chicken', 'Beef', 'Fish', 'Tofu'],
        Grains: ['Rice', 'Quinoa', 'Pasta', 'Bread'],
        Fruits: ['Apples', 'Bananas', 'Oranges', 'Berries'],
    };

    return (
      <div className="max-w-4xl mx-auto p-6 bg-gray-50 shadow-lg">
        <h1 className="flex justify-center text-4xl font-semibold text-gray-800 my-10">
          Share Your Recipe
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Recipe Name */}
          <div>
            <label className="block text-gray-700 text-lg font-bold mb-2">
              Recipe Name
            </label>
            <input
              type="text"
              id="recipeName"
              value={recipeName}
              onChange={(e) => setRecipeName(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          {/* Difficulty */}
          <div>
            <label className="block text-gray-700 text-lg font-bold mb-2">
              Difficulty
            </label>
            <select
              id="difficulty"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select Difficulty</option>
              <option value="easy">Easy</option>
              <option value="intermediate">Intermediate</option>
              <option value="hard">Hard</option>
              <option value="chef">Chef Level</option>
            </select>
          </div>

          {/* Category */}
          <div className="col-span-1 md:col-span-2">
            <label className="block text-gray-700 text-lg font-bold mb-2">
              Meal Category
            </label>
            <select
              id="mealCategory"
              value={mealCategory}
              onChange={handleMealCategoryChange}
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select Meal Category</option>
              <option value="appetizers">Appetizers</option>
              <option value="starters">Starters</option>
              <option value="mainCourse">Main Course</option>
              <option value="desserts">Desserts</option>
            </select>
          </div>

          {/* Ingredient Type */}
          <div className="col-span-1 md:col-span-2">
            <label
              htmlFor="ingredientType"
              className="block text-gray-700 text-lg font-bold mb-2"
            >
              Ingredient Type
            </label>
            <select
              id="ingredientType"
              value={ingredientType}
              onChange={handleIngredientTypeChange}
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select Ingredient Type</option>
              {Object.keys(ingredientTypes).map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Selected Ingredients */}
          <div className="col-span-1 md:col-span-2">
            {selectedIngredients.length > 0 && (
              <>
                <label className="block text-gray-700 text-lg font-bold mb-2">
                  Choose Ingredients
                </label>
                <div className="flex flex-wrap justify-center gap-2">
                  {selectedIngredients.map((ingredient) => (
                    <button
                      key={ingredient}
                      onClick={() => handleAddIngredient(ingredient)}
                      className={`px-4 py-2 rounded-full text-white ${
                        ingredients.includes(ingredient)
                          ? "bg-blue-500"
                          : "bg-gray-500"
                      }`}
                    >
                      {ingredient}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Selected Ingredients info */}
          {ingredients.length > 0 && (
            <div className="col-span-1 md:col-span-2">
              <label className="block text-gray-700 text-lg font-bold mb-2">
                Necessary Ingredients and Quantities
              </label>
              <ul>
                {ingredients.map((ingredient) => (
                  <li
                    key={ingredient}
                    className="flex justify-center items-center gap-5 mb-2"
                  >
                    {ingredient}
                    <input
                      type="text"
                      placeholder="Amount (e.g., 2 cups)"
                      value={ingredientQuantities[ingredient]}
                      onChange={(e) =>
                        updateIngredientAmount(ingredient, e.target.value)
                      }
                      className="shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    <button
                      onClick={() => handleDeleteIngredient(ingredient)}
                      className="text-red-500 font-bold hover:text-red-700 ml-4"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Description */}
          <div className="col-span-1 md:col-span-2">
            <label
              htmlFor="description"
              className="block text-gray-700 text-lg font-bold mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            ></textarea>
          </div>
        </div>

        {/* Instructions */}
        <div className="col-span-1 md:col-span-2 border-b-2 pb-5">
          <label className="block text-gray-700 text-lg font-bold mb-2">
            Instructions
          </label>
          {instructions.map((instruction, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <input
                type="text"
                value={instruction}
                onChange={(e) => updateInstruction(index, e.target.value)}
                placeholder={`Step ${index + 1}`}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <button
                onClick={() => handleDeleteInstruction(index)}
                className="text-red-500 font-bold hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="flex justify-center mb-10">
            <button
              onClick={handleAddInstruction}
              className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Add Step
            </button>
          </div>
        </div>

        {/* Share Button */}
        <div className="flex justify-center mt-5 text-lg">
          <button
            onClick={handleShare}
            className="transition duration-300 hover:-translate-y-1 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Share
          </button>
        </div>
      </div>
    );
};

export default Share;