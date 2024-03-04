import React from 'react';
import "./App.css";
import Home from "./pages/home/Home";
import Shopping from "./pages/shopping/Shopping";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/Navbar";
import Recipes from "./pages/Recipes";
import PlanMeal from "./pages/plan/Plan";
import Share from "./pages/share/Share";
import MyYummy from "./pages/profile/MyYummy";
import Footer from "./components/Footer";
import SignInPage from "./components/SignInPage";
import { ShoppingListProvider } from './context/ShoppingListContext';
import { SelectedRecipesProvider } from './context/SelectedRecipesContext'; 

function App() {
  return (
    <Router>
      <SelectedRecipesProvider> 
      <ShoppingListProvider>
        <div>
          <NavBar />
          <div className="font-serif">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/A6/" element={<Home />} />
              <Route path="/Home" element={<Home />} />
              <Route path="/Recipes" element={<Recipes />} />
              <Route path="/Plan" element={<PlanMeal />} />
              <Route path="/Share" element={<Share />} />
              <Route path="/Shopping" element={<Shopping />} />
              <Route path="/MyYummy" element={<MyYummy />} />
              <Route path="/SignIn" element={<SignInPage />} />
            </Routes>
          </div>
          <Footer />
        </div>
        </ShoppingListProvider>
      </SelectedRecipesProvider>
    </Router>
  );
}

export default App;
