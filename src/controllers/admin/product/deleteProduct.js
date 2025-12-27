const Product = require("../../../models/Product");

// @desc    Delete product
// @route   DELETE /api/admin/products/:id
// @access  Private (Admin)
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.deleteOne();

    res.status(200).json({ message: "Product removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = deleteProduct;
