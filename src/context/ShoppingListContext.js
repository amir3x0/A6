// ShoppingListContext.js
import React, { createContext, useContext, useState } from 'react';

const ShoppingListContext = createContext(null); // Initialized with null for default value

export const useShoppingList = () => useContext(ShoppingListContext);

export const ShoppingListProvider = ({ children }) => {
  const [shoppingList, setShoppingList] = useState([]);

  return (
    <ShoppingListContext.Provider value={{ shoppingList, setShoppingList }}>
      {children}
    </ShoppingListContext.Provider>
  );
};
