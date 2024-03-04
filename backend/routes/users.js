const express = require("express");
const { createUser, getUser } = require("../controllers/userController");
const verifyToken = require("../middlewares/authmiddleware"); // Adjust the path as necessary

const router = express.Router();

// Public route: Login does not require authentication
router.post("/login", getUser);
 
// Public route: Creating a new user does not require authentication
router.post("/", createUser);

// Example of a protected route
// This is a placeholder for any user-related action that requires authentication
// Add the verifyToken middleware to any route you want to protect
router.get("/protected-action", verifyToken, (req, res) => {
    // This route now requires a valid token to access
    res.json({ message: "This is a protected action only accessible with a valid token." });
});

module.exports = router;

