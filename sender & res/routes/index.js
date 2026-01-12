const express = require("express");
const router = express.Router();

// GET route
router.get("/", (req, res) => {
    res.json({ message: "Welcome to Express API", author: "Gulleid Mohamed" });
});

// POST route
router.post("/", (req, res) => {
    res.json({ message: "POST request received", data: req.body });
});

module.exports = router;

