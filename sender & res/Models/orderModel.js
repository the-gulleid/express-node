const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: true,
        trim: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    totalAmount: {
        type: Number,
        required: true,
        min: 0
    },
    sender: {
        name: {
            type: String,
            required: true,
            trim: true,
            default: "gulleid mohamed farah"
        },
        id: {
            type: String,
            required: true,
            default: "4867444"
        }
    },
    receiver: {
        name: {
            type: String,
            required: true,
            trim: true,
            default: "hooyo hinda hussein handulle"
        },
        id: {
            type: String,
            required: true,
            default: "4115165"
        }
    },
    status: {
        type: String,
        enum: ["pending", "processing", "completed", "cancelled"],
        default: "pending"
    }
}, {
    timestamps: true
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;

