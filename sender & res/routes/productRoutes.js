const express = require("express");
const router = express.Router();
const {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} = require("../Controllers/productController");

// GET /product - Get all products
router.get("/", getAllProducts);

// GET /product/:id - Get product by ID
router.get("/:id", getProductById);

// POST /product/create - Create a new product
router.post("/create", createProduct);

// PUT /product/update/:id - Update a product
router.put("/update/:id", updateProduct);

// DELETE /product/:id - Delete a product
router.delete("/:id", deleteProduct);

module.exports = router;

