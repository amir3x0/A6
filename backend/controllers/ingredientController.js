const axios = require('axios');

const getIngredientInfoByName = async (req, res) => {
  try {
    const { name } = req.params;
    const { amount, unit } = req.query;

    // Search for the ingredient ID based on the name
    const searchResponse = await axios.get(`https://api.spoonacular.com/food/ingredients/search`, {
      params: {
        query: name,
        number: 1, // Limit to 1 result
        apiKey: process.env.SPOONACULAR_API_KEY
      }
    });

    // Extract the ID from the search result
    const ingredientId = searchResponse.data.results[0].id;

    // Retrieve ingredient information using the ID
    const infoResponse = await axios.get(`https://api.spoonacular.com/food/ingredients/${ingredientId}/information`, {
      params: {
        amount: amount || 1, // Default amount to 1 if not provided
        unit: unit || '',    // Default unit to empty string if not provided
        apiKey: process.env.SPOONACULAR_API_KEY
      }
    });

    res.json(infoResponse.data);
  } catch (error) {
    console.error('Error:', error);
    res.status(error.response.status || 500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getIngredientInfoByName
};