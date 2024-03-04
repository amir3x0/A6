import React, { useState } from "react";
import { useShoppingList } from "../context/ShoppingListContext";

const ShoppingSection = () => {
  const { shoppingList, setShoppingList } = useShoppingList();
  const [boughtItems, setBoughtItems] = useState([]);
  const [erasedItems, setErasedItems] = useState([]);

  const [newIngredient, setNewIngredient] = useState({
    name: '',
    quantity: '',
    unit: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewIngredient(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShoppingList(prevList => [...prevList, newIngredient]);
    setNewIngredient({ name: '', quantity: '', unit: '' });
  };

  const handleCheckOff = (index) => {
    const item = shoppingList[index];
    setBoughtItems((prevBoughtItems) => [...prevBoughtItems, item]);
    setShoppingList(shoppingList.filter((_, i) => i !== index));
  };

  const handleErase = (index) => {
    const item = shoppingList[index];
    setErasedItems((prevErasedItems) => [...prevErasedItems, item]);
    setShoppingList(shoppingList.filter((_, i) => i !== index));
  };

  const handleUndoBought = (index) => {
    const item = boughtItems[index];
    setShoppingList((prevShoppingList) => [...prevShoppingList, item]);
    setBoughtItems(boughtItems.filter((_, i) => i !== index));
  };

  const handleUndoErased = (index) => {
    const item = erasedItems[index];
    setShoppingList((prevShoppingList) => [...prevShoppingList, item]);
    setErasedItems(erasedItems.filter((_, i) => i !== index));
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h2 className="text-4xl font-bold mb-6 text-center text-blue-800">Shopping List</h2>
      <form onSubmit={handleSubmit} className="mb-6 flex flex-wrap justify-center gap-3 items-center">
        <input
          type="text"
          name="name"
          value={newIngredient.name}
          onChange={handleChange}
          placeholder="Ingredient name"
          required
          className="p-2 w-1/3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow"
        />
        <input
          type="number"
          name="quantity"
          value={newIngredient.quantity}
          onChange={handleChange}
          placeholder="Quantity"
          required
          className="p-2 w-1/4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow"
        />
        <input
          type="text"
          name="unit"
          value={newIngredient.unit}
          onChange={handleChange}
          placeholder="Unit (e.g., kg, lb)"
          required
          className="p-2 w-1/4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow"
        />
        <button type="submit" className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-lg transition duration-150 ease-in-out transform hover:-translate-y-1">
          Add Ingredient
        </button>
      </form>
      <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {shoppingList.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-3 bg-white rounded-lg shadow-md hover:shadow-lg transition-all"
          >
            <span className="text-lg text-gray-700">{`${item.name} - ${item.quantity} ${item.unit}`}</span>
            <div>
              <button
                className="text-green-600 hover:text-green-800 mr-2"
                onClick={() => handleCheckOff(index)}
              >
                ✓
              </button>
              <button
                className="text-red-600 hover:text-red-800"
                onClick={() => handleErase(index)}
              >
                ✗
              </button>
            </div>
          </div>
        ))}
      </div>
      <h3 className="text-2xl font-semibold mb-3 text-green-800">Bought Items</h3>
      {boughtItems.map((item, index) => (
        <div
          key={index}
          className="flex justify-between items-center mb-2 p-3 bg-green-200 rounded-lg shadow"
        >
          <span className="text-lg">{`${item.name} - ${item.quantity} ${item.unit}`}</span>
          <button className="text-blue-600 hover:text-blue-800" onClick={() => handleUndoBought(index)}>Undo</button>
        </div>
      ))}
      <h3 className="text-2xl font-semibold mb-3 text-red-800">Erased Items</h3>
      {erasedItems.map((item, index) => (
        <div
          key={index}
          className="flex justify-between items-center mb-2 p-3 bg-red-200 rounded-lg shadow"
        >
          <span className="text-lg">{`${item.name} - ${item.quantity} ${item.unit}`}</span>
          <button className="text-blue-600 hover:text-blue-800" onClick={() => handleUndoErased(index)}>Undo</button>
        </div>
      ))}
    </div>
  );
};

export default ShoppingSection;
