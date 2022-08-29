const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    address: { type: String, requirFed: true },
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    products: [
      {
        productId: { type: Object },
      },
    ],
    status: {
      type: String,
      enum: ["Cancelled", "To Ship", "Shipped", "Delivered"],
      default: "To Ship",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
