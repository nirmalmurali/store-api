const Product = require("../../../models/Product");

// @desc    Get all products
// @route   GET /api/admin/products
// @access  Private (Admin)
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = getProducts;
