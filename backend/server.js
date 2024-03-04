require('dotenv').config();

const express = require('express');
// const path = require('../frontend/build');
const mongoose = require('mongoose'); // Import the database
const cors = require('cors'); // Require the CORS package
const recipeRoutes = require('./routes/recipes');
const userRoutes = require("./routes/users");
const ingredientRoutes = require("./routes/ingredientRoutes");


// Express app
const app = express();

// Middleware & static files
app.use(cors()); // Use CORS
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// Register view engine
app.use("/users", userRoutes);
app.use('/recipes', recipeRoutes);
app.use('/ingredient', ingredientRoutes);
// app.use(express.static(path));


// Connect to MongoDB & listen for requests
mongoose.connect(process.env.MONGO_URI)
    .then(result => {
        // Listen for requests
        const PORT = process.env.PORT || 3000; // Ensure PORT is correctly defined
        app.listen(PORT, () => {
            console.log(`Connected to DB & listening on port ${PORT}`);
        });
    })
    .catch(err => console.log("Error:", err));
