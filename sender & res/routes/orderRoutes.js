const express = require("express");
const router = express.Router();
const {
    getAllOrders,
    getOrderById,
    createOrder,
    updateOrder,
    updateOrderStatus,
    deleteOrder
} = require("../Controllers/orderController");

// GET /order - Get all orders
router.get("/", getAllOrders);

// GET /order/:id - Get order by ID
router.get("/:id", getOrderById);

// POST /order/create - Create a new order
router.post("/create", createOrder);

// PUT /order/update/:id - Update an order
router.put("/update/:id", updateOrder);

// PUT /order/changestatus/:id - Update order status
router.put("/changestatus/:id", updateOrderStatus);

// DELETE /order/:id - Delete an order
router.delete("/:id", deleteOrder);

module.exports = router;

