const Product = require("../../../models/Product");

// @desc    Get single product by ID
// @route   GET /api/admin/products/:id
// @access  Private (Admin)
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = getProductById;
