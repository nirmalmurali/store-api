const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a product name"],
      trim: true,
    },
    sku: {
      type: String,
      required: [true, "Please add a SKU"],
      unique: true,
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Please add a category"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Please add a price"],
      min: 0,
    },
    currency: {
      type: String,
      default: "USD",
    },
    stock: {
      type: Number,
      required: [true, "Please add stock quantity"],
      min: 0,
      default: 0,
    },
    description: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive", "draft"],
      default: "active",
    },
    media: [
      {
        type: {
          type: String,
          enum: ["image", "video"],
          default: "image",
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    specifications: [
      {
        key: {
          type: String,
          required: true,
        },
        value: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
