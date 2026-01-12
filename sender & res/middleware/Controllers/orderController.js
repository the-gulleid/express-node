const Order = require("../Models/orderModel");
const Product = require("../Models/productModel");

// Get all orders
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate("productId", "name price category");
        res.status(200).json({
            success: true,
            count: orders.length,
            data: orders
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching orders",
            error: error.message
        });
    }
};

// Get order by ID
const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate("productId", "name price category");
        
        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        res.status(200).json({
            success: true,
            data: order
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching order",
            error: error.message
        });
    }
};

// Create a new order
const createOrder = async (req, res) => {
    try {
        const { customerName, productId, quantity, sender, receiver } = req.body;

        // Validation
        if (!customerName || !productId || !quantity) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required fields: customerName, productId, quantity"
            });
        }

        // Check if product exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        // Check if enough stock is available
        if (product.stock < quantity) {
            return res.status(400).json({
                success: false,
                message: "Insufficient stock available"
            });
        }

        // Calculate total amount
        const totalAmount = product.price * quantity;

        // Set default sender and receiver if not provided
        const orderSender = sender || {
            name: "gulleid mohamed farah",
            id: "4867444"
        };
        
        const orderReceiver = receiver || {
            name: "hooyo hinda hussein handulle",
            id: "4115165"
        };

        const order = new Order({
            customerName,
            productId,
            quantity,
            totalAmount,
            sender: orderSender,
            receiver: orderReceiver
        });

        const savedOrder = await order.save();

        // Update product stock
        product.stock -= quantity;
        await product.save();

        res.status(201).json({
            success: true,
            message: "Order created successfully",
            data: savedOrder
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error creating order",
            error: error.message
        });
    }
};

// Update an order
const updateOrder = async (req, res) => {
    try {
        const { customerName, productId, quantity, sender, receiver } = req.body;

        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        // If productId or quantity changes, recalculate totalAmount
        let totalAmount = order.totalAmount;
        if (productId || quantity) {
            const product = productId 
                ? await Product.findById(productId)
                : await Product.findById(order.productId);
            
            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: "Product not found"
                });
            }

            const newQuantity = quantity || order.quantity;
            totalAmount = product.price * newQuantity;
        }

        // Prepare update object
        const updateData = { customerName, productId, quantity, totalAmount };
        if (sender) updateData.sender = sender;
        if (receiver) updateData.receiver = receiver;

        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        ).populate("productId", "name price category");

        res.status(200).json({
            success: true,
            message: "Order updated successfully",
            data: updatedOrder
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating order",
            error: error.message
        });
    }
};

// Update order status
const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({
                success: false,
                message: "Please provide status field"
            });
        }

        const validStatuses = ["pending", "processing", "completed", "cancelled"];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: `Status must be one of: ${validStatuses.join(", ")}`
            });
        }

        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true, runValidators: true }
        ).populate("productId", "name price category");

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Order status updated successfully",
            data: order
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating order status",
            error: error.message
        });
    }
};

// Delete an order
const deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Order deleted successfully",
            data: order
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting order",
            error: error.message
        });
    }
};

module.exports = {
    getAllOrders,
    getOrderById,
    createOrder,
    updateOrder,
    updateOrderStatus,
    deleteOrder
};

