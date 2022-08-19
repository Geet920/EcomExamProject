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
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
