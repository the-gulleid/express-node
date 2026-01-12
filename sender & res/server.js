const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/express-lessons");
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection error:", error.message);
        console.log("Server will continue running, but database operations will fail.");
        console.log("Please make sure MongoDB is running or update MONGODB_URI in .env file");
    }
};

connectDB();

// Routes
app.use("/product", require("./Routes/productRoutes"));
app.use("/order", require("./Routes/orderRoutes"));

// Root route
app.get("/", (req, res) => {
    res.json({
        message: "Welcome to Express API",
        endpoints: {
            products: {
                "GET /product": "Get all products",
                "GET /product/:id": "Get product by ID",
                "POST /product/create": "Create a new product",
                "PUT /product/update/:id": "Update a product",
                "DELETE /product/:id": "Delete a product"
            },
            orders: {
                "GET /order": "Get all orders (includes sender & receiver)",
                "GET /order/:id": "Get order by ID (includes sender & receiver)",
                "POST /order/create": "Create a new order (with sender & receiver)",
                "PUT /order/update/:id": "Update an order (can update sender & receiver)",
                "PUT /order/changestatus/:id": "Update order status",
                "DELETE /order/:id": "Delete an order"
            }
        },
        orderFields: {
            sender: {
                name: "gulleid mohamed farah",
                id: "4867444",
                description: "Default sender information"
            },
            receiver: {
                name: "hooyo hinda hussein handulle",
                id: "4115165",
                description: "Default receiver information"
            },
            note: "All order responses include sender and receiver data"
        }
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: "Something went wrong!",
        error: err.message
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Visit http://localhost:${PORT}`);
});

module.exports = app;

